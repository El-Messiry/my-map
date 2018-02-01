//available locations
var locations = [
  {index:0 ,title: 'Starbucks Coffee', location: {lat: 30.040973, lng: 31.475741}},
  {index:1 ,title: 'Cold Stone', location: {lat: 30.040249, lng: 31.475451}},
  {index:2 ,title: 'Cafe Supreme', location: {lat: 30.037899, lng: 31.475387}},
  {index:3 ,title: 'Banque Misr', location: {lat: 30.042252, lng: 31.475343}},
  {index:4 ,title: 'Cafe Supreme', location: {lat: 30.029266, lng: 31.497097}},
  {index:5 ,title: 'spinneys', location: {lat: 30.029953, lng: 31.496904}},
  {index:6 ,title: 'Dunkin Donuts', location: {lat: 30.025047, lng: 31.489843}},
  {index:7 ,title: 'Golds GYM', location: {lat: 30.024991, lng: 31.483760}}
];


// available styles .
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
