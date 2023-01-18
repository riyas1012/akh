var manageProductTable;

$(document).ready(function() {
	// top nav bar 
    $('#navProduct').addClass('active');
    $('#navHome').removeClass('active');

    var divProduct = $(".div-product").text();

    if (divProduct == 'ro'){
	// manage product data table
        manageProductTable = $('#manageProductTable').DataTable({
            ajax:  'php_action/fetchProduct_ro.php',
            order: [],
            responsive: true
        });
    } else {
	// manage product data table
        manageProductTable = $('#manageProductTable').DataTable({
            ajax: 'php_action/fetchProduct.php',
            order: [],
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            responsive: true
        });
    
    }
    $("#quantity, #editQuantity").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
           //display error message
           $("#digitsOnlyerrmsg, #editDigitsOnlyerrmsg").html("Digits Only").show().fadeOut("slow");
                  return false;
       }
    });
	// add product modal btn clicked
	$("#addProductModalBtn").unbind('click').bind('click', function() {
		// // product form reset
		$("#submitProductForm")[0].reset();

		// remove text-error 
		$(".text-danger").remove();
		// remove from-group error
		$(".form-group").removeClass('has-error').removeClass('has-success');

		$("#productImage").fileinput({
	      overwriteInitial: true,
		    maxFileSize: 2500,
		    showClose: false,
		    showCaption: false,
		    browseLabel: '',
		    removeLabel: '',
		    browseIcon: '<i class="fa fa-folder-open-o fa-2x"></i>',
		    removeIcon: '<i class="fa fa-times fa-2x"></i>',
		    removeTitle: 'Cancel or reset changes',
		    elErrorContainer: '#kv-avatar-errors-1',
		    msgErrorClass: 'alert alert-block alert-danger',
		    //defaultPreviewContent: '<img src="assets/images/photo_default.png" alt="Profile Image" style="width:100%;">',
		    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
	  		allowedFileExtensions: ["jpeg", "JPEG", "jpg", "png", "gif", "JPG", "PNG", "GIF"]
			});   

		// submit product form
		$("#submitProductForm").unbind('submit').bind('submit', function() {

            console.log("inserting new product");
			// form validation
			var productImage = $("#productImage").val();
			var productName = $("#productName").val();
			var productCode = $("#productCode").val();
			var productDescription = $("#productDescription").val();
			var itemCategoryId = $("#itemCategoryName").val();
			var itemSubcatId = $("#itemSubcatName").val();
            var unitSize = $("#unitSize").val();
            var packageSize = $("#packageSize").val();
            var productStatus = $("#productStatus").val();

/* 			if(productImage == "") {
				$("#productImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
				//$('#productImage').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productImage").find('.text-danger').remove();
				// success out for form 
				//$("#productImage").closest('.form-group').addClass('has-success');	  	
			}	// /else
 */
			if(productName == "") {
				$("#productName").after('<p class="text-danger">Product Name field is required</p>');
				//$('#productName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productName").find('.text-danger').remove();
				// success out for form 
				//$("#productName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productCode == "") {
				$("#productCode").after('<p class="text-danger">Quantity field is required</p>');
				//$('#quantity').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productCode").find('.text-danger').remove();
				// success out for form 
				//$("#quantity").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(productDescription == "") {
				$("#productDescription").after('<p class="text-danger">Rate field is required</p>');
				//$('#rate').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productDescription").find('.text-danger').remove();
				// success out for form 
				//$("#rate").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!itemCategoryId) {
				$("#itemCategoryName").after('<p class="text-danger">Brand Name field is required</p>');
				//$('#brandName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemCategoryName").find('.text-danger').remove();
				// success out for form 
				//$("#brandName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!itemSubcatId) {
				$("#itemSubcatName").after('<p class="text-danger">Category Name field is required</p>');
				//$('#categoryName').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#itemSubcatName").find('.text-danger').remove();
				// success out for form 
				//$("#categoryName").closest('.form-group').addClass('has-success');	  	
			}	// /else

			if(!productStatus) {
				$("#productStatus").after('<p class="text-danger">Product Status field is required</p>');
				//$('#productStatus').closest('.form-group').addClass('has-error');
			}	else {
				// remov error text field
				$("#productStatus").find('.text-danger').remove();
				// success out for form 
				//$("#productStatus").closest('.form-group').addClass('has-success');	  	
			}	// /else

            if(productName && productDescription 
                && productCode && itemCategoryId && itemSubcatId && productStatus) { 
                // submit loading button
				$("#createProductBtn").button('loading');

				var form = $(this);
				var formData = new FormData(this);
                console.log($("#submitProductForm").serialize());
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
							$("#createProductBtn").button('reset');
							
							$("#submitProductForm")[0].reset();

							$("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
																	
							// shows a successful message after operation
							$('#add-product-messages').html('<div class="alert alert-success">'+
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
							manageProductTable.ajax.reload(null, true);

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
		}); // /submit product form

    }); // /add product modal btn clicked

	$( "#itemCategoryName" ).change(function () {
        console.log("itemCategoryName selection");
        var lookupValue = $(this).val();
        var action = 'prodcat';	
        console.log("lookupValue: "+lookupValue);
        if(lookupValue) {
        console.log("inside lookupValue");	
            $.ajax({
                url: "php_action/selection.php",
                type: "post",
                dataType: "json",
                data: {'id':lookupValue, action:action},
                 success: function(data) {
                    //alert("3");
                    $('#itemSubcatName').empty();
                    $('#itemSubcatName').append('<option value="">~~SELECT~~</option>');
                    $.each(data, function(key, value) {
                        $('#itemSubcatName').append('<option value="'+ key +'">'+ value +'</option>');
                    });
                }, // /success function
                error: function(jqXhr, textStatus, errorMessage) { // error callback 
                    console.log('Error: '+jqXhr.responseText +' '+ errorMessage);
                } // /error function 
            });
    //alert('4');
    
        }else{
    //		alert('in the else');
            $('#itemSubcatName').empty();
            $('#itemSubcatName').append('<option value="0">~~SELECT~~</option>');
        }
    });
    
});
    function editProduct(productId) {
        if(productId) {
            $("#productId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedProduct.php',
                type: 'post',
                data: {productId: productId},
                dataType: 'json',
                success:function(response) {		
                // alert(response.product_image);
                    // modal spinner
                    //alert(response.product_id);
                    //$('.div-loading').addClass('div-hide');
                    $('.div-loading').hide();
                    // modal div
                    //$('.div-result').removeClass('div-hide');				
                    $('.div-result').show();				
    
                    $("#getProductImage").attr('src', 'stock/'+response.product_image);
    
                    $("#editProductImage").fileinput({		      
                    });  
    
                    // $("#editProductImage").fileinput({
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
                 //    defaultPreviewContent: '<img src="stock/'+response.product_image+'" alt="Profile Image" style="width:100%;">',
                 //    layoutTemplates: {main2: '{preview} {remove} {browse}'},								    
              // 		allowedFileExtensions: ["jpg", "png", "gif", "JPG", "PNG", "GIF"]
                    // });  
    
                    // product id 
                    $(".editProductFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
                    $(".editProductPhotoFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
                    
                    // product name
                    $("#editProductName").val(response.product_name);
                    // quantity
                    $("#editProductCode").val(response.product_code);
                    // rate
                    $("#editProductDescription").val(response.product_description);
                    // brand name
                    $("#editItemCategoryName").val(response.item_category_id);
                    // category name
                    $("#editItemSubcatName").val(response.item_subcat_id);
                    // category name
                    $("#editProductUnitsize").val(response.unit_size);
                    // category name
                    $("#editProductPackagesize").val(response.package_size);
                    // status
                    $("#editProductStatus").val(response.active);

                    $("#editProductPowerRequired").val(response.power_required);
                    $("#editProductConsumption").val(response.power_consumption);
                    $("#editProductNumberSockets").val(response.number_of_socket);
    
                    // update the product data function
                    $("#editProductForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ProductForm');
                        // form validation
                        var productImage = $("#editProductImage").val();
                        var productName = $("#editProductName").val();
                        var productStatus = $("#editProductStatus").val();
                        var productCode = $("#editProductCode").val();
                        var productDescription = $("#editProductDescription").val();
                        var itemCategoryId = $("#editItemCategoryName").val();
                        var itemSubcatId = $("#editItemSubcatName").val();
                        var unitSize = $("#editProductUnitsize").val();
                        var packageSize = $("#editProductPackagesize").val();

                        var powerRequired = $("#editProductPowerRequired").val();
                        var powerConsumption = $("#editProductConsumption").val();
                        var numberSockets = $("#editProductNumberSockets").val();
    
                        if(productName == "") {
                            $("#editProductName").after('<p class="text-danger">Product Name field is required</p>');
                            //$('#editProductName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProductName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(productCode == "") {
                            $("#editProductCode").after('<p class="text-danger">Quantity field is required</p>');
                            //$('#editQuantity').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editQuantity").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(productDescription == "") {
                            $("#editProductDescription").after('<p class="text-danger">Rate field is required</p>');
                            //$('#editRate').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductDescription").find('.text-danger').remove();
                            // success out for form 
                            //$("#editRate").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!itemCategoryId) {
                            $("#editItemCategoryName").after('<p class="text-danger">Brand Name field is required</p>');
                            //$('#editBrandName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemCategoryName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editBrandName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!itemSubcatId) {
                            $("#editItemSubcatName").after('<p class="text-danger">Category Name field is required</p>');
                            //$('#editCategoryName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemSubcatName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editCategoryName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!productStatus) {
                            $("#editProductStatus").after('<p class="text-danger">Product Status field is required</p>');
                            //$('#editProductStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProductStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(productName && productCode && productDescription && productStatus &&
                            itemCategoryId && itemSubcatId) {
                            // submit loading button

                            $("#editProductBtn").button('loading');
    
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
                                        $("#editProductBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-product-messages').html('<div class="alert alert-success">'+
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
                                        manageProductTable.ajax.reload(null, true);
    
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
                    }); // update the product data function
    
                    // update the product image				
                    $("#updateProductImageForm").unbind('submit').bind('submit', function() {					
                        // form validation
                        var productImage = $("#editProductImage").val();					
                        
                        if(productImage == "") {
                            $("#editProductImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
                            $('#editProductImage').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductImage").find('.text-danger').remove();
                            // success out for form 
                            $("#editProductImage").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(productImage) {
                            // submit loading button
                            $("#editProductImageBtn").button('loading');

                            var form = $(this);
                            var formData = new FormData(this);
   // alert(fomrData);
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
                                        $("#editProductImageBtn").button('reset');
                                        $('#edit-productPhoto-error').hide();
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-productPhoto-messages').html('<div class="alert alert-success">'+
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
                                        manageProductTable.ajax.reload(null, true);
    
                                        $(".fileinput-remove-button").click();
    
                                        $.ajax({
                                            url: 'php_action/fetchProductImageUrl.php?i='+productId,
                                            type: 'post',
                                            success:function(response) {
                                            $("#getProductImage").attr('src', response);		
                                            }
                                        });																		
    
                                        // remove text-error 
                                        $(".text-danger").remove();
                                        // remove from-group error
                                        $(".form-group").removeClass('has-error').removeClass('has-success');
    
                                    } else {
                                        $('#edit-productPhoto-error').html('<div class="alert alert-danger">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong><i class="fa fa-times fa-2x"></i></strong> '+ response.messages +
                              '</div>');
                                    } // /if response.success
                                    
                                } // /success function
                            }); // /ajax function
                        }	 // /if validation is ok 					
    
                        return false;
                    }); // /update the product image
    
                } // /success function
            }); // /ajax to fetch product image
    
                    
        } else {
            alert('error please refresh the page');
        }
    } // /edit product function

    function showProduct(productId) {
        if(productId) {
            $("#productId").remove();		
            // remove text-error 
            $(".text-danger").remove();
            // remove from-group error
            $(".form-group").removeClass('has-error').removeClass('has-success');
            // modal spinner
            $('.div-loading').show();
            // modal div
            $('.div-result').hide();
            $.ajax({
                url: 'php_action/fetchSelectedProduct.php',
                type: 'post',
                data: {productId: productId},
                dataType: 'json',
                success:function(response) {		
                 //alert(response.product_image);

                    $('.div-loading').hide();			
                    $('.div-result').show();				
                    $("#productImage").attr('src', 'stock/'+response.product_image);
    
                    // product id 
                    $(".editProductFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
                    $(".editProductPhotoFooter").append('<input type="hidden" name="productId" id="productId" value="'+response.product_id+'" />');				
                    
                    // product name
                    $("#productName").text(response.product_name);
                    // quantity
                    $("#editProductCode").val(response.product_code);
                    // rate
                    $(".product-description").text(response.product_description);
                    // brand name
                    $("#editItemCategoryName").val(response.item_category_id);
                    // category name
                    $("#editItemSubcatName").val(response.item_subcat_id);
                    // category name
                    $(".product-unitSize").text('Unit Size :'+response.unit_size);
                    // category name
                    $(".product-packageSize").text('Package Size :'+response.package_size);
                    // status
                    $("#editProductStatus").val(response.active);
    
                    // update the product data function
                    $("#editProductForm").unbind('submit').bind('submit', function() {
                        console.log('submitting edit ProductForm');
                        // form validation
                        var productImage = $("#editProductImage").val();
                        var productName = $("#editProductName").val();
                        var productStatus = $("#editProductStatus").val();
                        var productCode = $("#editProductCode").val();
                        var productDescription = $("#editProductDescription").val();
                        var itemCategoryId = $("#editItemCategoryName").val();
                        var itemSubcatId = $("#editItemSubcatName").val();
                        var unitSize = $("#editProductUnitsize").val();
                        var packageSize = $("#editProductPackagesize").val();
    
                        if(productName == "") {
                            $("#editProductName").after('<p class="text-danger">Product Name field is required</p>');
                            //$('#editProductName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProductName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(productCode == "") {
                            $("#editProductCode").after('<p class="text-danger">Quantity field is required</p>');
                            //$('#editQuantity').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductCode").find('.text-danger').remove();
                            // success out for form 
                            //$("#editQuantity").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(productDescription == "") {
                            $("#editProductDescription").after('<p class="text-danger">Rate field is required</p>');
                            //$('#editRate').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductDescription").find('.text-danger').remove();
                            // success out for form 
                            //$("#editRate").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!itemCategoryId) {
                            $("#editItemCategoryName").after('<p class="text-danger">Brand Name field is required</p>');
                            //$('#editBrandName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemCategoryName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editBrandName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!itemSubcatId) {
                            $("#editItemSubcatName").after('<p class="text-danger">Category Name field is required</p>');
                            //$('#editCategoryName').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editItemSubcatName").find('.text-danger').remove();
                            // success out for form 
                            //$("#editCategoryName").closest('.form-group').addClass('has-success');	  	
                        }	// /else
    
                        if(!productStatus) {
                            $("#editProductStatus").after('<p class="text-danger">Product Status field is required</p>');
                            //$('#editProductStatus').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductStatus").find('.text-danger').remove();
                            // success out for form 
                            //$("#editProductStatus").closest('.form-group').addClass('has-success');	  	
                        }	// /else					
    
                        if(productName && productCode && productDescription && productStatus &&
                            itemCategoryId && itemSubcatId) {
                            // submit loading button

                            $("#editProductBtn").button('loading');
    
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
                                        $("#editProductBtn").button('reset');																		
    
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-product-messages').html('<div class="alert alert-success">'+
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
                                        manageProductTable.ajax.reload(null, true);
    
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
                    }); // update the product data function
    
                    // update the product image				
                    $("#updateProductImageForm").unbind('submit').bind('submit', function() {					
                        // form validation
                        var productImage = $("#editProductImage").val();					
                        
                        if(productImage == "") {
                            $("#editProductImage").closest('.center-block').after('<p class="text-danger">Product Image field is required</p>');
                            $('#editProductImage').closest('.form-group').addClass('has-error');
                        }	else {
                            // remov error text field
                            $("#editProductImage").find('.text-danger').remove();
                            // success out for form 
                            $("#editProductImage").closest('.form-group').addClass('has-success');	  	
                        }	// /else
                        if(productImage) {
                            // submit loading button
                            $("#editProductImageBtn").button('loading');

                            var form = $(this);
                            var formData = new FormData(this);
   // alert(fomrData);
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
                                        $("#editProductImageBtn").button('reset');
                                        $('#edit-productPhoto-error').hide();
                                        $("html, body, div.modal, div.modal-content, div.modal-body").animate({scrollTop: '0'}, 100);
                                                                                
                                        // shows a successful message after operation
                                        $('#edit-productPhoto-messages').html('<div class="alert alert-success">'+
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
                                        manageProductTable.ajax.reload(null, true);
    
                                        $(".fileinput-remove-button").click();
    
                                        $.ajax({
                                            url: 'php_action/fetchProductImageUrl.php?i='+productId,
                                            type: 'post',
                                            success:function(response) {
                                            $("#getProductImage").attr('src', response);		
                                            }
                                        });																		
    
                                        // remove text-error 
                                        $(".text-danger").remove();
                                        // remove from-group error
                                        $(".form-group").removeClass('has-error').removeClass('has-success');
    
                                    } else {
                                        $('#edit-productPhoto-error').html('<div class="alert alert-danger">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong><i class="fa fa-times fa-2x"></i></strong> '+ response.messages +
                              '</div>');
                                    } // /if response.success
                                    
                                } // /success function
                            }); // /ajax function
                        }	 // /if validation is ok 					
    
                        return false;
                    }); // /update the product image
    
                } // /success function
            }); // /ajax to fetch product image
    
                    
        } else {
            alert('error please refresh the page');
        }
    } // /show product function


    function removeProduct(productId) {
        console.log("inside: removeProduct("+productId+")");
        if(productId) {
            // remove product button clicked
            $("#removeProductBtn").unbind('click').bind('click', function() {
                // loading remove button
                console.log("removeProductBtn clicked");
                $("#removeProductBtn").button('loading');
                $.ajax({
                    url: 'php_action/removeProduct.php',
                    type: 'post',
                    data: {productId: productId},
                    dataType: 'json',
                    success:function(response) {
                        // loading remove button
                        $("#removeProductBtn").button('reset');
                        if(response.success == true) {
                            // remove product modal
                            $("#removeProductModal").modal('hide');
    
                            // update the product table
                            manageProductTable.ajax.reload(null, false);
    
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
                            $(".removeProductMessages").html('<div class="alert alert-success">'+
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
                }); // /ajax fucntion to remove the product
                return false;
            }); // /remove product btn clicked
        } // /if productid
    } // /remove product function
    
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
