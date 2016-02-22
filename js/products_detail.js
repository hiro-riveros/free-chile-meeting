var products = [
  { productName: 'fruttare', quantity: 20, totalAmount: 7000, productCode:2345344 },
  { productName: 'viennetta', quantity: 20, totalAmount: 14000, productCode:2345344 },
  { productName: 'choco', quantity: 30, totalAmount: 10000, productCode:2345344 },
  { productName: 'brigadeiro', quantity: 10, totalAmount: 5000, productCode:2345344 },
  { productName: 'lollipop', quantity: 20, totalAmount: 7000, productCode:2345344 }]


  var loadProducts = function()
  {
     var table = '<table class="highlight center">'
     + '<tr>'
     + '<th >'
     + '<div class="input-field ">'
     + '    <input id="code_product" type="number" class="validate" style="height: 32px;">'
     + '    <label for="code_product">Codigo</label>'
      +'</div></th>'
      + '<th >'
      + '<div class="input-field ">'
      + '    <input id="name_product" type="text" class="validate" style="height: 32px;">'
      + '    <label for="name_product">Nombre</label>'
       +'</div></th>'
       + '<th >'
       + '<div class="input-field">'
       + '    <input id="product_quantity" type="number" class="validate" style="height: 32px;">'
       + '    <label for="product_quantity">Cantidad</label>'
        +'</div></th>'
     + '<th >'
     + '<div class="input-field ">'
     + '    <input id="product_price" type="number" class="validate" style="height: 32px;">'
     + '    <label for="product_price">Precio</label>'
      +'</div></th>'
     +'</tr>'
    $.each(products, function(index, product) {
      var info='';
        info = '<tr>'
      +	'	<td class="center">'+ product.productCode + '</td>'
      +	'	<td class="center">'+ product.productName + '</td>'
      +	'	<td class="center">'+ product.quantity +    '</td>'
      +	'	<td class="center">'+ product.totalAmount + '</td>'
      + ' </tr>'
      table += info;

    });
    table + "</table>"

    $('#products-container').append("<div>"+table+"<div>");

  }



  function myFunction() {

  }
