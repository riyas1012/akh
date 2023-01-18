@extends('layouts.admin.app')

@section('content')
    @push('stylesheet')
        <style>
            .error {
                color: red;
            }
        </style>
    @endpush
    <div>
        <div class="container">
            <div class="card  col-md-5 login-card">
                <div class="card-header">Create Password</div>
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
                    <div id="login" style="width: 400px;margin: auto;">
                        <form name="createPassword" id="createPassword" method="POST"
                            action="{{ route('admin.password.update', ['password_key' => $token]) }}">
                            @csrf
                            <fieldset>
                                <label for="frm-login-uname">Email</label>
                                <input type="email" id="frm-login-uname" name="email" class="form-control"
                                    placeholder="Type your email address" value="{{ $email }}" required disabled>
                            </fieldset>
                            <fieldset>
                                <label for="password">Password *</label>
                                <input type="password" id="password" class="form-control" name="password"
                                    placeholder="Password" autocomplete="new-password">
                            </fieldset>
                            <fieldset>
                                <label for="password_confirmation">Confirm Password *</label>
                                <input type="password" id="password_confirmation" name="password_confirmation"
                                    placeholder="Confirm Password" class="form-control" autocomplete="new-password">
                            </fieldset>
                            <fieldset style="margin-top: 20px;">
                                <button type="submit" class="btn" style="background-color: goldenrod;color:white;">Submit</button>
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

                $('#createPassword').validate({
                    rules: {
                        password: {
                            required: true,
                            minlength: 8,
                            strong_password: true

                        },
                        password_confirmation: {
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
                        password_confirmation: {
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
