var manageCategoryTable;

$(document).ready(function() {
	// top nav bar 
    $('#navCategory').addClass('active');
    $('#navHome').removeClass('active');

	// manage category data table
	manageCategoryTable = $('#manageCategoryTable').DataTable({
		ajax: 'php_action/fetchCategory.php',
        order: [],
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ]
    });
	// add category modal btn clicked
	$("#addCategoryModalBtn").unbind('click').bind('click', function() {
        console.log("Category Modal button pressed.");
		// // category form reset
		$("#submitCategoryForm")[0].reset();		

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		// submit category form
		$("#submitCategoryForm").unbind('submit').bind('submit', function() {

            console.log("inserting new category");
			// form validation
			var categoryName = $("#categoryName").val();
            var categoryStatus = $("#categoryStatus").val();

			if(categoryName == "") {
				$("#categoryName").after('<p class="text-danger">Category Name field is required</p>');
				//$('#categoryName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#categoryName").find('.text-danger').remove();
				// success out for form 
				//$("#categoryName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(categoryStatus == "") {
				$("#categoryStatus").after('<p class="text-danger">Category Status field is required</p>');
				//$('#categoryStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#categoryStatus").find('.text-danger').remove();
				// success out for form 
				//$("#categoryStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(categoryName && categoryStatus) {
                // submit loading button
                console.log("Before Calling ajax");

				$("#createCategoryBtn").button('loading');

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
                console.log(formData.get('categoryName'));
                console.log(formData.get('categoryStatus')); */
                console.log($('#submitCategoryForm').serialize());
				$.ajax({
/* 					url : 'php_action/createCategory.php',
					type: 'post',
					data: $('#submitCategoryForm').serialize(),
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
							$("#createCategoryBtn").button('reset');
							
							$("#submitCategoryForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-category-messages').html('<div class="alert alert-success">'+
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
							manageCategoryTable.ajax.reload(null, true);

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
		}); // /submit category form

    }); // /add category modal btn clicked
});
    function editCategory(categoryId) {
        if(categoryId) {
            $("#categoryId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedCategory.php',
                type: 'post',
                data: {categoryId: categoryId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.category_image);
                    // modal spinner
                    //alert(response.category_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getCategoryImage").attr('src', 'stock/'+response.category_image);
    
                    $("#editCategoryImage").fileinput({		      
                    });  
    
                    // $("#editCategoryImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.category_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // category id 
                    $(".editCategoryFooter").append('<input type="hidden" name="categoryId" id="categoryId" value="'+response.categories_id+'" />');				
                   // $(".editCategoryPhotoFooter").append('<input type="hidden" name="categoryId" id="categoryId" value="'+response.categories_id+'" />');				
                    
                    // category name
                    $("#editCategoryName").val(response.categories_name);
                    // status
                    $("#editCategoryStatus").val(response.categories_active);
                        // project name

                    // update the category data function
                    $("#editCategoryForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit CategoryForm');
                        // form validation
                        var categoryName = $("#editCategoryName").val();
                        var categoryStatus = $("#editCategoryStatus").val();
                                    
    
                        if(categoryName == "") {
                            $("#editCategoryName").after('<p class="text-danger">Category Name field is required</p>');
                            //$('#editCategoryName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editCategoryName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editCategoryName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(categoryStatus == "") {
                            $("#editCategoryStatus").after('<p class="text-danger">Category Status field is required</p>');
                            //$('#editCategoryStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editCategoryStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editCategoryStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(categoryName && categoryStatus) {
                            // submit loading button

                            $("#editCategoryBtn").button('loading');
    
                            var form = $(this);
                            var formData = new FormData(this);
                            console.log(formData);
                            console.log(form.attr('action'));
                            console.log($('#editCategoryForm').serialize());
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
                                        $("#editCategoryBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-category-messages').html('<div class="alert alert-success">'+
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
                                        manageCategoryTable.ajax.reload(null, true);
    
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
                    }); // update the category data function
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: ' + errorMessage);
                } // /success function
            }); // /ajax to fetch category image      
        } else {
            alert('error please refresh the page');
        }
    } // /edit category function

    function removeCategory(categoryId) {
        console.log("inside: removeCategory("+categoryId+")");
        if(categoryId) {
            // remove category button clicked
            $("#removeCategoryBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeCategoryBtn clicked");
                $("#removeCategoryBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeCategory.php',
                    type: 'post',
                    data: {categoryId: categoryId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeCategoryBtn").button('reset');
                        if(response.success == true) {
                            // remove category modal
                            $("#removeCategoryModal").modal('hide');
    
                            // update the category table
                            manageCategoryTable.ajax.reload(null, false);
    
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
                            $(".removeCategoryMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the category
                return false;
            }); // /remove category btn clicked
        } // /if categoryid
    } // /remove category function
    
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
