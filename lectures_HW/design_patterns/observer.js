(function() {
    'use strict';

    function Sync() {
        this.bindNodes = [];
        this.observers = {};
        this.model = {};
        this.callbacks = [];
    }

    Sync.prototype._findBindNodes = function() {
        this.bindNodes = document.querySelectorAll('[data-bind]');

        return this;
    };

    Sync.prototype._parseBindNodesData = function() {
        var self = this;

        self.bindNodes.forEach(function(node) {
            var attrStr = node.dataset.bind;
            var attrArr = attrStr.split(':');

            if (attrArr.length !== 2) {
                throw new Error('Wrong `data-bind` values');
            }

            var bindType = attrArr[0].trim();
            var bindKey = attrArr[1].trim();
            var obj = {
                key: bindKey,
                type: bindType,
                node: node
            };

            if (!self.observers[bindKey]) {
                self.observers[bindKey] = [];
                self.observers[bindKey].push(obj);
            } else {
                var alreadyHasNode = self.observers[bindKey].some(function(el) {
                    return el.node === obj.node;
                });

                if (!alreadyHasNode) {
                    self.observers[bindKey].push(obj);
                }
            }
        });

        return this;
    };

    Sync.prototype._bindingHandlers = function(model, except) {
        var self = this;

        Object.assign(self.model, model);

        Object.keys(self.observers).forEach(function(key) {
            if (!self.model.hasOwnProperty(key)) {
                return;
            }

            var modelItem = self.model[key];
            var modelValue = modelItem;

            if (modelItem && modelItem.hasOwnProperty('isObservable')) {
                _actionWhenItemIsObservable();
            }

            if (typeof modelValue === 'function') {
                modelValue = modelValue();
            }

            _applyDataToView();


            function _actionWhenItemIsObservable() {
                modelValue = modelItem.value;

                self.model[key] = function(param) {
                    if (param === undefined) {
                        return modelValue;
                    } else {
                        modelValue = param;
                        self.applyBindings(self.model);
                    }
                };

                self.model[key] = Object.setPrototypeOf(self.model[key], {
                    isObservable: true,
                    subscribe: function(cb) {
                        self.callbacks.push([cb, key]);
                    }
                });

                Object.assign(model, self.model);
            }

            function _applyDataToView() {
                self.observers[key].forEach(function(bindObj, i) {

                    if (bindObj.node === except) {
                        return;
                    }

                    switch (bindObj.type) {
                        case 'text':
                            bindObj.node.textContent = modelValue;
                            break;

                        case 'value':
                            bindObj.node.value = modelValue;

                            if (bindObj.event !== 'change') {
                                bindObj.event = 'change';

                                self.addListener(bindObj.type, key, i);
                            }
                            break;

                        default:
                            console.warn('No data type');

                            bindObj.node.textContent = modelValue;
                            break;
                    }
                });
            }
        });

        return this;
    };

    Sync.prototype.addListener = function(nodeType, observerKey, observerIndex) {
        var self = this;

        if (nodeType === 'value') {
            var node = self.observers[observerKey][observerIndex].node;
            var _inputOnChangeHandler = function(e) {
                var elem = e.srcElement;
                var currModel = {};

                currModel[observerKey] = elem.value;

                self.applyBindings(currModel, elem);
            };

            node.addEventListener('change', _inputOnChangeHandler);
        }
    };

    Sync.prototype._executeCallbacks = function() {
        var self = this;

        this.callbacks.forEach(function(cbArr) {
            var cb = cbArr[0];
            var key = cbArr[1];
            var value = self.model[key];

            cb(value);
        });
    };

    Sync.prototype.applyBindings = function(model, exclude) {
        this
            ._findBindNodes()
            ._parseBindNodesData()
            ._bindingHandlers(model, exclude)
            ._executeCallbacks();

        return this;
    };

    Sync.prototype.observable = function(value) {
        return {
            isObservable: true,
            value: value
        }
    };

    window.sync = new Sync();
})();
