var manageOrderTable;

function format ( d ) {
	var x;
 	$.ajax({
		url : 'php_action/fetchSelectedOrderItem.php',
		type: 'post',
		data: {id:d.order_id},					
		dataType: 'json',
		async:false,
		success:function(response) {
			console.log(response.length);
			var len = response.length;
			 x = response[0].order_item_id;
			console.log('order item id '+response[0].order_item_id);
			x = '<table cellpadding="5" class="table-active" cellspacing="0" border="0" style="padding-left:50px;">';
			x += '<thead>';
			x += '<tr class="table-warning">';
			x += '<th>#</th>';
			x += '	<th>Item Group</th>';
			x += '	<th>Item Subgroup</th>';
			x += '	<th>Item Name</th>';
			x += '	<th>Item Code</th>';
			x += '	<th>Qty</th>';
			x += '	<th>Comment</th>';
			x += '	<th>Delivery Date</th>';
			x += '</tr>';
			x += '</thead>';

			$.each(response, function(index,value){
				console.log(index + ":" + value);
				var imageUrl = response[index].product_image.substr(3);
				var ordersImage = '<img class="img-round" src="'+imageUrl+'" style="height:30px; width:50px;"  />';
				console.log(ordersImage);

			x += '<tr class="table-secondary">'+
				'<td>'+ordersImage+'</td>'+
				'<td>'+response[index].item_category_name+'</td>'+
				'<td>'+response[index].item_category_name+'</td>'+
				'<td>'+response[index].product_name+'</td>'+
				'<td>'+response[index].product_code+'</td>'+
				'<td>'+response[index].quantity+'</td>'+
				'<td>'+response[index].comment+'</td>'+
				'<td>'+response[index].delivery_date+'</td>'+
			'</tr>';
	});
	x += '</table>';
		}, // /success function
		error: function(jqXhr, textStatus, errorMessage) { // error callback 
			console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
		} // /error function
	}
	);
//	console.log('response_array: '+x);
	// `d` is the original data object for the row
	console.log('response_array:'+x);
	return x;
/* 	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
	'<tr>'+
		'<td>Full name:</td>'+
		'<td>'+d.order_id+'</td>'+
	'</tr>'+
	'<tr>'+
		'<td>Extension number:</td>'+
		'<td>'+d.extn+'</td>'+
	'</tr>'+
	'<tr>'+
		'<td>Extra info:</td>'+
		'<td>And any further details here (images etc)...</td>'+
	'</tr>'+
'</table>'; */

}

