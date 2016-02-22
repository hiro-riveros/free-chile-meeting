
/*
======================
	MAP DEFINITION
======================
*/
var map;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();


function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
		center: new google.maps.LatLng(-33.4071127,-70.6071702),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 11
	};  
	map = new google.maps.Map(document.getElementById("map"), mapOptions);
	directionsDisplay.setMap(map);
};

$('.button-collapse').sideNav('show');
$('.button-collapse').sideNav('hide');
$(document).ready(function(){

	var orders = [
	{
		id: 1,
		customerId: 1,
		customerName: 'Bazar uno',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4622355, longitude: -70.7033767 }
	},	{
		id: 2,
		customerId: 2,
		customerName: 'Bazar dos',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4621815, longitude: -70.7024537 }
	},	{
		id: 3,
		customerId: 3,
		customerName: 'Bazar tres',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4620385, longitude: -70.7043417 }
	},	{
		id: 4,
		customerId: 1,
		customerName: 'Bazar cuatro',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4619485, longitude: -70.7052107 }
	},	{
		id: 5,
		customerId: 2,
		customerName: 'Bazar cinco',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4639805, longitude: -70.7071097 }
	},	{
		id: 6,
		customerId: 3,
		customerName: 'Bazar seis',
		products: [
		{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
		{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
		{ productName: 'choco', quantity: 30, totalAmount: 10000 },
		{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		],
		coords: { latitude: -33.4627185, longitude: -70.7074857 }
	}];

	var loadOrders = function() {

		$.each(orders, function(index, order) {
			var products = '';
			products =  '<table class="highlight">'
			+	'	<tr>'
			+	'		<th data-field="products">producto</th>'
			+	'		<th data-field="quantity">cantidad</th>'
			+	'		<th data-field="total">total</th>'
			+ ' </tr>'
			$.each(order.products, function(index, product) {
				products += '<tr>'
				+	'	<td>'+ product.productName + '</td>'
				+	'	<td>'+ product.quantity + '</td>'
				+	'	<td>'+ product.totalAmount + '</td>'
				+ '</tr>';
			});
			products +=	'</table>';

			$('#custom-container').append('<div class="card">'
				+ 	'<div class="card-image waves-effect waves-block waves-light">'
				+ 	'</div>'
				+ 	'<div class="card-content">'
				+			'<span class="card-title activator grey-text text-darken-4">' + order.customerName + '<i class="material-icons right">more_vert</i></span>'
				+		'	<p class="text-left">coordenadas: <br />'
				+ 	'&nbsp;&nbsp;latitud: ' + order.coords.latitude + ', longitud ' + order.coords.longitude + '</p>'
				+		'&nbsp;&nbsp;<a href="#" class="btn-route" data-latitude="' + order.coords.latitude + '" data-longitude="' + order.coords.longitude + '">ver ruta</a>'
				+ 	'</div>'
				+ 	'<div class="card-reveal">'
				+			'<span class="card-title grey-text text-darken-4">' + order.customerName + '<i class="material-icons right">close</i></span>'
				+			products
				+ 	'</div>'
				+ '</div>'
				);
		});
	};
	loadOrders();

	$('.btn-route').click(function() {
		if ($(this).data('latitude') != '' && $(this).data('longitude') != '') {
			$('#directions').addClass('hide');
			$('#directions').empty();
			getRouteToStore($(this).data('latitude'), $(this).data('longitude'));
		} else {
			alert('no se han ingresado las coordenadas');
		};
	});

	var getRouteToStore = function(latitude, longitude) {
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

});
