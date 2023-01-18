<html @if ($details['locale'] == 'ar') dir="rtl" lang="ar" @else lang="en-US" @endif>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <div @if ($details['locale'] == 'en') id="en_text" class="ltr" @else id="ar_text" class="rtl" @endif>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.dear')}}</p>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.application_email_heading')}}</p>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.application_submitted')}}  <b>{{$details['application_number']}}</b></p>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.application_submited_title')}}</p>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.wish_you_the_best')}}</p>
    </div>

</body>

</html>
