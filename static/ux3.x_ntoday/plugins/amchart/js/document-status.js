AmCharts.makeChart("docuStatus",
      {
        "type": "serial",
        "categoryField": "category",
        "rotate": true,
        "startDuration": 1,
        "theme": "light",
        "categoryAxis": {
          "axisColor": "#E9DFDF",
          "dashLength": 1,
          "minHorizontalGap": 65,
          "minorGridAlpha": 0,
          "minorTickLength": -14,
          "minVerticalGap": 25,
          "tickLength": 1
        },
        "trendLines": [],
        "graphs": [
          {
            "balloonText": "[[category]] [[title]]:[[value]]",
            "fillAlphas": 0.62,
            "fillColors": "#C8C8E6",
            "fixedColumnWidth": 30,
            "id": "AmGraph-2",
            "lineThickness": 0,
            "negativeFillAlphas": 0,
            "tabIndex": 0,
            "title": "Files",
            "topRadius": 0,
            "type": "column",
            "valueField": "column-2"
          }
        ],
        "guides": [],
        "valueAxes": [
          {
            "id": "ValueAxis-1"
          }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": [
          {
            "category": "Approved",
            "column-2": "80"
          },
          {
            "category": "Reviewed",
            "column-2": "756"
          },
          {
            "category": "In Progress",
            "column-2": "1008"
          },
          {
            "category": "Rejected",
            "column-2": "1008"
          }
        ]
      }
    );