
// Define streetmap and darkmap layers
  
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
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
  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


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
    light.addTo(myMap);
  //layer controls 
  var overlays = {
    "Hyrdro Plants": layers.Hyrdro,
    "Solar Plants": layers.Solar,
    "Wind Plants": layers.Wind,
    "Gas Plants": layers.Gas,
    "Other Plants": layers.Other
  };
    //creating the base maps of the different maps 
    //create an overlays object to add to the layer control
    //var overlays = {
     // "Earthquakes": earthquakes,
     // "Tectonicplates" : tectonicplates
   // };

    // Create a layer control
    //L.control.layers(null,overlays).addTo(myMap);

    // Create a legend to display information about our map

    var icons = {
      Hyrdro: L.icon({
        iconUrl: "hydro.png",
        iconSize:[50,50]
       
      }),
      Solar: L.icon({
        iconUrl: "solar.png",
        iconSize:[50,50]
      }),
      Wind: L.icon({
        iconUrl: "wind.png",
        iconSize:[50,50]
      }),
      Gas: L.icon({
        iconUrl: "gas.png",
        iconSize:[50,50]
      }),
      Other: {
        iconUrl: "other.png",
        iconSize:[50,50]
      }
    };





    
d3.csv('final.csv', function(err, data) {

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
  d3.csv('all_data.csv', function(err, data) {

  
    
    data.forEach(country =>{
      var marker2 = L.marker([country.latitude, country.longitude],{
        icon: greenIcon});
      
     
    
  
     marker2.bindPopup("Country:"+country.country_long+"<br>Estimated Generation(M TOE):"+country.estimated_generation_toe+"<br>Consumption(M TOE):"+country.consumption);
  
     marker2.addTo(myMap);
     
      });
      console.log(data)
    });