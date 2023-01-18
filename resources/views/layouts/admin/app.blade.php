<html>

<head>
    {{-- <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no"> --}}
    <title>FORSA2022</title>
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/images/logo.png')}}">
    <link rel="stylesheet" href="{{ asset('ad_assets/assets/bootstrap/css/bootstrap.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('ad_assets/assets/bootstrap/css1/bootstrap-theme.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('ad_assets/assets/font-awesome/css/font-awesome.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('ad_assets/assets/jquery/css/jquery-ui.css') }} ">
    <link rel="stylesheet" href="{{ asset('ad_assets/project/css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('ad_assets/project/css/style4.css') }}">
    @stack('stylesheet')
    <script src="{{ asset('ad_assets/assets/js/jquery.min.js') }} "></script>
    <script src="{{ asset('ad_assets/assets/js/jquery-ui.js') }} "></script>
    <script src="{{ asset('ad_assets/assets/bootstrap/js/bootstrap.min.js') }}"></script>
    @stack('default_script')
</head>

<body class="body-bg">
    @yield('content')
    <script src="{{ asset('assets/project/js/validation/jquery.validate.min.js') }} "></script>
    <script src="{{ asset('assets/project/js/validation/additional-methods.min.js') }} "></script>
    @stack('scripts')
</body>

</html>
