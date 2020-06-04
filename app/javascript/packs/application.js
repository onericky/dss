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

        var z1 = $('#z1').val();
        var z2 = $('#z2').val();
        var z3 = $('#z3').is(":checked");

        var x1_bike = $('#x1-bike').is(":checked");
        var x1_moto = $('#x1-moto').is(":checked");
        var x1_car = $('#x1-car').is(":checked");
        var x2 = $('#x2').val();

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

        var errors = validateVariables(date, z1, z2, x1_bike, x1_moto, x1_car, w1_bike, w1_moto, w1_car, w2_payroll, w2_infrastructure, w2_marketing);

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
                    'w4_car': w4_car
            },
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                preloader(true);
            },
            success: function(response) {
                setTimeout(function() {
                    preloader(false);
                    chars(response);
                    }, 3000);
            }, error: function (e) {
                console.log(e);
                console.log('error ajax')
            }
        })
    });

    $('#eis-dss').click(function() {
        var date = $('#date-eis').val();

        if(date === "") {
            M.toast({html: 'Date is required to filter!'});
            return 0;
        }

        $.ajax({
            url: '/dashboard/eis_post',
            data: {'date': date},
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                preloader(true);
            },
            success: function(response) {
                setTimeout(function() {
                    preloader(false);
                    charsEIS(response);
                }, 3000);
            }, error: function (e) {
                console.log(e);
                console.log('error ajax eis')
            }
        })

    });

    // var char1 = Highcharts.chart('container1', {
    //     chart: {
    //         type: 'bar'
    //     },
    //     title: {
    //         text: 'Stacked bar chart'
    //     },
    //     xAxis: {
    //         categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Total fruit consumption'
    //         }
    //     },
    //     legend: {
    //         reversed: true
    //     },
    //     plotOptions: {
    //         series: {
    //             stacking: 'normal'
    //         }
    //     },
    //     series: [{
    //         name: 'John',
    //         data: [5, 3, 4, 7, 2]
    //     }, {
    //         name: 'Jane',
    //         data: [2, 2, 3, 2, 1]
    //     }, {
    //         name: 'Joe',
    //         data: [3, 4, 4, 2, 5]
    //     }]
    // });
    //
    // var char2 = Highcharts.chart('container2', {
    //
    //     chart: {
    //         styledMode: true
    //     },
    //
    //     title: {
    //         text: 'Pie point CSS'
    //     },
    //
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    //     },
    //
    //     series: [{
    //         type: 'pie',
    //         allowPointSelect: true,
    //         keys: ['name', 'y', 'selected', 'sliced'],
    //         data: [
    //             ['Apples', 29.9, false],
    //             ['Pears', 71.5, false],
    //             ['Oranges', 106.4, false],
    //             ['Plums', 129.2, false],
    //             ['Bananas', 144.0, false],
    //             ['Peaches', 176.0, false],
    //             ['Prunes', 135.6, true, true],
    //             ['Avocados', 148.5, false]
    //         ],
    //         showInLegend: true
    //     }]
    // });
    //
    // var char3 = Highcharts.chart('container3', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: 'Browser market shares. January, 2018'
    //     },
    //     subtitle: {
    //         text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    //     },
    //     accessibility: {
    //         announceNewData: {
    //             enabled: true
    //         }
    //     },
    //     xAxis: {
    //         type: 'category'
    //     },
    //     yAxis: {
    //         title: {
    //             text: 'Total percent market share'
    //         }
    //
    //     },
    //     legend: {
    //         enabled: false
    //     },
    //     plotOptions: {
    //         series: {
    //             borderWidth: 0,
    //             dataLabels: {
    //                 enabled: true,
    //                 format: '{point.y:.1f}%'
    //             }
    //         }
    //     },
    //
    //     tooltip: {
    //         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    //         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    //     },
    //
    //     series: [
    //         {
    //             name: "Browsers",
    //             colorByPoint: true,
    //             data: [
    //                 {
    //                     name: "Chrome",
    //                     y: 62.74,
    //                     drilldown: "Chrome"
    //                 },
    //                 {
    //                     name: "Firefox",
    //                     y: 10.57,
    //                     drilldown: "Firefox"
    //                 },
    //                 {
    //                     name: "Internet Explorer",
    //                     y: 7.23,
    //                     drilldown: "Internet Explorer"
    //                 },
    //                 {
    //                     name: "Safari",
    //                     y: 5.58,
    //                     drilldown: "Safari"
    //                 },
    //                 {
    //                     name: "Edge",
    //                     y: 4.02,
    //                     drilldown: "Edge"
    //                 },
    //                 {
    //                     name: "Opera",
    //                     y: 1.92,
    //                     drilldown: "Opera"
    //                 },
    //                 {
    //                     name: "Other",
    //                     y: 7.62,
    //                     drilldown: null
    //                 }
    //             ]
    //         }
    //     ],
    //     drilldown: {
    //         series: [
    //             {
    //                 name: "Chrome",
    //                 id: "Chrome",
    //                 data: [
    //                     [
    //                         "v65.0",
    //                         0.1
    //                     ],
    //                     [
    //                         "v64.0",
    //                         1.3
    //                     ],
    //                     [
    //                         "v63.0",
    //                         53.02
    //                     ],
    //                     [
    //                         "v62.0",
    //                         1.4
    //                     ],
    //                     [
    //                         "v61.0",
    //                         0.88
    //                     ],
    //                     [
    //                         "v60.0",
    //                         0.56
    //                     ],
    //                     [
    //                         "v59.0",
    //                         0.45
    //                     ],
    //                     [
    //                         "v58.0",
    //                         0.49
    //                     ],
    //                     [
    //                         "v57.0",
    //                         0.32
    //                     ],
    //                     [
    //                         "v56.0",
    //                         0.29
    //                     ],
    //                     [
    //                         "v55.0",
    //                         0.79
    //                     ],
    //                     [
    //                         "v54.0",
    //                         0.18
    //                     ],
    //                     [
    //                         "v51.0",
    //                         0.13
    //                     ],
    //                     [
    //                         "v49.0",
    //                         2.16
    //                     ],
    //                     [
    //                         "v48.0",
    //                         0.13
    //                     ],
    //                     [
    //                         "v47.0",
    //                         0.11
    //                     ],
    //                     [
    //                         "v43.0",
    //                         0.17
    //                     ],
    //                     [
    //                         "v29.0",
    //                         0.26
    //                     ]
    //                 ]
    //             },
    //             {
    //                 name: "Firefox",
    //                 id: "Firefox",
    //                 data: [
    //                     [
    //                         "v58.0",
    //                         1.02
    //                     ],
    //                     [
    //                         "v57.0",
    //                         7.36
    //                     ],
    //                     [
    //                         "v56.0",
    //                         0.35
    //                     ],
    //                     [
    //                         "v55.0",
    //                         0.11
    //                     ],
    //                     [
    //                         "v54.0",
    //                         0.1
    //                     ],
    //                     [
    //                         "v52.0",
    //                         0.95
    //                     ],
    //                     [
    //                         "v51.0",
    //                         0.15
    //                     ],
    //                     [
    //                         "v50.0",
    //                         0.1
    //                     ],
    //                     [
    //                         "v48.0",
    //                         0.31
    //                     ],
    //                     [
    //                         "v47.0",
    //                         0.12
    //                     ]
    //                 ]
    //             },
    //             {
    //                 name: "Internet Explorer",
    //                 id: "Internet Explorer",
    //                 data: [
    //                     [
    //                         "v11.0",
    //                         6.2
    //                     ],
    //                     [
    //                         "v10.0",
    //                         0.29
    //                     ],
    //                     [
    //                         "v9.0",
    //                         0.27
    //                     ],
    //                     [
    //                         "v8.0",
    //                         0.47
    //                     ]
    //                 ]
    //             },
    //             {
    //                 name: "Safari",
    //                 id: "Safari",
    //                 data: [
    //                     [
    //                         "v11.0",
    //                         3.39
    //                     ],
    //                     [
    //                         "v10.1",
    //                         0.96
    //                     ],
    //                     [
    //                         "v10.0",
    //                         0.36
    //                     ],
    //                     [
    //                         "v9.1",
    //                         0.54
    //                     ],
    //                     [
    //                         "v9.0",
    //                         0.13
    //                     ],
    //                     [
    //                         "v5.1",
    //                         0.2
    //                     ]
    //                 ]
    //             },
    //             {
    //                 name: "Edge",
    //                 id: "Edge",
    //                 data: [
    //                     [
    //                         "v16",
    //                         2.6
    //                     ],
    //                     [
    //                         "v15",
    //                         0.92
    //                     ],
    //                     [
    //                         "v14",
    //                         0.4
    //                     ],
    //                     [
    //                         "v13",
    //                         0.1
    //                     ]
    //                 ]
    //             },
    //             {
    //                 name: "Opera",
    //                 id: "Opera",
    //                 data: [
    //                     [
    //                         "v50.0",
    //                         0.96
    //                     ],
    //                     [
    //                         "v49.0",
    //                         0.82
    //                     ],
    //                     [
    //                         "v12.1",
    //                         0.14
    //                     ]
    //                 ]
    //             }
    //         ]
    //     }
    // });
});

