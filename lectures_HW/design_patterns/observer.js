const DEFAULTS = {
    SELECTORS: {
        BIND: '[data-bind]'
    },
    PROPERTIES: {
        IS_OBSERVABLE: 'isObservable'
    },
    EVENTS: {
        CHANGE: 'change'
    },
    NODE_TYPES: {
        TEXT: 'text',
        VALUE: 'value'
    }
};

class Sync {
    constructor() {
        this.bindNodes = [];
        this.observers = {};
        this.model = {};
        this.callbacks = [];
    }

    _findBindNodes() {
        this.bindNodes = document.querySelectorAll(DEFAULTS.SELECTORS.BIND);

        return this;
    }

    _parseBindNodesData() {

        this.bindNodes.forEach((node) => {
            let attrStr = node.dataset.bind;
            let attrArr = attrStr.split(':');

            if (attrArr.length !== 2) {
                throw new Error(`Wrong ${DEFAULTS.SELECTORS.BIND} values`);
            }

            let [bindType, bindKey] = attrArr.map((el) => el.trim());
            let obj = {
                key: bindKey,
                type: bindType,
                node
            };

            if (!this.observers[bindKey]) {
                this.observers[bindKey] = [];
                this.observers[bindKey].push(obj);
            } else {
                let alreadyHasNode = this.observers[bindKey].some((el) => el.node === obj.node);

                if (!alreadyHasNode) {
                    this.observers[bindKey].push(obj);
                }
            }
        });

        return this;
    }

    _bindingHandlers(model, except) {
        let self = this;

        Object.assign(this.model, model);

        Object.keys(this.observers).forEach((key) => {
            if (!this.model.hasOwnProperty(key)) {
                return;
            }

            let modelItem = this.model[key];
            let modelValue = modelItem;
            let _actionWhenItemIsObservable = () => {
                modelValue = modelItem.value;

                this.model[key] = (param) => {
                    if (param === undefined) {
                        return modelValue;
                    } else {
                        modelValue = param;
                        this.applyBindings(this.model);
                    }
                };

                this.model[key] = Object.setPrototypeOf(this.model[key], {
                    [DEFAULTS.PROPERTIES.IS_OBSERVABLE]: true,
                    subscribe(cb) {
                        self.callbacks.push([cb, key]);
                    }
                });

                Object.assign(model, this.model);
            };

            if (modelItem && modelItem.hasOwnProperty(DEFAULTS.PROPERTIES.IS_OBSERVABLE)) {
                _actionWhenItemIsObservable();
            }

            if (typeof modelValue === 'function') {
                modelValue = modelValue();
            }

            let _applyDataToView = () => {
                this.observers[key].forEach((bindObj, i) => {

                    if (bindObj.node === except) {
                        return;
                    }

                    switch (bindObj.type) {
                        case DEFAULTS.NODE_TYPES.TEXT:
                            bindObj.node.textContent = modelValue;
                            break;

                        case DEFAULTS.NODE_TYPES.VALUE:
                            bindObj.node.value = modelValue;

                            if (bindObj.event !== DEFAULTS.EVENTS.CHANGE) {
                                bindObj.event = DEFAULTS.EVENTS.CHANGE;

                                this.addListener(bindObj.type, key, i);
                            }
                            break;

                        default:
                            console.warn('No data type');

                            bindObj.node.textContent = modelValue;
                            break;
                    }
                });
            };

            _applyDataToView();
        });

        return this;
    }

    addListener(nodeType, observerKey, observerIndex) {
        if (nodeType === DEFAULTS.NODE_TYPES.VALUE) {
            let node = this.observers[observerKey][observerIndex].node;
            let _inputOnChangeHandler = (e) => {
                let elem = e.srcElement;
                let currModel = {};

                currModel[observerKey] = elem.value;

                this.applyBindings(currModel, elem);
            };

            node.addEventListener(DEFAULTS.EVENTS.CHANGE, _inputOnChangeHandler);
        }
    }

    _executeCallbacks() {

        this.callbacks.forEach((cbArr) => {
            let [cb, key] = cbArr;
            let value = this.model[key];

            cb(value);
        });
    }

    observable(value) {
        return {
            [DEFAULTS.PROPERTIES.IS_OBSERVABLE]: true,
            value
        }
    }

    applyBindings(model, exclude) {
        this
            ._findBindNodes()
            ._parseBindNodesData()
            ._bindingHandlers(model, exclude)
            ._executeCallbacks();

        return this;
    }
}

module.exports = new Sync();
