var manageUserTable;

$(document).ready(function() {
	// top nav bar 
    $('#navUser').addClass('active');
    $('#navHome').removeClass('active');

	// manage user data table
	manageUserTable = $('#manageUserTable').DataTable({
		ajax: 'php_action/fetchUser.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });

    //var userType = $('.div-usertype').text();
    //alert(userType);
	// add user modal btn clicked
	$("#addUserModalBtn").unbind('click').bind('click', function() {
		// // user form reset
		$("#submitUserForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit user form
		$("#submitUserForm").unbind('submit').bind('submit', function() {

            console.log("inserting new user");
			// form validation
			var userName = $("#userName").val();
			var upassword = $("#upassword").val();
            var uemail = $("#uemail").val();
            var projectName = $('#projectName').val();
            var userType = $('#userType').val();
            var catalogName = $('#catalogName').val();
            
            if (userType){
                $('.text-danger').remove();
                if(userName == "") {
                    $("#userName").after('<p class="text-danger">User Name field is required</p>');
                    //$('#userName').closest('.form-group').addClass('has-error');
                }	else {
                    // remov error text field
                    $("#userName").find('.text-danger').remove();
                    // success out for form 
                    //$("#userName").closest('.form-group').addClass('has-success');	  	
                }	// /else

                if(upassword == "") {
                    $("#upassword").after('<p class="text-danger">This field is required</p>');
                    //$('#userName').closest('.form-group').addClass('has-error');
                }	else {
                    // remov error text field
                    $("#upassword").find('.text-danger').remove();
                    // success out for form 
                    //$("#userName").closest('.form-group').addClass('has-success');	  	
                }	// /else

                if(uemail == "") {
                    $("#uemail").after('<p class="text-danger">This field is required</p>');
                    //$('#userStatus').closest('.form-group').addClass('has-error');
                }	else {
                    // remov error text field
                    $("#uemail").find('.text-danger').remove();
                    // success out for form 
                    //$("#userStatus").closest('.form-group').addClass('has-success');	  	
                }	// /else

                if(!userType) {
                    $("#userType").after('<p class="text-danger">This field is required</p>');
                    //$('#editUserName').closest('.form-group').addClass('has-error');
                }	else {
                    // remov error text field
                    $("#userType").find('.text-danger').remove();
                    // success out for form 
                    //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                }	// /else					

                if (userType == 3 || userType == 2){ // category manager
                    if(!catalogName) {
                        $("#catalogName").after('<p class="text-danger">This field is required</p>');
                        //$('#editUserName').closest('.form-group').addClass('has-error');
                    }	else {
                        // remov error text field
                        $("#catalogName").find('.text-danger').remove();
                        // success out for form 
                        //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                    }	// /else					
                } else {
                    catalogName = '1';
                }

                if (userType == 1){ // planner
                    if(!projectName) {
                        $("#projectName").after('<p class="text-danger">This field is required</p>');
                        //$('#editUserName').closest('.form-group').addClass('has-error');
                    }	else {
                        // remov error text field
                        $("#projectName").find('.text-danger').remove();
                        // success out for form 
                        //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                    }	// /else					
                } else {
                    projectName = '1';
                }
            } else {
                $("#userType").after('<p class="text-danger">This field is required</p>');
            }

			if(userName && upassword && uemail && projectName  && userType && catalogName) {
                // submit loading button
				$("#createUserBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);
                console.log("Before Calling ajax");
                console.log(form.attr('action'));
                console.log(form.attr('method'));
                console.log(formData.get('userName'));
                console.log(formData.get('upassword'));
                console.log(formData.get('uemail'));
                console.log($('#submitUserForm').serialize());
				$.ajax({
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
							$("#createUserBtn").button('reset');
							
							$("#submitUserForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-user-messages').html('<div class="alert alert-success">'+
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
							manageUserTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} , // /success function
                    error: function(jqXhr, textStatus, errorMessage) { // error callback 
                        console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                    } // /error function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit user form

    }); // /add user modal btn clicked
});
    function editUser(userId) {
        if(userId) {
            $("#userId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedUser.php',
                type: 'post',
                data: {userId: userId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.user_image);
                    // modal spinner
                    //alert(response.user_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getUserImage").attr('src', 'stock/'+response.user_image);
                    $(".editUserFooter").append('<input type="hidden" name="userId" id="userId" value="'+response.user_id+'" />');				
                    // user code
                    $("#editUserName").val(response.username);
                    // email
                    $("#editEmail").val(response.email);
                    // project name
                    $("#editProjectName").val(response.project_id);
                    // phone
                    $("#editPhone").val(response.phone);
                    // project name
                    $("#editOrganizationName").val(response.organisation_name);
                    // project name
                    $("#editCatalog").val(response.catalog_reporting_id);
                    // project name
                    $("#editEventName").val(response.event_id);
                    $('#editUserType').val(response.user_type);

    
                    // update the user data function
                    $("#editUserForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit UserForm');
                        // form validation
                        var userName = $("#editUserName").val();
                        var uemail = $("#editEmail").val();
                        var projectName = $('#editProjectName').val();
                        var phoneNumber = $('#editPhone').val();
                        var organizationName = $('#editOrganizationName').val();
                        var eventName  = $('#editEventName').val();
                        var catalogName = $('#editCatalog').val();
                        var userType = $('#editUserType').val();

                    if (userType){
                        $('.text-danger').remove();    
                        if(userName == "") {
                            $("#editUserName").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserCode').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editUserName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserCode").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(uemail == "") {
                            $("#editEmail").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editEmail").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
                        if(phoneNumber == "") {
                            $("#editPhone").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editPhone").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
/*                         if(organizationName == "") {
                            $("#editOrganizationName").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editOrganizationName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        } */	// /else 				
                        if(!userType) {
                            $("#editUserType").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editUserType").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
/*                         if(!eventName) {
                            $("#editEventName").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editEventName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        } */	// /else					
                      //  alert(userType);
                    if (userType == 3){ // cat mgr
                        if(!catalogName) {
                            $("#editCatalog").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editCatalog").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                    } else {
                        catalogName = '1';
                    }			
                    if (userType == 1){ // planner
                        if(!projectName) {
                            $("#editProjectName").after('<p class="text-danger">This field is required</p>');
                            //$('#editUserName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProjectName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editUserName").closest('.form-group').addClass('has-success');	  	
                        } 				
                    } else {
                        projectName = '1';
                    }
                } else {
                    $("#userType").after('<p class="text-danger">This field is required</p>');
                }
    
                        if(userName && uemail && projectName && catalogName && editUserType) {
                            // submit loading button

                            $("#editUserBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(form.attr('action'));
                            console.log(form.attr('method'));

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
                                        $("#editUserBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-user-messages').html('<div class="alert alert-success">'+
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
                                        manageUserTable.ajax.reload(null, true);
    
                                        // remove text-error 
                                        $(".text-danger").remove();

    
                                    } // /if response.success
                                    
                                }, // /success function
                                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                                    console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                                } // /error function 
                            }); // /ajax function
                        }	 // /if validation is ok 					
    
                        return false;
                    }); // update the user data function
                } // /success function
            }); // /ajax to fetch user image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit user function

    function removeUser(userId) {
        console.log("inside: removeUser("+userId+")");
        if(userId) {
            // remove user button clicked
            $("#removeUserBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeUserBtn clicked");
                $("#removeUserBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeUser.php',
                    type: 'post',
                    data: {userId: userId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeUserBtn").button('reset');
                        if(response.success == true) {
                            // remove user modal
                            $("#removeUserModal").modal('hide');
    
                            // update the user table
                            manageUserTable.ajax.reload(null, false);
    
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
                            $(".removeUserMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the user
                return false;
            }); // /remove user btn clicked
        } // /if userid
    } // /remove user function
    
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
