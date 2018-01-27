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
var locations = [
  {index:0 ,title: 'Starbucks Coffee', location: {lat: 30.040973, lng: 31.475741}},
  {index:1 ,title: 'Cold Stone icecream', location: {lat: 30.040249, lng: 31.475451}},
  {index:2 ,title: 'Cafe Supreme River walk', location: {lat: 30.037899, lng: 31.475387}},
  {index:3 ,title: 'The Tap East', location: {lat: 30.045487, lng: 31.476148}},
  {index:4 ,title: 'Banque Misr', location: {lat: 30.042252, lng: 31.475343}},
  {index:5 ,title: 'National Bank of Egypt', location: {lat: 30.041997, lng: 31.475568}},
  {index:6 ,title: 'The Water Way', location: {lat: 30.041517, lng: 31.476905}},
  {index:7 ,title: 'The Mood cafe', location: {lat: 30.029554, lng: 31.496346}},
  {index:8 ,title: 'Cafe Supreme Maxim Mall', location: {lat: 30.029266, lng: 31.497097}},
  {index:9 ,title: 'spinneys', location: {lat: 30.029953, lng: 31.496904}},
  {index:10 ,title: 'Future University in Cairo (FUE)', location: {lat: 30.027231,lng: 31.491669}},
  {index:11 ,title: 'American University in Cairo (AUC)', location: {lat: 30.023942,lng: 31.497278}},
  {index:12 ,title: 'Dunkin Donuts Galeria Mall', location: {lat: 30.025047, lng: 31.489843}},
  {index:13 ,title: 'Golds GYM', location: {lat: 30.024991, lng: 31.483760}}
];

// initialize map
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    var styles = [
     {
       featureType: 'water',
       stylers: [
         { color: '#19a0d8' }
       ]
     },{
       featureType: 'administrative',
       elementType: 'labels.text.stroke',
       stylers: [
         { color: '#ffffff' },
         { weight: 6 }
       ]
     },{
       featureType: 'administrative',
       elementType: 'labels.text.fill',
       stylers: [
         { color: '#e85113' }
       ]
     },{
       featureType: 'road.highway',
       elementType: 'geometry.stroke',
       stylers: [
         { color: '#efe9e4' },
         { lightness: -40 }
       ]
     },{
       featureType: 'transit.station',
       stylers: [
         { weight: 9 },
         { hue: '#e85113' }
       ]
     },{
       featureType: 'road.highway',
       elementType: 'labels.icon',
       stylers: [
         { visibility: 'off' }
       ]
     },{
       featureType: 'water',
       elementType: 'labels.text.stroke',
       stylers: [
         { lightness: 100 }
       ]
     },{
       featureType: 'water',
       elementType: 'labels.text.fill',
       stylers: [
         { lightness: -100 }
       ]
     },{
       featureType: 'poi',
       elementType: 'geometry',
       stylers: [
         { visibility: 'on' },
         { color: '#f0e4d3' }
       ]
     },{
       featureType: 'road.highway',
       elementType: 'geometry.fill',
       stylers: [
         { color: '#efe9e4' },
         { lightness: -25 }
       ]
     }
    ];
    var style2 = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": "-1"
                },
                {
                    "visibility": "on"
                },
                {
                    "color": "#ec0000"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#b41616"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#a01010"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#be0e0e"
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#cccccc"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#123645"
                },
                {
                    "lightness": 17
                }
            ]
        }
    ];
    var style3 = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
        ];

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.042046, lng: 31.475387},
      zoom: 14 ,
      styles: style2,
      mapTypeControl: false
    });



    var largeInfowindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Initialize the drawing manager.
    var drawingManager = new google.maps.drawing.DrawingManager({
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
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
            });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {populateInfoWindow(this, largeInfowindow);});
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
            });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
            });
    }

    // function that toggles the markers view (show & hide)
    document.getElementById('map-btn').addEventListener('click',function(){
        if (bool_map_btn==1) {
            bool_map_btn=0;
            showListings();
        } else {
            bool_map_btn=1;
            hideListings();
        }
    });

    document.getElementById('toggle-drawing').addEventListener('click', function() {
    toggleDrawing(drawingManager);
    });
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

// opens infowindow abov marker
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
            var streetViewService = new google.maps.StreetViewService();
            var radius = 200;
            // In case the status is OK, which means the pano was found, compute the
            // position of the streetview image, then calculate the heading, then get a
            // panorama from that and set the options
            function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div><strong>' + marker.title + '<strong></div><div id="infowindow-pano"></div>');
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 20
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('infowindow-pano'), panoramaOptions);


            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
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

// shows a specific location on a map
function showList(loc){
    // Extend the boundaries of the map for each marker and display the marker
    markers[loc.index].setMap(map);
    map.setZoom(17);
    map.panTo(markers[loc.index].position);
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
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
function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (polygon !== null) {
          polygon.setMap(null);
        }
    } else {
    drawingManager.setMap(map);
    }
}

// This function hides all markers outside the polygon,
// and shows only the ones within it. This is so that the
// user can specify an exact area of search.
function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
          markers[i].setMap(map);
        } else {
          markers[i].setMap(null);
        }
    }
}

//function accepts a string to look through and a string to look for
function boldString(str, find){
    var re = new RegExp(find, 'g');
    return str.replace(re, '<b>'+find+'</b>');
}

// opens a window for a bigger panaorama.
function open_pano(loc){
    var marker = markers[loc.index]
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
            $(".pano-window").html("");
            $('.pano-window').append('<div class="pano-title"><strong>'
            + marker.title + '<strong></div><div id="mypano"></div>');
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
            $('.pano-window').append('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
    }
    // Use streetview service to get the closest streetview image within
    // 50 meters of the markers position
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

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
    self = this ;
    // toggling nav item hamburger
    self.toggle_nav_icon = function(){
        $('.nav-icon').toggleClass('active-nav-icon');
        $('.sidebar').toggleClass('active-side-bar');
        $('.page-content').toggleClass('active-side-bar');
    };

    self.toggle_map = function(){
        $('#map-btn').toggleClass('active-btn');
        $('#toggle-drawing').toggleClass('active-btn');
        // if (self.map_btn_txt() == btn_txt.hide_txt) {
        //     self.map_btn_txt(btn_txt.show_txt);
        // } else {
        //     self.map_btn_txt(btn_txt.hide_txt);
        // }
    };

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
                    showList(location);
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
    }

    // This function runs on clikc/enterkey when applied to location
    // From the List
    self.show_place = function(data,event){
        if(data.length === 0 ){
            console.log("nothing found")
        }
        else{
            $('.window-container').addClass('show-window');
            hideListings();
            showList(data);
            open_pano(data);
        }
    }

    self.close_window = function(){
        $('.window-container').removeClass('show-window');
    }
};

ko.applyBindings(new ViewModel());