/**
 * Validate input values
 *
 * @param date
 * @param z1
 * @param z2
 * @param x1_bike
 * @param x1_moto
 * @param x1_car
 * @param w1_bike
 * @param w1_moto
 * @param w1_car
 * @param w2_payroll
 * @param w2_infrastructure
 * @param w2_marketing
 * @returns {number}
 */
function validateVariables(date, z1, z2, x1_bike, x1_moto, x1_car, w1_bike, w1_moto, w1_car, w2_payroll, w2_infrastructure, w2_marketing) {
    var e = 0;

    if(date === "") {
        M.toast({html: 'Date is required!'});
        e ++;
    }

    if(z1 == null) {
        M.toast({html: 'Z1 (Risk) must be selected'});
        e ++;
    }

    if(z2 == null) {
        M.toast({html: 'Z1 (Traffic) must be selected'});
        e ++;
    }

    if(x1_bike === false && x1_moto === false && x1_car === false) {
        M.toast({html: 'X1 (Active Delivery Method) requires at least one to be checked'});
        e ++;
    }

    if(w1_bike <= 0 || w1_bike == '') {
        M.toast({html: 'W1 (Bike) requires a positive number'});
        e ++;
    }

    if(w1_moto <= 0 || w1_moto == '') {
        M.toast({html: 'W1 (Motobike) requires a positive number'});
        e ++;
    }

    if(w1_car <= 0 || w1_car == '') {
        M.toast({html: 'W1 (Car) requires a positive number'});
        e ++;
    }

    if(w2_payroll <= 0 || w2_payroll == '') {
        M.toast({html: 'W2 (Payroll) requires a positive number'});
        e ++;
    }

    if(w2_infrastructure <= 0 || w2_infrastructure == '') {
        M.toast({html: 'W2 (Infrastructure) requires a positive number'});
        e ++;
    }

    if(w2_marketing <= 0 || w2_marketing == '') {
        M.toast({html: 'W2 (Marketing) requires a positive number'});
        e ++;
    }

    return e;
}

