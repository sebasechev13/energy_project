
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
      layers: [
      layers.Hyrdro,
      layers.Solar,
      layers.Wind,
      layers.Gas,
      layers.Other]
    });
    
     

    //add our street map to map
    light.addTo(myMap);
  //layer controls 
  var overlays = {
    "Hydro Plants": layers.Hyrdro,
    "Solar Plants": layers.Solar,
    "Wind Plants": layers.Wind,
    "Gas Plants": layers.Gas,
    "Other Plants": layers.Other
  };

      //add control for plants 
      L.control.layers(null, overlays).addTo(myMap);


    // Create a legend to display information about our map

    //creating the different icons for the markers. 

    var icons = {
      Hydro: L.icon({
        iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT_NM1aJr5h1HIb_ugVlsutTSLRuzefaFDxPw2xX2nCg2DzEVz",
        iconSize:[25,25]
       
      }),
      Solar: L.icon({
        iconUrl: "data:image/png;base64,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",
        iconSize:[25,25]
      }),
      Wind: L.icon({
        iconUrl: "https://cdn5.vectorstock.com/i/1000x1000/68/04/development-wind-turbine-icon-simple-style-vector-24756804.jpg",
        iconSize:[25,25]
      }),
      Gas: L.icon({
        iconUrl: "https://cdn4.vectorstock.com/i/1000x1000/50/23/natural-gas-plant-silhouette-icon-in-flat-style-vector-18115023.jpg",
        iconSize:[25,25]
      }),
      Other: L.icon ({
        iconUrl: "https://www.nicepng.com/png/detail/798-7984323_coal-power-plant-icon.png",
        iconSize:[25,25]
      })
    };





    
d3.csv('final.csv', function(err, data) {

  function fuel(primary_fuel) {
    if (primary_fuel =="Hydro") {
      return fuel_type = "Hydro";
    }
    // If a station has no bikes available, it's empty
    else if (primary_fuel == "Solar") {
      return fuel_type = "Solar";
    }
    // If a station is installed but isn't renting, it's out of order
    else if (primary_fuel == "Wind") {
      return fuel_type = "Wind";
    }
    // If a station has less than 5 bikes, it's status is low
    else if (primary_fuel == "Gas") {
      return fuel_type = "Gas";
    }
    // Otherwise the station is normal
    else {
      return fuel_type = "Other";
    }
  };
  data.forEach(plant =>{
    var fuel_type = fuel(plant.primary_fuel);
    var newmarker = L.marker([plant.latitude, plant.longitude],{
      icon:icons[fuel_type]});

      console.log(fuel_type + " Plants")
      console.log(icons[fuel_type])

     // console.log(overlays[fuel_type + " Plants"])
   newmarker.addTo(overlays[fuel_type + " Plants"]);
   
  

   newmarker.bindPopup("<h3><center>"+plant.name+"</center></h3><hr>Type: "+plant.primary_fuel+"<br>Capacity(MW):"+plant.capacity_mw+"<br>Estimated generation(GWH): "+plant.estimated_generation_gwh);

   //newmarker.addTo(myMap);
   
    });
    console.log(data)
  
  d3.csv('all_data.csv', function(err, data) {

  
    
    data.forEach(country =>{
      var marker2 = L.marker([country.latitude, country.longitude],{
        icon: greenIcon});
      
     
    
  
     marker2.bindPopup("<h3><center>"+country.country_long+" Energy Information</center></h3><hr>Estimated Generation(M TOE): "+country.estimated_generation_toe+"<br>Consumption(M TOE): "+country.consumption);
  
     marker2.addTo(myMap);
     
      });
    })})