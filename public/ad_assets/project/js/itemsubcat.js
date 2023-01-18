var manageItemsubcatTable;

$(document).ready(function() {
	// top nav bar 
    $('#navItemsubcat').addClass('active');


	// manage itemsubcat data table
	manageItemsubcatTable = $('#manageItemsubcatTable').DataTable({
		ajax: 'php_action/fetchItemsubcat.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add itemsubcat modal btn clicked
	$("#addItemsubcatModalBtn").unbind('click').bind('click', function() {
        console.log("Itemsubcat Modal button pressed.");
		// // itemsubcat form reset
		$("#submitItemsubcatForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit itemsubcat form
		$("#submitItemsubcatForm").unbind('submit').bind('submit', function() {

            console.log("inserting new itemsubcat");
			// form validation
			var itemsubcatName = $("#itemsubcatName").val();
            var itemsubcatStatus = $("#itemsubcatStatus").val();

			if(itemsubcatName == "") {
				$("#itemsubcatName").after('<p class="text-danger">Itemsubcat Name field is required</p>');
				//$('#itemsubcatName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemsubcatName").find('.text-danger').remove();
				// success out for form 
				//$("#itemsubcatName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(itemsubcatStatus == "") {
				$("#itemsubcatStatus").after('<p class="text-danger">Itemsubcat Status field is required</p>');
				//$('#itemsubcatStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemsubcatStatus").find('.text-danger').remove();
				// success out for form 
				//$("#itemsubcatStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(itemsubcatName && itemsubcatStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createItemsubcatBtn").button('loading');

 				var form = $(this);
				var formData = new FormData(this);
                console.log("Before Calling ajax");
                var act = form.attr('action');
                var mtd = form.attr('method');
                console.log(act);
                console.log(mtd);
/*                 console.log(form.attr('action'));
                console.log(form.attr('method'));
                // this formData.get will not work for IE and Edge
                console.log(formData.get('itemsubcatName'));
                console.log(formData.get('itemsubcatStatus')); */
                console.log($('#submitItemsubcatForm').serialize());
				$.ajax({
/* 					url : 'php_action/createItemsubcat.php',
					type: 'post',
					data: $('#submitItemsubcatForm').serialize(),
					dataType: 'json',
					cache: false,
					//contentType: false,
					//processData: false,				$.ajax({ */
                    url : form.attr('action'),
                    type: form.attr('method'),
                    data: formData,
					dataType: 'json',
					cache: false,
					contentType: false,
					processData: false,
					success:function(response) {
                        console.log(response.success);
						if(response.success == true) {
							// submit loading button
							$("#createItemsubcatBtn").button('reset');
							
							$("#submitItemsubcatForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-itemsubcat-messages').html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $("#add-itemsubcat-messages").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
							manageItemsubcatTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit itemsubcat form

    }); // /add itemsubcat modal btn clicked
});
    function editItemsubcat(itemsubcatId) {
        console.log(itemsubcatId);
        if(itemsubcatId) {
            $("#itemsubcatId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedItemsubcat.php',
                type: 'post',
                data: {itemsubcatId: itemsubcatId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.itemsubcat_image);
                    // modal spinner
                    //alert(response.itemsubcat_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
    
                    // itemsubcat id 
                    $(".editItemsubcatFooter").append('<input type="hidden" name="itemsubcatId" id="itemsubcatId" value="'+response.item_subcat_id+'" />');				
                    
                    // itemsubcat name
                    $("#editItemsubcatName").val(response.item_subcat_name);
                    // status
                    $("#editItemcatName").val(response.item_category_id);
                    // itemsubcat name
                    $("#editItemsubcatStatus").val(response.active_flag);

                    // update the itemsubcat data function
                    $("#editItemsubcatForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ItemsubcatForm');
                        // form validation
                        var itemsubcatName = $("#editItemsubcatName").val();
                        var itemsubcatStatus = $("#editItemsubcatStatus").val();
                                    
    
                        if(itemsubcatName == "") {
                            $("#editItemsubcatName").after('<p class="text-danger">Itemsubcat Name field is required</p>');
                            //$('#editItemsubcatName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemsubcatName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editItemsubcatName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!itemsubcatStatus) {
                            $("#editItemsubcatStatus").after('<p class="text-danger">Itemsubcat Status field is required</p>');
                            //$('#editItemsubcatStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemsubcatStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editItemsubcatStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(itemsubcatName && itemsubcatStatus) {
                            // submit loading button

                            $("#editItemsubcatBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log($('#editItemsubcatForm').serialize());
                            $.ajax({
                                url : form.attr('action'),
                                type: form.attr('method'),
                                data: formData,
                                dataType: 'json',
                                cache: false,
                                contentType: false,
                                processData: false,
                                success:function(response) {
                                    //alert(response);
                                    console.log(response.success);
                                    if(response.success == true) {
                                        // submit loading button
                                        $("#editItemsubcatBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-itemsubcat-messages').html('<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong><i class="fa fa-check fa-2x"></i></strong> '+ response.messages +
                              '</div>');
    
                                        // remove the mesages
                              $(".alert-success").delay(500).show(10, function() {
                                            $(this).delay(3000).hide(10, function() {
                                                $(this).remove();
                                            });
                                        }); // /.alert
    
                              // reload the manage student table
                                        manageItemsubcatTable.ajax.reload(null, true);
    
                                        // remove text-error 
                                        $(".text-danger").remove();

    
                                    } // /if response.success
                                    
                                }, // /success function
                                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                                    console.log('Error: ' + errorMessage);
                                }
                            }); // /ajax function
                        }	 // /if validation is ok 					
    
                        return false;
                    }); // update the itemsubcat data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                } // /error function
            }); // /ajax to fetch itemsubcat image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit itemsubcat function

    function removeItemsubcat(itemsubcatId) {
        console.log("inside: removeItemsubcat("+itemsubcatId+")");
        if(itemsubcatId) {
            // remove itemsubcat button clicked
            $("#removeItemsubcatBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeItemsubcatBtn clicked");
                $("#removeItemsubcatBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeItemsubcat.php',
                    type: 'post',
                    data: {itemsubcatId: itemsubcatId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeItemsubcatBtn").button('reset');
                        if(response.success == true) {
                            // remove itemsubcat modal
                            $("#removeItemsubcatModal").modal('hide');
    
                            // update the itemsubcat table
                            manageItemsubcatTable.ajax.reload(null, false);
    
                            // remove success messages
                            $(".remove-messages").html('<div class="alert alert-success">'+
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
    
                            // remove success messages
                            $(".removeItemsubcatMessages").html('<div class="alert alert-success">'+
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                        '<strong><i class="glyphicon glyphicon-ok-sign"></i></strong> '+ response.messages +
                      '</div>');
    
                            // remove the mesages
                  $(".alert-success").delay(500).show(10, function() {
                                $(this).delay(3000).hide(10, function() {
                                    $(this).remove();
                                });
                            }); // /.alert
    
                        } // /error
                    }, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function
                }); // /ajax fucntion to remove the itemsubcat
                return false;
            }); // /remove itemsubcat btn clicked
        } // /if itemsubcatid
    } // /remove itemsubcat function
    
    function clearForm(oForm) {
        // var frm_elements = oForm.elements;									
        // console.log(frm_elements);
        // 	for(i=0;i<frm_elements.length;i++) {
        // 		field_type = frm_elements[i].type.toLowerCase();									
        // 		switch (field_type) {
        // 	    case "text":
        // 	    case "password":
        // 	    case "textarea":
        // 	    case "hidden":
        // 	    case "select-one":	    
        // 	      frm_elements[i].value = "";
        // 	      break;
        // 	    case "radio":
        // 	    case "checkbox":	    
        // 	      if (frm_elements[i].checked)
        // 	      {
        // 	          frm_elements[i].checked = false;
        // 	      }
        // 	      break;
        // 	    case "file": 
        // 	    	if(frm_elements[i].options) {
        // 	    		frm_elements[i].options= false;
        // 	    	}
        // 	    default:
        // 	        break;
        //     } // /switch
        // 	} // for
    }    
