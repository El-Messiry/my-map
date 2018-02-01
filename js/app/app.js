/*
-please note that init map function and others have been copied from
 the repo of udacity lesson.

-I have modified it to match my code and applyied KnockoutJS allBindings.

-JQuery been used in ( toggleClass - addClass - removeClass ) only.

-Custome Bindings (enterkey) taken from Stackoverflow

-made a new info window to show a wider street view panorama

*/

var map;
var bool_map_btn = 0; // to toggle show/hide list

// Create a new blank array for all the listing markers.
var markers = [];
var polygon = null ;
var curr_iw ;
var drawingManager ;

// initialize map
function initMap() {
    // Constructor creates a new map - only center and zoom are required.

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.042046, lng: 31.475387},
      zoom: 14 ,
      styles: style2,
      mapTypeControl: false
    });



    var largeInfowindow = new google.maps.InfoWindow();
    curr_iw = largeInfowindow ;
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Initialize the drawing manager.
    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });



    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        /* jshint loopfunc: true */
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            lat:locations[i].location.lat,
            lng:locations[i].location.lng,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
            populateInfoWindow( this, largeInfowindow);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        marker.addListener('click', function(){
            startBounce(this);
            populateInfoWindow( this, largeInfowindow);
        });


    }

    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    drawingManager.addListener('overlaycomplete', function(event) {
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      if (polygon) {
        polygon.setMap(null);
        hideListings(markers);
      }
      // Switching the drawing mode to the HAND (i.e., no longer drawing).
      drawingManager.setDrawingMode(null);
      // Creating a new editable polygon from the overlay.
      polygon = event.overlay;
      polygon.setEditable(true);
      // Searching within the polygon.
      searchWithinPolygon();
      // Make sure the search is re-done if the poly is changed.
      polygon.getPath().addListener('set_at', searchWithinPolygon);
      polygon.getPath().addListener('insert_at', searchWithinPolygon);
      });

    showListings();
}

// Bounce animation
function startBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 5000);

}

// opens infowindow abov marker
function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.setContent('');
        infowindow.marker = marker;
        curr_iw = infowindow;

        // Foursquare API Client
        cID = "R2DSLODKF4EYXEPOCHXXMOQA3EN0PRIGCLR0M5YNVYHRIIH3";
        cSecret ="LI2VFLBWAIUFFXNKKEUHJK4GH0E4RSIOC0RQSRQ2FDCHFW54";
        // URL for Foursquare API
        var fs_url = 'https://api.foursquare.com/v2/venues/search?ll=' +
            marker.lat + ',' + marker.lng + '&client_id=' + cID +
            '&client_secret=' + cSecret + '&v=20171212&radius=50&query='+marker.title;

        $.getJSON(fs_url).done(function(marker) {
            console.log(marker);
            var response = marker.response.venues[0];
            var category = response.categories[0].name || 'Category not available';
            var street = response.location.formattedAddress[0] || 'Street not available';
            var city = response.location.formattedAddress[1] || 'City not available';
            var country = response.location.formattedAddress[3] || 'Country not available';

            var html_content ='<div class="fs-container">' +
            '<h3 class="infowindow-title">' + response.name + '</h3>'+
            '<div class="fs-info-container">' +
            '<h4> Category : '+ category + '</h4>' +
            '<h5 class="infowindow-address"> Address: </h5>' +
            '<p class="infowindow-address">' + street + '</p>' +
            '<p class="infowindow-address">' + city + '</p>' +
            '<p class="infowindow-address">' + country +
            '</p>' + '</div>' + '</div>';
            infowindow.setContent(html_content);
        }).fail(function() {
            // Send alert
            infowindow.setContent(
                "Error loading the Foursquare API"
            );
        });

        infowindow.open(map, marker);


        infowindow.addListener('closeclick', function() {
            infowindow.close();
        });

    }

}


// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// show all locations (setVisible)
function showAllLocations(){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setVisible(true);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// shows a specific location on a map
function showList(loc){
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (polygon !== null) {
          polygon.setMap(null);
        }
    }
    curr_iw.close();
    // Extend the boundaries of the map for each marker and display the marker
    markers[loc.index].setVisible(true);
    map.setZoom(17);
    map.panTo(markers[loc.index].position);
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setVisible(false);
    }
}

//fit map to bounds on search.
function fit_map(loc){
    if (loc.length <= 1) {
        showList(loc[0]);
    } else {
        var bounds = new google.maps.LatLngBounds();
        for (var i=0 ; i < loc.length ; i++) {
            markers[loc[i].index].setVisible(true);
            bounds.extend(markers[loc[i].index].getPosition());
        }
        map.fitBounds(bounds);
    }


}





// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
     'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
     '|40|_|%E2%80%A2',
     new google.maps.Size(21, 34),
     new google.maps.Point(0, 0),
     new google.maps.Point(10, 34),
     new google.maps.Size(21,34));
    return markerImage;
}

// This shows and hides (respectively) the drawing options.
function toggleDrawing() {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (polygon !== null) {
          polygon.setMap(null);
        }
    } else {
        hideListings();
        drawingManager.setMap(map);
    }
}