$(document).ready(function() {
//	alert(1)

	$("#paymentPlace").change(function(){
		if($("#paymentPlace").val() == 2)
		{
			$(".gst").text("IGST 18%");
		}
		else
		{
			$(".gst").text("GST 18%");	
		}
	});

	var divRequest = $(".div-request").text();

	// top nav bar 
	$("#navOrder").addClass('active');
    $('#navHome').removeClass('active');

	console.log(divRequest);
	if(divRequest == 'add')  {
	//	alert(2);
		// add order	
		// top nav child bar 
		$('#topNavAddOrder').addClass('active');	

		// order date picker
		//$("#orderDate").datepicker();

		// create order form function
		$("#createOrderForm").unbind('submit').bind('submit', function() {
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var venueType = $("#venueCode").val();
			var venueName = $("#venueName").val();
			var lsCategory = $("#lsc").val();
			var lsSubcat = $("#lssub").val();
			var lsName = $("#lsname").val();
			var lsCode = $("#lscode").val();

			// form validation 
			if(!venueType) {
				$("#venueCode").after('<p class="text-danger"> This field is required </p>');
				$('#venueCode').closest('.form-group').addClass('is-invalid');
			} else {
				$('#venueCode').closest('.form-group').addClass('has-success');
			} // /else

			if(!venueName) {
				$("#venueName").after('<p class="text-danger"> This field is required </p>');
				$('#venueName').closest('.form-group').addClass('has-error');
			} else {
				$('#venueName').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsCategory) {
				$("#lsc").after('<p class="text-danger"> This field is required </p>');
				$('#lsc').closest('.form-group').addClass('has-error');
			} else {
				$('#lsc').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsSubcat) {
				$("#lssub").after('<p class="text-danger"> This field is required </p>');
				$('#lssub').closest('.form-group').addClass('has-error');
			} else {
				$('#lssub').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsName) {
				$("#lsname").after('<p class="text-danger"> This field is required </p>');
				$('#lsname').closest('.form-group').addClass('has-error');
			} else {
				$('#lsname').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsCode) {
				$("#lscode").after('<p class="text-danger"> This field is required </p>');
				$('#lscode').closest('.form-group').addClass('has-error');
			} else {
				$('#lscode').closest('.form-group').addClass('has-success');
			} // /else

			// array validation

			var itemCat = document.getElementsByName('itemCat[]');				
			var validateItemCat;
			for (var x = 0; x < itemCat.length; x++) {       			
				var itemCatId = itemCat[x].id;
				console.log(itemCatId);
				console.log(itemCat.length);
				if(itemCat[x].value == ''){	    		    	
					$("#"+itemCatId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+itemCatId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemCatId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			   } // for
			   for (var x = 0; x < itemCat.length; x++) {       						
				if(itemCat[x].value){

					validateItemCat = true;
				} else {      	
					validateItemCat = false;
				}          
			} // for       		   	
			   
		   var itemSubat = document.getElementsByName('itemSubcat[]');				
		   var validateItemSubcat;
		   for (var x = 0; x < itemSubat.length; x++) {       			
			   	var itemSubatId = itemSubat[x].id;
			   	console.log(itemSubatId);
				if(itemSubat[x].value == ''){	    		    	
					$("#"+itemSubatId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+itemSubatId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemSubatId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for

			for (var x = 0; x < itemSubat.length; x++) {       						
				if(itemSubat[x].value){	    		    		    	
					validateItemSubcat = true;
				} else {      	
					validateItemSubcat = false;
				}          
			} // for       		   	
	   	
		   var itemName = document.getElementsByName('itemName[]');				
		   var validateItemName;
		   for (var x = 0; x < itemName.length; x++) {       			
			   	var itemNameId = itemName[x].id;
			   	console.log(itemNameId);
				if(itemName[x].value == ''){	    		    	
					$("#"+itemNameId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+itemNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for

			for (var x = 0; x < itemName.length; x++) {       						
				if(itemName[x].value){	    		    		    	
					validateItemName = true;
				} else {      	
					validateItemName = false;
				}          
			} // for 

			var comment = document.getElementsByName('comment[]');				
			var validateComment;
			for (var x = 0; x < comment.length; x++) {       			
				var commentId = comment[x].id;
				console.log(commentId);
				if(comment[x].value == ''){	    		    	
					$("#"+commentId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+commentId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+commentId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for
 
			 for (var x = 0; x < comment.length; x++) {       						
				if(comment[x].value){	    		    		    	
					validateComment = true;
				} else {      	
					validateComment = false;
				}          
			} // for 

			var deliveryDate = document.getElementsByName('deliveryDate[]');				
			var validatedeliveryDate;
			for (var x = 0; x < deliveryDate.length; x++) {       			
				var deliveryDateId = deliveryDate[x].id;
				console.log(deliveryDateId);
				if(deliveryDate[x].value == ''){	    		    	
					$("#"+deliveryDateId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+deliveryDateId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+deliveryDateId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for
 
			 for (var x = 0; x < deliveryDate.length; x++) {       						
				if(deliveryDate[x].value){	    		    		    	
					validatedeliveryDate = true;
				} else {      	
					validatedeliveryDate = false;
				}          
			} // for 


			var quantity = document.getElementsByName('quantity[]');		   	
			var validateQuantity;
			for (var x = 0; x < quantity.length; x++) {       
					var quantityId = quantity[x].id;
				if(quantity[x].value == ''){	    	
					$("#"+quantityId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+quantityId+"").closest('.form-group').addClass('has-error');	    		    		    	
			} else {      	
					$("#"+quantityId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
			} 
			}  // for

			for (var x = 0; x < quantity.length; x++) {       						
				if(quantity[x].value){	   
					console.log('Quantity: '+quantity[x].value) 		    		    	
					validateQuantity = true;
			} else {      	
					validateQuantity = false;
			}          
			} // for       	
	   	
			if(venueName && venueName && lsCategory && lsSubcat && lsName && lsCode) {
				if(validateItemCat == true && validateItemSubcat == true &&
					validateItemName == true && validateQuantity == true &&
					validateComment && validatedeliveryDate) {
					// create order button
					// $("#createOrderBtn").button('loading');
					console.log(form.serialize());
					console.log(form.attr('action'));
					console.log(form.attr('method'));
					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response.success);
							// reset button
							$("#createOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
								'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
								' <br /> <br /> <a type="button" onclick="printOrder('+response.order_id+')" class="btn btn-primary"> <i class="fa fa-print"></i> Print </a>'+
								'<a href="orders.php?o=add" class="btn btn-secondary" style="margin-left:10px;"> <i class="fa fa-plus"></i> Add New Order </a>'+
				   		       '</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".submitButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeProductRowBtn").addClass('div-hide');
							$("#addRow").hide();
								
							} else {
								alert(response.messages);								
							}
						}, // /success function
						error: function(jqXhr, textStatus, errorMessage) { // error callback 
							console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
						} // /error function // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			
			return false;
		}); // /create order form function	
	
	} else if(divRequest == 'manord') {
		// top nav child bar 
		$('#topNavManageOrder').addClass('active');

		table = $("#manageOrderTable").DataTable({
			'ajax': 'php_action/fetchOrder.php',
 			'columns': [
				{
					"className":      'details-control',
					"orderable":      false,
					"data":           null,
					"defaultContent": ''
				},
				{ "data": "orderDate" },
            	{ "data": "project_name" },
            	{ "data": "venue_code" },
            	{ "data": "venueName" },
            	{ "data": "logical_space_category" },
				{ "data": "logical_space_subcat" },
				{ "data": "logical_space_name"},
				{ "data": "logical_space_code"},
				{ "data": "active"},
				{ "data": "button"}
			],
			'order': []
		});		
		table.column( 3 ).data().unique();
		// Add event listener for opening and closing details
		$('#manageOrderTable tbody').on('click', 'td.details-control', function () {
			var tr = $(this).closest('tr');
			var row = table.row( tr );

			if ( row.child.isShown() ) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			}
			else {
				// Open this row
				console.log('before callng format');
				row.child( format(row.data()) ).show();
				tr.addClass('shown');
			}
		} );

	} else if(divRequest == 'editOrd') {
		//$("#orderDate").datepicker();

		// edit order form function
		$("#editOrderForm").unbind('submit').bind('submit', function() {
			// alert('ok');
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
/* 			var orderDate = $("#orderDate").val();
			var clientName = $("#clientName").val();
			var clientContact = $("#clientContact").val();
			var paid = $("#paid").val();
			var discount = $("#discount").val();
			var paymentType = $("#paymentType").val();
			var paymentStatus = $("#paymentStatus").val(); */		

			var venueType = $("#venueCode").val();
			var venueName = $("#venueName").val();
			var lsCategory = $("#lsc").val();
			var lsSubcat = $("#lssub").val();
			var lsName = $("#lsname").val();
			var lsCode = $("#lscode").val();			

			// form validation 
			if(!venueType) {
				$("#venueCode").after('<p class="text-danger"> This field is required </p>');
				$('#venueCode').closest('.form-group').addClass('has-error');
			} else {
				$('#venueCode').closest('.form-group').addClass('has-success');
			} // /else

			if(!venueName) {
				$("#venueName").after('<p class="text-danger"> This field is required </p>');
				$('#venueName').closest('.form-group').addClass('has-error');
			} else {
				$('#clientName').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsCategory) {
				$("#lsc").after('<p class="text-danger"> This field is required </p>');
				$('#lsc').closest('.form-group').addClass('has-error');
			} else {
				$('#lsc').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsSubcat) {
				$("#lssub").after('<p class="text-danger"> This field is required </p>');
				$('#lssub').closest('.form-group').addClass('has-error');
			} else {
				$('#lssub').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsName) {
				$("#lsname").after('<p class="text-danger"> This field is required </p>');
				$('#lsname').closest('.form-group').addClass('has-error');
			} else {
				$('#lsname').closest('.form-group').addClass('has-success');
			} // /else

			if(!lsCode) {
				$("#lscode").after('<p class="text-danger"> This field is required </p>');
				$('#lscode').closest('.form-group').addClass('has-error');
			} else {
				$('#lscode').closest('.form-group').addClass('has-success');
			} // /else

			// array validation

			var itemCat = document.getElementsByName('itemCat[]');				
			var validateItemCat;
			for (var x = 0; x < itemCat.length; x++) {       			
				var itemCatId = itemCat[x].id;
				console.log(itemCatId);
				console.log(itemCat.length);
				if(itemCat[x].value == ''){	    		    	
					$("#"+itemCatId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+itemCatId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemCatId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			   } // for
			   for (var x = 0; x < itemCat.length; x++) {       						
				if(itemCat[x].value){

					validateItemCat = true;
				} else {      	
					validateItemCat = false;
				}          
			} // for       		   	
			   
		   var itemSubat = document.getElementsByName('itemSubcat[]');				
		   var validateItemSubcat;
		   for (var x = 0; x < itemSubat.length; x++) {       			
			   	var itemSubatId = itemSubat[x].id;
			   	console.log(itemSubatId);
				if(itemSubat[x].value == ''){	    		    	
					$("#"+itemSubatId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+itemSubatId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemSubatId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for

			for (var x = 0; x < itemSubat.length; x++) {       						
				if(itemSubat[x].value){	    		    		    	
					validateItemSubcat = true;
				} else {      	
					validateItemSubcat = false;
				}          
			} // for       		   	
	   	
		   var itemName = document.getElementsByName('itemName[]');				
		   var validateItemName;
		   for (var x = 0; x < itemName.length; x++) {       			
			   	var itemNameId = itemName[x].id;
			   	console.log(itemNameId);
				if(itemName[x].value == ''){	    		    	
					$("#"+itemNameId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+itemNameId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+itemNameId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for

			for (var x = 0; x < itemName.length; x++) {       						
				if(itemName[x].value){	    		    		    	
					validateItemName = true;
				} else {      	
					validateItemName = false;
				}          
			} // for 

			var comment = document.getElementsByName('comment[]');				
			var validateComment;
			for (var x = 0; x < comment.length; x++) {       			
				var commentId = comment[x].id;
				console.log(commentId);
				if(comment[x].value == ''){	    		    	
					$("#"+commentId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+commentId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+commentId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for
 
			 for (var x = 0; x < comment.length; x++) {       						
				if(comment[x].value){	    		    		    	
					validateComment = true;
				} else {      	
					validateComment = false;
				}          
			} // for 

			var deliveryDate = document.getElementsByName('deliveryDate[]');				
			var validatedeliveryDate;
			for (var x = 0; x < deliveryDate.length; x++) {       			
				var deliveryDateId = deliveryDate[x].id;
				console.log(deliveryDateId);
				if(deliveryDate[x].value == ''){	    		    	
					$("#"+deliveryDateId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+deliveryDateId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+deliveryDateId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}          
			} // for
 
			 for (var x = 0; x < deliveryDate.length; x++) {       						
				if(deliveryDate[x].value){	    		    		    	
					validatedeliveryDate = true;
				} else {      	
					validatedeliveryDate = false;
				}          
			} // for 


			var quantity = document.getElementsByName('quantity[]');		   	
			var validateQuantity;
			for (var x = 0; x < quantity.length; x++) {       
					var quantityId = quantity[x].id;
				if(quantity[x].value == ''){	    	
					$("#"+quantityId+"").after('<p class="text-danger"> This Field is required </p>');
					$("#"+quantityId+"").closest('.form-group').addClass('has-error');	    		    		    	
				} else {      	
						$("#"+quantityId+"").closest('.form-group').addClass('has-success');	    		    		    		    	
				} 
			}  // for

			for (var x = 0; x < quantity.length; x++) {       						
				if(quantity[x].value){	   
					console.log('Quantity: '+quantity[x].value) 		    		    	
					validateQuantity = true;
				} else {      	
					validateQuantity = false;
				}          
			} // for       	

			if(venueType && venueName && lsCategory && lsSubcat && lsName && lsCode) {
				if(validateItemCat == true && validateItemSubcat == true &&
					validateItemName == true && validateQuantity == true &&
					validateComment && validatedeliveryDate) {
					// create order button
					// $("#createOrderBtn").button('loading');

					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						success:function(response) {
							console.log(response);
							// reset button
							$("#editOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
	            				'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            				'<strong><i class="fa fa-check"></i></strong> '+ response.messages +	            		            		            	
	   		       				'</div>');
								
							$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

							// disabled te modal footer button
							$(".editButtonFooter").addClass('div-hide');
							// remove the product row
							$(".removeProductRowBtn").addClass('div-hide');
								
							} else {
								alert(response.messages);								
							}
						}, // /success function
						error: function(jqXhr, textStatus, errorMessage) { // error callback 
							console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
						} // /error function // /response
					}); // /ajax
				} // if array validate is true
			} // /if field validate is true
			return false;
		}); // /edit order form function
	}
	
	$( "select[name='venuecode']" ).change(function () {
			console.log("venuecode selection");
			var lookupValue = $(this).val();
			var action = 'venue';	
			console.log("lookupValue: "+lookupValue);
			if(lookupValue) {
			console.log("inside lookupValue");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('select[name="venuename"]').empty();
						$('select[name="venuename"]').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							$('select[name="venuename"]').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('select[name="venuename"]').empty();
				$('select[name="venuename"]').append('<option value="0">~~SELECT~~</option>');
			}
		});

		$( "select[name='lssub']" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			var action = 'lssub';	
			//alert("lookupValue(lssub): "+lookupValue);
			if(lookupValue) {
			//alert("2");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('select[name="lsname"]').empty();
						$('select[name="lsname"]').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							$('select[name="lsname"]').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('select[name="lsname"]').empty();
				$('select[name="lscode"]').empty();
				$('select[name="lsname"]').append('<option value="0">~~SELECT~~</option>');
				$('select[name="lscode"]').append('<option value="0">~~SELECT~~</option>');
			}
		});

		$( "select[name='lsname']" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			var action = 'lsname';	
			//alert("lookupValue: "+lookupValue);
			if(lookupValue) {
			//alert("2");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('select[name="lscode"]').empty();
						//$('select[name="lscode"]').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							$('select[name="lscode"]').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('select[name="lscode"]').empty();
				$('select[name="lscode"]').append('<option value="0">~~SELECT~~</option>');
			}
		});

		$( "select[name='lsc']" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			var action = 'lsc';	
			//alert("lookupValue: "+lookupValue);
			if(lookupValue) {
		//	alert("2");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
		//				alert("3");
						$('select[name="lssub"]').empty();
						$('select[name="lssub"]').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							$('select[name="lssub"]').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('select[name="lssub"]').empty();
				$('select[name="lsname"]').empty();
				$('select[name="lscode"]').empty();
				$('select[name="lssub"]').append('<option value="0">~~SELECT~~</option>');
				$('select[name="lsname"]').append('<option value="0">~~SELECT~~</option>');
				$('select[name="lscode"]').append('<option value="0">~~SELECT~~</option>');
			}
		});
		
		$( ".item_category_i" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			var action = 'itemcat';	
//			alert("lookupValue: "+lookupValue);
			if(lookupValue) {
		//	alert("2");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert(data);
						$('.item_subcat_i').empty();
						$('.itemname_i').empty();
						$('.item_subcat_i').append('<option value="">~~SELECT~~</option>');
						$('.itemname_i').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							//console.log(key);
							$('.item_subcat_i').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('.item_subcat_i').empty();
				$('.itemname_i').empty();
				$('.item_subcat_i').append('<option value="0">~~SELECT~~</option>');
				$('.itemname_i').append('<option value="">~~SELECT~~</option>');
			}
		});		
		
		$( ".item_subcat_i" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			var action = 'itemsubcat';	
			//alert("lookupValue: "+lookupValue);
			if(lookupValue) {
		//	alert("2");	
				$.ajax({
					url: "php_action/selection.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert(data);
						$('.itemname_i').empty();
						$('.itemname_i').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							//console.log(key);
							$('.itemname_i').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('.itemname_i').empty();
				$('.itemname_i').append('<option value="0">~~SELECT~~</option>');
			}
		});
}); // /documernt


// print order function
function printOrder(orderId) {
	if(orderId) {		
			
		$.ajax({
			url: 'php_action/printOrder.php',
			type: 'post',
			data: {orderId: orderId},
			dataType: 'text',
			success:function(response) {
				
				var mywindow = window.open('', 'Stock Management System', 'height=400,width=600');
        mywindow.document.write('<html><head><title>Order Invoice</title>');        
        mywindow.document.write('</head><body>');
        mywindow.document.write(response);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10
        mywindow.resizeTo(screen.width, screen.height);
setTimeout(function() {
    mywindow.print();
    mywindow.close();
}, 1250);

        //mywindow.print();
        //mywindow.close();
				
			}// /success function
		}); // /ajax function to fetch the printable order
	} // /if orderId
} // /print order function

function addRow() {
	$("#addRowBtn").button("loading");

	var tableLength = $("#productTable tbody tr").length;

	var tableRow;
	var arrayNumber;
	var count;

	if(tableLength > 0) {		
		tableRow = $("#productTable tbody tr:last").attr('id');
		arrayNumber = $("#productTable tbody tr:last").attr('class');
		count = tableRow.substring(3);	
		count = Number(count) + 1;
		arrayNumber = Number(arrayNumber) + 1;					
	} else {
		// no table row
		count = 1;
		arrayNumber = 0;
	}

	$.ajax({
		url: 'php_action/fetchProductData.php',
		type: 'post',
		dataType: 'json',
		success:function(response) {
			$("#addRowBtn").button("reset");			

			var tr = '<tr id="row'+count+'" class="'+arrayNumber+'">'+			  				
				'<td>'+
					'<div class="form-group">'+

					'<select class="form-control" name="productName[]" id="productName'+count+'" onchange="getProductData('+count+')" >'+
						'<option value="">~~SELECT~~</option>';
						// console.log(response);
						$.each(response, function(index, value) {
							tr += '<option value="'+value[0]+'">'+value[1]+'</option>';							
						});
													
					tr += '</select>'+
					'</div>'+
				'</td>'+
				'<td style="padding-left:20px;"">'+
					'<input type="text" name="rate[]" id="rate'+count+'" autocomplete="off" disabled="true" class="form-control" />'+
					'<input type="hidden" name="rateValue[]" id="rateValue'+count+'" autocomplete="off" class="form-control" />'+
				'</td style="padding-left:20px;">'+
				'<td style="padding-left:20px;">'+
					'<div class="form-group">'+
					'<p id="available_quantity'+count+'"></p>'+
					'</div>'+
				'</td>'+
				'<td style="padding-left:20px;">'+
					'<div class="form-group">'+
					'<input type="number" name="quantity[]" id="quantity'+count+'" onkeyup="getTotal('+count+')" autocomplete="off" class="form-control" min="1" />'+
					'</div>'+
				'</td>'+
				'<td style="padding-left:20px;">'+
					'<input type="text" name="total[]" id="total'+count+'" autocomplete="off" class="form-control" disabled="true" />'+
					'<input type="hidden" name="totalValue[]" id="totalValue'+count+'" autocomplete="off" class="form-control" />'+
				'</td>'+
				'<td>'+
					'<button class="btn btn-default removeProductRowBtn" type="button" onclick="removeProductRow('+count+')"><i class="glyphicon glyphicon-trash"></i></button>'+
				'</td>'+
			'</tr>';
			if(tableLength > 0) {							
				$("#productTable tbody tr:last").after(tr);
			} else {				
				$("#productTable tbody").append(tr);
			}		

		} // /success
	});	// get the product data

} // /add row

function removeProductRow(row = null) {
	if(row) {
		$("#row"+row).remove();


		subAmount();
	} else {
		alert('error! Refresh the page again');
	}
}

// select on product data
function getProductData(row = null) {

	if(row) {
		var productId = $("#productName"+row).val();		
		
		if(productId == "") {
			$("#rate"+row).val("");

			$("#quantity"+row).val("");						
			$("#total"+row).val("");

			// remove check if product name is selected
			// var tableProductLength = $("#productTable tbody tr").length;			
			// for(x = 0; x < tableProductLength; x++) {
			// 	var tr = $("#productTable tbody tr")[x];
			// 	var count = $(tr).attr('id');
			// 	count = count.substring(3);

			// 	var productValue = $("#productName"+row).val()

			// 	if($("#productName"+count).val() == "") {					
			// 		$("#productName"+count).find("#changeProduct"+productId).removeClass('div-hide');	
			// 		console.log("#changeProduct"+count);
			// 	}											
			// } // /for

		} else {
			$.ajax({
				url: 'php_action/fetchSelectedProduct.php',
				type: 'post',
				data: {productId : productId},
				dataType: 'json',
				success:function(response) {
					// setting the rate value into the rate input field
					
					$("#rate"+row).val(response.rate);
					$("#rateValue"+row).val(response.rate);

					$("#quantity"+row).val(1);
					$("#available_quantity"+row).text(response.quantity);

					var total = Number(response.rate) * 1;
					total = total.toFixed(2);
					$("#total"+row).val(total);
					$("#totalValue"+row).val(total);
					
					// check if product name is selected
					// var tableProductLength = $("#productTable tbody tr").length;					
					// for(x = 0; x < tableProductLength; x++) {
					// 	var tr = $("#productTable tbody tr")[x];
					// 	var count = $(tr).attr('id');
					// 	count = count.substring(3);

					// 	var productValue = $("#productName"+row).val()

					// 	if($("#productName"+count).val() != productValue) {
					// 		// $("#productName"+count+" #changeProduct"+count).addClass('div-hide');	
					// 		$("#productName"+count).find("#changeProduct"+productId).addClass('div-hide');								
					// 		console.log("#changeProduct"+count);
					// 	}											
					// } // /for
			
					subAmount();
				} // /success
			}); // /ajax function to fetch the product data	
		}
				
	} else {
		alert('no row! please refresh the page');
	}
} // /select on product data

// table total
function getTotal(row = null) {
	if(row) {
		var total = Number($("#rate"+row).val()) * Number($("#quantity"+row).val());
		total = total.toFixed(2);
		$("#total"+row).val(total);
		$("#totalValue"+row).val(total);
		
		subAmount();

	} else {
		alert('no row !! please refresh the page');
	}
}

function subAmount() {
	var tableProductLength = $("#productTable tbody tr").length;
	var totalSubAmount = 0;
	for(x = 0; x < tableProductLength; x++) {
		var tr = $("#productTable tbody tr")[x];
		var count = $(tr).attr('id');
		count = count.substring(3);

		totalSubAmount = Number(totalSubAmount) + Number($("#total"+count).val());
	} // /for

	totalSubAmount = totalSubAmount.toFixed(2);

	// sub total
	$("#subTotal").val(totalSubAmount);
	$("#subTotalValue").val(totalSubAmount);

	// vat
	var vat = (Number($("#subTotal").val())/100) * 18;
	vat = vat.toFixed(2);
	$("#vat").val(vat);
	$("#vatValue").val(vat);

	// total amount
	var totalAmount = (Number($("#subTotal").val()) + Number($("#vat").val()));
	totalAmount = totalAmount.toFixed(2);
	$("#totalAmount").val(totalAmount);
	$("#totalAmountValue").val(totalAmount);

	var discount = $("#discount").val();
	if(discount) {
		var grandTotal = Number($("#totalAmount").val()) - Number(discount);
		grandTotal = grandTotal.toFixed(2);
		$("#grandTotal").val(grandTotal);
		$("#grandTotalValue").val(grandTotal);
	} else {
		$("#grandTotal").val(totalAmount);
		$("#grandTotalValue").val(totalAmount);
	} // /else discount	

	var paidAmount = $("#paid").val();
	if(paidAmount) {
		paidAmount =  Number($("#grandTotal").val()) - Number(paidAmount);
		paidAmount = paidAmount.toFixed(2);
		$("#due").val(paidAmount);
		$("#dueValue").val(paidAmount);
	} else {	
		$("#due").val($("#grandTotal").val());
		$("#dueValue").val($("#grandTotal").val());
	} // else

} // /sub total amount

function discountFunc() {
	var discount = $("#discount").val();
 	var totalAmount = Number($("#totalAmount").val());
 	totalAmount = totalAmount.toFixed(2);

 	var grandTotal;
 	if(totalAmount) { 	
 		grandTotal = Number($("#totalAmount").val()) - Number($("#discount").val());
 		grandTotal = grandTotal.toFixed(2);

 		$("#grandTotal").val(grandTotal);
 		$("#grandTotalValue").val(grandTotal);
 	} else {
 	}

 	var paid = $("#paid").val();

 	var dueAmount; 	
 	if(paid) {
 		dueAmount = Number($("#grandTotal").val()) - Number($("#paid").val());
 		dueAmount = dueAmount.toFixed(2);

 		$("#due").val(dueAmount);
 		$("#dueValue").val(dueAmount);
 	} else {
 		$("#due").val($("#grandTotal").val());
 		$("#dueValue").val($("#grandTotal").val());
 	}

} // /discount function

function paidAmount() {
	var grandTotal = $("#grandTotal").val();

	if(grandTotal) {
		var dueAmount = Number($("#grandTotal").val()) - Number($("#paid").val());
		dueAmount = dueAmount.toFixed(2);
		$("#due").val(dueAmount);
		$("#dueValue").val(dueAmount);
	} // /if
} // /paid amoutn function


function resetOrderForm() {
	// reset the input field
	$("#createOrderForm")[0].reset();
	// remove remove text danger
	$(".text-danger").remove();
	// remove form group error 
	$(".form-group").removeClass('has-success').removeClass('has-error');
} // /reset order form


// remove order from server
function removeOrder(orderId = null) {
	if(orderId) {
		alert(1);
		$("#removeOrderBtn").unbind('click').bind('click', function() {
			alert(2);
			$("#removeOrderBtn").button('loading');
alert(2.2);
			$.ajax({
				url: 'php_action/removeOrder.php',
				type: 'post',
				data: {orderId : orderId},
				dataType: 'json',
				success:function(response) {
					alert(3)
					$("#removeOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#removeOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert	          

					} else {
						// error messages
						$(".removeOrderMessages").html('<div class="alert alert-warning">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
	          '</div>');

						// remove the mesages
	          $(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});
						}); // /.alert	          
					} // /else

				} , // /success function
				error: function(jqXhr, textStatus, errorMessage) { // error callback 
					console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
				} // /error function 
			});  // /ajax function to remove the order

		}); // /remove order button clicked
		

	} else {
		alert('error! refresh the page again');
	}
}
// /remove order from server

// Payment ORDER
function paymentOrder(orderId = null) {
	if(orderId) {

		$("#orderDate").datepicker();

		$.ajax({
			url: 'php_action/fetchOrderData.php',
			type: 'post',
			data: {orderId: orderId},
			dataType: 'json',
			success:function(response) {				

				// due 
				$("#due").val(response.order[10]);				

				// pay amount 
				$("#payAmount").val(response.order[10]);

				var paidAmount = response.order[9] 
				var dueAmount = response.order[10];							
				var grandTotal = response.order[8];

				// update payment
				$("#updatePaymentOrderBtn").unbind('click').bind('click', function() {
					var payAmount = $("#payAmount").val();
					var paymentType = $("#paymentType").val();
					var paymentStatus = $("#paymentStatus").val();

					if(payAmount == "") {
						$("#payAmount").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#payAmount").closest('.form-group').addClass('has-error');
					} else {
						$("#payAmount").closest('.form-group').addClass('has-success');
					}

					if(paymentType == "") {
						$("#paymentType").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#paymentType").closest('.form-group').addClass('has-error');
					} else {
						$("#paymentType").closest('.form-group').addClass('has-success');
					}

					if(paymentStatus == "") {
						$("#paymentStatus").after('<p class="text-danger">The Pay Amount field is required</p>');
						$("#paymentStatus").closest('.form-group').addClass('has-error');
					} else {
						$("#paymentStatus").closest('.form-group').addClass('has-success');
					}

					if(payAmount && paymentType && paymentStatus) {
						$("#updatePaymentOrderBtn").button('loading');
						$.ajax({
							url: 'php_action/editPayment.php',
							type: 'post',
							data: {
								orderId: orderId,
								payAmount: payAmount,
								paymentType: paymentType,
								paymentStatus: paymentStatus,
								paidAmount: paidAmount,
								grandTotal: grandTotal
							},
							dataType: 'json',
							success:function(response) {
								$("#updatePaymentOrderBtn").button('loading');

								// remove error
								$('.text-danger').remove();
								$('.form-group').removeClass('has-error').removeClass('has-success');

								$("#paymentOrderModal").modal('hide');

								$("#success-messages").html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
			            '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
			          '</div>');

								// remove the mesages
			          $(".alert-success").delay(500).show(10, function() {
									$(this).delay(3000).hide(10, function() {
										$(this).remove();
									});
								}); // /.alert	

			          // refresh the manage order table
								manageOrderTable.ajax.reload(null, false);

							} //

						});
					} // /if
						
					return false;
				}); // /update payment			

			} // /success
		}); // fetch order data
	} else {
		alert('Error ! Refresh the page again');
	}
}
