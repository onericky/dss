// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require('jquery')
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

$(document).ready(function(){
    $('#simulate-dss').click(function() {
        var date = $('#date-dss').val();

        var z1 = $('#z1-dss').val();
        var z2 = $('#z2-dss').val();
        var z3 = $('#z3-dss').is(":checked");

        var x1_bike = $('#x1-bike').is(":checked");
        var x1_moto = $('#x1-moto').is(":checked");
        var x1_car = $('#x1-car').is(":checked");
        var x2 = $('#x2-dss').val();

        var w1_bike = $('#w1-bike').val();
        var w1_moto = $('#w1-moto').val();
        var w1_car = $('#w1-car').val();

        var w2_payroll = $('#w2-payroll').val();
        var w2_infrastructure = $('#w2-infrastructure').val();
        var w2_marketing = $('#w2-marketing').val();

        var w3_a_quick = $('#w3-a-quick').val();
        var w3_b_quick = $('#w3-b-quick').val();
        var w3_c_quick = $('#w3-c-quick').val();
        var w3_a_standard = $('#w3-a-standard').val();
        var w3_b_standard = $('#w3-b-standard').val();
        var w3_c_standard = $('#w3-c-standard').val();

        var w4_bike = $('#w4-bike').val();
        var w4_moto = $('#w4-moto').val();
        var w4_car = $('#w4-car').val();

        var errors = 0;
        console.log(date);
        if(date === "") {
            M.toast({html: 'Date is required!'});
            errors ++;
        }

        if(errors > 0) {
            return 0;
        }


        $.ajax({
            url: '/dashboard/simulate',
            data: {'date': date,
                    'z1': z1,
                    'z2': z2,
                    'z3': z3,
                    'x1_bike': x1_bike,
                    'x1_moto': x1_moto,
                    'x1_car': x1_car,
                    'x2': x2,
                    'w1_bike': w1_bike,
                    'w1_moto': w1_moto,
                    'w1_car': w1_car,
                    'w2_payroll': w2_payroll,
                    'w2_infrastructure': w2_infrastructure,
                    'w2_marketing': w2_marketing,
                    'w3_a_quick': w3_a_quick,
                    'w3_b_quick': w3_b_quick,
                    'w3_c_quick': w3_c_quick,
                    'w3_a_standard': w3_a_standard,
                    'w3_b_standard': w3_b_standard,
                    'w3_c_standard': w3_c_standard,
                    'w4_bike': w4_bike,
                    'w4_moto': w4_moto,
                    'w4_car': w4_car,
            },
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                console.log('before');
                preloader();
            },
            success: function(response) {
                console.log(response);
                console.log('todo bien');
            }, error: function (e) {
                console.log(e);
            }
        })
    });

    console.log('fin jquery click');

    var char1 = Highcharts.chart('container1', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'John',
            data: [5, 3, 4, 7, 2]
        }, {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
        }, {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
        }]
    });



    var char2 = Highcharts.chart('container2', {

        chart: {
            styledMode: true
        },

        title: {
            text: 'Pie point CSS'
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            type: 'pie',
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            data: [
                ['Apples', 29.9, false],
                ['Pears', 71.5, false],
                ['Oranges', 106.4, false],
                ['Plums', 129.2, false],
                ['Bananas', 144.0, false],
                ['Peaches', 176.0, false],
                ['Prunes', 135.6, true, true],
                ['Avocados', 148.5, false]
            ],
            showInLegend: true
        }]
    });



    var char3 = Highcharts.chart('container3', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2018'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: [
                    {
                        name: "Chrome",
                        y: 62.74,
                        drilldown: "Chrome"
                    },
                    {
                        name: "Firefox",
                        y: 10.57,
                        drilldown: "Firefox"
                    },
                    {
                        name: "Internet Explorer",
                        y: 7.23,
                        drilldown: "Internet Explorer"
                    },
                    {
                        name: "Safari",
                        y: 5.58,
                        drilldown: "Safari"
                    },
                    {
                        name: "Edge",
                        y: 4.02,
                        drilldown: "Edge"
                    },
                    {
                        name: "Opera",
                        y: 1.92,
                        drilldown: "Opera"
                    },
                    {
                        name: "Other",
                        y: 7.62,
                        drilldown: null
                    }
                ]
            }
        ],
        drilldown: {
            series: [
                {
                    name: "Chrome",
                    id: "Chrome",
                    data: [
                        [
                            "v65.0",
                            0.1
                        ],
                        [
                            "v64.0",
                            1.3
                        ],
                        [
                            "v63.0",
                            53.02
                        ],
                        [
                            "v62.0",
                            1.4
                        ],
                        [
                            "v61.0",
                            0.88
                        ],
                        [
                            "v60.0",
                            0.56
                        ],
                        [
                            "v59.0",
                            0.45
                        ],
                        [
                            "v58.0",
                            0.49
                        ],
                        [
                            "v57.0",
                            0.32
                        ],
                        [
                            "v56.0",
                            0.29
                        ],
                        [
                            "v55.0",
                            0.79
                        ],
                        [
                            "v54.0",
                            0.18
                        ],
                        [
                            "v51.0",
                            0.13
                        ],
                        [
                            "v49.0",
                            2.16
                        ],
                        [
                            "v48.0",
                            0.13
                        ],
                        [
                            "v47.0",
                            0.11
                        ],
                        [
                            "v43.0",
                            0.17
                        ],
                        [
                            "v29.0",
                            0.26
                        ]
                    ]
                },
                {
                    name: "Firefox",
                    id: "Firefox",
                    data: [
                        [
                            "v58.0",
                            1.02
                        ],
                        [
                            "v57.0",
                            7.36
                        ],
                        [
                            "v56.0",
                            0.35
                        ],
                        [
                            "v55.0",
                            0.11
                        ],
                        [
                            "v54.0",
                            0.1
                        ],
                        [
                            "v52.0",
                            0.95
                        ],
                        [
                            "v51.0",
                            0.15
                        ],
                        [
                            "v50.0",
                            0.1
                        ],
                        [
                            "v48.0",
                            0.31
                        ],
                        [
                            "v47.0",
                            0.12
                        ]
                    ]
                },
                {
                    name: "Internet Explorer",
                    id: "Internet Explorer",
                    data: [
                        [
                            "v11.0",
                            6.2
                        ],
                        [
                            "v10.0",
                            0.29
                        ],
                        [
                            "v9.0",
                            0.27
                        ],
                        [
                            "v8.0",
                            0.47
                        ]
                    ]
                },
                {
                    name: "Safari",
                    id: "Safari",
                    data: [
                        [
                            "v11.0",
                            3.39
                        ],
                        [
                            "v10.1",
                            0.96
                        ],
                        [
                            "v10.0",
                            0.36
                        ],
                        [
                            "v9.1",
                            0.54
                        ],
                        [
                            "v9.0",
                            0.13
                        ],
                        [
                            "v5.1",
                            0.2
                        ]
                    ]
                },
                {
                    name: "Edge",
                    id: "Edge",
                    data: [
                        [
                            "v16",
                            2.6
                        ],
                        [
                            "v15",
                            0.92
                        ],
                        [
                            "v14",
                            0.4
                        ],
                        [
                            "v13",
                            0.1
                        ]
                    ]
                },
                {
                    name: "Opera",
                    id: "Opera",
                    data: [
                        [
                            "v50.0",
                            0.96
                        ],
                        [
                            "v49.0",
                            0.82
                        ],
                        [
                            "v12.1",
                            0.14
                        ]
                    ]
                }
            ]
        }
    });
});

function preloader() {
    $('#preloader-dss').show();
    $('#index-dss').css('opacity', '0.4');
    $('#nav-dss').css('opacity', '0.4');
    $('#sidenav-dss').css('opacity', '0.4');
}