/**
 * Show or hide preloader
 *
 * @param show
 */
function preloader(show) {
    if(show == true) {
        $('#preloader-dss').show();
        $('#index-dss').css('opacity', '0.4');
        $('#nav-dss').css('opacity', '0.4');
        $('#sidenav-dss').css('opacity', '0.4');
    } else {
        $('#preloader-dss').hide();
        $('#index-dss').css('opacity', '1');
        $('#nav-dss').css('opacity', '1');
        $('#sidenav-dss').css('opacity', '1');
    }
}

/**
 * Display chars
 *
 * @param dataResult
 */
function chars(dataResult) {
    charDeliveryTime(dataResult.arrayResult);
    charRevenue(dataResult.arrayResult);
    charQuantity(dataResult.arrayResult);
    charTotalRevenue(dataResult.operating_expenses, dataResult.total_revenue);
}

function charsEIS(dataResult) {
    charEISDeliveryTime(dataResult.arrayResult);
    charEISRevenue(dataResult.arrayResult);
    charEISTotalDeliveriesZone(dataResult.arrayResult);
    charEISRevenueStatus(dataResult.arrayResult);
}

function charEISDeliveryTime(dataResult) {
    var vehiclesTime = {bike: dataResult[0]['delivery'][0]['timeByDelivery'],
                        moto: dataResult[0]['delivery'][1]['timeByDelivery'],
                        car: dataResult[0]['delivery'][2]['timeByDelivery']}
    var timeTotal = vehiclesTime['bike'] + vehiclesTime['moto'] + vehiclesTime['car'];

    var averageTime = timeTotal / 3;

    var vehiclesTimeArray = [
        roundDecimals(vehiclesTime['bike']),
        roundDecimals(vehiclesTime['moto']),
        roundDecimals(vehiclesTime['car']),
        roundDecimals(averageTime)
    ];

    $('#charEISDeliveryTime').show();

    var chart = Highcharts.chart('containerEISDeliveryTime', {
        title: {
            text: 'Delivery Time'
        },

        chart: {
            inverted: true,
            polar: false
        },

        subtitle: {
            text: '(average)'
        },

        xAxis: {
            title: {
                text: 'Vechicle'
            },
            categories: ['bike', 'motorbike', 'car', 'average']
        },

        yAxis: {
            title: {
                text: 'Minutes'
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: false,
            data: vehiclesTimeArray,
            showInLegend: false,
            color: '#8e24aa'
        }]
    });
}

