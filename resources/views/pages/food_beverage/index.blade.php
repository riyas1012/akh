@extends('layouts.base')

@section('content')
@push('stylesheet')
    <style>
        .error{
            color: red;
        }
        </style>
@endpush
    <div align="center" class="bg1">
        <div class="container">
            <div class="row" style="float: right;">
                <p>
                    <span class="language selected" id="english">
                        <b>
                            <a href="{{ route('lang', ['locale' => 'en']) }}" class=""
                                @if (session()->get('locale') == 'en') style="color:black;" @endif>English</a>
                        </b>
                    </span>
                    <span> | </span>
                    <span class="language" id="arabic">
                        <b>
                            <a href="{{ route('lang', ['locale' => 'ar']) }}"
                                @if (session()->get('locale') == 'ar') style="color:black;" @endif>
                                العربية
                            </a>
                        </b>
                    </span>
                </p>
            </div>
            <div class="row" style="margin-bottom:50px;">

            </div>
            <div class="row">

                <div class="col-md-12" >
                    <img src="{{ asset('assets/images/logo.png') }}"
                        style="style=margin:auto; height: 218px;width:175px;">
                </div><br>
            </div>
            {{-- <div class="col-md-12" style="text-align: center;">
                <h2>{{ __('page_labels.f_and_b') }}</h2>
            </div> --}}
            <div class="col-md-12" style="text-align: center;margin-top:30px;">
                <h3>{{ __('page_labels.login') }}</h3>
            </div>

            <div class="card  col-md-5 login-card" style="background-color: transparent !important;">
                <div class="card-body">
                    <div class="messages">
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                @if (session()->get('locale') == 'en')
                                    <ul style="text-align: left;">
                                @else
                                    <ul style="text-align: right;">
                                @endif
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @if (session('success'))
                            <div class="alert alert-success">
                                @if (session()->get('locale') == 'en')
                                    <ul style="text-align: left;">
                                @else
                                    <ul style="text-align: right;">
                                @endif
                                    <li>{{ session('success') }}</li>
                                </ul>
                            </div>
                        @endif
                    </div>
                    <div id="login" align="center">
                        <form class="form-horizontal" action="{{route('food.beverage.login')}}" method="post" name="loginForm" id="loginForm">
                            {{ csrf_field() }}
                            <div class="col-md-12" style="text-align: center;margin-top:30px;">
                                <p>{{ __('page_labels.for_new_users') }}</p>
                            </div>
                            {{-- <fieldset>
                                <div class="form-group">
                                    <div class="col-sm-12 {{session()->get('locale') == 'en' ? 'text-left' : 'text-right'}}">
                                        <label class="label-required">{{ __('page_labels.for_new_users')}}</label>
                                    </div>
                                </div>
                            </fieldset> --}}
                            <fieldset>
                                <div class="form-group">
                                    <div class="col-sm-12 {{session()->get('locale') == 'en' ? 'text-left' : 'text-right'}}">
                                        <label class="label-required">{{ __('page_labels.email')}}</label>
                                        <input type="text" class="form-control" id="email" name="email" value="{{old('email')}}"
                                             autocomplete="off" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12 {{session()->get('locale') == 'en' ? 'text-left' : 'text-right'}}">
                                        <label class="label-required">{{ __('page_labels.password')}}</label>
                                        <input type="password" class="form-control" id="password" name="password"
                                             autocomplete="off" />
                                    </div>
                                </div>
                                <div class="form-group">
                                <div  style="margin-bottom: 20px;"><a href="{{route('forgot.password')}}">{{__('page_labels.forgot_password')}}</a></div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="submit" class="btn btn-primary" style="background:#1c3667 !important;">{{ __('page_labels.login')}}</button>
                                        <a class="btn btn-primary" style="background:#1c3667 !important;margin:0px 20px;"
                                            href="{{route('food.beverage.register')}}" title="{{__('page_labels.register')}}">{{__('page_labels.register')}}</a>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script>
        $().ready(function() {

            jQuery.validator.addMethod("emailExt", function(value, element, param) {
    return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
},"{{__('jq_validation.invalid_email')}}");

                $('#loginForm').validate({
                    rules: {
                        email: {
                            required : true,
                            emailExt : true
                        },
                        password: {
                            required : true,
                            minlength: 8
                        }
                    },
                    messages: {
                        email: {
                            required : "{{__('jq_validation.email')}}",
                            emailExt : "{{__('jq_validation.invalid_email')}}"
                        },
                        password: {
                            required : "{{__('jq_validation.password')}}",
                            minlength: "{{__('jq_validation.password_min_length')}}",
                        }

                    },
                    submitHandler: function(form) {
                        form.submit();
                    }

                    // any other options and/or rules
                });
            });
        </script>
    @endpush
@endsection
