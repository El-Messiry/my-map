


/*  ***************   View Model   *******************  */


// Here's my data model
function ViewModel() {

    this.firstName = ko.observable('ahmed');
    this.lastName = ko.observable('elmessiry');

    this.fullName = ko.pureComputed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);
};

ko.applyBindings(new ViewModel());
