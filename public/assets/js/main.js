'use strict';
$(document).ready(function(){
    var count = 0;
    var data = {}

    function validateEmail() {
        var email = document.getElementById('email').value;
        var emailfilter=/^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
            if(emailfilter.test(email) == false){				

                return false;
            }
            else
            {
                return true;
            }
    }
    $("#submit").on('click',function(ok){
        checkform()
        var dd = $("#dd").val();
        var mm = $("#mm").val();
        var yyyy = $("#yyyy").val();

        var dob = yyyy+"-"+mm+"-"+dd;
        // // var dob = moment("2016-10-19");
        // var date = moment(yyyy+"-"+mm+"-"+dd, 'YYYY-MM-DD', true);
        var date = moment(dob, 'YYYY-MM-DD', true);
        if(date.isValid()){
            data['dob'] = dob;
        }else{
$("#dd").addClass('required');
$("#mm").addClass('required');
$("#yyyy").addClass('required');
        }
    
        console.log(data)
        if($("#photo").val() == ''){
            $(".input-file-container").removeClass("requiredcb")
            $("#photo").removeClass("required")
            // $("#photo").addClass("requiredcb")
        }

        console.log($('.required').length)
        console.log($('.requiredcb').length)
        if($('.required').length == 0 && $('.requiredcb').length == 0 ){
            console.log("sending")
            $("#wait").show()

            var $data = new FormData();
            $data.append('title', 'Sample Photo Title');
            $data.append('file', $("#photo").get(0).files[0]);

            $.each(data, function(key, value){
                $data.append(key, value);
            })
            // processData & contentType should be set to false
            document.body.scrollTop = 0; 
            document.documentElement.scrollTop = 0; //
            
            $.ajax({
                type: 'POST',
                url: 'php/upload.php',
                data: $data,
                success: function(response) {
                $("#wait").hide()
                if(response != 'ok'){
                    // alert("Failed to upload photo. Please try again");
                    var error = JSON.stringify(response)+" from != ok";
                    var fname = $("#fname").val()
                    var lname = $("#lname").val()
                    var email = $("#email").val()
                    $.post("php/logs.php",{fname:fname,lname:lname,email:email,error:error},function(ok){
                        $(".thankBG").show()
                        $(".contentbg").hide()
                    })
                }else{
                    $(".thankBG").show()
                    $(".contentbg").hide()
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      'event' : 'formsubmit'
                    });
                  
                }
                    console.log("Success!",response)
                },
                error: function(err) {
                    // alert(err)
                    var error = JSON.stringify(err);
                    var fname = $("#fname").val()
                    var lname = $("#lname").val()
                    var email = $("#email").val()
                    $.post("php/logs.php",{fname:fname,lname:lname,email:email,error:error},function(ok){
                        $("#wait").hide()
                        $(".thankBG").show()
                        $(".contentbg").hide()
                    })
                },
                processData: false,
                contentType: false
            });

        }

    })
    $("#dob").focusout(function(){
        if($("#dob").val() != ''){
            $("#dob").attr('placeholder',"");
        }else{
            $("#dob").attr('placeholder',"Date of birth : ")
        }        
    })
    let checkform = function(){
        $(".form-control").each(function(){
            var input = $(this); 
            if($.trim($(input).val()) != ''){
                data[$(input).attr('id')] = $(input).val()
                $("#"+$(input).attr('id')).removeClass('required')
                $("#"+$(input).attr('id')).closest('.b-select-wrap').removeClass('required')
            }else{
                if($(input).attr('id') == 'gender' || $(input).attr('id') == 'nationality' || $(input).attr('id') == 'residence' ){
                    $("#"+$(input).attr('id')).closest('.b-select-wrap').addClass('required')
                }
                    $("#"+$(input).attr('id')).addClass('required')


                // console.log($(input).attr('id')," : "+$(input).val())

            }
        });
        if($.trim($("#email").val()) != $.trim($("#confirm_email").val()) || $.trim($("#confirm_email").val()) == ''){
            $("#email").addClass('required')
            $("#confirm_email").addClass('required')
        }else{
            $("#email").removeClass('required')
            $("#confirm_email").removeClass('required')
        }
        if(!validateEmail()){
            $("#email").addClass('required')
            $("#confirm_email").addClass('required')
        }

        if(!$("#term").is(':checked')){
            $("#term").addClass('requiredcb')
        }else{
            $("#term").removeClass('requiredcb')
        }
    }


    $('.number_only').keydown(function() {
		// console.log($(this).val());
		$(this).val($(this).val().replace(/\D/, ''));
	});
	$('.number_only').keyup(function() {
		// console.log($(this).val());
		$(this).val($(this).val().replace(/\D/, ''));
	});
})



$("#fb").on("click",function(){
    // var fbpopup = window.open("http://mrmdubai.com/supreme-committee/en/", "pop", "width=600, height=400, scrollbars=no");
    // return false;
    // var fbpopup = window.open("https://www.facebook.com/sharer/sharer.php?u=http://stackoverflow.com", "pop", "width=600, height=400, scrollbars=no");
    
    PopupCenter('https://www.facebook.com/sharer/sharer.php?u=https://seeyouin2022.co','pop','900','500');    
});


function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}



document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
      
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
});  
fileInput.addEventListener( "change", function( event ) {  
    var pathx = this.value;
    pathx = pathx.replace("C:\\fakepath\\",'').substring(0, 15)+"...";
    console.log(pathx)
    the_return.innerHTML = pathx;  
});  

