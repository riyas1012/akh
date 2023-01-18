var manageEventTable;

$(document).ready(function() {
	// top nav bar 
    $('#navEvent').addClass('active');

	// manage event data table
	//changeEventTable = $('#changeEventTable').DataTable();

	// manage event data table
	manageEventTable = $('#manageEventTable').DataTable({
		ajax: 'php_action/fetchEvent.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });

/*     $("#selectEventModalBtn").unbind('click').bind('click', function() {
        console.log("Select Event Modal button pressed.");
		// // event form reset
		$("#selectEventForm")[0].reset();		
 */
    // add event modal btn clicked
    		// select event form
		$("#selectRoleForm").unbind('submit').bind('submit', function() {
            console.log("inside selectRoleForm");
            //alert(1);
            var selectedRoleId = $('#changeRole').val();
            var selectedUserName = $('#changeRole').data("user");
            var action = 'changeRole';
            console.log('selectedRoleId: '+selectedRoleId);
            console.log('user name: '+selectedUserName);
            console.log('action: '+action);
			$.ajax({
                    url : 'php_action/fetchSelectedRole.php',
                    type: 'post',
                    data: {roleId:selectedRoleId, userName:selectedUserName, action:action},
					dataType: 'json',
                    cache: false,
                    //async: false,
					//contentType: false,
					//processData: false,
					success:function(response) {
                        console.log('response: '+response);
					//	if(response.success == true) {
							// submit loading button
							$("#changeRoleBtn").button('reset');
							
                            $("#selectRoleForm")[0].reset();
                            console.log('before reload');
                            //window.location.reload(true);
                            console.log('after reload');
							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#change-role-messages').html('<div class="alert alert-success">'+
		                    '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
		                    '<strong><i class="fa fa-check"></i></strong> Success </div>');

							// remove the mesages
		                        $(".alert-success").delay(500).show(10, function() {
								$(this).delay(3000).hide(10, function() {
									$(this).remove();
								});
							}); // /.alert

		          // reload the manage student table
                           window.location.reload(true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						//} // /if response.success
						
					}, // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: ' + errorMessage);
                    } // /success function
				}); // /ajax function

            return false;
        });
  //  }); // /add event modal btn clicked
    

	$("#addEventModalBtn").unbind('click').bind('click', function() {
        console.log("Event Modal button pressed.");
		// // event form reset
		$("#submitEventForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit event form
		$("#submitEventForm").unbind('submit').bind('submit', function() {

            console.log("inserting new event");
			// form validation
			var eventName = $("#eventName").val();
            var eventStatus = $("#eventStatus").val();

			if(eventName == "") {
				$("#eventName").after('<p class="text-danger">Event Name field is required</p>');
				//$('#eventName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#eventName").find('.text-danger').remove();
				// success out for form 
				//$("#eventName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(eventStatus == "") {
				$("#eventStatus").after('<p class="text-danger">Event Status field is required</p>');
				//$('#eventStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#eventStatus").find('.text-danger').remove();
				// success out for form 
				//$("#eventStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(eventName && eventStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createEventBtn").button('loading');

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
                console.log($('#submitEventForm').serialize());
				$.ajax({
/* 					url : 'php_action/createEvent.php',
					type: 'post',
					data: $('#submitEventForm').serialize(),
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
							$("#createEventBtn").button('reset');
							
							$("#submitEventForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-event-messages').html('<div class="alert alert-success">'+
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
							manageEventTable.ajax.reload(null, true);

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
		}); // /submit event form

    }); // /add event modal btn clicked
});
    function editEvent(eventId) {
        if(eventId) {
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
                url: 'php_action/fetchSelectedEvent.php',
                type: 'post',
                data: {eventId: eventId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.event_image);
                    // modal spinner
                    //alert(response.event_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getEventImage").attr('src', 'stock/'+response.event_image);
    
                    $("#editEventImage").fileinput({		      
                    });  
    
                    // $("#editEventImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.event_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // event id 
                    $(".editEventFooter").append('<input type="hidden" name="eventId" id="eventId" value="'+response.event_id+'" />');				
                    $(".editEventPhotoFooter").append('<input type="hidden" name="eventId" id="eventId" value="'+response.event_id+'" />');				
                    
                    // event code
                    $("#editEventCode").val(response.event_code);
                    // event name
                    $("#editEventName").val(response.event_name);
                    // status
                    $("#editEventStatus").val(response.active_flag);
                        // project name

                    // update the event data function
                    $("#editEventForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit EventForm');
                        // form validation
                        var eventName = $("#editEventName").val();
                        var eventStatus = $("#editEventStatus").val();
                                    
    
                        if(eventName == "") {
                            $("#editEventName").after('<p class="text-danger">Event Name field is required</p>');
                            //$('#editEventName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editEventName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editEventName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(eventStatus == "") {
                            $("#editEventStatus").after('<p class="text-danger">Event Status field is required</p>');
                            //$('#editEventStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editEventStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editEventStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(eventName && eventStatus) {
                            // submit loading button

                            $("#editEventBtn").button('loading');
    
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
                                        $("#editEventBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-event-messages').html('<div class="alert alert-success">'+
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
                                        manageEventTable.ajax.reload(null, true);
    
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
                } // /success function
            }); // /ajax to fetch event image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit event function

    function removeEvent(eventId) {
        console.log("inside: removeEvent("+eventId+")");
        if(eventId) {
            // remove event button clicked
            $("#removeEventBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeEventBtn clicked");
                $("#removeEventBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeEvent.php',
                    type: 'post',
                    data: {eventId: eventId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeEventBtn").button('reset');
                        if(response.success == true) {
                            // remove event modal
                            $("#removeEventModal").modal('hide');
    
                            // update the event table
                            manageEventTable.ajax.reload(null, false);
    
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
                            $(".removeEventMessages").html('<div class="alert alert-success">'+
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
