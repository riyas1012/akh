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
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.accoune_created_email')}} </span>
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif><a href="{{ $details['url'] }}">{{__('email.activate_your_account')}}</a> </p>
        @if ($details['user_type'] == 'FB')
            <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif><a href="{{route('food.beverage')}}">{{__('email.for_login_page')}}</a></p>

        @endif
        <p @if ($details['locale'] == 'ar') style="unicode-bidi: embed; direction: rtl; margin-bottom:0;" @endif>{{__('email.wish_you_the_best')}}</p>
    </div>

</body>

</html>
