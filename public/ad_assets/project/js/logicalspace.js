var manageLogicalspaceTable;

$(document).ready(function() {
	// top nav bar 
    $('#navLogicalspace').addClass('active');
    $('#navHome').removeClass('active');

	// manage logicalspace data table
	manageLogicalspaceTable = $('#manageLogicalspaceTable').DataTable({
		ajax: 'php_action/fetchLogicalspace.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add logicalspace modal btn clicked
	$("#addLogicalspaceModalBtn").unbind('click').bind('click', function() {
        console.log("Logicalspace Modal button pressed.");
		// // logicalspace form reset
		$("#submitLogicalspaceForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit logicalspace form
		$("#submitLogicalspaceForm").unbind('submit').bind('submit', function() {

            console.log("inserting new logicalspace");
			// form validation
			var logicalspaceName = $("#logicalspaceName").val();
            var logicalspaceStatus = $("#logicalspaceStatus").val();

			if(logicalspaceName == "") {
				$("#logicalspaceName").after('<p class="text-danger">Logicalspace Name field is required</p>');
				//$('#logicalspaceName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#logicalspaceName").find('.text-danger').remove();
				// success out for form 
				//$("#logicalspaceName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!logicalspaceStatus) {
				$("#logicalspaceStatus").after('<p class="text-danger">Logicalspace Status field is required</p>');
				//$('#logicalspaceStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#logicalspaceStatus").find('.text-danger').remove();
				// success out for form 
				//$("#logicalspaceStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(logicalspaceName && logicalspaceStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createLogicalspaceBtn").button('loading');

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
                console.log(formData.get('logicalspaceName'));
                console.log(formData.get('logicalspaceStatus')); */
                console.log($('#submitLogicalspaceForm').serialize());
				$.ajax({
/* 					url : 'php_action/createLogicalspace.php',
					type: 'post',
					data: $('#submitLogicalspaceForm').serialize(),
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
							$("#createLogicalspaceBtn").button('reset');
							
							$("#submitLogicalspaceForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-logicalspace-messages').html('<div class="alert alert-success">'+
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
							manageLogicalspaceTable.ajax.reload(null, true);

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
		}); // /submit logicalspace form

    }); // /add logicalspace modal btn clicked
});
    function editLogicalspace(logicalspaceId) {
        if(logicalspaceId) {
            $("#logicalspaceId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            console.log(logicalspaceId);
            $.ajax({
                url: 'php_action/fetchSelectedLogicalspace.php',
                type: 'post',
                data: {logicalspaceId: logicalspaceId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.logicalspace_image);
                    // modal spinner
                    //alert(response.logicalspace_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
    
                    // $("#editLogicalspaceImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.logicalspace_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // logicalspace id 
                    $(".editLogicalspaceFooter").append('<input type="hidden" name="logicalspaceId" id="logicalspaceId" value="'+response.logical_space_id+'" />');				
                   // $(".editLogicalspacePhotoFooter").append('<input type="hidden" name="logicalspaceId" id="logicalspaceId" value="'+response.logicalspace_id+'" />');				
                    
                    // logicalspace code
                    console.log(response.logical_space_code);
                    $("#editLogicalspaceCode").val(response.logical_space_code);
                    // logicalspace name
                    console.log(response.logical_space_name);
                    $("#editLogicalspaceName").val(response.logical_space_name);
                    // status
                    $("#editLogicalspaceStatus").val(response.active_flag);
                    // Subcat name
                    $("#editSubcatName").val(response.subcat_id);

                    // update the logicalspace data function
                    $("#editLogicalspaceForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit LogicalspaceForm');
                        // form validation
                        var logicalspaceCode = $("#editLogicalspaceCode").val();
                        var logicalspaceName = $("#editLogicalspaceName").val();
                        var logicalspaceStatus = $("#editLogicalspaceStatus").val();
                        var subcatName =  $("#editSubcatName").val();
                                    
                        if(logicalspaceCode == "") {
                            $("#editLogicalspaceCode").after('<p class="text-danger">Logicalspace Name field is required</p>');
                            //$('#editLogicalspaceName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editLogicalspaceCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editLogicalspaceName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(logicalspaceName == "") {
                            $("#editLogicalspaceName").after('<p class="text-danger">Logicalspace Name field is required</p>');
                            //$('#editLogicalspaceName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editLogicalspaceName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editLogicalspaceName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!logicalspaceStatus) {
                            $("#editLogicalspaceStatus").after('<p class="text-danger">Logicalspace Status field is required</p>');
                            //$('#editLogicalspaceStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editLogicalspaceStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editLogicalspaceStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(!subcatName) {
                            $("#editSubcatName").after('<p class="text-danger">Logicalspace Status field is required</p>');
                            //$('#editLogicalspaceStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSubcatName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editLogicalspaceStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(logicalspaceName && logicalspaceStatus && subcatName && logicalspaceCode) {
                            // submit loading button

                            $("#editLogicalspaceBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log($('#editLogicalspaceForm').serialize());
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
                                        $("#editLogicalspaceBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-logicalspace-messages').html('<div class="alert alert-success">'+
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
                                        manageLogicalspaceTable.ajax.reload(null, true);
    
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
                    }); // update the logicalspace data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } // /Error function
            }); // /ajax to fetch logicalspace image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit logicalspace function

    function removeLogicalspace(logicalspaceId) {
        console.log("inside: removeLogicalspace("+logicalspaceId+")");
        if(logicalspaceId) {
            // remove logicalspace button clicked
            $("#removeLogicalspaceBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeLogicalspaceBtn clicked");
                $("#removeLogicalspaceBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeLogicalspace.php',
                    type: 'post',
                    data: {logicalspaceId: logicalspaceId},
                    dataType: 'json',
                    success:function(response) {
                        console.log(response);
                        // loading remove button
                        $("#removeLogicalspaceBtn").button('reset');
                        if(response.success == true) {
                            // remove logicalspace modal
                            $("#removeLogicalspaceModal").modal('hide');
    
                            // update the logicalspace table
                            manageLogicalspaceTable.ajax.reload(null, false);
    
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
                            $(".removeLogicalspaceMessages").html('<div class="alert alert-success">'+
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
                        console.log('Error: ' + errorMessage);
                    } // /Error function
    
                }); // /ajax fucntion to remove the logicalspace
                return false;
            }); // /remove logicalspace btn clicked
        } // /if logicalspaceid
    } // /remove logicalspace function
    
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
