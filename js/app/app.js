


/*  ***************   View Model   *******************  */


// Here's my data model
function ViewModel() {

    // toggling nav item hamburger
    this.toggle_nav_icon = function(){
        $('.nav-icon').toggleClass('active-nav-icon');
    }

    
};

ko.applyBindings(new ViewModel());
