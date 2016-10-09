const sync = require('./observer');

let myViewModel = {
    personName: sync.observable('Bob'),
    personAge: 123
};

sync.applyBindings(myViewModel);

myViewModel.personName.subscribe((newValue) => {
    alert("The person's new name is " + newValue);
});