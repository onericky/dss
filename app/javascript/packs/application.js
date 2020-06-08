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

$(document).ready(function() {
    $('#save-db-dss').hide();

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
                if(response.result == true) {
                    setTimeout(function () {
                        preloader(false);
                        chars(response);
                        $('#save-db-dss').show();
                    }, 3000);
                } else {
                    preloader(false);
                    M.toast({html: 'There are records with this date, choose another'});
                    $('#chars-dss').hide();
                }
            }, error: function (e) {
                console.log(e);
                console.log('error ajax')
            }
        })
    });

    $('#eis-dss').click(function() {
        var date_start = $('#date-start-eis').val();
        var date_end = $('#date-end-eis').val();

        if(date_start === "") {
            M.toast({html: 'Week start date is required to filter!'});
            return 0;
        }

        if(date_end === "") {
            M.toast({html: 'Week end date is required to filter!'});
            return 0;
        }

        $.ajax({
            url: '/dashboard/eis_post',
            data: {'date_start': date_start, 'date_end': date_end},
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                preloader(true);
            },
            success: function(response) {
                if(response.result == true) {
                    setTimeout(function () {
                        preloader(false);
                        charsEIS(response);
                    }, 3000);
                } else {
                    preloader(false);
                    M.toast({html: 'There are not records with these dates'});
                }
            }, error: function (e) {
                console.log(e);
                console.log('error ajax eis')
            }
        })

    });

    $('#save-db-dss').click(function() {
        $.ajax({
            url: '/dashboard/save_db',
            data: {'token': 123},
            dataType: "json",
            type: 'post',
            beforeSend: function () {
                preloader(true, false);
                $('#save-db-dss').hide();
            },
            success: function(response) {
                if(response.result == true) {
                    Swal.fire(
                        'Data saved!',
                        '',
                        'success'
                    );
                    preloader(false);
                } else {
                    preloader(false);
                    M.toast({html: 'Something was wrong!'});
                }
            }, error: function (e) {
                console.log(e);
                console.log('error ajax save')
            }
        })
    });
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
function preloader(show, hideChars = true) {
    if(show == true) {
        if(hideChars == true) {
            $('#chars-dss').hide();
        } else {
            $('#chars-dss').css('opacity', '0.2');
        }
        $('#preloader-dss').show();
        $('#index-dss').css('opacity', '0.4');
        $('#nav-dss').css('opacity', '0.4');
        $('#sidenav-dss').css('opacity', '0.4');
    } else {
        $('#chars-dss').show();
        $('#preloader-dss').hide();
        $('#index-dss').css('opacity', '1');
        $('#nav-dss').css('opacity', '1');
        $('#sidenav-dss').css('opacity', '1');
        $('#chars-dss').css('opacity', '1');
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
    removeHcDefaultColor();
}

function charsEIS(dataResult) {
    charEISDeliveryTime(dataResult.arrayResult);
    charEISRevenue(dataResult.arrayResult);
    charEISTotalDeliveriesZone(dataResult.arrayResult);
    charEISRevenueStatus(dataResult.arrayResult);
    removeHcDefaultColor();
}

function removeHcDefaultColor() {
    $("g").removeClass("highcharts-color-0");
    $("rect").removeClass("highcharts-color-0");
    $("path").removeClass("highcharts-color-0");
    $("g").removeClass("highcharts-color-1");
    $("rect").removeClass("highcharts-color-1");
    $("path").removeClass("highcharts-color-1");
    $("g").removeClass("highcharts-color-2");
    $("rect").removeClass("highcharts-color-2");
    $("path").removeClass("highcharts-color-2");
    $("g").removeClass("highcharts-color-3");
    $("rect").removeClass("highcharts-color-3");
    $("path").removeClass("highcharts-color-3");
}

function charEISDeliveryTime(dataResult) {
    var vehiclesTime = {
        bike: 0,
        moto: 0,
        car: 0
    };

    $.each(dataResult[0]['delivery'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            vehiclesTime['bike'] = data['time'] / data['n_weeks'];
        }
        if(data['idDeliveryMethod'] == 2) {
            vehiclesTime['moto'] = data['time'] / data['n_weeks'];
        }
        if(data['idDeliveryMethod'] == 3) {
            vehiclesTime['car'] = data['time'] / data['n_weeks'];
        }
    })

    var timeTotal = vehiclesTime['bike'] + vehiclesTime['moto'] + vehiclesTime['car'];

    var v = 0;
    if(vehiclesTime['bike'] > 0) { v ++; }
    if(vehiclesTime['moto'] > 0) { v ++; }
    if(vehiclesTime['car'] > 0) { v ++; }

    var averageTime = timeTotal / v;

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

        subtitle: {
            text: '(average)'
        },

        chart: {
            inverted: true,
            polar: false
        },

        xAxis: {
            categories: ['Bike', 'Motorbike', 'Car', 'Average']
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
            showInLegend: false,
            colors: [
                '#0d47a1',
                '#c51162',
                '#ff6f00',
                '#212121'
            ]
        }]
    });
}

