var manageSubcatTable;

$(document).ready(function() {
	// top nav bar 
    $('#navSubcat').addClass('active');
    $('#navHome').removeClass('active');

	// manage subcat data table
	manageSubcatTable = $('#manageSubcatTable').DataTable({
		ajax: 'php_action/fetchSubcat.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add subcat modal btn clicked
	$("#addSubcatModalBtn").unbind('click').bind('click', function() {
        console.log("Subcat Modal button pressed.");
		// // subcat form reset
		$("#submitSubcatForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit subcat form
		$("#submitSubcatForm").unbind('submit').bind('submit', function() {

            console.log("inserting new subcat");
			// form validation
			var subcatName = $("#subcatName").val();
            var subcatStatus = $("#subcatStatus").val();

			if(subcatName == "") {
				$("#subcatName").after('<p class="text-danger">Subcat Name field is required</p>');
				//$('#subcatName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#subcatName").find('.text-danger').remove();
				// success out for form 
				//$("#subcatName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(subcatStatus == "") {
				$("#subcatStatus").after('<p class="text-danger">Subcat Status field is required</p>');
				//$('#subcatStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#subcatStatus").find('.text-danger').remove();
				// success out for form 
				//$("#subcatStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(subcatName && subcatStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createSubcatBtn").button('loading');

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
                console.log(formData.get('subcatName'));
                console.log(formData.get('subcatStatus')); */
                console.log($('#submitSubcatForm').serialize());
				$.ajax({
/* 					url : 'php_action/createSubcat.php',
					type: 'post',
					data: $('#submitSubcatForm').serialize(),
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
							$("#createSubcatBtn").button('reset');
							
							$("#submitSubcatForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-subcat-messages').html('<div class="alert alert-success">'+
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
							manageSubcatTable.ajax.reload(null, true);

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
		}); // /submit subcat form

    }); // /add subcat modal btn clicked
});
    function editSubcat(subcatId) {
        if(subcatId) {
            $("#subcatId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            console.log(subcatId);
            $.ajax({
                url: 'php_action/fetchSelectedSubcat.php',
                type: 'post',
                data: {subcatId: subcatId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.subcat_image);
                    // modal spinner
                    //alert(response.subcat_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
    
                    // $("#editSubcatImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.subcat_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // subcat id 
                    $(".editSubcatFooter").append('<input type="hidden" name="subcatId" id="subcatId" value="'+response.subcat_id+'" />');				
                   // $(".editSubcatPhotoFooter").append('<input type="hidden" name="subcatId" id="subcatId" value="'+response.subcat_id+'" />');				
                    
                    // subcat name
                    console.log(response.subcat_name);
                    $("#editSubcatName").val(response.subcat_name);
                    // status
                    $("#editSubcatStatus").val(response.active_flag);
                    // Category name
                    $("#editCategoryName").val(response.category_id);
                        // project name

                    // update the subcat data function
                    $("#editSubcatForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit SubcatForm');
                        // form validation
                        var subcatName = $("#editSubcatName").val();
                        var subcatStatus = $("#editSubcatStatus").val();
                        var categoryName =  $("#editCategoryName").val();
                                    
    
                        if(subcatName == "") {
                            $("#editSubcatName").after('<p class="text-danger">Subcat Name field is required</p>');
                            //$('#editSubcatName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSubcatName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSubcatName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!subcatStatus) {
                            $("#editSubcatStatus").after('<p class="text-danger">Subcat Status field is required</p>');
                            //$('#editSubcatStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSubcatStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSubcatStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(!categoryName) {
                            $("#editCategoryName").after('<p class="text-danger">Subcat Status field is required</p>');
                            //$('#editSubcatStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editCategoryName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSubcatStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(subcatName && subcatStatus && categoryName) {
                            // submit loading button

                            $("#editSubcatBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log($('#editSubcatForm').serialize());
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
                                        $("#editSubcatBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-subcat-messages').html('<div class="alert alert-success">'+
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
                                        manageSubcatTable.ajax.reload(null, true);
    
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
                    }); // update the subcat data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } // /success function
            }); // /ajax to fetch subcat image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit subcat function

    function removeSubcat(subcatId) {
        console.log("inside: removeSubcat("+subcatId+")");
        if(subcatId) {
            // remove subcat button clicked
            $("#removeSubcatBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeSubcatBtn clicked");
                $("#removeSubcatBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeSubcat.php',
                    type: 'post',
                    data: {subcatId: subcatId},
                    dataType: 'json',
                    success:function(response) {
                        console.log(response);
                        // loading remove button
                        $("#removeSubcatBtn").button('reset');
                        if(response.success == true) {
                            // remove subcat modal
                            $("#removeSubcatModal").modal('hide');
    
                            // update the subcat table
                            manageSubcatTable.ajax.reload(null, false);
    
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
                            $(".removeSubcatMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the subcat
                return false;
            }); // /remove subcat btn clicked
        } // /if subcatid
    } // /remove subcat function
    
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
