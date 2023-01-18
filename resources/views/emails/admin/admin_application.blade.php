<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div dir="ltr">
        <p >
            {{$details['message_en']}}
        </p>
        @if ($details['status'] == 'Shortlisted')
            <p>Wish You The Best...</p>
        @elseif ($details['status'] == 'Rejected')
            <p>Wish you luck in your next journey…</p>
        @endif
    </div>
    <div dir="rtl">
        <p >
            {{$details['message_ar']}}
        </p>
        @if ($details['status'] == 'Shortlisted')
            <p>نتمنى لكم التوفيق…</p>
        @elseif ($details['status'] == 'Rejected')
            <p>نتمنى لكم التوفيق في مشروعكم القادم ...</p>
        @endif
    </div>
</body>

</html>