function charEISRevenue(dataResult) {
    var bike_revenue = moto_revenue = car_revenue = total_revenue = total_sales = total_expenses = 0;

    $.each(dataResult[0]['expenses'], function(key, data) {
        total_expenses += data['cost'];
    });

    $.each(dataResult[0]['revenue'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            if(bike_revenue <= 0) {
                total_revenue += data['total_revenue'];
                total_sales += data['total_sales'];
            }

            bike_revenue = data['total_revenue_bike'];
        } else if(data['idDeliveryMethod'] == 2) {
            if(moto_revenue <= 0) {
                total_revenue += data['total_revenue'];
                total_sales += data['total_sales'];
            }

            moto_revenue = data['total_revenue_moto'];
        } else if(data['idDeliveryMethod'] == 3) {
            if(car_revenue <= 0) {
                total_revenue += data['total_revenue'];
                total_sales += data['total_sales'];
            }

            car_revenue = data['total_revenue_car'];
        }
    });

    bike_revenue = roundDecimals(bike_revenue);
    moto_revenue = roundDecimals(moto_revenue);
    car_revenue = roundDecimals(car_revenue);
    total_revenue = roundDecimals(total_revenue);
    total_sales = roundDecimals(total_sales);
    total_expenses = roundDecimals(total_expenses);

    $('#charEISRevenue').show();

    var chart = Highcharts.chart('containerEISRevenue', {
        title: {
            text: 'Revenue report'
        },

        chart: {
            type: 'pie'
        },

        tooltip: {
            valueSuffix: ' MXN',
            borderColor: '#8ae'
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    connectorColor: '#777',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                cursor: 'pointer',
                borderWidth: 3
            }
        },

        series: [{
            name: 'Total',
            data: [{
                name: 'Bike',
                y: bike_revenue,
                color: getColorPattern(0)
            }, {
                name: 'Motorbike',
                y: moto_revenue,
                color: getColorPattern(1)
            }, {
                name: 'Car',
                y: car_revenue,
                color: getColorPattern(2)
            }, {
                name: 'Total revenue',
                y: total_revenue,
                color: getColorPattern(3)
            }, {
                name: 'Total expenses',
                y: total_expenses,
                color: getColorPattern(4)
            }, {
                name: 'Total sales',
                y: total_sales,
                color: getColorPattern(5)
            } ]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    plotOptions: {
                        series: {
                            dataLabels: {
                                format: '<b>{point.name}</b>'
                            }
                        }
                    }
                }
            }]
        }
    });
}

