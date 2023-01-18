@extends('layouts.base')

@section('content')
    @push('stylesheet')
        <style>
            .error {
                color: red;
            }

            input[type="text"] {
                width: 50px !important;
                display: inline !important;
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
            <div class="col-md-12" style="text-align: center;">
                <img src="{{ asset('assets/images/logo.png') }}" style="text-align: center; height: 218px;width:175px;">
            </div><br>
            <div class="col-md-12" style="text-align: center;">
                <h3>{{ __('page_labels.forgot_password') }}</h3>
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
                        <form name="forgotPasswordForm" id="forgotPasswordForm" method="POST" action="{{ route('forgot.password.link') }}">
                            @csrf
                            <fieldset>
                                <label for="frm-login-uname">{{__('page_labels.email')}}</label>
                                <input type="email" id="frm-login-uname" name="email" class="form-control"
                                    placeholder="{{__('page_labels.email')}}" value="{{ old('email') }}" autofocus>
                            </fieldset>
                            <fieldset style="margin-top: 20px;">
                                <button type="submit" class="btn btn-primary">{{__('page_labels.submit_button')}}</button>
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
                }, "{{ __('jq_validation.invalid_email') }}");

                $('#forgotPasswordForm').validate({
                    rules: {

                        email: {
                            required: true,
                            emailExt: true
                        }

                    },
                    messages: {
                        email: {
                            required: "{{ __('jq_validation.email') }}",
                            emailExt: "{{ __('jq_validation.invalid_email') }}"
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
