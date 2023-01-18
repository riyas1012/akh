var manageSiteTable;

$(document).ready(function() {
	// top nav bar 
    $('#navSite').addClass('active');
    $('#navHome').removeClass('active');

	// manage site data table
	manageSiteTable = $('#manageSiteTable').DataTable({
		ajax: 'php_action/fetchSite.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add site modal btn clicked
	$("#addSiteModalBtn").unbind('click').bind('click', function() {
		// // site form reset
		$("#submitSiteForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit site form
		$("#submitSiteForm").unbind('submit').bind('submit', function() {

            console.log("inserting new site");
			// form validation
			var siteCode = $("#siteCode").val();
			var siteName = $("#siteName").val();
            var siteStatus = $("#siteStatus").val();
            var venueName = $("#venueName").val();

	
			if(siteCode == "") {
				$("#siteCode").after('<p class="text-danger">Site Code field is required</p>');
				//$('#siteName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#siteCode").find('.text-danger').remove();
				// success out for form 
				//$("#siteName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(siteName == "") {
				$("#siteName").after('<p class="text-danger">Site Name field is required</p>');
				//$('#siteName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#siteName").find('.text-danger').remove();
				// success out for form 
				//$("#siteName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!siteStatus) {
				$("#siteStatus").after('<p class="text-danger">Site Status field is required</p>');
				//$('#siteStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#siteStatus").find('.text-danger').remove();
				// success out for form 
				//$("#siteStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!venueName) {
				$("#venueName").after('<p class="text-danger">Site Status field is required</p>');
				//$('#siteStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#venueName").find('.text-danger').remove();
				// success out for form 
				//$("#siteStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

            if(siteCode && siteName && siteStatus && venueName) {
                // submit loading button
				$("#createSiteBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);
                console.log("Before Calling ajax");
                console.log(form.attr('action'));
                console.log(form.attr('method'));
/*                 console.log(formData.get('siteCode'));
                console.log(formData.get('siteName'));
                console.log(formData.get('siteStatus')); */
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
							$("#createSiteBtn").button('reset');
							
							$("#submitSiteForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-site-messages').html('<div class="alert alert-success">'+
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
							manageSiteTable.ajax.reload(null, true);

							// remove text-error 
							$(".text-danger").remove();
							// remove from-group error
							//$(".form-group").removeClass('has-error').removeClass('has-success');

						} // /if response.success
						
					} // /success function
				}); // /ajax function
			}	 // /if validation is ok 					

			return false;
		}); // /submit site form

    }); // /add site modal btn clicked
});
    function editSite(siteId) {
        if(siteId) {
            $("#siteId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedSite.php',
                type: 'post',
                data: {siteId: siteId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.site_image);
                    // modal spinner
                    //alert(response.site_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getSiteImage").attr('src', 'stock/'+response.site_image);
    
                    $("#editSiteImage").fileinput({		      
                    });  
    
                    // $("#editSiteImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.site_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // site id 
                    $(".editSiteFooter").append('<input type="hidden" name="siteId" id="siteId" value="'+response.site_id+'" />');				
                    $(".editSitePhotoFooter").append('<input type="hidden" name="siteId" id="siteId" value="'+response.site_id+'" />');				
                    
                    // site code
                    $("#editSiteCode").val(response.site_code);
                    // site name
                    $("#editSiteName").val(response.site_name);
                    // venue name
                    $("#editVenueName").val(response.venue_id);
                    // status
                    $("#editSiteStatus").val(response.active_flag);
    
                    // update the site data function
                    $("#editSiteForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit SiteForm');
                        // form validation
                        var siteCode = $("#editSiteCode").val();
                        var siteName = $("#editSiteName").val();
                        var venueName = $("#editVenueName").val();
                        var siteStatus = $("#editSiteStatus").val();

                        if(siteCode == "") {
                            $("#editSiteCode").after('<p class="text-danger">Site Code field is required</p>');
                            //$('#editSiteCode').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSiteCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSiteCode").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(siteName == "") {
                            $("#editSiteName").after('<p class="text-danger">Site Name field is required</p>');
                            //$('#editSiteName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSiteName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSiteName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(!siteStatus) {
                            $("#editSiteStatus").after('<p class="text-danger">Site Status field is required</p>');
                            //$('#editSiteStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editSiteStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editSiteStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(!venueName) {
                            $("#editVenueName").after('<p class="text-danger">Site Status field is required</p>');
                            //$('#editSiteStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editVenueName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editVenueStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					

                        if(siteCode && siteName && siteStatus && venueName) {
                            // submit loading button

                            $("#editSiteBtn").button('loading');
    
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
                                        $("#editSiteBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-site-messages').html('<div class="alert alert-success">'+
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
                                        manageSiteTable.ajax.reload(null, true);
    
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
                    }); // update the site data function
                } // /success function
            }); // /ajax to fetch site image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit site function

    function removeSite(siteId) {
        console.log("inside: removeSite("+siteId+")");
        if(siteId) {
            // remove site button clicked
            $("#removeSiteBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeSiteBtn clicked");
                $("#removeSiteBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeSite.php',
                    type: 'post',
                    data: {siteId: siteId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeSiteBtn").button('reset');
                        if(response.success == true) {
                            // remove site modal
                            $("#removeSiteModal").modal('hide');
    
                            // update the site table
                            manageSiteTable.ajax.reload(null, false);
    
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
                            $(".removeSiteMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the site
                return false;
            }); // /remove site btn clicked
        } // /if siteid
    } // /remove site function
    
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