function charEISTotalDeliveriesZone(dataResult) {
    var a_orders = {bike: 0, moto: 0, car: 0, total: 0};
    var b_orders = {bike: 0, moto: 0, car: 0, total: 0};
    var c_orders = {bike: 0, moto: 0, car: 0, total: 0};

    $.each(dataResult[0]['orders_zones'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            if(a_orders['bike'] <= 0) {
                a_orders['bike'] += data['a_orders'];
                a_orders['total'] += data['a_orders'];
            }
            if(b_orders['bike'] <= 0) {
                b_orders['bike'] += data['b_orders'];
                b_orders['total'] += data['b_orders'];
            }
            if(c_orders['bike'] <= 0) {
                c_orders['bike'] += data['c_orders'];
                c_orders['total'] += data['c_orders'];
            }
        } else if(data['idDeliveryMethod'] == 2) {
            if(a_orders['moto'] <= 0) {
                a_orders['moto'] += data['a_orders'];
                a_orders['total'] += data['a_orders'];
            }
            if(b_orders['moto'] <= 0) {
                b_orders['moto'] += data['b_orders'];
                b_orders['total'] += data['b_orders'];
            }
            if(c_orders['moto'] <= 0) {
                c_orders['moto'] += data['c_orders'];
                c_orders['total'] += data['c_orders'];
            }
        } else if(data['idDeliveryMethod'] == 3) {
            if(a_orders['car'] <= 0) {
                a_orders['car'] += data['a_orders'];
                a_orders['total'] += data['a_orders'];
            }
            if(b_orders['car'] <= 0) {
                b_orders['car'] += data['b_orders'];
                b_orders['total'] += data['b_orders'];
            }
            if(c_orders['car'] <= 0) {
                c_orders['car'] += data['c_orders'];
                c_orders['total'] += data['c_orders'];
            }
        }
    });

    var bike_array = [a_orders['bike'], b_orders['bike'], c_orders['bike']];
    var moto_array = [a_orders['moto'], b_orders['moto'], c_orders['moto']];
    var car_array = [a_orders['car'], b_orders['car'], c_orders['car']];
    var total_array = [a_orders['total'], b_orders['total'], c_orders['total']];

    $('#charEISTotalDeliveriesZone').show();

    var chart = Highcharts.chart('containerEISTotalDeliveriesZone', {
        chart: {
            type: 'line'
        },

        title: {
            text: 'Total orders by zone'
        },

        xAxis: {
            title: {
                text: 'Zone'
            },
            categories: ['A', 'B', 'C']
        },

        yAxis: {
            title: {
                text: 'Quantity orders'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Bike',
            data: bike_array
        }, {
            name: 'Motorbike',
            data: moto_array
        }, {
            name: 'Car',
            data: car_array
        }, {
            name: 'Total',
            data: total_array
        }]
    });
}

function charEISRevenueStatus(dataResult) {
    var operating_expenses = 0;
    var total_revenue = 0;
    var sw_1 = sw_2 = sw_3 = false;

    $.each(dataResult[0]['expenses'], function(key, data) {
        operating_expenses += data['cost'];
    });

    $.each(dataResult[0]['revenue'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            if(sw_1 == false) {
                total_revenue += data['total_revenue'];
                sw_1 = true;
            }
        } else if(data['idDeliveryMethod'] == 2) {
            if(sw_2 == false) {
                total_revenue += data['total_revenue'];
                sw_2 = true;
            }
        } else if(data['idDeliveryMethod'] == 3) {
            if(sw_3 == false) {
                total_revenue += data['total_revenue'];
                sw_3 = true;
            }
        }
    });

    total_revenue = roundDecimals(total_revenue);
    operating_expenses = roundDecimals(operating_expenses);

    var gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#f69c49'], // orange
                [1, '#55BF3B'],   // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    $('#charEISRevenueStatus').show();

    var chartSpeed = Highcharts.chart('containerEISRevenueStatus', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: operating_expenses,
            title: {
                text: 'Revenue'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Revenue',
            data: [total_revenue],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">MXN</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' MXN'
            }
        }]

    }));

}

