var manageProjectTable;

$(document).ready(function() {
	// top nav bar 
    $('#navProject').addClass('active');
    $('#navHome').removeClass('active');
	// manage project data table
	manageProjectTable = $('#manageProjectTable').DataTable({
		ajax: 'php_action/fetchProject.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add project modal btn clicked
	$("#addProjectModalBtn").unbind('click').bind('click', function() {
		// // project form reset
		$("#submitProjectForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit project form
		$("#submitProjectForm").unbind('submit').bind('submit', function() {

            console.log("inserting new project");
			// form validation
			var projectCode = $("#projectCode").val();
			var projectName = $("#projectName").val();
            var projectStatus = $("#projectStatus").val();
            var eventName = $("#eventName").val();

	
			if(projectCode == "") {
				$("#projectCode").after('<p class="text-danger">Project Code field is required</p>');
				//$('#projectName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#projectCode").find('.text-danger').remove();
				// success out for form 
				//$("#projectName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(projectName == "") {
				$("#projectName").after('<p class="text-danger">Project Name field is required</p>');
				//$('#projectName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#projectName").find('.text-danger').remove();
				// success out for form 
				//$("#projectName").closest('.form-group').addClass('has-success');	  	
			}	// /else

/* 			if(!eventName) {
				$("#eventName").after('<p class="text-danger">Project Name field is required</p>');
				//$('#projectName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#eventName").find('.text-danger').remove();
				// success out for form 
				//$("#projectName").closest('.form-group').addClass('has-success');	  	
			}	// /else */

            if(!projectStatus) {
				$("#projectStatus").after('<p class="text-danger">Project Status field is required</p>');
				//$('#projectStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#projectStatus").find('.text-danger').remove();
				// success out for form 
				//$("#projectStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(projectCode && projectName && projectStatus) {
                // submit loading button
				$("#createProjectBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);
                console.log("Before Calling ajax");
                console.log(form.attr('action'));
                console.log(form.attr('method'));
/*                 console.log(formData.get('projectCode'));
                console.log(formData.get('projectName'));
                console.log(formData.get('projectStatus')); */
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
							$("#createProjectBtn").button('reset');
							
							$("#submitProjectForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-project-messages').html('<div class="alert alert-success">'+
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
							manageProjectTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit project form

    }); // /add project modal btn clicked
});
    function editProject(projectId) {
        if(projectId) {
            $("#projectId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedProject.php',
                type: 'post',
                data: {projectId: projectId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.project_image);
                    // modal spinner
                    //alert(response.project_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getProjectImage").attr('src', 'stock/'+response.project_image);
    
                    $("#editProjectImage").fileinput({		      
                    });  
    
                    // $("#editProjectImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.project_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // project id 
                    $(".editProjectFooter").append('<input type="hidden" name="projectId" id="projectId" value="'+response.project_id+'" />');				
                    $(".editProjectPhotoFooter").append('<input type="hidden" name="projectId" id="projectId" value="'+response.project_id+'" />');				
                    
                    // project code
                    $("#editProjectCode").val(response.project_code);
                    // project name
                    $("#editProjectName").val(response.project_name);
                    // event name
                    $("#editEventName").val(response.event_id);
                    // status
                    $("#editProjectStatus").val(response.active_flag);
    
                    // update the project data function
                    $("#editProjectForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ProjectForm');
                        // form validation
                        var projectCode = $("#editProjectCode").val();
                        var projectName = $("#editProjectName").val();
                        var projectStatus = $("#editProjectStatus").val();
                        var eventName = $("#editEventName").val();

                        if(projectCode == "") {
                            $("#editProjectCode").after('<p class="text-danger">Project Code field is required</p>');
                            //$('#editProjectCode').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProjectCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProjectCode").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(projectName == "") {
                            $("#editProjectStatus").after('<p class="text-danger">Project Name field is required</p>');
                            //$('#editProjectStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProjectStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProjectStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else
/*                         if(!eventName) {
                            $("#editProjectStatus").after('<p class="text-danger">Project Status field is required</p>');
                            //$('#editProjectStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProjectStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProjectStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else */					
                        if(!projectStatus) {
                            $("#editProjectStatus").after('<p class="text-danger">Project Status field is required</p>');
                            //$('#editProjectStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProjectStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProjectStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(projectCode && projectName && projectStatus) {
                            // submit loading button

                            $("#editProjectBtn").button('loading');
    
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
                                        $("#editProjectBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-project-messages').html('<div class="alert alert-success">'+
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
                                        manageProjectTable.ajax.reload(null, true);
    
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
                    }); // update the project data function
                } // /success function
            }); // /ajax to fetch project image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit project function

    function removeProject(projectId) {
        console.log("inside: removeProject("+projectId+")");
        if(projectId) {
            // remove project button clicked
            $("#removeProjectBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeProjectBtn clicked");
                $("#removeProjectBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeProject.php',
                    type: 'post',
                    data: {projectId: projectId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeProjectBtn").button('reset');
                        if(response.success == true) {
                            // remove project modal
                            $("#removeProjectModal").modal('hide');
    
                            // update the project table
                            manageProjectTable.ajax.reload(null, false);
    
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
                            $(".removeProjectMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the project
                return false;
            }); // /remove project btn clicked
        } // /if projectid
    } // /remove project function
    
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
