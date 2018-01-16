


/*  ***************   View Model   *******************  */


// Here's my data model
function ViewModel() {

    // toggling nav item hamburger
    this.toggle_nav_icon = function(){
        $('.nav-icon').toggleClass('active-nav-icon');
        $('.sidebar').toggleClass('active-side-bar');
        $('.page-content').toggleClass('active-side-bar');
    }


};

ko.applyBindings(new ViewModel());
