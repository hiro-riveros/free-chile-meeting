
/*
===================
	DOCUMENT READY
===================
*/
$(function() {

	var products = 	{
		products: [
			{ productName: 'fruttare', quantity: 20, totalAmount: 7000 },
			{ productName: 'viennetta', quantity: 20, totalAmount: 14000 },
			{ productName: 'choco', quantity: 30, totalAmount: 10000 },
			{ productName: 'brigadeiro', quantity: 10, totalAmount: 5000 },
		]
	};

	$('.btn-add-order').click(function() {
		$('#btn-add-order-container').addClass('hide');
		$('#btn-send-order-container').removeClass('hide');
		var totalAmount = 0;
		$.each($('.product'), function(index, value) {
			if ($(value).val() !=='') {
				totalAmount += getProcductPrice($(value).val());
				$('#totalAmount').val('$ ' + totalAmount);
			};
		});		
	});

	$('.btn-send-order').click(function() {
		alert('total del pedido: ' +  $('#totalAmount').val() + ' se enviara un correo al dueño del local con el detalle de la orden.')
	});

	var getProcductPrice = function(product) {
		var price = 0;
		switch (product) {
			case 'fruttare':
				price = 7000;
			break;
			case 'viennetta':
				price = 14000;
			break;
			case 'choco':
				price = 10000;
			break;
			case 'brigadeiro':
				price = 5000;
			break;
			default: 
			alert('no tenemos disponible el producto agregado');
			break;
		};
		return price;
	};




});