function getColorPattern(i) {
    var colors = Highcharts.getOptions().colors,
        patternColors = [colors[2], colors[0], colors[3], colors[1], colors[4]],
        patterns = [
            'M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5',
            'M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5',
            'M 1.5 0 L 1.5 5 M 4 0 L 4 5',
            'M 0 1.5 L 5 1.5 M 0 4 L 5 4',
            'M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5',
            'M 1.5 0 L 2 5 M 4 0 L 0 5'
        ];

    return {
        pattern: {
            path: patterns[i],
            color: patternColors[i],
            width: 5,
            height: 5
        }
    };
}

//*****************************************   CHARS DSS / INDEX   *****************************************

function charDeliveryTime(dataResult) {
    var timeTotal = 0;
    var vehiclesTotal = 0;
    var vehicles = {bike: 0, moto: 0, car: 0};
    var vehiclesTime = {bike: 0, moto: 0, car: 0}

    $.each(dataResult, function(row, data) {
        $.each(data, function(keyO, values) {
            vehicles[values.vehicle] += 1;
            vehiclesTime[values.vehicle] += values.time;
            timeTotal += values.time;
            vehiclesTotal += 1;
        });
    });

    // promedio de tiempo por vehiculo
    vehiclesTime['bike'] = vehiclesTime['bike'] / vehicles['bike'];
    vehiclesTime['moto'] = vehiclesTime['moto'] / vehicles['moto'];
    vehiclesTime['car'] = vehiclesTime['car'] / vehicles['car'];
    averageTime = timeTotal / vehiclesTotal;

    var vehiclesTimeArray = [
        roundDecimals(vehiclesTime['bike']),
        roundDecimals(vehiclesTime['moto']),
        roundDecimals(vehiclesTime['car']),
        roundDecimals(averageTime)
    ];

    $('#charIndexTime').show();

    var chart = Highcharts.chart('containerIndexTime', {
        title: {
            text: 'Delivery Time'
        },

        subtitle: {
            text: '(average)'
        },

        xAxis: {
            title: {
                text: 'Vechicle'
            },
            categories: ['bike', 'motorbike', 'car', 'average']
        },

        yAxis: {
            title: {
                text: 'Minutes'
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: vehiclesTimeArray,
            showInLegend: false
        }]
    });
}

function charRevenue(dataResult) {
    var revenueTotal = 0;
    var vehiclesTotal = 0;
    var vehicles = {bike: 0, moto: 0, car: 0};
    var vehiclesRevenue = {bike: 0, moto: 0, car: 0}

    $.each(dataResult, function(row, data) {
        $.each(data, function(keyO, values) {
            vehicles[values.vehicle] += 1;
            vehiclesRevenue[values.vehicle] += values.revenue;
            revenueTotal += values.revenue;
            vehiclesTotal += 1;
        });
    });

    // promedio de tiempo por vehiculo
    vehiclesRevenue['bike'] = vehiclesRevenue['bike'] / vehicles['bike'];
    vehiclesRevenue['moto'] = vehiclesRevenue['moto'] / vehicles['moto'];
    vehiclesRevenue['car'] = vehiclesRevenue['car'] / vehicles['car'];
    averageRevenue = revenueTotal / vehiclesTotal;

    var vehiclesRevenueArray = [
        roundDecimals(vehiclesRevenue['bike']),
        roundDecimals(vehiclesRevenue['moto']),
        roundDecimals(vehiclesRevenue['car']),
        roundDecimals(averageRevenue)
    ];

    $('#charIndexRevenue').show();

    var chart = Highcharts.chart('containerIndexRevenue', {
        title: {
            text: 'Revenue ($)'
        },

        subtitle: {
            text: '(average)'
        },

        xAxis: {
            title: {
                text: 'Vechicle'
            },
            categories: ['bike', 'motorbike', 'car', 'average']
        },

        yAxis: {
            title: {
                text: 'Cash'
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: vehiclesRevenueArray,
            showInLegend: false
        }]
    });
}

