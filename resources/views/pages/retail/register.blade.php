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
            <div class="row" style="float: right;margin-bottom:50px;">
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
                <h2>{{ __('page_labels.retail') }}</h2>
            </div>
            <div class="col-md-12" style="text-align: center;">
                <h3>{{ __('page_labels.register') }}</h3>
            </div>
            <div class="card  col-md-5 login-card" style="background-color: transparent !important;">
                <div class="card-body">
                    <div class="messages">
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                <ul style="text-align: left;">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @if (session('success'))
                            <div class="alert alert-success">
                                <ul style="text-align: left;">
                                    <li>{{ session('success') }}</li>
                                </ul>
                            </div>
                        @endif
                    </div>
                    <div id="login" align="center">
                        <form class="form-horizontal" action="{{route('retail.store')}}" method="post" name="registerForm" id="registerForm">
                            {{ csrf_field() }}
                            <fieldset>
                                <!-- First & Last Name -->
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.first_name') }}</label>
                                        <input type="text" class="form-control" name="first_name" id="first_name"
                                            value="{{ old('first_name') }}" autocomplete="off">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.surname') }}</label>
                                        <input type="text" class="form-control" name="last_name" id="last_name"
                                            value="{{ old('last_name') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <!-- Phone & Email -->
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label class="floating-label label-required">{{ __('page_labels.email') }}</label>
                                        <input type="email" class="form-control" name="email" id="email"
                                            value="{{ old('email') }}" autocomplete="off">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.phone_number') }}</label>
                                        <input type="text" class="form-control" name="phone_number" id="phone_number"
                                            value="{{ old('phone_number') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <!-- Password & Confirm Password -->
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.password') }}</label>
                                        <input type="password" class="form-control" name="password" id="password">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.password_confirmation') }}</label>
                                        <input type="password" class="form-control" name="password_confirmation"
                                            id="password_confirmation">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">

                                    <button type="submit" class="btn btn-primary"
                                        style="background:#1c3667 !important;margin:auto;">
                                        {{ __('page_labels.register') }}</button>

                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <a style="float:right;margin:auto;" href="{{ route('retail') }}"
                                        title="{{ __('page_labels.already_have_account') }}"><b>
                                            {{ __('page_labels.already_have_account') }} </b></a>
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

                $('#registerForm').validate({
                    rules: {
                        first_name: {
                            required: true
                        },
                        last_name: {
                            required: true
                        },
                        email: {
                            required: true,
                            emailExt: true
                        },
                        phone_number: {
                            required: true,
                            numericOnly: true
                        },
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
                        first_name: {
                            required: "{{ __('jq_validation.first_name') }}",
                        },
                        last_name: {
                            required: "{{ __('jq_validation.last_name') }}",
                        },
                        email: {
                            required: "{{ __('jq_validation.email') }}",
                            emailExt: "{{ __('jq_validation.invalid_email') }}"
                        },
                        phone_number: {
                            required: "{{ __('jq_validation.phone_number') }}",
                        },
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
