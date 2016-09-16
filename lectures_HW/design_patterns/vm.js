(function() {
    'use strict';

    var myViewModel = {
        personName: sync.observable('Bob'),
        personAge: 123
    };

    sync.applyBindings(myViewModel);

    myViewModel.personName.subscribe(function(newValue) {
        alert("The person's new name is " + newValue);
    });

})();