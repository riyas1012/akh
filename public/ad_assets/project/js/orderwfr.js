var manageOrderTable;

function format ( d, u ) {
	var x;
	console.log('d usr: '+d.username);
	console.log('d orderItemId: '+d.orderItemId);
	console.log('d orderId: '+d.orderId);
	console.log('dord: '+d);
	$.each(d, function(index, value){
		console.log(d[index]);
	});
	var id;
	// get which reproting category

	if(u == 'Planner'){
		id = d.orderId;
		action = 'planner';
	}else {
		id = d.orderItemId;
		action = 'other';
	}
	console.log('user type: '+u);
	console.log('id: '+id);
	console.log('action: '+action);
 	$.ajax({
		url : 'php_action/fetchSelectedWfrItem.php',
		type: 'post',
		data: {id:id, action:action},					
		dataType: 'json',
		async:false,
		success:function(response) {
			//console.log(response.length);
			var len = response.length;
/* 			$.each(response, function(index,value){
				console.log(response[index]);
			}); */
			//console.log('this is a test'+response);
			// x = response[0].order_item_id;
			//console.log('order item id '+response[0].order_item_id);
			x = '<table cellpadding="5" class="table-active" cellspacing="0" border="0" style="padding-left:50px;">';
			x += '<thead>';
			x += '<tr class="table-warning">';
			x += '<th>#</th>';
			x += '	<th>#</th>';
			x += '	<th>Workforce Type</th>';
			x += '	<th>Job Level</th>';
			x += '	<th>Job Title</th>';
			x += '	<th>Qty</th>';
			x += '	<th>Comment</th>';
		//	x += '	<th>Delivery Date</th>';
			x += '	<th></th>';
			x += '	<th>more</th>';
			x += '</tr>';
			x += '</thead>';

			$.each(response, function(index,value){
				//console.log(index + ":" + value);
				var imagName = response[index].product_image;
				if (imagName){
					var imageUrl = imagName.substr(3);
					if (!imageUrl)
						imageUrl = 'assets/images/stock/no_image.png';
					var ordersImage = '<img class="img-round" src="'+imageUrl+'" style="height:30px; width:50px;"  />';
				} else {
					ordersImage = imagName;
				}
				//console.log(ordersImage);
				var showMore='';
				console.log('reporting name: '+response[index].reporting_name)
				if (response[index].reporting_name == 'OVL'){
					console.log('inside ovl if');
					showMore = '<a class="dropdown-item more-info" data-toggle="modal" '+
								' id="overlayShowAttributesBtn" data-target="#overlayShowAttributesModal" '+
								' onclick="ovlMoreInfoDisplay('+response[index].item_subcat_id+','+response[index].order_item_id+')"'+
								' data-toggle="tooltip" data-placement="top" title="Click for more information">'+
								' <i	class="fa fa-ellipsis-h fa-2x"></i></a>';
				}
				else if (response[index].reporting_name == 'PWR'){
					console.log('inside pwr if');
					showMore = '<a class="dropdown-item more-info" data-toggle="modal" '+
					' id="overlayShowAttributesBtn" data-target="#overlayShowAttributesModal" '+
					' onclick="pwrMoreInfoDisplay('+response[index].order_item_id+')"'+
					' data-toggle="tooltip" data-placement="top" title="Click for more information">'+
					' <i	class="fa fa-ellipsis-h fa-2x"></i></a>';

				} else {
					console.log('inside other if');
					showMore ='';
				}
				var active='';
				if (response[index].item_order_status == 0)
					active = "<label class='badge badge-warning'><i class='fa fa-spinner'></i> </label>";
				else if (response[index].item_order_status == 1)
					active = "<label class='badge badge-success'><i class='fa fa-check'></i> </label>";
				else if (response[index].item_order_status == 2)
					active = "<label class='badge badge-danger'><i class='fa fa-times'></i> </label>";
				else if (response[index].item_order_status == 3)
					active = "<label class='badge badge-dark'><i class='fa fa-times'></i> </label>";
			x += '<tr class="table-secondary">'+
				'<td>'+ordersImage+'</td>'+
				'<td>'+response[index].order_item_id+'</td>'+
				'<td>'+response[index].item_category_name+'</td>'+
				'<td>'+response[index].item_subcat_name+'</td>'+				
				'<td>'+response[index].product_id+'</td>'+
				'<td>'+response[index].quantity+'</td>'+
				'<td>'+response[index].comment+'</td>'+
				//'<td>'+response[index].delivery_date+'</td>'+
				'<td>'+active+'</td>'+
				'<td>'+showMore+'</td>'+
			'</tr>';
			});
	x += '</table>';

	x+= "<!-- lets try a modal here -->"+
	"<div class='modal fade'"+
		"id='overlayShowAttributesModal' tabindex='-1'"+
		"role='dialog'>"+
		"<div class='modal-dialog'>"+
			"<div class='modal-content'>"+
				"<div class='modal-header alert-warning'>"+
					"<h4 class='modal-title'><i class='fa fa-edit'></i> More information</h4>"+
					"<button type='button' class='close' data-dismiss='modal'"+
						"aria-label='Close'>"+
						"<spanaria-hidden='true'>&times;</span>"+
					"</button>"+
				"</div>"+
				"<div class='modal-body' style='max-height:450px; overflow:auto;'>"+
					"<div class='div-result' id='div-overlay-info-result'>"+
						"<div id='edit-user-messages'>"+
						"</div>"+
						"<!-- all these hidden items is a must -->"+
						"<!-- footer ******************** -->"+
						"<div class='modal-footer editUserFooter'><button type='button'"+
								"class='btn btn-info' data-dismiss='modal'"+
								"data-loading-text='Loading...'> <i"+
									"class='fa fa-check'></i>OK</button>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div> <!-- /modal-content -->"+
		"</div> <!-- /modal-dailog -->"+
	"</div> <!-- /power more info -->";



		}, // /success function
		error: function(jqXhr, textStatus, errorMessage) { // error callback 
			console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
		} // /error function
	}
	);
//	console.log('response_array: '+x);
	// `d` is the original data object for the row
	//console.log('response_array:'+x);
	return x;

} // end format


