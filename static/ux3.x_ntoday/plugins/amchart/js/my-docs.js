var chart = AmCharts.makeChart("mydocs_div", {
        "type": "serial",
        "theme": "light",
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id":"v1",
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
      "id": "g1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineColor": "#fc855b",
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value"
        },
                  {
      "id": "g2",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineColor": "#019fff",
            "lineThickness": 2,
            "title": "green line",
            "useLineColorForBulletBorder": true,
            "valueField": "value2"
        }],
        "chartScrollbar": {
            "scrollbarHeight": 5,
            "backgroundAlpha": 0.1,
            "backgroundColor": "#fc855b",
            "selectedBackgroundColor": "#fc855b",
            "selectedBackgroundAlpha": 1
        },

        "chartCursor": {
            "cursorPosition": "mouse",
            "pan": true,
             "valueLineEnabled":true,
             "valueLineBalloonEnabled":true
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true,
            "position": "top"
        },
        "dataProvider": [{
            "date": "2012-07-27",
            "value": 13,
            "value2": 10
        }, {
            "date": "2012-07-28",
            "value": 11,
            "value2": 12
        }, {
            "date": "2012-07-29",
            "value": 15,
            "value2": 20
        }, {
            "date": "2012-07-30",
            "value": 16,
            "value2": 14
        }, {
            "date": "2012-07-31",
            "value": 18,
            "value2": 16
        }, {
            "date": "2012-08-01",
            "value": 13,
            "value2": 13
        }, {
            "date": "2012-08-02",
            "value": 22
        }, {
            "date": "2012-08-03",
            "value": 23
        }, {
            "date": "2012-08-04",
            "value": 20
        }, {
            "date": "2012-08-05",
            "value": 17
        }, {
            "date": "2012-08-06",
            "value": 16
        }, {
            "date": "2012-08-07",
            "value": 18
        }, {
            "date": "2012-08-08",
            "value": 21
        }, {
            "date": "2012-08-09",
            "value": 26
        }, {
            "date": "2012-08-10",
            "value": 24
        }, {
            "date": "2012-08-11",
            "value": 29
        }, {
            "date": "2012-08-12",
            "value": 32
        }, {
            "date": "2012-08-13",
            "value": 18
        }, {
            "date": "2012-08-14",
            "value": 24
        }, {
            "date": "2012-08-15",
            "value": 22
        }]
    }
);

chart.addListener("rendered", zoomChart);

zoomChart();
function zoomChart(){
    //chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    chart.zoomToIndexes(0, 20);
}