// This function hides all markers outside the polygon,
// and shows only the ones within it. This is so that the
// user can specify an exact area of search.
function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
          markers[i].setVisible(true);
        } else {
          markers[i].setVisible(false);
        }
    }
}

//function accepts a string to look through and a string to look for
function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}

//map error handlling function
function maperror(){
    var err_msg = "couldn't load map";
    $('#map').html('');
    $('#map').append(
        '<div class="maperror">'+
        '<strong>' + err_msg + '</strong>'+
        '</div>');
}




/*  *************** KO -> View Model   *******************  */
/********************************************************/



// enterkey custom binding.
ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

// ViewModel
function ViewModel() {
    var self = this ;
    // toggling nav item hamburger
    self.toggle_nav_icon = function(){
        $('.nav-icon').toggleClass('active-nav-icon');
        $('.sidebar').toggleClass('active-side-bar');
        $('.page-content').toggleClass('active-side-bar');
    };

    // toggleing places (show/hide).
    self.toggle_map = function(){
        $('#map-btn').toggleClass('active-btn');
        $('#toggle-drawing').toggleClass('active-btn');
        if (bool_map_btn==1) {
            bool_map_btn=0;
            showAllLocations();
        } else {
            bool_map_btn=1;
            hideListings();
        }
    };

    self.toggle_drawing = function() {
        toggleDrawing();
    };

    //store all locations in observable to have updated DOM
    self.mylocations = ko.observableArray(locations);

    // location text observable to receive user desired location
    self.location_txt = ko.observable("");

    // this function runs every time user presses a key
    // if user hit enter button it executes the desired locations
    // if location is missing a letter it wil show error
    self.search_listings = function(){
        hideListings();
        var result_locations = [];

        // loop through all the locations
        for(var i=0 ;i < locations.length ; i++){
            //store the input text & location in vars
            var inputText = self.location_txt();
            var location = locations[i] ;

            //check to see if input text match the location setEditable
            //have added toLowerCase() to make it Non case sensetive
            if(location.title.toLowerCase() == inputText.toLowerCase()){
                showList(location);
                result_locations = [] ; // remove all locations
                result_locations.push(location); // put only the requested loc
            }
            else{ // show the locations substrings from text input
                if(location.title.toLowerCase().includes(inputText.toLowerCase())){
                    result_locations.push(location); // append to result locations
                }
            }
        }

        // toggle class active & inactive
        // to hide "nothing matching your entery" missing
        // that shown when nothing match input text
        if(result_locations.length === 0){
            $('.no-location').addClass('active');
            $('.no-location').removeClass('inactive');
        }
        else{
            $('.no-location').removeClass('active');
            $('.no-location').addClass('inactive');
        }

        // check if empty inputText to display all available locations
        if(self.location_txt()==='' || self.location_txt().length === 0){
            self.mylocations(locations);
            showListings();
        }

        //Finally set mylocations observable with the new data.
        self.mylocations(result_locations);
        hideListings();
        fit_map(result_locations);
    };

    // empty observable Array of wiki links for DOM
    self.wiki_links = ko.observableArray([]);
    //AJAX request to wikipedia
    self.get_wikiArticles = function(data){
        // load wikipedia data
        var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + data.title + '&format=json&callback=wikiCallback';
        var wikiRequestTimeout = setTimeout(function(){
            self.wiki_links.removeAll();
            self.wiki_links.push("failed to get wikipedia resources");
        }, 4000);

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            jsonp: "callback",
            success: function( response ) {
                var articleList = response[1];
                self.wiki_links.removeAll();
                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    self.wiki_links.push('<li><a href="' + url + '">' + articleStr + '</a></li>');
                }

                if (articleList.length === 0){
                    self.wiki_links.removeAll();
                    self.wiki_links.push('<li>No results could be found</li>');
                }
                clearTimeout(wikiRequestTimeout);
            },
            error: function() {
                self.wiki_links.removeAll();
                self.wiki_links.push('<li>error while loading wiki Links</li>');
            },

        });
    };

    //my info window using observables.
    self.info_window = ko.observable("");

    // opens a window for a bigger panaorama.
    self.open_pano = function open_pano(loc){
        var marker = markers[loc.index];
        var streetViewService = new google.maps.StreetViewService();
        var radius = 200;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status){
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);

                self.info_window('<div class="pano-title"><strong>'+ marker.title + '<strong></div><div id="mypano"></div>');

                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 20
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('mypano'), panoramaOptions);
            } else {
                self.info_window('<div class="pano-title"><strong>'+ marker.title + '<strong></div>' +
                '<div id="mypano">No Street View Found</div>');
            }
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    };

    // This function runs on clikc/enterkey when applied to location
    // From the List
    self.show_place = function(data,event){
        if(data.length === 0 ){
            console.log("nothing found");
        }
        else{
            self.get_wikiArticles(data);
            self.open_pano(data);
            $('.window-container').addClass('show-window');
            hideListings();
            showList(data);
            startBounce(markers[data.index]);

        }
    };

    self.close_window = function(){
        $('.window-container').removeClass('show-window');
    };
}

ko.applyBindings(new ViewModel());
