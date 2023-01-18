<html @if (session()->get('locale') == 'ar') dir="rtl" lang="en" @else lang="en-US" @endif>

<head>
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/images/logo.png')}}">
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css/bootstrap.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('assets/bootstrap/css1/bootstrap-theme.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('assets/font-awesome/css/font-awesome.min.css') }} ">
    <link rel="stylesheet" href="{{ asset('assets/jquery/css/jquery-ui.css') }} ">
    <link rel="stylesheet" href="{{ asset('assets/project/css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/project/css/style4.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    @stack('stylesheet')
    <script src="{{ asset('assets/js/jquery.min.js') }} "></script>
    <script src="{{ asset('assets/js/jquery-ui.js') }} "></script>
    <script src="{{ asset('assets/bootstrap/js/bootstrap.min.js') }}"></script>
</head>

<body class="body-bg">

    @yield('content')
    {{-- @if(!Route::is('site_closed'))
        @include('layouts.footer')
    @endif --}}
    <script src="{{ asset('assets/project/js/validation/jquery.validate.min.js') }} "></script>
    <script src="{{ asset('assets/project/js/validation/additional-methods.min.js') }} "></script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    @stack('scripts')
</body>

</html>
