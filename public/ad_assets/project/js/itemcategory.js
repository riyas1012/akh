var manageItemcategoryTable;

$(document).ready(function() {
	// top nav bar 
    $('#navItemcategory').addClass('active');


	// manage itemcategory data table
	manageItemcategoryTable = $('#manageItemcategoryTable').DataTable({
		ajax: 'php_action/fetchItemcategory.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add itemcategory modal btn clicked
	$("#addItemcategoryModalBtn").unbind('click').bind('click', function() {
        console.log("Itemcategory Modal button pressed.");
		// // itemcategory form reset
		$("#submitItemcategoryForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit itemcategory form
		$("#submitItemcategoryForm").unbind('submit').bind('submit', function() {

            console.log("inserting new itemcategory");
			// form validation
			var itemcategoryName = $("#itemcategoryName").val();
            var itemcategoryStatus = $("#itemcategoryStatus").val();

			if(itemcategoryName == "") {
				$("#itemcategoryName").after('<p class="text-danger">Itemcategory Name field is required</p>');
				//$('#itemcategoryName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemcategoryName").find('.text-danger').remove();
				// success out for form 
				//$("#itemcategoryName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(itemcategoryStatus == "") {
				$("#itemcategoryStatus").after('<p class="text-danger">Itemcategory Status field is required</p>');
				//$('#itemcategoryStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemcategoryStatus").find('.text-danger').remove();
				// success out for form 
				//$("#itemcategoryStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(itemcategoryName && itemcategoryStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createItemcategoryBtn").button('loading');

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
                console.log(formData.get('itemcategoryName'));
                console.log(formData.get('itemcategoryStatus')); */
                console.log($('#submitItemcategoryForm').serialize());
				$.ajax({
/* 					url : 'php_action/createItemcategory.php',
					type: 'post',
					data: $('#submitItemcategoryForm').serialize(),
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
							$("#createItemcategoryBtn").button('reset');
							
							$("#submitItemcategoryForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-itemcategory-messages').html('<div class="alert alert-success">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $("#add-itemcategory-messages").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
							manageItemcategoryTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: ' + errorMessage);
                    } // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit itemcategory form

    }); // /add itemcategory modal btn clicked
});
    function editItemcategory(itemcategoryId) {
        console.log(itemcategoryId);
        if(itemcategoryId) {
            $("#itemcategoryId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedItemcategory.php',
                type: 'post',
                data: {itemcategoryId: itemcategoryId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.itemcategory_image);
                    // modal spinner
                    //alert(response.itemcategory_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
    
                    // itemcategory id 
                    $(".editItemcategoryFooter").append('<input type="hidden" name="itemcategoryId" id="itemcategoryId" value="'+response.item_category_id+'" />');				
                    
                    // itemcategory code
                    // itemcategory name
                    $("#editItemcategoryName").val(response.item_category_name);
                    // status
                    $("#editItemcategoryStatus").val(response.active_flag);

                    $('#editIitemCatrep').val(response.id);
                        // project name

                    // update the itemcategory data function
                    $("#editItemcategoryForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ItemcategoryForm');
                        // form validation
                        var itemcategoryName = $("#editItemcategoryName").val();
                        var itemcategoryStatus = $("#editItemcategoryStatus").val();
                                    
    
                        if(itemcategoryName == "") {
                            $("#editItemcategoryName").after('<p class="text-danger">Itemcategory Name field is required</p>');
                            //$('#editItemcategoryName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemcategoryName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editItemcategoryName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!itemcategoryStatus) {
                            $("#editItemcategoryStatus").after('<p class="text-danger">Itemcategory Status field is required</p>');
                            //$('#editItemcategoryStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemcategoryStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editItemcategoryStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(itemcategoryName && itemcategoryStatus) {
                            // submit loading button

                            $("#editItemcategoryBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log($('#editItemcategoryForm').serialize());
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
                                        $("#editItemcategoryBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-itemcategory-messages').html('<div class="alert alert-success">'+
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
                                        manageItemcategoryTable.ajax.reload(null, true);
    
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
                    }); // update the itemcategory data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } // /success function
            }); // /ajax to fetch itemcategory image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit itemcategory function

    function removeItemcategory(itemcategoryId) {
        console.log("inside: removeItemcategory("+itemcategoryId+")");
        if(itemcategoryId) {
            // remove itemcategory button clicked
            $("#removeItemcategoryBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeItemcategoryBtn clicked");
                $("#removeItemcategoryBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeItemcategory.php',
                    type: 'post',
                    data: {itemcategoryId: itemcategoryId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeItemcategoryBtn").button('reset');
                        if(response.success == true) {
                            // remove itemcategory modal
                            $("#removeItemcategoryModal").modal('hide');
    
                            // update the itemcategory table
                            manageItemcategoryTable.ajax.reload(null, false);
    
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
                            $(".removeItemcategoryMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the itemcategory
                return false;
            }); // /remove itemcategory btn clicked
        } // /if itemcategoryid
    } // /remove itemcategory function
    
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
