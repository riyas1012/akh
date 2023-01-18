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
                <h3>{{__('page_labels.reset_password')}}</h3>
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
                        <form name="resetPasswordForm" id="resetPasswordForm" method="POST" action="{{route('reset.password.update',['reset_token'=>$token])}}">
                            @csrf
                            <fieldset>
                                <label for="frm-login-uname">{{__('page_labels.email')}}</label>
                                <input type="email" id="frm-login-uname" name="email" class="form-control"
                                    placeholder="Type your email address" value="{{ $email }}" required
                                     disabled>
                            </fieldset>
                            <fieldset>
                                <label for="password">{{__('page_labels.password')}} *</label>
                                <input type="password" id="password" class="form-control" name="password" placeholder="{{__('page_labels.password')}}"
                                     autocomplete="new-password">
                            </fieldset>
                            <fieldset>
                                <label for="password_confirmation">{{__('page_labels.password_confirmation')}} *</label>
                                <input type="password" id="password_confirmation" name="password_confirmation"
                                    placeholder="{{__('page_labels.password_confirmation')}}" class="form-control"  autocomplete="new-password">
                            </fieldset>
                            <fieldset style="margin-top: 20px;">
                                <button type="submit" class="btn btn-primary">{{__('page_labels.reset_password')}}</button>
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

            $.validator.addMethod('numericOnly', function(value) {
                return /^[0-9]+$/.test(value);
            }, "{{ __('jq_validation.phone_number_integer') }}");

            $.validator.addMethod("strong_password", function(value, element) {
                let password = value;
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%&])(.{8,20}$)/.test(password))) {
                    return false;
                }
                return true;
            }, function(value, element) {
                let password = $(element).val();
                if (!(/^(.{8,20}$)/.test(password))) {
                    return "{{ __('jq_validation.password_length') }}";
                } else if (!(/^(?=.*[A-Z])/.test(password))) {
                    return "{{ __('jq_validation.password_upper_case') }}";
                } else if (!(/^(?=.*[a-z])/.test(password))) {
                    return "{{ __('jq_validation.password_lower_case') }}";
                } else if (!(/^(?=.*[0-9])/.test(password))) {
                    return "{{ __('jq_validation.password_digit') }}";
                } else if (!(/^(?=.*[@#$%&])/.test(password))) {
                    return "{{ __('jq_validation.password_special_character') }}";
                }
                return false;
            });

            $('#resetPasswordForm').validate({
                rules: {
                    password: {
                        required: true,
                        minlength: 8,
                        strong_password: true

                    },
                    password_confirmation : {
                        required: true,
                        minlength: 8,
                        equalTo: "#password"
                    }

                },
                messages: {
                    password: {
                        required: "{{ __('jq_validation.password') }}",
                        minlength: "{{ __('jq_validation.password_min_length') }}",
                    },
                    password_confirmation : {
                        required: "{{ __('jq_validation.password_confirmation') }}",
                        minlength: "{{ __('jq_validation.password_min_length') }}",
                        equalTo: "{{ __('jq_validation.password_confirmation_equal') }}",
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
