<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

    <div id="en_text" class="ltr">
        <p>Dear {{$details['user_name']}},</p>
        <p>Please use the below link to create your account password </span>
        <p><a href="{{route('admin.password',['password_key'=>$details['password_email_token']])}}">Create Password</a> </p>
        <p></p>
        <p>Wish You The Best...</p>
    </div>

</body>

</html>
