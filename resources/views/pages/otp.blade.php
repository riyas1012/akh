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
            <div class="row" style="float: right;margin-bottom:50px;">
                <a class="btn btn-primary" style="background:#1c3667 !important;margin:0px 20px;"
                                            href="{{route('logout')}}" title="{{__('page_labels.logout')}}">{{__('page_labels.logout')}}</a>
            </div>
            <div class="row"  style="margin-bottom:50px;">

            </div>
            <div class="col-md-12" style="text-align: center;">
                <img src="{{ asset('assets/images/logo.png') }}" style="text-align: center; height: 218px;width:175px;">
            </div><br>
            {{-- <div class="col-md-12" style="text-align: center;">
                <h2> {{session()->get('user_type') == 'FB' ? __('page_labels.f_and_b') : __('page_labels.retail') }}</h2>
            </div> --}}
            <div class="col-md-12" style="text-align: center;">
                <h3>{{__('page_labels.otp_heading')}}</h3>
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
                        <form method="post" action='{{ route('otp.verification') }}'
                            class="digit-group text-center form-submit" data-group-name="digits" data-autosubmit="false"
                            autocomplete="off">
                            @csrf
                            <p>{{__('page_labels.otp_title')}}</p>
                            <fieldset dir="ltr">
                                <input type="text" class="form-control" id="digit1" name="digit1" data-next="digit2" />
                                <input type="text" class="form-control"  id="digit2" name="digit2" data-next="digit3"
                                    data-previous="digit1" />
                                <input type="text" class="form-control"  id="digit3" name="digit3" data-next="digit4"
                                    data-previous="digit2" />
                                <input type="text" class="form-control"  id="digit4" name="digit4" data-next="digit5"
                                    data-previous="digit3" />
                                {{-- <input type="text" class="form-control"  id="digit5" name="digit5" data-next="digit6"
                                    data-previous="digit4" />
                                <input type="text" class="form-control"  id="digit6" name="digit6" data-previous="digit5" /> --}}
                            </fieldset>
                            <div class="row">
                                <div class="col-md-12" id="verify-div">
                                    <button type="submit" class="btn btn-primary mt-4 button-submit" id="otpCodeBtn">
                                        {{__('page_labels.verify')}}
                                    </button>
                                </div>
                            </div>
                            <div class="col-md text-center pt-4">
                                <a href="{{ route('otp.resend') }}">{{__('page_labels.resend_otp')}}</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script>
            $('.digit-group').find('input').each(function() {
                $(this).attr('maxlength', 1);
                $(this).on('keyup', function(e) {
                    var parent = $($(this).parent());

                    if (e.keyCode === 8 || e.keyCode === 37) {
                        var prev = parent.find('input#' + $(this).data('previous'));

                        if (prev.length) {
                            $(prev).select();
                        }
                    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <=
                            90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
                        var next = parent.find('input#' + $(this).data('next'));

                        if (next.length) {
                            $(next).select();
                        } else {
                            if (parent.data('autosubmit')) {
                                parent.submit();
                            }
                        }
                    }
                });
            });
        </script>
    @endpush
@endsection
