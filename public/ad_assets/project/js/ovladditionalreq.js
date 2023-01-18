var manageTable;

$(document).ready(function() {
	// top nav bar 
    $('#nav').addClass('active');

	// manage event data table
	//changeTable = $('#changeTable').DataTable();

	// manage event data table
	manageTable = $('#manageTable').DataTable({
		ajax: 'php_action/fetchovlAdditionalReq.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
    
	$("#addModalBtn").unbind('click').bind('click', function() {
        console.log(" Modal button pressed.");
		// // event form reset
		$("#submitForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit event form
		$("#submitForm").unbind('submit').bind('submit', function() {
            $(".text-danger").remove();
            // remove from-group error
            console.log("inserting new event");
			// form validation
			var name = $("#name").val();
            var itemCode = $("#itemCode").val();
            var fieldType = $("#fieldType").val();
            var status = $("#status").val();

			if(!name) {
				$("#name").after('<p class="text-danger"> Name field is required</p>');
				//$('#sizeName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#name").find('.text-danger').remove();
				// success out for form 
				//$("#sizeName").closest('.form-group').addClass('has-success');	  	
			}	// /else
			if(!itemCode) {
				$("#itemCode").after('<p class="text-danger"> Name field is required</p>');
				//$('#sizeName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemCode").find('.text-danger').remove();
				// success out for form 
				//$("#sizeName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!status) {
				$("#status").after('<p class="text-danger"> Status field is required</p>');
				//$('#sizeStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#status").find('.text-danger').remove();
				// success out for form 
				//$("#sizeStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(name && itemCode && status) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createBtn").button('loading');

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
                console.log(formData.get('eventName'));
                console.log(formData.get('eventStatus')); */
                console.log($('#submitForm').serialize());
				$.ajax({
/* 					url : 'php_action/create.php',
					type: 'post',
					data: $('#submitForm').serialize(),
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
							$("#createBtn").button('reset');
							
							$("#submitForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-messages').html('<div class="alert alert-success allgood">'+
		            '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		            '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
		          '</div>');

							// remove the mesages
		          $(".allgood").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
							manageTable.ajax.reload(null, true);

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
		}); // /submit event form

    }); // /add event modal btn clicked
});
    function edit(id) {
        if(id) {
            console.log('id: '+id);
            $("#eventId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();

            $.ajax({
                url: 'php_action/fetchSelectedovlAdditionalReq.php',
                type: 'post',
                data: {id: id},
                dataType: 'json',
                success:function(response) {	
                    console.log('ok 1.:'+response.id);	
                // alert(response.event_image);
                    // modal spinner
                    //alert(response.event_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				

    
                    // event id 
                    console.log('response.name:'+response.name);
                    console.log('response.active_flag:'+response.active_flag);
                    $(".editFooter").append('<input type="hidden" name="id" id="id" value="'+response.id+'" />');				
                    
                    $("#editName").val(response.name);
                    $('#editItemCode').val(response.item_code);
                    $('#editFieldType').val(response.field_type);
                    $("#editStatus").val(response.active_flag);
                    $('#editDbColumn').val(response.db_col_name);
                    $('#editFieldLabel').val(response.label);
                    $('#editFieldType').val(response.field_type);
                        // project name

                    // update the event data function
                    $("#editForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ov attributes');
                        // form validation
                        var name = $("#editName").val();
                        var itemCode = $("#editItemCode").val();
                        var status = $("#editStatus").val();
                                    
                        console.log('name: '+name);
                        console.log('itemCode: '+itemCode);
                        console.log('status: '+status);
                        if(!name) {
                            $("#name").after('<p class="text-danger">size Name field is required</p>');
                            //$('#editsizeName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#name").find('.text-danger').remove();
                            // success out for form 
                            //$("#editsizeName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!itemCode) {
                            $("#editItemCode").after('<p class="text-danger">size Name field is required</p>');
                            //$('#editsizeName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editsizeName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!status) {
                            $("#status").after('<p class="text-danger">This field is required</p>');
                            //$('#editSizeStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#status").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSizeStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(name && itemCode && status) {
                            // submit loading button

                            $("#editBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log(form.serialize());
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
                                        $("#editSizeBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-messages').html('<div class="alert alert-success">'+
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
                                        manageTable.ajax.reload(null, true);
    
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
                    }); // update the event data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } , // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                } // /error function
            }); // /ajax to fetch event image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit event function

    function remove(id) {
        console.log("inside: removeSize("+id+")");
        if(id) {
            // remove event button clicked
            $("#removeBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeBtn clicked");
                $("#removeBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeovlAdditionalReq.php',
                    type: 'post',
                    data: {id:id},
                    dataType: 'json',
                    success:function(response) {
                        console.log("OK clicked");
                        // loading remove button
                        $("#removeBtn").button('reset');
                        if(response.success == true) {
                            // remove event modal
                            $("#removeModal").modal('hide');
    
                            // update the event table
                            manageTable.ajax.reload(null, false);
    
                            // remove success messages
                            $(".remove-messages").html('<div class="alert alert-success">'+
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
    
                            // remove success messages
                            $(".removeSizeMessages").html('<div class="alert alert-success">'+
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                        '<strong><i class="fa fa-check"></i></strong> '+ response.messages +
                      '</div>');
    
                            // remove the mesages
                  $(".alert-success").delay(500).show(10, function() {
                                $(this).delay(3000).hide(10, function() {
                                    $(this).remove();
                                });
                            }); // /.alert
    
                        } // /error
                    } , // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function
                }); // /ajax fucntion to remove the event
                return false;
            }); // /remove event btn clicked
        } // /if eventid
    } // /remove event function
    
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
