
// generate data
var chartData = [];

function generateChartData() {
    var firstDate = new Date();
    firstDate.setTime(firstDate.getTime() - 10 * 24 * 60 * 60 * 1000);

    for (var i = firstDate.getTime(); i < (firstDate.getTime() + 10 * 24 * 60 * 60 * 1000); i += 60 * 60 * 1000) {
        var newDate = new Date(i);

        if (i == firstDate.getTime()) {
            var value1 = Math.round(Math.random() * 10) + 1;
        } else {
            var value1 = Math.round(chartData[chartData.length - 1].value1 / 100 * (90 + Math.round(Math.random() * 20)) * 100) / 100;
        }

        if (newDate.getHours() == 12) {
            // we set daily data on 12th hour only
            var value2 = Math.round(Math.random() * 12) + 1;
            chartData.push({
                date: newDate,
                value1: value1,
                value2: value2
            });
        } else {
            chartData.push({
                date: newDate,
                value1: value1
            });
        }
    }
}

generateChartData();

var chart = AmCharts.makeChart("doc_trend", {
    "type": "serial",
    "theme": "light",
    "marginRight": 80,
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0.1
    }],

    "graphs": [{
        "balloonText": "[[title]]: [[value]]",
        "columnWidth": 20,
        "fillAlphas": 1,
		"lineColor": "#96d7ff",
        "title": "daily",
        "type": "column",
        "valueField": "value2"
    }, {
        "balloonText": "[[title]]: [[value]]",
        "lineThickness": 2,		
		"lineColor": "#fb497d",
        "title": "intra-day",
        "valueField": "value1"
    }],
    "zoomOutButtonRollOverAlpha": 0.15,
    "chartCursor": {
        "categoryBalloonDateFormat": "MMM DD JJ:NN",
        "cursorPosition": "mouse",
        "showNextAvailable": true
    },
    "autoMarginOffset": 5,
    "columnWidth": 1,
    "categoryField": "date",
    "categoryAxis": {
        "minPeriod": "hh",
        "parseDates": true
    },
    "export": {
        "enabled": false
    }
});