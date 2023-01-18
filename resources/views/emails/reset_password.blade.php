<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <div id="en_text" class="ltr">
        {{-- <p>Dear <span id="user_name">{{ $details['name'] }}</span>,</p> --}}
        <p>{{__('email.dear')}}</p>
        <p>{{__('email.please_use_link_reset')}} </span>
        <p><a href="{{ $details['url'] }}">{{__('email.reset_password')}}</a> </p>
        <p></p>
        <p>Wish You The Best...</p>
    </div>

</body>

</html>