function updateDataTableSelectAllCtrl(table) {
    var $table = table.table().node();
    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
    var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

    // If none of the checkboxes are checked
    if ($chkbox_checked.length === 0) {
        chkbox_select_all.checked = false;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If all of the checkboxes are checked
    } else if ($chkbox_checked.length === $chkbox_all.length) {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = false;
        }

        // If some of the checkboxes are checked
    } else {
        chkbox_select_all.checked = true;
        if ('indeterminate' in chkbox_select_all) {
            chkbox_select_all.indeterminate = true;
        }
    }
}

$(document).ready(function() {
	console.log('start of orderwfr js');

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
	var divUserType = $(".div-usertype").text();
	var orderStatus = $(".div-orderstatus").text();
	
	
	console.log('orderStatus: '+orderStatus);
	console.log('divUserType: '+divUserType);

	// top nav bar 
	$("#navOrder").addClass('active');
    $('#navHome').removeClass('active');

	console.log("divRequest: "+divRequest);
	console.log(divUserType);
	if(divRequest == 'add')  {
		// add order	
		// top nav child bar 
		$('#topNavAddOrder').addClass('active');
		var eventId = $('#eventId').val();
		console.log('eventId: '+eventId);

		if (!eventId){
			$(".submitButtonFooter").addClass('div-hide');
			$("#addRow").hide();
			$(".success-messages").html('<div class="alert alert-warning">'+
								'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> Event is not set'+
								'<a href="eventu.php" class="btn btn-warning" style="margin-left:10px;"> <i class="fa fa-plus"></i> Set Event</a>'+
				   		       '</div>');
		}

		// order date picker
		//$("#orderDate").datepicker();

		// create order form function
		$("#createWfrForm").unbind('submit').bind('submit', function() {
			console.log('inside submit.....');
			//alert (1);
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var venueType = $("#venueCode").val();
			var venueName = $("#venueName").val();
/* 			var lsCategory = $("#lsc").val();
			var lsSubcat = $("#lssub").val();
			var lsName = $("#lsname").val();
			var lsCode = $("#lscode").val(); */
			var siteName = $('#siteName').val();

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

			if(!siteName) {
				$("#siteName").after('<p class="text-danger"> This field is required </p>');
				$('#siteName').closest('.form-group').addClass('has-error');
			} else {
				$('#siteName').closest('.form-group').addClass('has-success');
			} // /else

			// array validation

			var itemCat = document.getElementsByName('itemCat[]');				
			var validateItemCat;
			for (var x = 0; x < itemCat.length; x++) {       			
				var itemCatId = itemCat[x].id;
				console.log('itemCatId: '+itemCatId);
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
			   	console.log('itemNameId: '+itemNameId);
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
/* 				if(comment[x].value == ''){	    		    	
					$("#"+commentId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+commentId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+commentId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}  */         
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

			var newOrderId;
			// siteName removed for phase one.
			if(venueName && venueName && siteName) {
				if(validateItemCat == true && validateItemSubcat == true &&
					validateItemName == true && validateQuantity == true ) {
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
						beforeSend:function(){
							return confirm("Are you sure you want to save your request?");
						 },
						success:function(response) {
							console.log('inside sucees ajax');
							console.log(response.success);
							console.log(response.orderid);
							console.log('progress 1');
							// reset button
							$("#createOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								console.log('inside response success true');
								newOrderId = response.orderid;
								console.log('progress 2');
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
								'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
								' <br /> <br /> '+
								'<a href="orders.php?o=add" class="btn btn-secondary" style="margin-left:10px;"> <i class="fa fa-plus"></i> Add New Order </a>'+
				   		       '</div>');
								
								$('#requestNumberDiv').removeClass('div-hide');
								$('#requestNumber').html('<b>Request Number: '+newOrderId);
								$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

								// disabled te modal footer button
								$(".submitButtonFooter").addClass('div-hide');
								// remove the product row
								$(".removeProductRowBtn").addClass('div-hide');
								$("#addRow").hide();
								$('#mainAddCard').addClass('div-hide');


								//sending email
								console.log('newOrderId: '+newOrderId);
								$.ajax({
									url: "php_action/sendEmail.php",
									type: "post",
									dataType: "json",
									data: {'id':newOrderId, action: 'Category Manager'},
									dataType: 'json',
									success:function(response) {
										console.log(response.emailSuccess);
										// reset button
										$("#createOrderBtn").button('reset');
										
										$(".text-danger").remove();
										$('.form-group').removeClass('has-error').removeClass('has-success');
			
										if(response.emailSuccess == true) {
											console.log('success email ajax');
											console.log(response.emailMessages);
										} else {
											alert(response.emailMessages);								
										}
									}, // /success function
									error: function(jqXhr, textStatus, errorMessage) { // error callback 
										console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
									} // /error function // /response
								}); // /ajax

								// zend an email to the planner
								console.log('newOrderId: '+newOrderId);
								$.ajax({
									url: "php_action/sendEmail.php",
									type: "post",
									dataType: "json",
									data: {'id':newOrderId, action: 'Planner'},
									dataType: 'json',
									success:function(response) {
										console.log(response.emailSuccess);
										// reset button
										$("#createOrderBtn").button('reset');
										
										$(".text-danger").remove();
										$('.form-group').removeClass('has-error').removeClass('has-success');
			
										if(response.emailSuccess == true) {
											console.log('success email ajax');
											console.log(response.emailMessages);
										} else {
											alert(response.emailMessages);								
										}
									}, // /success function
									error: function(jqXhr, textStatus, errorMessage) { // error callback 
										console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
									} // /error function // /response
								}); // /ajax

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

	} else if(divRequest == 'copy') {
		// add order	
		// top nav child bar 
		$('#topNavAddOrder').addClass('active');
		var eventId = $('#eventId').val();
		console.log('eventId: '+eventId);

		if (!eventId){
			$(".submitButtonFooter").addClass('div-hide');
			$("#addRow").hide();
			$(".success-messages").html('<div class="alert alert-warning">'+
								'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> Event is not set'+
								'<a href="eventu.php" class="btn btn-warning" style="margin-left:10px;"> <i class="fa fa-plus"></i> Set Event</a>'+
				   		       '</div>');
		}

		// order date picker
		//$("#orderDate").datepicker();

		// create order form function
		$("#copyOrderForm").unbind('submit').bind('submit', function() {
			console.log('inside submit.....');
			//alert (2);
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
				
			var venueType = $("#venueCode").val();
			var venueName = $("#venueName").val();
			//var lsCategory = $("#lsc").val();
			//var lsSubcat = $("#lssub").val();
			//var lsName = $("#lsname").val();
			//var lsCode = $("#lscode").val();
			var siteName = $('#siteName').val();

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

			if(!siteName) {
				$("#siteName").after('<p class="text-danger"> This field is required </p>');
				$('#siteName').closest('.form-group').addClass('has-error');
			} else {
				$('#siteName').closest('.form-group').addClass('has-success');
			} // /else

			// array validation

			var itemCat = document.getElementsByName('itemCat[]');				
			var validateItemCat;
			for (var x = 0; x < itemCat.length; x++) {       			
				var itemCatId = itemCat[x].id;
				console.log('itemCatId: '+itemCatId);
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
			   	console.log('itemNameId: '+itemNameId);
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
/* 				if(comment[x].value == ''){	    		    	
					$("#"+commentId+"").after('<p class="text-danger"> This field is required </p>');
					$("#"+commentId+"").closest('.form-group').addClass('has-error');	    		    	    	
				} else {      	
					$("#"+commentId+"").closest('.form-group').addClass('has-success');	    		    		    	
				}  */         
			} // for
 
/* 			 for (var x = 0; x < comment.length; x++) {       						
				if(comment[x].value){	    		    		    	
					validateComment = true;
				} else {      	
					validateComment = false;
				}          
			} // for  */

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

			var newOrderId;
			// siteName removed for phase one.
			if(venueName && venueName && siteName) {
				if(validateItemCat == true && validateItemSubcat == true &&
					validateItemName == true && validateQuantity == true ) {
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
						beforeSend:function(){
							return confirm("Are you sure you want to save your request?");
						 },
						success:function(response) {
							console.log('inside sucees ajax');
							console.log(response.success);
							console.log(response.orderid);
							console.log('progress 1');
							// reset button
							$("#createOrderBtn").button('reset');
							
							$(".text-danger").remove();
							$('.form-group').removeClass('has-error').removeClass('has-success');

							if(response.success == true) {
								console.log('inside response success true');
								newOrderId = response.orderid;
								console.log('progress 2');
								
								// create order button
								$(".success-messages").html('<div class="alert alert-success">'+
								'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
								'<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
								' <br /> <br /> '+
								'<a href="orders.php?o=add" class="btn btn-secondary" style="margin-left:10px;"> <i class="fa fa-plus"></i> Add New Order </a>'+
				   		       '</div>');
								
								$('#requestNumberDiv').removeClass('div-hide');
								$('#requestNumber').html('<b>Request Number: '+newOrderId);

								$("html, body, div.panel, div.pane-body").animate({scrollTop: '0px'}, 100);

								// disabled te modal footer button
								$(".copyButtonFooter").addClass('div-hide');
								// remove the product row
								$(".removeProductRowBtn").addClass('div-hide');
								$('.remove').hide();
								$('#mainCopyCard').addClass('div-hide');
								$("#addRow").hide();

								//sending email
								console.log('newOrderId: '+newOrderId);
								$.ajax({
									url: "php_action/sendEmail.php",
									type: "post",
									dataType: "json",
									data: {'id':newOrderId, action: 'Category Manager'},
									dataType: 'json',
									success:function(response) {
										console.log(response.emailSuccess);
										// reset button
										$("#createOrderBtn").button('reset');
										
										$(".text-danger").remove();
										$('.form-group').removeClass('has-error').removeClass('has-success');
			
										if(response.emailSuccess == true) {
											console.log('success email ajax');
											console.log(response.emailMessages);
										} else {
											alert(response.emailMessages);								
										}
									}, // /success function
									error: function(jqXhr, textStatus, errorMessage) { // error callback 
										console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
									} // /error function // /response
								}); // /ajax
								
								// zend an email to the planner
								console.log('newOrderId: '+newOrderId);
								$.ajax({
									url: "php_action/sendEmail.php",
									type: "post",
									dataType: "json",
									data: {'id':newOrderId, action: 'Planner'},
									dataType: 'json',
									success:function(response) {
										console.log(response.emailSuccess);
										// reset button
										$("#createOrderBtn").button('reset');
										
										$(".text-danger").remove();
										$('.form-group').removeClass('has-error').removeClass('has-success');
			
										if(response.emailSuccess == true) {
											console.log('success email ajax');
											console.log(response.emailMessages);
										} else {
											alert(response.emailMessages);								
										}
									}, // /success function
									error: function(jqXhr, textStatus, errorMessage) { // error callback 
										console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
									} // /error function // /response
								}); // /ajax

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

		var select_action;
		// top nav child bar 
		$('#topNavManageOrder').addClass('active');
		console.log('inside manord');
		if ((orderStatus == 0)&& (divUserType!='Planner'))
			select_action = '<input type="checkbox">';
		else
			select_action = '';
		
		var rows_selected = [];
		manageOrderTable = $("#manageOrderTable").DataTable({
			'ajax': { url: 'php_action/fetchOrderWfr.php'},
 			 'columns': [
				{
					null:null
				},
				{
					"className":      'details-control',
					"orderable":      false,
					"data":           null,
					"defaultContent": ''
				},
 				{ "data": "ordNum" },
				{ "data": "username" },
				{ "data": "eventName" },
				{ "data": "orderDate" },
            	{ "data": "project_name" },
            	{ "data": "venue_code" },
				{ "data": "venueName" },
				{ "data": "site_code" },
				{ "data": "site_name" },
				{ "data": "active"},
				{ "data": "button"} 
			],
			'columnDefs': [{
				'targets': 0,
				'searchable': false,
				'orderable': false,
				'width': '1%',
				'className': 'dt-body-center',
				'render': function(data, type, full, meta) {
					//console.log('xx'+data+':'+type+':'+full+':')
					/* 			 $.each(meta, function(index, rowId){
									console.log(rowId)
								}); */
					//var result = $(full).text().split(',')
					return select_action;
					//return '<input type="checkbox">';
					}
				},
				{'width':99, 'targets':10},
			],
			fixedColumns: true,
			'order': [2],
			'rowCallback': function(row, data, dataIndex) {
				// Get row ID
				var rowId = data['orderItemId'];

				// If row ID is in the list of selected row IDs
				if ($.inArray(rowId, rows_selected) !== -1) {
					$(row).find('input[type="checkbox"]').prop('checked', true);
					$(row).addClass('selected');
				}
			}
			//responsive: true
		});		
		manageOrderTable.column( 3 ).data().unique();
		// Add event listener for opening and closing details
		$('#manageOrderTable tbody').on('click', 'td.details-control', function () {
			var tr = $(this).closest('tr');
			var row = manageOrderTable.row( tr );

			if ( row.child.isShown() ) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			}
			else {
				// Open this row
				//console.log('before callng format');
				row.child( format(row.data(), divUserType) ).show();
				tr.addClass('shown');
			}
		});

    // Handle click on checkbox
    $('#manageOrderTable tbody').on('click', 'input[type="checkbox"]', function(e) {
		var $row = $(this).closest('tr');
		console.log('row: '+$row);

        // Get row data
		var data = manageOrderTable.row($row).data();
		$.each(data, function(index, rowId){
			console.log(index+':'+rowId)
		});
		console.log('data: '+data);

        // Get row ID
		var rowId = data['orderItemId'];
		console.log('rowId: '+rowId);

        // Determine whether row ID is in the list of selected row IDs
        var index = $.inArray(rowId, rows_selected);

        // If checkbox is checked and row ID is not in list of selected row IDs
        if (this.checked && index === -1) {
            rows_selected.push(rowId);

            // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
        } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
        }

        if (this.checked) {
            $row.addClass('selected');
        } else {
            $row.removeClass('selected');
        }

        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(manageOrderTable);

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

/* 	// Handle click on table cells with checkboxes
    $('#manageOrderTable').on('click', 'tbody td, thead th:first-child', function(e) {
        $(this).parent().find('input[type="checkbox"]').trigger('click');
    }); */

    // Handle click on "Select all" control
    $('thead input[name="select_all"]', manageOrderTable.table().container()).on('click', function(e) {
        if (this.checked) {
            $('#manageOrderTable tbody input[type="checkbox"]:not(:checked)').trigger('click');
        } else {
            $('#manageOrderTable tbody input[type="checkbox"]:checked').trigger('click');
        }

        // Prevent click event from propagating to parent
        e.stopPropagation();
    });

    // Handle table draw event
    manageOrderTable.on('draw', function() {
        // Update state of "Select all" control
        updateDataTableSelectAllCtrl(manageOrderTable);
    });
	$('#frm-authorize').on('submit', function(e) {
		// Prevent actual form submission
		var form = $(this);
		$.each(rows_selected, function(index, rowId) {
            // Create a hidden element
            form.append(
                $('<input>')
                .attr('type', 'hidden')
                .attr('name', 'orderItemIdApprv[]')
                .val(rowId)
            );
        });
		e.preventDefault();
		console.log(1);
		$('#example-console').text(form.serialize());
		console.log("Form submission", form.serialize());

		$(".approveSubmit").prop("disabled", true);
		// add spinner to button
		$(".approveSubmit").html(
	 		'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...'
		);
		// call ajax
		$.ajax({
			url : 'php_action/approveMultiOrder.php',
			type: form.attr('method'),
			data: form.serialize(),
			dataType: 'json',
			cache: false,
/* 			contentType: false,
			processData: false, */
			success:function(response) {
				console.log(response.success);
				if(response.success == true) {
					// submit loading button


					$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
															
					// shows a successful message after operation
					$('#add-product-messages').html('<div class="alert alert-success">'+
							'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
							'<strong><i class="fa fa-check"></i></strong> '+ response.messages +
						'</div>');

					// remove the mesages
		  			$(".alert-success").delay(500).show(10, function() {
						$(this).delay(3000).hide(10, function() {
							$(this).remove();
						});
					}); // /.alert

		  			// reload the manage student table
					$(".approveSubmit").prop("disabled", false);
					$('.approveSubmit').removeClass('spinner-border');
					$(".approveSubmit").html('Approve');

					manageOrderTable.ajax.reload(null, true);				
					
					alert(response.messages);
					// remove text-error 
					$(".text-danger").remove();
					// remove from-group error
					//$(".form-group").removeClass('has-error').removeClass('has-success');

				}  else {
					alert(response.messages);
					$(".approveSubmit").prop("disabled", false);
					$('.approveSubmit').removeClass('spinner-border');
					$(".approveSubmit").html('Approve');
				}  // /if success
			}, // /success function
			error: function(jqXhr, textStatus, errorMessage) { // error callback 
				console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
				$(".approveSubmit").prop("disabled", false);
				$('.approveSubmit').removeClass('spinner-border');
				$(".approveSubmit").html('Approve');
			} // /error function
		}); // /ajax function
		// end of ajax call

		$('input[name="orderItemIdApprv\[\]"]', form).remove();
	});

	} else if(divRequest == 'editOrd') {
		//$("#orderDate").datepicker();

		// edit order form function
		$("#editOrderForm").unbind('submit').bind('submit', function() {
			// alert('ok');
			var form = $(this);

			$('.form-group').removeClass('has-error').removeClass('has-success');
			$('.text-danger').remove();
	

			var venueType = $("#venueCode").val();
			var venueName = $("#venueName").val();
			//var lsCategory = $("#lsc").val();
			//var lsSubcat = $("#lssub").val();
			//var lsName = $("#lsname").val();
			//var lsCode = $("#lscode").val();
			var siteName = $('#siteName').val();
			//var baseBuild = $('#baseBuild').val();

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

			if(!siteName) {
				$("#siteName").after('<p class="text-danger"> This field is required </p>');
				$('#siteName').closest('.form-group').addClass('has-error');
			} else {
				$('#siteName').closest('.form-group').addClass('has-success');
			} // /else

			// array validation

			var itemCat = document.getElementsByName('itemCat[]');				
			var validateItemCat;
			for (var x = 0; x < itemCat.length; x++) {       			
				var itemCatId = itemCat[x].id;
				//console.log(itemCatId);
				//console.log(itemCat.length);
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
			   	//console.log('itemSubatId: '+itemSubatId);
			   	//console.log('itemSubat Value: '+itemSubat[x].value);
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
			   	//console.log(itemNameId);
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

/* 			var comment = document.getElementsByName('comment[]');				
			var validateComment;
			for (var x = 0; x < comment.length; x++) {       			
				var commentId = comment[x].id;
				//console.log(commentId);
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
			} // for  */

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
			//console.log('before validation');
			if(venueType && venueName && siteName) {
				if(validateItemCat == true && validateItemSubcat == true &&
					validateItemName == true && validateQuantity == true
					) {
					// create order button
					// $("#createOrderBtn").button('loading');
					//console.log('editOrd form result');
					console.log(form.serialize());
					$.ajax({
						url : form.attr('action'),
						type: form.attr('method'),
						data: form.serialize(),					
						dataType: 'json',
						beforeSend:function(){
							return confirm("Are you sure you want to save your request?");
						 },
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
							//$(".editButtonFooter").addClass('div-hide');
							// remove the product row
							///$(".removeProductRowBtn").addClass('div-hide');
								
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
					url: "php_action/selectionwfr.php",
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
				$('#siteCode').empty();
				$('#siteCode').append('<option value="0">~~SELECT~~</option>');
				$('#siteName').empty();
				$('#siteName').append('<option value="0">~~SELECT~~</option>');

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
					url: "php_action/selectionwfr.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('select[name="lsname"]').empty();
						$('select[name="lsname"]').append('<option value="">~~SELECT~~</option>');
						$('select[name="lscode"]').empty();
						$('select[name="lscode"]').append('<option value="0">~~SELECT~~</option>');
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

		$( "#venueName" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			//alert(lookupValue);
			var action = 'sitecode';
			//alert("lookupValue: "+lookupValue);
			if(lookupValue) {
			//alert("2");	
				$.ajax({
					url: "php_action/selectionwfr.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('#siteCode').empty();
						$('#siteCode').append('<option value="">~~SELECT~~</option>');
						$('#siteName').empty();
						$('#siteName').append('<option value="0">~~SELECT~~</option>');
								$.each(data, function(key, value) {
							$('#siteCode').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('#siteCode').empty();
				$('#siteCode').append('<option value="0">~~SELECT~~</option>');
				$('#siteName').empty();
				$('#siteName').append('<option value="0">~~SELECT~~</option>');
			}
		});		

		$( "#siteCode" ).change(function () {
			//alert("1");
			var lookupValue = $(this).val();
			//alert(lookupValue);
			var action = 'sitename';
			//alert("lookupValue: "+lookupValue);
			if(lookupValue) {
			//alert("2");	
				$.ajax({
					url: "php_action/selectionwfr.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
						//alert("3");
						$('#siteName').empty();
					//	$('#siteCode').append('<option value="">~~SELECT~~</option>');
						$.each(data, function(key, value) {
							$('#siteName').append('<option value="'+ key +'">'+ value +'</option>');
						});
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function 
				});
		//alert('4');
		
			}else{
		//		alert('in the else');
				$('#siteName').empty();
				$('#siteName').append('<option value="0">~~SELECT~~</option>');
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
					url: "php_action/selectionwfr.php",
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
					url: "php_action/selectionwfr.php",
					type: "post",
					dataType: "json",
					data: {'id':lookupValue, action:action},
					 success: function(data) {
		//				alert("3");
						$('select[name="lssub"]').empty();
						$('select[name="lssub"]').append('<option value="">~~SELECT~~</option>');
						$('select[name="lscode"]').empty();
						$('select[name="lscode"]').append('<option value="0">~~SELECT~~</option>');
						$('select[name="lsname"]').empty();
						$('select[name="lsname"]').append('<option value="0">~~SELECT~~</option>');
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
					url: "php_action/selectionwfr.php",
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
					url: "php_action/selectionwfr.php",
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

function showHideDivClass($divName, $display){
	if ($display)
		$("."+divName).addClass('div-hide');
	else 
	    $("."+divName).addClass('div-hide');
}

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

/* function removeProductRow(row = null) {
	if(row) {
		$("#row"+row).remove();


		subAmount();
	} else {
		alert('error! Refresh the page again');
	}
} */

// select on product data
function getProductData(row) {

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
function getTotal(row) {
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
function removeOrder(orderId) {
	if(orderId) {
		//alert(1);
		$("#removeOrderBtn").unbind('click').bind('click', function() {
			//alert(2);
			$("#removeOrderBtn").button('loading');
//alert(2.2);
			$.ajax({
				url: 'php_action/removeOrder.php',
				type: 'post',
				data: {orderId : orderId},
				dataType: 'json',
				success:function(response) {
					//alert(3)
					$("#removeOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#removeOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
	            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
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
	            '<strong><i class="fa fa-times"></i></strong> '+ response.messages +
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

function approveOrder(orderItemId) {
	//alert (orderItemId);
	if(orderItemId) {
		//alert(1);
		$("#approveOrderBtn").unbind('click').bind('click', function() {
			//alert(2);
			$("#approveOrderBtn").button('loading');
			$.ajax({
				url: 'php_action/approveOrder.php',
				type: 'post',
				data: {orderItemId : orderItemId},
				dataType: 'json',
				success:function(response) {
					//alert(3)
					$("#approveOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#approveOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
			            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	    		        '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
	          			'</div>');

						// remove the mesages
	          			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});

							$.ajax({
								url: "php_action/sendEmail.php",
								type: "post",
								dataType: "json",
								data: {'id':orderItemId, action: 'Planner Approved'},
								dataType: 'json',
								success:function(response) {
									console.log(response.emailSuccess);
									// reset button
									$("#createOrderBtn").button('reset');
									
									$(".text-danger").remove();
									$('.form-group').removeClass('has-error').removeClass('has-success');
									if(response.emailSuccess == true) {
										console.log('success email ajax');
										console.log(response.emailMessages);
									} else {
										alert(response.emailMessages);								
									}
								}, // /success function
								error: function(jqXhr, textStatus, errorMessage) { // error callback 
									console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
								} // /error function // /response
							}); // /ajax

						}); // /.alert	          

					} else {
						// error messages
						$(".approveOrderMessages").html('<div class="alert alert-warning">'+
				            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	        			    '<strong><i class="fa fa-times"></i></strong> '+ response.messages +
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
			});  // /ajax function to approve the order

			// zend an email to the planner
			//console.log('newOrderId: '+newOrderId);
		}); // /approve order button clicked
	} else {
		alert('error! refresh the page again');
	}
}
// /approve order

function rejectOrder(orderItemId) {
	if(orderItemId) {
		//alert(1);
		$("#rejectOrderBtn").unbind('click').bind('click', function() {
			//alert(2);
			$("#rejectOrderBtn").button('loading');
			rejectReason = $('#reject_reason').val();
//alert(2.2);
			$.ajax({
				url: 'php_action/rejectOrder.php',
				type: 'post',
				data: {orderItemId : orderItemId, rejectReason: rejectReason},
				dataType: 'json',
				success:function(response) {
					//alert(3)
					$("#rejectOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#rejectOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
	            			'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            			'<strong><i class="fa fa-check"></i></strong> '+ response.messages +
	          				'</div>');

						// remove the mesages
	          			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});

							$.ajax({
								url: "php_action/sendEmail.php",
								type: "post",
								dataType: "json",
								data: {'id':orderItemId, action: 'Planner Rejected'},
								dataType: 'json',
								success:function(response) {
									console.log(response.emailSuccess);
									// reset button
									$("#createOrderBtn").button('reset');
									
									$(".text-danger").remove();
									$('.form-group').removeClass('has-error').removeClass('has-success');
									if(response.emailSuccess == true) {
										console.log('success email ajax');
										console.log(response.emailMessages);
									} else {
										alert(response.emailMessages);								
									}
								}, // /success function
								error: function(jqXhr, textStatus, errorMessage) { // error callback 
									console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
								} // /error function // /response
							}); // /ajax

						}); // /.alert	          

					} else {
						// error messages
						$(".rejectOrderMessages").html('<div class="alert alert-warning">'+
	            			'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            			'<strong><i class="fa fa-times"></i></strong> '+ response.messages +
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
			});  // /ajax function to reject the order

		}); // /reject order button clicked
		

	} else {
		alert('error! refresh the page again');
	}
}
// /reject order
function ovlMoreInfoDisplay(subCatId,orderItemId){
	console.log('orderItemId: '+subCatId);
	console.log('orderItemId: '+orderItemId);

	// now we call ajax to build the dynamic sequence 
	$.ajax({
		url: 'php_action/selectionwfr.php',
		type: 'post',
		data: {subCatId:subCatId ,orderItemId : orderItemId, action:'ovldynamic'},
		dataType: 'json',
		success:function(response) {
			//alert(3)
			var html_info = '<table class="table table-hover">';
			$.each(response, function(index, value){
				//console.log('response:' + response[index]);
				//console.log('index: '+index);
				col_name = index;
				col_name = col_name.replace( /_/g,' ').replace('ovl',' ');
				html_info += '<tr><td>'+col_name+'</td><td>'+response[index]+'<td/></tr>';
			});
			html_info += '</table>';
			console.log('table');
			console.log(html_info);
			$('#div-overlay-info-result').html(html_info);
		} , // /success function
		error: function(jqXhr, textStatus, errorMessage) { // error callback 
			console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
		} // /error function 
	});  // /ajax function to reset the order
}

function pwrMoreInfoDisplay(orderItemId){
	console.log('orderItemId: '+orderItemId);

	// now we call ajax to build the dynamic sequence 
	$.ajax({
		url: 'php_action/selectionwfr.php',
		type: 'post',
		data: {orderItemId : orderItemId, action:'pwrdynamic'},
		dataType: 'json',
		success:function(response) {
			//alert(3)
			var html_info = "<table class='table table-hover'>"+
			"<tr><td>Item Requires Power Provision</td><td>"+response.pwr_requires_power_provision+"</td></tr>"+
			"<tr><td>Item Qauntity Provision</td><td>"+response.pwr_item_quantity+"</td></tr>"+
			"<tr><td>KVA or KW per item Provision</td><td>"+response.pwr_sva_kw+"</td></tr>"+
			"<tr><td>Amperes Provision</td><td>"+response.pwr_amperes+"</td></tr>"+
			"</table>";

			console.log('table');
			console.log(html_info);
			$('#div-overlay-info-result').html(html_info);
		} , // /success function
		error: function(jqXhr, textStatus, errorMessage) { // error callback 
			console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
		} // /error function 
	});  // /ajax function to reset the order
}


function resetOrder(orderItemId) {
	if(orderItemId) {
		//alert(1);
		$("#resetOrderBtn").unbind('click').bind('click', function() {
			//alert(2);
			$("#resetOrderBtn").button('loading');
			resettReason = $('#reset_reason').val();
			$.ajax({
				url: 'php_action/resetOrder.php',
				type: 'post',
				data: {orderItemId : orderItemId, resettReason: resettReason},
				dataType: 'json',
				success:function(response) {
					//alert(3)
					$("#resetOrderBtn").button('reset');

					if(response.success == true) {

						manageOrderTable.ajax.reload(null, false);
						// hide modal
						$("#resetOrderModal").modal('hide');
						// success messages
						$("#success-messages").html('<div class="alert alert-success">'+
	            			'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            			'<strong><i class="fa fa-check"></i></strong> '+ response.messages +
	          				'</div>');

						// remove the mesages
	          			$(".alert-success").delay(500).show(10, function() {
							$(this).delay(3000).hide(10, function() {
								$(this).remove();
							});

							$.ajax({
								url: "php_action/sendEmail.php",
								type: "post",
								dataType: "json",
								data: {'id':orderItemId, action: 'Planner Reset'},
								dataType: 'json',
								success:function(response) {
									console.log(response.emailSuccess);
									// reset button
									$("#createOrderBtn").button('reset');
									
									$(".text-danger").remove();
									$('.form-group').removeClass('has-error').removeClass('has-success');
									if(response.emailSuccess == true) {
										console.log('success email ajax');
										console.log(response.emailMessages);
									} else {
										alert(response.emailMessages);								
									}
								}, // /success function
								error: function(jqXhr, textStatus, errorMessage) { // error callback 
									console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
								} // /error function // /response
							}); // /ajax

						}); // /.alert	          

					} else {
						// error messages
						$(".resetOrderMessages").html('<div class="alert alert-warning">'+
	            			'<button type="button" class="close" data-dismiss="alert">&times;</button>'+
	            			'<strong><i class="fa fa-times"></i></strong> '+ response.messages +
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
			});  // /ajax function to reset the order
		}); // /reset order button clicked
	} else {
		alert('error! refresh the page again');
	}
}
// /reset order

// Payment ORDER
function paymentOrder(orderId) {
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