function charEISRevenue(dataResult) {
    var bike_revenue = moto_revenue = car_revenue = total_revenue = total_sales = total_expenses = v = 0;

    total_expenses = dataResult[0]['expenses'][0]['total_expenses'];

    $.each(dataResult[0]['revenue'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            total_revenue += data['total_revenue'];
            total_sales += data['total_sales'];
            if(data['total_revenue_bike'] > 0) {
                v ++;
            }

            bike_revenue += data['total_revenue_bike'];
        } else if(data['idDeliveryMethod'] == 2) {
            total_revenue += data['total_revenue'];
            total_sales += data['total_sales'];
            if(data['total_revenue_moto'] > 0) {
                v ++;
            }

            moto_revenue += data['total_revenue_moto'];
        } else if(data['idDeliveryMethod'] == 3) {
            total_revenue += data['total_revenue'];
            total_sales += data['total_sales'];
            if(data['total_revenue_car'] > 0) {
                v ++;
            }

            car_revenue += data['total_revenue_car'];
        }
    });

    vehicle_total_revenue = ((bike_revenue + moto_revenue + car_revenue) / v);

    bike_revenue = roundDecimals(bike_revenue);
    moto_revenue = roundDecimals(moto_revenue);
    car_revenue = roundDecimals(car_revenue);
    vehicle_total_revenue = roundDecimals(vehicle_total_revenue);
    total_revenue = roundDecimals(total_revenue);
    total_sales = roundDecimals(total_sales);
    total_expenses = roundDecimals(total_expenses);

    var total_array = [total_sales, total_expenses, total_revenue];

    $('#charEISRevenue').show();

    var chart = Highcharts.chart('containerEISRevenue', {
        title: {
            text: 'Financial report'
        },

        chart: {
            inverted: false,
            polar: false
        },

        xAxis: {
            categories: ['Total sales', 'Total expenses', 'Total revenue']
        },

        yAxis: {
            title: {
                text: 'Value $'
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: total_array,
            showInLegend: false,
            colors: [
                '#0091ea',
                '#3949ab',
                '#00796b'

            ]
        }]
    });

    var total_vehicle_array = [bike_revenue, moto_revenue, car_revenue];

    $('#charEIScontainerEISTotalRevenueVehicles').show();

    var chart2 = Highcharts.chart('containerEISTotalRevenueVehicles', {
        title: {
            text: 'Revenue report by vehicle'
        },

        chart: {
            inverted: false,
            polar: false
        },

        xAxis: {
            categories: ['Bike', 'Motorbike', 'Car']
        },

        yAxis: {
            title: {
                text: 'Value $'
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: total_vehicle_array,
            showInLegend: false,
            colors: [
                '#1565c0',
                '#f50057',
                '#ff8f00',
            ]
        }]
    });
}

