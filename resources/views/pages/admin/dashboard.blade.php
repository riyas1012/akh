@extends('layouts.admin.app')

@section('content')
    @push('stylesheet')
        <style>
            .content {
                padding-top: 40px;
                padding-bottom: 40px;
            }

            .icon-stat {
                display: block;
                overflow: hidden;
                position: relative;
                padding: 15px;
                margin-bottom: 1em;
                background-color: #fff;
                border-radius: 4px;
                border: 1px solid #ddd;
            }

            .icon-stat-label {
                display: block;
                color: #999;
                font-size: 13px;
            }

            .icon-stat-value {
                display: block;
                font-size: 28px;
                font-weight: 600;
            }

            .icon-stat-visual {
                position: relative;
                top: 22px;
                display: inline-block;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                text-align: center;
                font-size: 16px;
                line-height: 30px;
            }

            .bg-primary {
                color: #fff;
                background: #d74b4b;
            }

            .bg-secondary {
                color: #fff;
                background: #6685a4;
            }

            .icon-stat-footer {
                padding: 10px 0 0;
                margin-top: 10px;
                color: #aaa;
                font-size: 12px;
                border-top: 1px solid #eee;
            }

            .row_padding {
                padding: 0px 20px;
            }
        </style>
    @endpush
    @include('layouts.admin.header')
    <div class="container" style="padding: 30px 0px;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 40px;
                    padding: 5px;margin-bottom: 20px;">
                        <h4>Users</h4>
                    </div>
                    <div class="panel-body">
                        <div class="row row_padding">
                            <div class="col-md-4 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Total Users</span>
                                            <span class="icon-stat-value">{{$dashboard_details['total_user']}}</span>
                                        </div>

                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row row_padding">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Active Users</span>
                                            <span class="icon-stat-value">{{$dashboard_details['active_user']}}</span>
                                        </div>
                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row row_padding">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Inactive Users</span>
                                            <span class="icon-stat-value">{{$dashboard_details['inactive_user']}}</span>
                                        </div>
                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 40px;
                    padding: 5px;margin-bottom: 20px;">
                        <h4>Applications</h4>
                    </div>
                    <div class="panel-body">
                        <div class="row row_padding">
                            <div class="col-md-3 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Submited</span>
                                            <span class="icon-stat-value">{{$dashboard_details['submitted_count']}}</span>
                                        </div>

                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row row_padding">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Under Review</span>
                                            <span class="icon-stat-value">{{$dashboard_details['under_review_count']}}</span>
                                        </div>
                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row row_padding">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Shorlisted</span>
                                            <span class="icon-stat-value">{{$dashboard_details['shortlisted_count']}}</span>
                                        </div>
                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-6">
                                <div class="icon-stat">
                                    <div class="row row_padding">
                                        <div class="col-xs-8 text-left">
                                            <span class="icon-stat-label">Rejected</span>
                                            <span class="icon-stat-value">{{$dashboard_details['rejected_count']}}</span>
                                        </div>
                                    </div>
                                    <div class="icon-stat-footer">
                                        <i class="fa fa-clock-o"></i> Updated Now
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endsection
