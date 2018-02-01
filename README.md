# My Neighbourhood Map

<br>

### Description:
This is Udacity 5th project of the Full Stack Web development Nano degree.
creating a map displaying places in my area and providing street view imagery through google's APIs.
also using **Knockout** *JavaScript* framework and adding data bindings to manipulate the DOM.
and finally using some 3rd party API using **`(AJAX`**/**`getJSON`**)

<hr>

### Features:
- Responsive design 
- search feature non-case sensetive 
- search while typing
- streetview panorama if exists
- added Custom binding `enterkey` for search box
- Foursquare data regarding location if  exist
- wikipedia articles related to location if exist


<hr>

### Contents:

- **`index.html`** contains HTML elements 
- **`markers.js`** contains all the markers & styles of the map
- **`app.js`** contains all the scripts needed for the app to run
- **`libs/Jquery`** Jquery library used by app.js
- **`libs/KnockoutJS`** Knockout library used by app.js
- **`imgs/`** contains the .png icons
- **`css`** contains all the CSS stylings for the app


<hr>

### Usage :
- First get the location's Lat/Lng coordinates from google maps
		use this [link](https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en) to get the lat/lng you want.
		
- in **`app.js`** please provide your list of locations
	ex: 
		
		var locations = [
		  {index:0 ,title: 'Starbucks Coffee', location: {lat: 30.040973, lng: 31.475741}},
		  {index:1 ,title: 'Cold Stone icecream', location: {lat: 30.040249, lng: 31.475451}},
		  {index:2 ,title: 'Cafe Supreme River walk', location: {lat: 30.037899, lng: 31.475387}}
		  ];


- Now launch index.html in your browser and enjoy.


 - open the hamburger menu and select what ever you want.
 - in the search box you can type and substring  and options gets narrowed automatically 
 - on click the Panoramic view will pop up a window feel free to have a look along with related Wikipedia articles
 - exit window then the location on map is displayed.
 - location will be displayed , on click info window appears with data from Foursquare API showing the ( category - street - city - country )