function charQuantity(dataResult) {
    var quantityTotal = 0;
    var vehiclesTotal = 0;
    var vehicles = {bike: 0, moto: 0, car: 0};
    var vehiclesQuantity = {bike: 0, moto: 0, car: 0}

    $.each(dataResult, function(row, data) {
        $.each(data, function(keyO, values) {
            vehicles[values.vehicle] += 1;
            vehiclesQuantity[values.vehicle] += 1;
            quantityTotal += 1;
            vehiclesTotal += 1;
        });
    });

    // promedio de tiempo por vehiculo
    vehiclesQuantity['bike'] = vehiclesQuantity['bike'];
    vehiclesQuantity['moto'] = vehiclesQuantity['moto'] ;
    vehiclesQuantity['car'] = vehiclesQuantity['car'];
    averageQuantity = quantityTotal;

    // vehiclesQuantity['bike'] = vehiclesQuantity['bike'] / vehicles['bike'];
    // vehiclesQuantity['moto'] = vehiclesQuantity['moto'] / vehicles['moto'];
    // vehiclesQuantity['car'] = vehiclesQuantity['car'] / vehicles['car'];
    // averageQuantity = quantityTotal / vehiclesTotal;

    var vehiclesQuantityArray = [
        roundDecimals(vehiclesQuantity['bike']),
        roundDecimals(vehiclesQuantity['moto']),
        roundDecimals(vehiclesQuantity['car']),
        roundDecimals(averageQuantity)
    ];

    $('#charIndexQuantity').show();

    var chart = Highcharts.chart('containerIndexQuantity', {
        title: {
            text: 'Orders Quantity'
        },

        xAxis: {
            title: {
                text: 'Vechicle'
            },
            categories: ['bike', 'motorbike', 'car', 'total']
        },

        yAxis: {
            title: {
                text: 'Quantity'
            },
            allowDecimals: true
        },



        series: [{
            type: 'column',
            colorByPoint: true,
            data: vehiclesQuantityArray,
            showInLegend: false
        }]
    });
}

function charTotalRevenue(operating_expenses, total_revenue) {
    var gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // red
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#f69c49'], // orange
                [1, '#55BF3B'],   // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    $('#charIndexTotalRevenue').show();

    var chartSpeed = Highcharts.chart('containerIndexTotalRevenue', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: operating_expenses,
            title: {
                text: 'Revenue'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Revenue',
            data: [total_revenue],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:25px">{y}</span><br/>' +
                    '<span style="font-size:12px;opacity:0.4">MXN</span>' +
                    '</div>'
            },
            tooltip: {
                valueSuffix: ' MXN'
            }
        }]

    }));
}

function roundDecimals(number) {
    return (Math.round((number + Number.EPSILON) * 100) / 100)
}

/**
 *
 * @param dataR
 */
// function fCharIndex(dataR) {
//     var datac = dataR.data
//     var categories = dataR.categories
//
//     var arrayData = datac.split(",");
//     var arrayCategories = categories.split(",");
//
//     arrayDataN = arrayData.map(function (x) {
//         return parseFloat(x, 10);
//     });
//
//     $('#charIndex').show();
//
//     var chart = Highcharts.chart('containerIndex', {
//         title: {
//             text: 'Total de órdenes'
//         },
//
//         subtitle: {
//             text: 'sub'
//         },
//
//         xAxis: {
//             title: {
//                 text: 'Orden'
//             },
//             categories: arrayCategories
//             // categories: [categories]
//             // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//         },
//
//         yAxis: {
//             title: {
//                 text: 'Total $'
//             },
//             allowDecimals: true
//         },
//
//         series: [{
//             type: 'column',
//             colorByPoint: true,
//             data: arrayDataN,
//             // data: [data],
//             // data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
//             showInLegend: false
//         }]
//     });
// }
