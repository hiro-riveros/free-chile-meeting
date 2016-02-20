function initialize() {
    var mapOptions = {
            center: new google.maps.LatLng(-33.4071127,-70.6071702),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 11
          };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
};
