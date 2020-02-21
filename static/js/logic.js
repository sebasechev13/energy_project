// Create the tile layer that will be the background of our map
var queryUrl =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
// create api call to the eathrquak website  

// Define streetmap and darkmap layers
  
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.run-bike-hike",
      accessToken: API_KEY
    });
    var comic = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.high-contrast",
      accessToken: API_KEY
    });
    var satilite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets-satellite",
      accessToken: API_KEY
    });

  //define layers for energy plants 
  var layers = {
    Hyrdro: new L.LayerGroup(),
    Solar: new L.LayerGroup(),
    Wind: new L.LayerGroup(),
    Gas: new L.LayerGroup(),
    Other: new L.LayerGroup()
  };



  //add control for plants 


;
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -105.71
      ],
      zoom: 5,
      layers: [layers.Hyrdro,
      layers.Solar,
      layers.Wind,
      layers.Gas,
      layers.Other]
    });
    
      //add control for plants 
  L.control.layers(null, overlays).addTo(myMap);

    //add our street map to map
    comic.addTo(myMap);
  //layer controls 
  var overlays = {
    "Hyrdro Plants": layers.Hyrdro,
    "Solar Plants": layers.Solar,
    "Wind Plants": layers.Wind,
    "Gas Plants": layers.Gas,
    "Other Plants": layers.Other
  };
    //creating the base maps of the different maps 
    var baseMaps ={
      "Satellite" : satilite,
      "Comic": comic,
      "Light":light
    
    }
    //create an overlays object to add to the layer control
    //var overlays = {
     // "Earthquakes": earthquakes,
     // "Tectonicplates" : tectonicplates
   // };

    // Create a layer control
    //L.control.layers(null,overlays).addTo(myMap);
    L.control.layers(baseMaps).addTo(myMap);
    // Create a legend to display information about our map

    var icons = {
      Hyrdro: {
        iconUrl: "hydro.png",
        iconSize:[50,50]
       
      },
      Solar: {
        iconUrl: "solar.png",
        iconSize:[50,50]
      },
      Wind: {
        iconUrl: "wind.png",
        iconSize:[50,50]
      },
      Gas: {
        iconUrl: "gas.png",
        iconSize:[50,50]
      },
      Other: {
        iconUrl: "other.png",
        iconSize:[50,50]
      }
    };





    
d3.csv('power_plants_filtered.csv', function(err, data) {

  function fuel(primary_fuel) {
    if (primary_fuel ="Hydro") {
      fuel_type1 = "Hydro"
    }
    // If a station has no bikes available, it's empty
    else if (primary_fuel = "Solar") {
    stationStatusCode = "Solar";
    }
    // If a station is installed but isn't renting, it's out of order
    else if (primary_fuel = "Wind") {
      fuel_type1 = "Wind";
    }
    // If a station has less than 5 bikes, it's status is low
    else if (primary_fuel = "Gas") {
      fuel_type1 = "Gas";
    }
    // Otherwise the station is normal
    else {
      fuel_type1 = "Other";;
    }
    return fuel_type1;
  }
  data.forEach(plant =>{
    var fuel_type = fuel(plant.primary_fuel)
    var newmarker = L.marker([plant.latitude, plant.longitude]);//,//{
      //icon:icons[fuel_type]});

   //newmarker.addTo(layers[fuel_type]);
   
  

   newmarker.bindPopup("Name:"+plant.name+"<br>Type:"+plant.primary_fuel+"<br>Capacity(MW):"+plant.capacity_mw+"<br>Estimated generation(GWH)"+plant.estimated_generation_gwh);

   newmarker.addTo(myMap);
   
    });
    console.log(data)
  });
