@extends('layouts.base')

@section('content')
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
                <img src="{{ asset('assets/images/logo.png') }}"
                    style="text-align: center; height: 218px;width:175px;">
            </div><br>
            <div class="col-md-12" style="text-align: center;">
                <h2>{{ __('page_labels.landing_page_heading') }}</h2>
            </div>
            <div class="col-md-12">
                <p style="text-align: center; font-size: 1.5em">
                    {{ __('page_labels.langing_page_content') }}
                </p>
                <p class="english" style="text-align: center; ">
                    {{ __('page_labels.landing_page_content_2') }}
                </p>
            </div>
            <div class="card  col-md-8 login-card" style="background-color: transparent !important;">
                <div class="card-body">
                    <div class="col-md-12">
                        <div class="select_application_page">

                            <div>
                                <label for="f&b">
                                    <a href="{{ route('food.beverage') }}">
                                        <h2>{{ __('page_labels.application_form') }} </h2>

                                    </a>
                                </label>
                            </div>
                            {{-- <div>
                                <label for="Retail">
                                    <a href="{{route('retail')}}">
                                        <h2>{{ __('page_labels.retail') }} </h2>
                                    </a>
                                </label>
                            </div> --}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
