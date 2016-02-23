var map;
var directionDisplay;
var directionsService;


function init() {
  var mapOptions = {
    center: new google.maps.LatLng(-33.4071127,-70.6071702),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 11
  };
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);


  var input = /** @type {!HTMLInputElement} */(
    document.getElementById('pac-input'));
    var types = document.getElementById('type-selector');


    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }


      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setIcon(/** @type {google.maps.Icon} */({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';


      infowindow.setContent('<div><strong>' + place.name + '</strong><p>' + address+"<p> <div class='card-action'><a onClick='alert()'>Como llegar</a></div></div>");
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }


  };



  function getMyPosition()
  {
    var infoWindow = new google.maps.InfoWindow({map: map});


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };


  var getRouteToStore = function(latDestination, longDestination,latOrigin, longOrigin ) {

    if(latOrigin==0 || longOrigin==0)
    {

    }

    var request = {
      origin: new google.maps.LatLng('-33.5537001', '-70.631175'), // central or current position
      destination: new google.maps.LatLng(latitude, longitude),

      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var direction = '';
        for (var i = 0; i < route.legs[0].steps.length; i++) {
          direction += route.legs[0].steps[i].instructions + "<br />";
        };
        $('#directions').append(direction);
        $('#directions').removeClass('hide');
      };
    });

  };








  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    };
