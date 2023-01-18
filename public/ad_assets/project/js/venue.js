var manageVenueTable;

$(document).ready(function() {
	// top nav bar 
    $('#navVenue').addClass('active');
    $('#navHome').removeClass('active');

	// manage venue data table
	manageVenueTable = $('#manageVenueTable').DataTable({
		ajax: 'php_action/fetchVenue.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add venue modal btn clicked
	$("#addVenueModalBtn").unbind('click').bind('click', function() {
        console.log("Venue Modal button pressed.");
		// // venue form reset
		$("#submitVenueForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit venue form
		$("#submitVenueForm").unbind('submit').bind('submit', function() {

            console.log("inserting new venue");
			// form validation
			var venueName = $("#venueName").val();
            var venueStatus = $("#venueStatus").val();

			if(venueName == "") {
				$("#venueName").after('<p class="text-danger">Venue Name field is required</p>');
				//$('#venueName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#venueName").find('.text-danger').remove();
				// success out for form 
				//$("#venueName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(venueStatus == "") {
				$("#venueStatus").after('<p class="text-danger">Venue Status field is required</p>');
				//$('#venueStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#venueStatus").find('.text-danger').remove();
				// success out for form 
				//$("#venueStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(venueName && venueStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createVenueBtn").button('loading');

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
                console.log(formData.get('venueName'));
                console.log(formData.get('venueStatus')); */
                console.log($('#submitVenueForm').serialize());
				$.ajax({
/* 					url : 'php_action/createVenue.php',
					type: 'post',
					data: $('#submitVenueForm').serialize(),
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
							$("#createVenueBtn").button('reset');
							
							$("#submitVenueForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-venue-messages').html('<div class="alert alert-success">'+
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
							manageVenueTable.ajax.reload(null, true);

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
		}); // /submit venue form

    }); // /add venue modal btn clicked
});
    function editVenue(venueId) {
        if(venueId) {
            $("#venueId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedVenue.php',
                type: 'post',
                data: {venueId: venueId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.venue_image);
                    // modal spinner
                    //alert(response.venue_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getVenueImage").attr('src', 'stock/'+response.venue_image);
    
                    $("#editVenueImage").fileinput({		      
                    });  
    
                    // $("#editVenueImage").fileinput({
              //     overwriteInitial: true,
                 //    maxFileSize: 2500,
                 //    showClose: false,
                 //    showCaption: false,
                 //    browseLabel: '',
                 //    removeLabel: '',
                 //    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
                 //    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
                 //    removeTitle: 'Cancel or reset changes',
                 //    elErrorContainer: '#kv-avatar-errors-1',
                 //    msgErrorClass: 'alert alert-block alert-danger',
                 //    defaultPreviewContent: '<img src="stock/'+response.venue_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // venue id 
                    $(".editVenueFooter").append('<input type="hidden" name="venueId" id="venueId" value="'+response.venue_id+'" />');				
                    $(".editVenuePhotoFooter").append('<input type="hidden" name="venueId" id="venueId" value="'+response.venue_id+'" />');				
                    
                    // venue code
                    $("#editVenueCode").val(response.venue_code);
                    // venue name
                    $("#editVenueName").val(response.venue_name);
                    // status
                    $("#editVenueStatus").val(response.active_flag);
                    // project name
                    //$("#editProjectName").val(response.project_id);

                    // update the venue data function
                    $("#editVenueForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit VenueForm');
                        // form validation
                        var venueName   = $("#editVenueName").val();
                        var venueStatus = $("#editVenueStatus").val();
                        var projectName = $('#editProjectName').val();
                                    
    
                        if(venueName == "") {
                            $("#editVenueName").after('<p class="text-danger">Venue Name field is required</p>');
                            //$('#editVenueName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editVenueName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editVenueName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!venueStatus) {
                            $("#editVenueStatus").after('<p class="text-danger">Venue Status field is required</p>');
                            //$('#editVenueStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editVenueStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editVenueStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					

                        if(venueName && venueStatus) {
                            // submit loading button

                            $("#editVenueBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
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
                                        $("#editVenueBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-venue-messages').html('<div class="alert alert-success">'+
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
                                        manageVenueTable.ajax.reload(null, true);
    
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
                    }); // update the venue data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } // /success function
            }); // /ajax to fetch venue image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit venue function

    function removeVenue(venueId) {
        console.log("inside: removeVenue("+venueId+")");
        if(venueId) {
            // remove venue button clicked
            $("#removeVenueBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeVenueBtn clicked");
                $("#removeVenueBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeVenue.php',
                    type: 'post',
                    data: {venueId: venueId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeVenueBtn").button('reset');
                        if(response.success == true) {
                            // remove venue modal
                            $("#removeVenueModal").modal('hide');
    
                            // update the venue table
                            manageVenueTable.ajax.reload(null, false);
    
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
                            $(".removeVenueMessages").html('<div class="alert alert-success">'+
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
                    } // /success function
                }); // /ajax fucntion to remove the venue
                return false;
            }); // /remove venue btn clicked
        } // /if venueid
    } // /remove venue function
    
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
