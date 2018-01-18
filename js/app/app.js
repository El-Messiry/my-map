


/*  ***************   View Model   *******************  */


// Here's my data model
function ViewModel() {
    self = this ;
    // toggling nav item hamburger
    self.toggle_nav_icon = function(){
        $('.nav-icon').toggleClass('active-nav-icon');
        $('.sidebar').toggleClass('active-side-bar');
        $('.page-content').toggleClass('active-side-bar');
    };

    var btn_txt = {
        show_txt : 'Show Places' ,
        hide_txt : 'Hide Places' ,
    };

    self.map_btn_txt = ko.observable(btn_txt.show_txt);


    self.toggle_map = function(){
        $('#map-btn').toggleClass('active-btn');
        if (self.map_btn_txt() == btn_txt.hide_txt) {
            self.map_btn_txt(btn_txt.show_txt);
        } else {
            self.map_btn_txt(btn_txt.hide_txt);
        }
    };


};

ko.applyBindings(new ViewModel());