function charEISTotalDeliveriesZone(dataResult) {
    var a_orders_with = {bike: 0, moto: 0, car: 0, total: 0};
    var a_orders_without = {bike: 0, moto: 0, car: 0, total: 0};
    var b_orders_with = {bike: 0, moto: 0, car: 0, total: 0};
    var b_orders_without = {bike: 0, moto: 0, car: 0, total: 0};
    var c_orders_with = {bike: 0, moto: 0, car: 0, total: 0};
    var c_orders_without = {bike: 0, moto: 0, car: 0, total: 0};

    $.each(dataResult[0]['orders_zones'], function(key, data) {
        if(data['idZone'] == 1) {
            if(data['idDeliveryMethod'] == 1) {
                a_orders_with['bike'] += data['total_by_zone_with'];
                a_orders_without['bike'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 2) {
                a_orders_with['moto'] += data['total_by_zone_with'];
                a_orders_without['moto'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 3) {
                a_orders_with['car'] += data['total_by_zone_with'];
                a_orders_without['car'] += data['total_by_zone_without'];
            }
        }
        if(data['idZone'] == 2) {
            if(data['idDeliveryMethod'] == 1) {
                b_orders_with['bike'] += data['total_by_zone_with'];
                b_orders_without['bike'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 2) {
                b_orders_with['moto'] += data['total_by_zone_with'];
                b_orders_without['moto'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 3) {
                b_orders_with['car'] += data['total_by_zone_with'];
                b_orders_without['car'] += data['total_by_zone_without'];
            }
        }
        if(data['idZone'] == 3) {
            if(data['idDeliveryMethod'] == 1) {
                c_orders_with['bike'] += data['total_by_zone_with'];
                c_orders_without['bike'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 2) {
                c_orders_with['moto'] += data['total_by_zone_with'];
                c_orders_without['moto'] += data['total_by_zone_without'];
            }
            if(data['idDeliveryMethod'] == 3) {
                c_orders_with['car'] += data['total_by_zone_with'];
                c_orders_without['car'] += data['total_by_zone_without'];
            }
        }
    });

    var total_bike_with_array = a_orders_with['bike'] + b_orders_with['bike'] + c_orders_with['bike'];
    var total_moto_with_array = a_orders_with['moto'] + b_orders_with['moto'] + c_orders_with['moto'];
    var total_car_with_array = a_orders_with['car'] + b_orders_with['car'] + c_orders_with['car'];
    var total_total_v_with_array = total_bike_with_array + total_moto_with_array + total_car_with_array;
    var total_v_with_array = [total_bike_with_array, total_moto_with_array, total_car_with_array, total_total_v_with_array];

    var total_bike_without_array = a_orders_without['bike'] + b_orders_without['bike'] + c_orders_without['bike'];
    var total_moto_without_array = a_orders_without['moto'] + b_orders_without['moto'] + c_orders_without['moto'];
    var total_car_without_array = a_orders_without['car'] + b_orders_without['car'] + c_orders_without['car'];
    var total_total_v_without_array = total_bike_without_array + total_moto_without_array + total_car_without_array;
    var total_v_without_array = [total_bike_without_array, total_moto_without_array, total_car_without_array, total_total_v_without_array];

    var total_bike_array = [(a_orders_with['bike'] + a_orders_without['bike']), (b_orders_with['bike'] + b_orders_without['bike']), (c_orders_with['bike'] + c_orders_without['bike'])];
    var total_moto_array = [(a_orders_with['moto'] + a_orders_without['moto']), (b_orders_with['moto'] + b_orders_without['moto']), (c_orders_with['moto'] + c_orders_without['moto'])];
    var total_car_array = [(a_orders_with['car'] + a_orders_without['car']), (b_orders_with['car'] + b_orders_without['car']), (c_orders_with['car'] + c_orders_without['car'])];
    var total_bmc_array = [(
                                (a_orders_with['bike'] + a_orders_without['bike']) +
                                (a_orders_with['moto'] + a_orders_without['moto']) +
                                (a_orders_with['car'] + a_orders_without['car'])
                           ),
                           (
                                (b_orders_with['bike'] + b_orders_without['bike']) +
                                (b_orders_with['moto'] + b_orders_without['moto']) +
                                (b_orders_with['car'] + b_orders_without['car'])
                           ),
                           (
                                (c_orders_with['bike'] + c_orders_without['bike']) +
                                (c_orders_with['moto'] + c_orders_without['moto']) +
                                (c_orders_with['car'] + c_orders_without['car'])
                           )
                           ];

    var total_a_with_array = a_orders_with['bike'] + a_orders_with['moto'] + a_orders_with['car'];
    var total_b_with_array = b_orders_with['bike'] + b_orders_with['moto'] + b_orders_with['car'];
    var total_c_with_array = c_orders_with['bike'] + c_orders_with['moto'] + c_orders_with['car'];
    var total_total_with_array = total_a_with_array + total_b_with_array + total_c_with_array;
    var total_with_array = [total_a_with_array, total_b_with_array, total_c_with_array, total_total_with_array];

    var total_a_without_array = a_orders_without['bike'] + a_orders_without['moto'] + a_orders_without['car'];
    var total_b_without_array = b_orders_without['bike'] + b_orders_without['moto'] + b_orders_without['car'];
    var total_c_without_array = c_orders_without['bike'] + c_orders_without['moto'] + c_orders_without['car'];
    var total_total_without_array = total_a_without_array + total_b_without_array + total_c_without_array;
    var total_without_array = [total_a_without_array, total_b_without_array, total_c_without_array, total_total_without_array];

    $('#charEISTotalDeliveriesZone').show();

    Highcharts.chart('containerEISTotalDeliveriesZone', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total orders per zone'
        },
        subtitle: {
            text: 'With and without discount'
        },
        xAxis: {
            title: {
                text: 'Zone'
            },
            categories: ['A', 'B', 'C', 'Total']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percentaje quantity'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },

        colors: [
            '#546e7a',
            '#00bfa5'
        ],

        series: [{
            name: 'With discount',
            data: total_with_array
        }, {
            name: 'Without discount',
            data: total_without_array
        }]
    });

    $('#charEISTotalDeliveriesZone').show();

    Highcharts.chart('containerEISTotalDeliveriesVehicle', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total orders per vehicle'
        },
        subtitle: {
            text: 'With and without discount'
        },
        xAxis: {
            categories: ['Bike', 'Motorbike', 'Car', 'Total']
        },
        yAxis: {
            min: 0,
            title: {
                // text: 'Percentaje quantity'
                text: 'Quantity'
            }
        },
        tooltip: {
            // pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            shared: true
        },
        plotOptions: {
            // column: {
            //     stacking: 'percent'
            // }
        },
        colors: [
            '#546e7a',
            '#00bfa5'
        ],
        series: [{
            name: 'With discount',
            data: total_v_with_array
        }, {
            name: 'Without Discount',
            data: total_v_without_array
        }]
    });

    $('#charEISTotalDeliveriesVehicle').show();

    Highcharts.chart('containerEISTotalDeliveriesZoneVehicle', {
        chart: {
            type: 'line'
        },

        title: {
            text: 'Total orders per zone by vehicle'
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
            data: total_bike_array
        }, {
            name: 'Motorbike',
            data: total_moto_array
        }, {
            name: 'Car',
            data: total_car_array
        }, {
            name: 'Total',
            data: total_bmc_array
        }]
    });
}

function charEISRevenueStatus(dataResult) {
    var operating_expenses = 0;
    var total_revenue = 0;

    operating_expenses = dataResult[0]['expenses'][0]['total_expenses'];

    $.each(dataResult[0]['revenue'], function(key, data) {
        if(data['idDeliveryMethod'] == 1) {
            total_revenue += data['total_revenue'];
        } else if(data['idDeliveryMethod'] == 2) {
            total_revenue += data['total_revenue'];
        } else if(data['idDeliveryMethod'] == 3) {
            total_revenue += data['total_revenue'];
        }
    });

    total_revenue = roundDecimals(total_revenue);
    operating_expenses = roundDecimals(operating_expenses);

    var gaugeOptions = {
        chart: {
            type: 'solidgauge'
        },

        title: {
            text: "Revenue status"
        },

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
                [0.98, '#DF5353'], // red
                // [0.5, '#DDDF0D'], // yellow
                [0.99, '#f69c49'], // orange
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
            showInLegend: false,
            colors: [
                '#1976d2',
                '#ec407a',
                '#fb8c00',
                '#424242'
            ]
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
    averageRevenue = revenueTotal;
    // averageRevenue = revenueTotal / vehiclesTotal;

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
            categories: ['Bike', 'Motorbike', 'Car', 'Total']
        },

        yAxis: {
            title: {
                text: "Revenue"
            },
            allowDecimals: true
        },

        series: [{
            type: 'column',
            colorByPoint: true,
            data: vehiclesRevenueArray,
            showInLegend: false,
            colors: [
                '#0d47a1',
                '#c51162',
                '#ff6f00',
                '#212121'
            ]
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
            categories: ['Bike', 'Motorbike', 'Car', 'Total']
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
            showInLegend: false,
            colors: [
                '#42a5f5',
                '#ec407a',
                '#ffa000',
                '#37474f'
            ]
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
                [0.98, '#DF5353'], // red
                // [0.5, '#DDDF0D'], // yellow
                [0.99, '#f69c49'], // orange
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
                    useHTML: false
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