
window.onload = function () {
  const percentage = 80;
  const percentage1 = 70;
  const percentage2 = 60;
  const percentage3 = 50;
  const filler = document.querySelector(".filler");
  const filler1 = document.querySelector(".filler1");
  const filler2 = document.querySelector(".filler2");
  const filler3 = document.querySelector(".filler3");
  filler.style.width = percentage + "%";
  filler1.style.width = percentage1 + "%";
  filler2.style.width = percentage2 + "%";
  filler3.style.width = percentage3 + "%";

  const containerTask = document.querySelector(".container_task");
  const overallCont = document.querySelector(".overall_cont");
  const overallCont1 = document.querySelector(".overall_cont1");
  const bottomSec = document.querySelector(".bottom_sec");
  const rightSec = document.querySelector(".right_sec");
//  check while loading 
  function getSelectedValues() {
    const selectElement = document.getElementById("multiSelect");
    const selectedValues = [];

    for (let i = 0; i < selectElement.options.length; i++) {
      const option = selectElement.options[i];
      if (option.selected) {
        selectedValues.push(option.value);
      }
    }

    const displaySelectedValues = document.getElementById("selectedValues");
    displaySelectedValues.textContent =
      "Selected values: " + selectedValues.join(", ");
  }

  const containerTaskDisplay = window
    .getComputedStyle(containerTask)
    .getPropertyValue("display");
  const overallCont1Display = window
    .getComputedStyle(overallCont1)
    .getPropertyValue("display");

  console.log(containerTaskDisplay, overallCont1Display);

  var w = 1500;
  var h = 300;
// Update while Loading
  var chartWrapper = d3
    .select(".overall_cont")
    .style("border-radius", "16px")
    .style("background", "#FFF")
    .style("box-shadow", "0px 2px 5px 0px rgba(0, 0, 0, 0.25)")
    .style("width", "1100" + "px")
    .style("height", h + "px")
    .style("display", "inline-block")
    .style("overflow", "hidden");

  var svg = d3.select("#container").attr("width", w).attr("height", h);

  var svg = d3
    // .selectAll(".svg")
    //.selectAll("svg")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    // .style("background-color", "#F5F5F5")
    .attr("class", "svg");

  var taskArray = [
    {
      task: "Task management dashboard",
      type: "Ganesh",
      Domain: "Frontend",
      day: "02",
      details: "This actually didn't take any conceptualization",
      deadline: "31-01-2024",
      status: "In progress",
      date: "01/01/2023",
    },

    // {
    //   task: "QR code generation",
    //   type: "Sandhiya",
    //   Domain: "Python",
    //   day: "03",
    //   details: "No sketching either, really",
    //   deadline: "13-01-2024",
    //   status: "In progress"
    // },

    // {
    //   task: "QR code generation",
    //   type: "Vijith",
    //   Domain: "Python",
    //   day: "01",
    //   details: "Python Visualization",
    //   deadline: "21-01-2024",
    //   status: "Assigned"
    // },

    {
      task: "Facebook poster design",
      type: "Thanveer",
      Domain: "Frontend",
      day: "05",
      details: "all three lines of it",
      deadline: "31-01-2024",
      status: "Overdue",
      date: "11/01/2023",
    },

    // {
    //   task: "Closed Position senior front end developer",
    //   type: "Monika",
    //   Domain: "HR Team",
    //   day: "06",
    //   deadline: "01-01-2024",
    //   status: "Completed"
    // },

    // {
    //   task: "Task management backend development",
    //   type: "Hariprasad",
    //   day: "01",
    //   Domain: "Python",
    //   details: "This counts, right?",
    //   deadline: "11-01-2024",
    //   status: "Assigned"             //deadline , date , name, asignee name,status startDate endDate if not undefined
    // },

    {
      task: "UX design",
      type: "Gowtham",
      Domain: "Frontend",
      day: "04",
      details: "All is well",
      deadline: "12-01-2024",
      status: "Completed",
      date: "21/01/2023",
    },
    // {
    //   task: "Solar API",
    //   type: "Janet James",
    //   Domain: "HR Team",
    //   day: "01",
    //   details: "All the things",
    //   deadline: "23-01-2024",
    //   status: "Overdue"
    // },

    {
      task: "Server configuration",
      type: "Bhuvanesh",
      Domain: "HR Team",
      day: "02",
      deadline: "31-01-2024",
      status: "In progress",
      date: "15/01/2023",
    },
  ];

  var dateFormat = d3.time.format("%Y-%m-%d");

  var reducedChartWidth = 900; // Set your desired reduced width

  var categories = new Array();

  for (var i = 0; i < taskArray.length; i++) {
    categories.push(taskArray[i].type);
  }

  var catsUnfiltered = categories;

  categories = checkUnique(categories);

  taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

  // Extract unique Domains to be used as headers
  var uniqueDomains = taskArray.map((task) => task.Domain);
  uniqueDomains = uniqueDomains.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  // Rearrange the taskArray based on the order of uniqueDomains
  var reorderedTasks = [];
  uniqueDomains.forEach((domain) => {
    reorderedTasks.push({ Domain: domain }); // Add Domain as the header
    reorderedTasks = reorderedTasks.concat(
      taskArray.filter((task) => task.Domain === domain)
    );
  });

  function getDayOfWeekFromDate(dateString) {
    var date = new Date(dateString);
    return date.getDay() + 1; // Returns a value between 1 (Sunday) and 7 (Saturday)
  }

  makeGant(taskArray, w, h);

  // var title = svg
  // .append("text")
  // .text("Gantt Chart Process")
  // .attr("x", w / 2)
  // .attr("y", 25)
  // .attr("text-anchor", "middle")
  // .attr("font-size", 18)
  // .attr("fill", "#009FFC");

  function makeGant(tasks, pageWidth, pageHeight) {
    var barHeight = 20;
    var gap = barHeight + 4;
    var topPadding = 75;
    var sidePadding = 75;

    var colorScale = d3.scale
      .linear()
      .domain([0, categories.length])
      .range(["#00B9FA", "#F95002"])
      .interpolate(d3.interpolateHcl);

    makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
    drawRects(
      tasks,
      gap,
      topPadding,
      sidePadding,
      barHeight,
      colorScale,
      pageWidth,
      pageHeight
    );
    vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
  }

  function getDayFromDate(dateString) {
    var date = new Date(dateString);
    return date.getDate();
  }

  function drawRects(
    theArray,
    theGap,
    theTopPad,
    theSidePad,
    theBarHeight,
    theColorScale,
    w,
    h
  ) {
    var bigRects = svg
      .append("g")
      .selectAll("rect")
      .data(theArray)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function (d, i) {
        return i * theGap + theTopPad;
      })
      .attr("width", function (d) {
        return w - theSidePad / 2;
      })
      .attr("height", theGap * 11)
      .attr("stroke", "none")
      .attr("fill", "#fff")
      .attr("opacity", 0);

    var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
    var additionalSpace = 10;

    var defaultRectWidth = 140; // Set your default width here

    var innerRects = rectangles
      .append("rect")
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("x", function (d) {
        return ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 + theSidePad; // Adjust x based on task.day
      })
      .attr("y", function (d) {
        var employeeIndex = theArray.findIndex((item) => item.type === d.type);
        return (
          employeeIndex * theGap + theTopPad + theGap / 2 + 8 * employeeIndex
        ); // Adjust y position based on employee index
      })
      .attr("width", defaultRectWidth)
      .attr("height", theBarHeight * 1.4)
      .attr("stroke", "none")
      .attr("fill", function (d) {
        for (var i = 0; i < categories.length; i++) {
          if (d.type == categories[i]) {
            return d3.rgb(theColorScale(i));
          }
        }
      });

    var rectText = rectangles
      .append("text")
      .text(function (d) {
        return d.task;
      })
      .attr("x", function (d) {
        return (
          ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 + theSidePad + 5
        ); // Adjust x based on task.day
      })
      .attr("y", function (d) {
        var employeeIndex = theArray.findIndex((item) => item.type === d.type);
        return (
          employeeIndex * theGap +
          theTopPad +
          theGap / 2 +
          8 * employeeIndex +
          15
        ); // Adjust y position based on employee index
      })
      .attr("font-size", 11)
      .attr("text-anchor", "start") // Align text to the left
      .attr("text-height", theBarHeight)
      .attr("fill", "#fff");

    rectText
      .on("mouseover", function (event, d) {
        var tag = "";

        if (d3.select(this).data()[0].details != undefined) {
          tag =
            "Task: " +
            d3.select(this).data()[0].task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].type +
            "<br/>" +
            "Day: " +
            d3.select(this).data()[0].day +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].details +
            "<br/>" +
            "Deadline: " +
            d3.select(this).data()[0].deadline +
            "<br/>" +
            "Status: " +
            d3.select(this).data()[0].status +
            "<br/>" +
            "Date: " +
            d3.select(this).data()[0].date;
        } else {
          tag =
            "Task: " +
            d3.select(this).data()[0].task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].type +
            "<br/>" +
            "Day: " +
            d3.select(this).data()[0].day +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].details +
            "<br/>" +
            "Deadline: " +
            d3.select(this).data()[0].deadline +
            "<br/>" +
            "Status: " +
            d3.select(this).data()[0].status +
            "<br/>" +
            "Date: " +
            d3.select(this).data()[0].date;
        }
        var output = document.getElementById("tag");

        var rect = this.getBoundingClientRect();

        var rectHeight = rect.height;
        var tooltipHeight = output.offsetHeight;

        var x = rect.left + window.scrollX - 206 + "px"; // Adjustments based on the difference between actual and calculated values
        var y = rect.top + window.scrollY - 431 + "px";

        output.innerHTML = tag;
        output.style.top = y;
        output.style.left = x;
        output.style.display = "block";
      })
      .on("mouseout", function () {
        var output = document.getElementById("tag");
        output.style.display = "none";
      });

    innerRects
      .on("mouseover", function (event, d) {
        //console.log(this);
        var tag = "";

        if (d3.select(this).data()[0].details != undefined) {
          tag =
            "Task: " +
            d3.select(this).data()[0].task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].type +
            "<br/>" +
            "Day: " +
            d3.select(this).data()[0].day +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].details +
            "<br/>" +
            "Deadline: " +
            d3.select(this).data()[0].deadline +
            "<br/>" +
            "Status: " +
            d3.select(this).data()[0].status +
            "<br/>" +
            "Date: " +
            d3.select(this).data()[0].date;
        } else {
          tag =
            "Task: " +
            d3.select(this).data()[0].task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].type +
            "<br/>" +
            "Day: " +
            d3.select(this).data()[0].day +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].details +
            "<br/>" +
            "Deadline: " +
            d3.select(this).data()[0].deadline +
            "<br/>" +
            "Status: " +
            d3.select(this).data()[0].status +
            "<br/>" +
            "Date: " +
            d3.select(this).data()[0].date;
        }
        var output = document.getElementById("tag");

        var rect = this.getBoundingClientRect();

        var rectHeight = rect.height;
        var tooltipHeight = output.offsetHeight;

        var x = rect.left + window.scrollX - 216 + "px"; // Adjustments based on the difference between actual and calculated values
        var y = rect.top + window.scrollY - 451 + "px";

        output.innerHTML = tag;
        output.style.top = y;
        output.style.left = x;
        output.style.display = "block";
      })
      .on("mouseout", function () {
        var output = document.getElementById("tag");
        output.style.display = "none";
      });
  }

  function vertLabels(
    theGap,
    theTopPad,
    theSidePad,
    theBarHeight,
    theColorScale
  ) {
    var domainEmployeeMap = {};

    taskArray.forEach((task) => {
      if (task.type && task.Domain) {
        if (!domainEmployeeMap[task.Domain]) {
          domainEmployeeMap[task.Domain] = [];
        }
        domainEmployeeMap[task.Domain].push(task.type);
      }
    });

    var sortedDomains = Object.keys(domainEmployeeMap).sort();

    var numOccurances = [];

    var yPos = theTopPad - 85; // Move labels up by 10 pixels
    var domainSpace = 5; // Space between domains
    var employeeSpace = 5; // Space between employees

    sortedDomains.forEach((domain) => {
      if (domainEmployeeMap[domain].length > 0) {
        // Only draw domain rect if it has employees
        numOccurances.push([domain, domainEmployeeMap[domain].length]);

        svg
          .append("rect")
          .attr("x", 0)
          .attr("y", yPos)
          .attr("width", theSidePad);

        yPos += domainSpace; // Increment yPos after domain rect

        domainEmployeeMap[domain].forEach((employee) => {
          numOccurances.push([employee, 1]);

          yPos += employeeSpace;
        });
      } else {
        yPos += domainSpace; // If no employees, still increment yPos for spacing
      }
    });

    var verticalShift = -13;

    var axisText = svg
      .append("g")
      .selectAll("text")
      .data(numOccurances)
      .enter()
      .append("text")
      .text(function (d) {
        return d[0];
      })
      .attr("x", function (d) {
        var isDomain = sortedDomains.includes(d[0]);
        return isDomain ? 5 : 10; // Adjust x-position for domain or employee
      })
      .attr("y", function (d, i) {
        var isDomain = sortedDomains.includes(d[0]);
        var space = isDomain ? domainSpace : employeeSpace;

        // Shift the domain header down by 10 pixels
        return (
          i * theGap * 1 +
          yPos +
          (isDomain ? 5 : 0) + // Move domain header down by 10 pixels
          space * i +
          15 +
          verticalShift
        );
      })
      .attr("font-size", function (d) {
        return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
      })
      .attr("text-anchor", function (d) {
        return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
      })
      .attr("text-height", 14)
      .attr("fill", "black")
      .each(function (d, i) {
        var isDomain = sortedDomains.includes(d[0]);

        if (isDomain && i === numOccurances.findIndex((el) => el[0] === d[0])) {
          d3.select(this).attr("x", -5).text(d[0]).attr("font-weight", "bold");

          var textWidth = this.getComputedTextLength() + 10; // Padding for the box
          var textHeight = this.getBBox().height + 5; // Padding for the box

          svg
            .insert("rect", ":first-child")
            .attr("x", -25) // Move the domain name slightly to the left
            .attr("y", this.getBBox().y - 2)
            .attr("width", textWidth * 1.3)
            .attr("height", textHeight * 1.4)
            .attr("fill", "#F5F5F5");
        }
      });
  }

  function checkUnique(arr) {
    var hash = {},
      result = [];
    for (var i = 0, l = arr.length; i < l; ++i) {
      if (!hash.hasOwnProperty(arr[i])) {
        hash[arr[i]] = true;
        result.push(arr[i]);
      }
    }
    return result;
  }

  function getCounts(arr) {
    var i = arr.length, // var to loop over
      obj = {}; // obj to store results
    while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
    return obj;
  }

  // get specific from everything
  function getCount(word, arr) {
    return getCounts(arr)[word] || 0;
  }
};

// for navigating to main screen
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".svg_cont");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }

  svgContainer.addEventListener("click", function () {
    const containerTask = document.querySelector(".container_task");
    const overallCont = document.querySelector(".overall_cont");
    const overallCont1 = document.querySelector(".overall_cont1");
    const bottomSec = document.querySelector(".bottom_sec");
    const rightSec = document.querySelector(".right_sec");
    const alignment = document.querySelector(".align_dashboard");

    alignment.style.top = "0";

    if (
      !containerTask ||
      !overallCont ||
      !overallCont1 ||
      !bottomSec ||
      !rightSec
    ) {
      console.error("One or more elements not found!");
      return;
    }

    containerTask.style.display = "none";
    overallCont.style.display = "none";
    bottomSec.style.display = "none";
    rightSec.style.display = "none";
    overallCont1.style.display = "block";
    console.log(containerTask.style.display, overallCont1.style.display);

    var w = 1500;
    var h = 650;

    var svg = d3
      .selectAll(".svg1")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var taskArray = [
      {
        task: "conceptualize",
        type: "Ganesh",
        Domain: "Frontend",
        startTime: "2013-2-3",
        endTime: "2013-2-5",
        details: "This actually didn't take any conceptualization",
      },

      {
        task: "sketch",
        type: "Sandhiya",
        Domain: "Python",
        startTime: "2013-2-1",
        endTime: "2013-2-6",
        details: "No sketching either, really",
      },

      {
        task: "color profiles",
        type: "Vijith",
        Domain: "Python",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
        details: "Python Visualization",
      },

      {
        task: "HTML",
        type: "Thanveer",
        Domain: "Frontend",
        startTime: "2013-2-2",
        endTime: "2013-2-6",
        details: "all three lines of it",
      },

      {
        task: "write the JS",
        type: "Monika",
        Domain: "HR Team",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
      },

      {
        task: "advertise",
        type: "Hariprasad",
        startTime: "2013-2-9",
        Domain: "Python",
        endTime: "2013-2-12",
        details: "This counts, right?",
      },

      {
        task: "spam links",
        type: "Gowtham",
        Domain: "Frontend",
        startTime: "2013-2-12",
        endTime: "2013-2-14",
        details: "All is well",
      },
      {
        task: "eat",
        type: "Janet James",
        Domain: "HR Team",
        startTime: "2013-2-8",
        endTime: "2013-2-13",
        details: "All the things",
      },

      {
        task: "crying",
        type: "Bhuvanesh",
        Domain: "HR Team",
        startTime: "2013-2-13",
        endTime: "2013-2-16",
      },
    ];

    var dateFormat = d3.time.format("%Y-%m-%d");

    var timeScale = d3.time
      .scale()
      .domain([1, 31])
      .range([0, w - 150]);
    var categories = new Array();

    for (var i = 0; i < taskArray.length; i++) {
      categories.push(taskArray[i].type);
    }

    var catsUnfiltered = categories;

    categories = checkUnique(categories);

    taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

    // Extract unique Domains to be used as headers
    var uniqueDomains = taskArray.map((task) => task.Domain);
    uniqueDomains = uniqueDomains.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    // Rearrange the taskArray based on the order of uniqueDomains
    var reorderedTasks = [];
    uniqueDomains.forEach((domain) => {
      reorderedTasks.push({ Domain: domain }); // Add Domain as the header
      reorderedTasks = reorderedTasks.concat(
        taskArray.filter((task) => task.Domain === domain)
      );
    });

    makeGant(taskArray, w, h);

    // var title = svg
    // .append("text")
    // .text("Gantt Chart Process")
    // .attr("x", w / 2)
    // .attr("y", 25)
    // .attr("text-anchor", "middle")
    // .attr("font-size", 18)
    // .attr("fill", "#009FFC");

    function makeGant(tasks, pageWidth, pageHeight) {
      var barHeight = 20;
      var gap = barHeight + 4;
      var topPadding = 75;
      var sidePadding = 75;

      var colorScale = d3.scale
        .linear()
        .domain([0, categories.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        colorScale,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }

    function getDayFromDate(dateString) {
      var date = new Date(dateString);
      return date.getDate();
    }

    function drawRects(
      theArray,
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale,
      w,
      h
    ) {
      var bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
          return w - theSidePad / 2;
        })
        .attr("height", theGap * 11)
        .attr("stroke", "none")
        .attr("fill", "#fff")
        .attr("opacity", 0);

      var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
      var additionalSpace = 10;

      var innerRects = rectangles
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
          return timeScale(getDayFromDate(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
          );
        })
        .attr("width", function (d) {
          var start = getDayFromDate(d.startTime);
          var end = getDayFromDate(d.endTime);
          return timeScale(end) - timeScale(start);
        })
        .attr("height", theBarHeight * 1.4)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {
              return d3.rgb(theColorScale(i));
            }
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          return d.task;
        })
        .attr("x", function (d) {
          return (
            timeScale(getDayFromDate(d.startTime)) + theSidePad + 5 // Adjust padding
          );
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i + 10
          );
        })
        .attr("font-size", 11)
        .attr("text-anchor", "start") // Align text to the left
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      rectText
        .on("mouseover", function (e) {
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });

      innerRects
        .on("mouseover", function (e) {
          //console.log(this);
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
          var y = this.y.animVal.value + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });
    }

    function vertLabels(
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale
    ) {
      var domainEmployeeMap = {};

      taskArray.forEach((task) => {
        if (task.type && task.Domain) {
          if (!domainEmployeeMap[task.Domain]) {
            domainEmployeeMap[task.Domain] = [];
          }
          domainEmployeeMap[task.Domain].push(task.type);
        }
      });

      var sortedDomains = Object.keys(domainEmployeeMap).sort();

      var numOccurances = [];

      var yPos = theTopPad;
      var domainSpace = 5; // Space between domains
      var employeeSpace = 5; // Space between employees

      sortedDomains.forEach((domain) => {
        if (domainEmployeeMap[domain].length > 0) {
          // Only draw domain rect if it has employees
          numOccurances.push([domain, domainEmployeeMap[domain].length]);

          svg
            .append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", theSidePad);
          // .attr('height', theGap * 1.5) // Adjusted height for domain rect
          // .attr('fill', 'lightgrey');

          yPos += domainSpace; // Increment yPos after domain rect

          domainEmployeeMap[domain].forEach((employee) => {
            numOccurances.push([employee, 1]);

            yPos += employeeSpace;
          });
        } else {
          yPos += domainSpace; // If no employees, still increment yPos for spacing
        }
      });

      var axisText = svg
        .append("g")
        .selectAll("text")
        .data(numOccurances)
        .enter()
        .append("text")
        .text(function (d) {
          return d[0];
        })
        .attr("x", function (d) {
          var isDomain = sortedDomains.includes(d[0]);
          return isDomain ? 5 : 10; // Adjust x-position for domain or employee
        })
        .attr("y", function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);
          var space = isDomain ? domainSpace : employeeSpace;

          // Shift the domain header down by 10 pixels
          return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space * i;
        })
        .attr("font-size", function (d) {
          return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
        })
        .attr("text-anchor", function (d) {
          return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
        })
        .attr("text-height", 14)
        .attr("fill", "black")
        .each(function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);

          if (
            isDomain &&
            i === numOccurances.findIndex((el) => el[0] === d[0])
          ) {
            d3.select(this)
              // .insert("tspan", ":first-child")
              .attr("x", -5)
              .text(d[0])
              .attr("font-weight", "bold");

            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            svg
              .insert("rect", ":first-child")
              .attr("x", -25) // Move the domain name slightly to the left
              .attr("y", this.getBBox().y - 2)
              .attr("width", textWidth * 1.3)
              .attr("height", textHeight * 1.4)
              .attr("fill", "#F5F5F5");
          }
        });
    }

    function makeGrid(theSidePad, theTopPad, w, h) {
      console.log(timeScale);
      var xAxis = d3.svg
        .axis()
        .scale(timeScale)
        .orient("top")
        .ticks(31) // Assuming you want 31 ticks for days 1-31
        .tickSize(-h + theTopPad + 20, 0, 0)
        .tickFormat(function (d, i) {
          // Return the day of the month (1-31)
          return i + 1;
        });

      var grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + "6)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("dy", "-0.7em");
    }

    function checkUnique(arr) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }

    function getCounts(arr) {
      var i = arr.length, // var to loop over
        obj = {}; // obj to store results
      while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
      return obj;
    }

    // get specific from everything
    function getCount(word, arr) {
      return getCounts(arr)[word] || 0;
    }
  });
});

// for switching to weekly data
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".timeRange_sec1");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }
  svgContainer.addEventListener("click", function () {
    const mainChart = document.querySelector(".svg1");
    const monthChart = document.querySelector(".svg_month");
    const overAllChart = document.querySelector(".overall_cont");
    const weekChart = document.querySelector(".svg_week");
    const timeChart = document.querySelector(".timeRange_sec_svg");
    const mainDiv = document.querySelector(".timeRange_sec1");
    const mainDiv2 = document.querySelector(".timeRange_sec");
    const mainDiv3 = document.querySelector(".month_sec");
    const mainText = document.querySelector(".month_text");
    const mainText1 = document.querySelector(".time_text");
    const mainText2 = document.querySelector(".time_text1");
    const mainText3 = document.querySelector(".overall_cont");
    const mainText4 = document.querySelector(".overall_cont1");

    mainChart.style.display = "none";
    monthChart.style.display = "none";
    weekChart.style.display = "block";
    timeChart.style.display = "none";
    mainDiv.style.border = "1px solid #20a146";
    mainDiv2.style.border = "1px solid #303030";
    mainDiv3.style.border = "1px solid #303030";
    mainText2.style.color = "#20a146";
    mainText.style.color = "#303030";
    mainText1.style.color = "#303030";
    mainText3.style.top = "211px";
    mainText4.style.top = "-282px";
    // overAllChart.style.setProperty("display", "none", "important");

    var w = 1500;
    var h = 500;
    $.ajax({
      url: "/task_management/current_week_chart/",
      method: "GET",
      dataType: "json",
    }).done(function (data) {
      response_data = data.data;
      console.log(" ----weekly chart------ ", response_data);
      var w = 1500;
      var h = 300;
      storeWeeklyData(response_data);
    });

    function storeWeeklyData(weeklyData) {
      var chartWrapper = d3
        .select(".overall_cont")
        .style("border-radius", "16px")
        .style("background", "#FFF")
        .style("box-shadow", "0px 2px 5px 0px rgba(0, 0, 0, 0.25)")
        .style("width", "1100" + "px")
        .style("height", h + "px")
        .style("display", "inline-block")
        .style("overflow", "hidden");

      var svg = d3.select("#container").attr("width", w).attr("height", h);

      var svg = d3
        .selectAll(".svg_dynamic")
        //.selectAll("svg")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        // .style("background-color", "#F5F5F5")
        .attr("class", "svg");

      const groupedTasks = {}; // Object to hold tasks grouped by employee names

      for (const user of weeklyData) {
        const Name = user.Name;
        const Department = user.Department;
        const Tasks = user.Tasks;

        if (!groupedTasks[Name]) {
          groupedTasks[Name] = [];
        }

        groupedTasks[Name].push(
          ...Tasks.map((task) => ({
            CommentsCount: task.CommentsCount,
            CreatedDate: task.CreatedDate,
            DateAccuracy: task.DateAccuracy,
            Deadline: task.Deadline,
            EndDate: task.EndDate,
            Comments: task.Comments_data ? [...task.Comments_data] : [],
            EndDatePlan: task.EndDatePlan,
            StartDate: task.StartDate,
            StartDatePlan: task.StartDatePlan,
            Task: task.Task,
            TaskStatus: task.TaskStatus,
            TaskId: task.TaskId,
            Name: Name,
            Department: Department,
          }))
        );
      }

      console.log(groupedTasks);
      var w = 1500;
      var h = 2000;

      var svg = d3
        .selectAll(".svg_dynamic")
        //.selectAll("svg")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "svg");

      var dateFormat = d3.time.format("%Y-%m-%d");

      var reducedChartWidth = 900; // Set your desired reduced width
      var timeScale = d3.time
        .scale()
        .domain([1, 7])
        .range([0, reducedChartWidth]);

      var categories = new Array();

      for (const name in groupedTasks) {
        if (Object.prototype.hasOwnProperty.call(groupedTasks, name)) {
          categories.push(name);
        }
      }

      var catsUnfiltered = categories;

      categories = checkUnique(categories);

      // Extract unique employee names from groupedTasks
      var uniqueEmployees = Object.keys(groupedTasks);

      var reorderedTasks = [];
      const addedNames = new Set(); // Set to track added names

      uniqueEmployees.forEach((employee) => {
        const employeeTasks = groupedTasks[employee].map((task) => {
          if (!addedNames.has(employee)) {
            addedNames.add(employee); // Add the name to the set
            return {
              CommentsCount: task.CommentsCount,
              CreatedDate: task.CreatedDate,
              DateAccuracy: task.DateAccuracy,
              Deadline: task.Deadline,
              EndDate: task.EndDate,
              Comments: task.Comments,
              EndDatePlan: task.EndDatePlan,
              StartDate: task.StartDate,
              StartDatePlan: task.StartDatePlan,
              Task: task.Task,
              TaskStatus: task.TaskStatus,
              TaskId: task.TaskId,
              Name: task.Name,
              Department: task.Department,
            };
          }
          return {
            CommentsCount: task.CommentsCount,
            CreatedDate: task.CreatedDate,
            DateAccuracy: task.DateAccuracy,
            Deadline: task.Deadline,
            EndDate: task.EndDate,
            Comments: task.Comments,
            EndDatePlan: task.EndDatePlan,
            StartDate: task.StartDate,
            StartDatePlan: task.StartDatePlan,
            Task: task.Task,
            TaskStatus: task.TaskStatus,
            TaskId: task.TaskId,
            // Omitting Name and Department for duplicates
          };
        });

        reorderedTasks = reorderedTasks.concat(
          employeeTasks.map((task) => {
            // Calculate day of the week for the task's startDate (1 for Sunday, 2 for Monday, etc.)
            const startDate = new Date(task.StartDate);
            const dayOfWeek = startDate.getDay() || 7; // Adjusting Sunday to 1 instead of 0

            // Add the 'day' property to the task object
            return {
              ...task,
              day: dayOfWeek, // Assign the day of the week
            };
          })
        );
      });

      uniqueEmployees.forEach((employee) => {
        const employeeTasks = groupedTasks[employee].map((task) => ({
          CommentsCount: task.CommentsCount,
          CreatedDate: task.CreatedDate,
          DateAccuracy: task.DateAccuracy,
          Deadline: task.Deadline,
          EndDate: task.EndDate,
          Comments: task.Comments,
          EndDatePlan: task.EndDatePlan,
          StartDate: task.StartDate,
          StartDatePlan: task.StartDatePlan,
          Task: task.Task,
          TaskStatus: task.TaskStatus,
          TaskId: task.TaskId,
          Name: task.Name,
          Department: task.Department,
        }));

        allEmployeeTasks = allEmployeeTasks.concat(
          employeeTasks.map((task) => {
            // Calculate day of the week for the task's startDate (1 for Sunday, 2 for Monday, etc.)
            const startDate = new Date(task.StartDate);
            const dayOfWeek = startDate.getDay() || 7; // Adjusting Sunday to 1 instead of 0

            // Add the 'day' property to the task object
            return {
              ...task,
              day: dayOfWeek, // Assign the day of the week
            };
          })
        );
      });

      // Now, reorderedTasks contains tasks with an additional 'day' property based on the startDate
      console.log(reorderedTasks, allEmployeeTasks);

      makeGant(reorderedTasks, w, h);
      function makeGant(tasks, pageWidth, pageHeight) {
        var barHeight = 20;
        var gap = barHeight + 4;
        var topPadding = 75;
        var sidePadding = 75;

        var colorScale = d3.scale
          .linear()
          .domain([0, categories.length])
          .range(["#00B9FA", "#F95002"])
          .interpolate(d3.interpolateHcl);

        makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
        // drawRects(
        //   tasks,
        //   gap,
        //   topPadding,
        //   sidePadding,
        //   barHeight,
        //   colorScale,
        //   pageWidth,
        //   pageHeight
        // );
        vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
      }

      function getDayFromDate(dateString) {
        var date = new Date(dateString);
        return date.getDate();
      }

      function vertLabels(
        theGap,
        theTopPad,
        theSidePad,
        theBarHeight,
        theColorScale
      ) {
        var domainEmployeeMap = {};

        reorderedTasks.forEach((task) => {
          if (task.Name && task.Department) {
            if (!domainEmployeeMap[task.Department]) {
              domainEmployeeMap[task.Department] = [];
            }
            domainEmployeeMap[task.Department].push(task.Name);
          }
        });

        var sortedDomains = Object.keys(domainEmployeeMap).sort();

        var numOccurances = [];

        var yPos = theTopPad;
        var domainSpace = 5; // Space between domains
        var employeeSpace = 5; // Space between employees

        sortedDomains.forEach((domain) => {
          if (domainEmployeeMap[domain].length > 0) {
            // Only draw domain rect if it has employees
            numOccurances.push([domain, domainEmployeeMap[domain].length]);

            svg
              .append("rect")
              .attr("x", 0)
              .attr("y", yPos)
              .attr("width", theSidePad);
            // .attr('height', theGap * 1.5) // Adjusted height for domain rect
            // .attr('fill', 'lightgrey');

            yPos += domainSpace; // Increment yPos after domain rect

            domainEmployeeMap[domain].forEach((employee) => {
              numOccurances.push([employee, 1]);

              yPos += employeeSpace;
            });
          } else {
            yPos += domainSpace; // If no employees, still increment yPos for spacing
          }
        });

        console.log(numOccurances);

        var axisText = svg
          .append("g")
          .selectAll("text")
          .data(numOccurances)
          .enter()
          .append("text")
          .text(function (d) {
            return d[0];
          })
          .attr("x", function (d) {
            var isDomain = sortedDomains.includes(d[0]);
            return isDomain ? -5 : 40; // Adjust x-position for domain or employee
          })
          .attr("y", function (d, i) {
            var isDomain = sortedDomains.includes(d[0]);
            var space = isDomain ? domainSpace : employeeSpace;

            // Shift the domain header down by 10 pixels
            return (
              i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space / 16
            );
          })
          .attr("font-size", function (d) {
            return d[1] > 1 ? 12 : 12; // Change font size based on domain or employee
          })
          .attr("text-anchor", function (d) {
            return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
          })
          .attr("text-height", 12)
          .attr("fill", "black")
          .each(function (d, i) {
            var isDomain = sortedDomains.includes(d[0]);

            if (
              isDomain &&
              i === numOccurances.findIndex((el) => el[0] === d[0])
            ) {
              d3.select(this)
                // .insert("tspan", ":first-child")
                .attr("x", -5)
                .text(d[0])
                .attr("font-weight", "bold");

              var textWidth = this.getComputedTextLength() + 10; // Padding for the box
              var textHeight = this.getBBox().height + 5; // Padding for the box

              svg
                .insert("rect", ":first-child")
                .attr("x", -25) // Move the domain name slightly to the left
                .attr("y", this.getBBox().y - 2)
                .attr("width", textWidth * 1.3)
                .attr("height", textHeight * 1.1)
                .attr("fill", "#F5F5F5");
            }
          });

        var employeeYPositions = {};

        let newArray = reorderedTasks.filter(
          (array) =>
            array.StartDate !== undefined && array.EndDate !== undefined
        );
        console.log(newArray);
        setTimeout(() => {
          var axisText = svg.selectAll("text");

          axisText[0].forEach((textElement) => {
            var employeeName = textElement.textContent;

            if (
              !sortedDomains.includes(employeeName) &&
              newArray.some((el) => el.Name === employeeName)
            ) {
              // Calculate the y-position considering the SVG bounding box
              var svgRect = svg.node().getBoundingClientRect();
              var textYPos =
                textElement.getBoundingClientRect().top - svgRect.top;

              employeeYPositions[employeeName] = textYPos;
            }
          });

          drawRects(
            newArray,
            theGap,
            theTopPad,
            theSidePad,
            theBarHeight,
            theColorScale,
            employeeYPositions
          );
        }, 2000);
      }

      function drawRects(
        theArray,
        theGap,
        theTopPad,
        theSidePad,
        theBarHeight,
        theColorScale,
        employeeYPositions,
        w,
        h
      ) {
        let newArray = theArray.filter(
          (array) =>
            array.StartDate !== undefined && array.EndDate !== undefined
        );

        // Add validation for missing StartDate or EndDate
        allEmployeeTasks.forEach((task) => {
          if (!task.StartDate) {
            task.StartDate = task.CreatedDate; // Assign CreatedDate to StartDate if StartDate is missing
          }
        });
        var reorderedObject = {};

        employeeYPositions =
          typeof employeeYPositions === "object" ? employeeYPositions : {};

        if (
          typeof employeeYPositions === "object" &&
          Object.keys(employeeYPositions).length !== 0
        ) {
          reorderedObject = employeeYPositions;
        }

        console.log(theArray);

        var bigRects = svg
          .append("g")
          .selectAll("rect")
          .data(allEmployeeTasks)
          .enter()
          .append("rect")
          .attr("x", 0)
          .attr("y", function (d, i) {
            return i * theGap + theTopPad;
          })
          .attr("width", function (d) {
            return w - theSidePad / 2;
          })
          .attr("height", theGap * 11)
          .attr("stroke", "none")
          .attr("fill", "#fff")
          .attr("opacity", 0);

        var rectangles = svg
          .append("g")
          .selectAll("rect")
          .data(allEmployeeTasks)
          .enter();
        var additionalSpace = 10;

        var defaultRectWidth = 140; // Set your default width here

        var innerRects = rectangles
          .append("rect")
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("x", function (d) {
            w = 50;
            var xValue =
              ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 +
              theSidePad +
              500;
            return isNaN(xValue) ? 150 : xValue; // Adjust x based on task.day
          })
          .attr("y", function (d) {
            var employeeY = reorderedObject[d.Name];
            if (employeeY !== undefined && employeeY !== null) {
              if (d.Name === "Vijith Vijayan") {
                console.log(employeeY - 11);
              }
              var yValue = employeeY - 11;
              return isNaN(yValue) ? 150 : yValue;
            } else {
              return 100;
            }
          })
          .attr("width", function (d) {
            var start = new Date(d.StartDate).getDate();
            if (d.EndDate !== undefined) {
              var end = new Date(d.EndDate).getDate();
              var width = timeScale(end) - timeScale(start);
              if (width === 0) {
                width = 150;
              }
              return isNaN(width) ? 150 : Math.abs(width);
            } else {
              return 50;
            }
          })
          .attr("height", theBarHeight * 1.4)
          .attr("stroke", "none")
          .attr("fill", function (d) {
            // Assign colors based on the Name property of tasks
            switch (d.TaskStatus) {
              case "Overdue":
                return "#f06c88"; // Color for Name1
              case "Pending":
                return "#f4be65"; // Color for Name2
              case "Active":
                return "#629bea"; // Color for Name3
              case "Completed":
                return "#6ae181"; // Color for Name4
              default:
                return "#ccc"; // Default color if Name doesn't match
            }
          });

        var rectText = rectangles
          .append("text")
          .text(function (d) {
            var task = d.TaskStatus || ""; // Ensure there's a value for task
            if (task.length > 3) {
              return task.substring(0, 3) + "..."; // Display the first three letters followed by "..."
            }
            return task; // If the task length is less than or equal to 3, display the full task
          })
          .attr("x", function (d) {
            var xValue =
              ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 + theSidePad + 5;
            return isNaN(xValue) ? 150 : xValue;
          })
          .attr("y", function (d) {
            var employeeIndex = theArray.findIndex(
              (item) => item.Name === d.Name
            );
            var yValue =
              employeeIndex * theGap +
              theTopPad +
              theGap / 2 +
              8 * employeeIndex +
              15;
            return isNaN(yValue) ? 150 : yValue;
          })
          .attr("font-size", 11)
          .attr("text-anchor", "start") // Align text to the left
          .attr("text-height", theBarHeight)
          .attr("fill", "#fff");

        rectText
          .on("mouseover", function (e, d) {
            showTooltip(e, this.getBBox());
          })
          .on("mouseout", function () {
            hideTooltip();
          });

        innerRects
          .on("mouseover", function (e, d) {
            showTooltip(e, this.getBBox());
          })
          .on("mouseout", function () {
            hideTooltip();
          });

        function showTooltip(data, bbox) {
          var tag =
            "Task: " +
            data.Task +
            "<br/>" +
            "Name: " +
            data.Name +
            "<br/>" +
            "Starts: " +
            data.StartDate +
            "<br/>" +
            "Ends: " +
            data.EndDate +
            "<br/>" +
            "Task Status: " +
            data.TaskStatus +
            "<br/>";

          var output = document.getElementById("tag");
          var x = bbox.x;
          var y = bbox.y + bbox.height - 280;
          output.innerHTML = tag;
          output.style.top = y + "px";
          output.style.left = x + "px";
          output.style.display = "block";
        }

        function hideTooltip() {
          var output = document.getElementById("tag");
          output.style.display = "none";
        }
        innerRects.on("click", function (e, d) {
          showComments(e.Comments);
        });
      }

      function makeGrid(theSidePad, theTopPad, w, h) {
        console.log(timeScale);

        var reducedChartWidth = 6300; // Set your desired reduced width
        var reducedLabelWidth = reducedChartWidth / 7;

        var dayOfWeekScale = d3.scale
          .ordinal()
          .domain(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) // Days of the week
          .rangePoints([theSidePad, theSidePad + reducedLabelWidth]);

        var dayOfWeekAxis = d3.svg
          .axis()
          .scale(dayOfWeekScale)
          .orient("bottom")
          .tickSize(0);

        // Append a group for the new day of the week axis
        var dayOfWeekGrid = svg
          .append("g")
          .attr("class", "dayOfWeekGrid")
          .attr("transform", "translate(130, " + "-35)") // Position above the existing grid
          .call(dayOfWeekAxis)
          .selectAll("text")
          .style("text-anchor", "middle")
          // .attr("fill", "#000")
          // .attr("stroke", "none")
          .attr("font-size", 14)
          .attr("font-weight", "bold")
          .attr("dy", "-0.7em")
          .each(function () {
            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            // Insert a rectangle behind each day of the week text label
            // svg.insert("rect", ":first-child")
            //     .attr("x", this.getBBox().x - 5) // Adjust the x position of the rectangle
            //     .attr("y", this.getBBox().y - 2)
            //     .attr("width", textWidth)
            //     .attr("height", textHeight)
            // .attr("fill", "#E9EDEF");
          });

        var xAxis = d3.svg
          .axis()
          .scale(timeScale)
          .orient("top")
          .ticks(7) // Assuming you want 31 ticks for days 1-31
          .tickSize(-h + theTopPad + 20, 0, 0)
          .tickFormat(function (d, i) {
            // Return the day of the month (1-31)
            return i + 1;
          });

        var grid = svg
          .append("g")
          .attr("class", "grid")
          .attr("transform", "translate(" + 200 + ", " + "6)")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "middle")
          .attr("fill", "#000")
          .attr("stroke", "none")
          .attr("font-size", 12)
          .attr("font-weight", "bold")
          .attr("dy", "-0.7em")
          .each(function () {
            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box
            var axisWidth = 1500;

            // Insert a rectangle behind each x-axis text label
            svg
              .insert("rect", ":first-child")
              .attr("x", this.getBBox().x - -70) // Adjust the x position of the rectangle
              .attr("y", this.getBBox().y - -5)
              .attr("width", axisWidth)
              .attr("height", textHeight)
              .attr("fill", "#F5F5F5");
          });
      }

      function checkUnique(arr) {
        var hash = {},
          result = [];
        for (var i = 0, l = arr.length; i < l; ++i) {
          if (!hash.hasOwnProperty(arr[i])) {
            hash[arr[i]] = true;
            result.push(arr[i]);
          }
        }
        return result;
      }

      function getCounts(arr) {
        var i = arr.length, // var to loop over
          obj = {}; // obj to store results
        while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
        return obj;
      }

      // get specific from everything
      function getCount(word, arr) {
        return getCounts(arr)[word] || 0;
      }
    }
  });
});

// for switching to monthly data
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".month_sec");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }
  svgContainer.addEventListener("click", function () {
    const mainChart = document.querySelector(".svg_week");
    const overAllChart = document.querySelector(".overall_cont");
    const monthChart = document.querySelector(".svg_month");
    const timeChart = document.querySelector(".timeRange_sec_svg");
    const mainDiv = document.querySelector(".timeRange_sec1");
    const mainDiv2 = document.querySelector(".timeRange_sec");
    const mainDiv3 = document.querySelector(".month_sec");
    const mainText = document.querySelector(".month_text");
    const mainText1 = document.querySelector(".time_text");
    const mainText2 = document.querySelector(".time_text1");
    const mainText4 = document.querySelector(".overall_cont");

    monthChart.style.display = "block";
    mainChart.style.display = "none";
    timeChart.style.display = "none";
    mainDiv3.style.border = "1px solid #20a146";
    mainDiv2.style.border = "1px solid #303030";
    mainDiv.style.border = "1px solid #303030";
    mainText2.style.color = "#303030";
    mainText.style.color = "#20a146";
    mainText1.style.color = "#303030";
    mainText4.style.display= "none";

    var w = 1500;
    var h = 650;

    var svg = d3
      .selectAll(".svg_month")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var taskArray = [
      {
        task: "conceptualize",
        type: "Ganesh",
        Domain: "Frontend",
        startTime: "2013-2-3",
        endTime: "2013-2-5",
        details: "This actually didn't take any conceptualization",
      },

      {
        task: "sketch",
        type: "Sandhiya",
        Domain: "Python",
        startTime: "2013-2-1",
        endTime: "2013-2-6",
        details: "No sketching either, really",
      },

      {
        task: "color profiles",
        type: "Vijith",
        Domain: "Python",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
        details: "Python Visualization",
      },

      {
        task: "HTML",
        type: "Thanveer",
        Domain: "Frontend",
        startTime: "2013-2-2",
        endTime: "2013-2-6",
        details: "all three lines of it",
      },

      {
        task: "write the JS",
        type: "Monika",
        Domain: "HR Team",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
      },

      {
        task: "advertise",
        type: "Hariprasad",
        startTime: "2013-2-9",
        Domain: "Python",
        endTime: "2013-2-12",
        details: "This counts, right?",
      },

      {
        task: "spam links",
        type: "Gowtham",
        Domain: "Frontend",
        startTime: "2013-2-12",
        endTime: "2013-2-14",
        details: "All is well",
      },
      {
        task: "eat",
        type: "Janet James",
        Domain: "HR Team",
        startTime: "2013-2-8",
        endTime: "2013-2-13",
        details: "All the things",
      },

      {
        task: "crying",
        type: "Bhuvanesh",
        Domain: "HR Team",
        startTime: "2013-2-13",
        endTime: "2013-2-16",
      },
    ];

    var dateFormat = d3.time.format("%Y-%m-%d");

    var timeScale = d3.time
      .scale()
      .domain([1, 31])
      .range([0, w - 150]);
    var categories = new Array();

    for (var i = 0; i < taskArray.length; i++) {
      categories.push(taskArray[i].type);
    }

    var catsUnfiltered = categories;

    categories = checkUnique(categories);

    taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

    // Extract unique Domains to be used as headers
    var uniqueDomains = taskArray.map((task) => task.Domain);
    uniqueDomains = uniqueDomains.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    // Rearrange the taskArray based on the order of uniqueDomains
    var reorderedTasks = [];
    uniqueDomains.forEach((domain) => {
      reorderedTasks.push({ Domain: domain }); // Add Domain as the header
      reorderedTasks = reorderedTasks.concat(
        taskArray.filter((task) => task.Domain === domain)
      );
    });

    makeGant(taskArray, w, h);

    // var title = svg
    // .append("text")
    // .text("Gantt Chart Process")
    // .attr("x", w / 2)
    // .attr("y", 25)
    // .attr("text-anchor", "middle")
    // .attr("font-size", 18)
    // .attr("fill", "#009FFC");

    function makeGant(tasks, pageWidth, pageHeight) {
      var barHeight = 20;
      var gap = barHeight + 4;
      var topPadding = 75;
      var sidePadding = 75;

      var colorScale = d3.scale
        .linear()
        .domain([0, categories.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        colorScale,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }

    function getDayFromDate(dateString) {
      var date = new Date(dateString);
      return date.getDate();
    }

    function drawRects(
      theArray,
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale,
      w,
      h
    ) {
      var bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
          return w - theSidePad / 2;
        })
        .attr("height", theGap * 11)
        .attr("stroke", "none")
        .attr("fill", "#fff")
        .attr("opacity", 0);

      var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
      var additionalSpace = 10;

      var innerRects = rectangles
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
          return timeScale(getDayFromDate(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
          );
        })
        .attr("width", function (d) {
          var start = getDayFromDate(d.startTime);
          var end = getDayFromDate(d.endTime);
          return timeScale(end) - timeScale(start);
        })
        .attr("height", theBarHeight * 1.4)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {
              return d3.rgb(theColorScale(i));
            }
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          return d.task;
        })
        .attr("x", function (d) {
          return (
            timeScale(getDayFromDate(d.startTime)) + theSidePad + 5 // Adjust padding
          );
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i + 10
          );
        })
        .attr("font-size", 11)
        .attr("text-anchor", "start") // Align text to the left
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      rectText
        .on("mouseover", function (e) {
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });

      innerRects
        .on("mouseover", function (e) {
          //console.log(this);
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
          var y = this.y.animVal.value + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });
    }

    function vertLabels(
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale
    ) {
      var domainEmployeeMap = {};

      taskArray.forEach((task) => {
        if (task.type && task.Domain) {
          if (!domainEmployeeMap[task.Domain]) {
            domainEmployeeMap[task.Domain] = [];
          }
          domainEmployeeMap[task.Domain].push(task.type);
        }
      });

      var sortedDomains = Object.keys(domainEmployeeMap).sort();

      var numOccurances = [];

      var yPos = theTopPad;
      var domainSpace = 5; // Space between domains
      var employeeSpace = 5; // Space between employees

      sortedDomains.forEach((domain) => {
        if (domainEmployeeMap[domain].length > 0) {
          // Only draw domain rect if it has employees
          numOccurances.push([domain, domainEmployeeMap[domain].length]);

          svg
            .append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", theSidePad);
          // .attr('height', theGap * 1.5) // Adjusted height for domain rect
          // .attr('fill', 'lightgrey');

          yPos += domainSpace; // Increment yPos after domain rect

          domainEmployeeMap[domain].forEach((employee) => {
            numOccurances.push([employee, 1]);

            yPos += employeeSpace;
          });
        } else {
          yPos += domainSpace; // If no employees, still increment yPos for spacing
        }
      });

      var axisText = svg
        .append("g")
        .selectAll("text")
        .data(numOccurances)
        .enter()
        .append("text")
        .text(function (d) {
          return d[0];
        })
        .attr("x", function (d) {
          var isDomain = sortedDomains.includes(d[0]);
          return isDomain ? 5 : 10; // Adjust x-position for domain or employee
        })
        .attr("y", function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);
          var space = isDomain ? domainSpace : employeeSpace;

          // Shift the domain header down by 10 pixels
          return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space * i;
        })
        .attr("font-size", function (d) {
          return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
        })
        .attr("text-anchor", function (d) {
          return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
        })
        .attr("text-height", 14)
        .attr("fill", "black")
        .each(function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);

          if (
            isDomain &&
            i === numOccurances.findIndex((el) => el[0] === d[0])
          ) {
            d3.select(this)
              // .insert("tspan", ":first-child")
              .attr("x", -5)
              .text(d[0])
              .attr("font-weight", "bold");

            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            svg
              .insert("rect", ":first-child")
              .attr("x", -25) // Move the domain name slightly to the left
              .attr("y", this.getBBox().y - 2)
              .attr("width", textWidth * 1.3)
              .attr("height", textHeight * 1.4)
              .attr("fill", "#F5F5F5");
          }
        });
    }

    function makeGrid(theSidePad, theTopPad, w, h) {
      console.log(timeScale);
      var xAxis = d3.svg
        .axis()
        .scale(timeScale)
        .orient("top")
        .ticks(31) // Assuming you want 31 ticks for days 1-31
        .tickSize(-h + theTopPad + 20, 0, 0)
        .tickFormat(function (d, i) {
          // Return the day of the month (1-31)
          return i + 1;
        });

      var grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + "6)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("dy", "-0.7em");
    }

    function checkUnique(arr) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }

    function getCounts(arr) {
      var i = arr.length, // var to loop over
        obj = {}; // obj to store results
      while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
      return obj;
    }

    // get specific from everything
    function getCount(word, arr) {
      return getCounts(arr)[word] || 0;
    }
  });
});

// for switching to per day data
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".timeRange_sec");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }
  svgContainer.addEventListener("click", function () {
    const timeChart = document.querySelector(".timeRange_sec_svg");
    const monthChart = document.querySelector(".svg_month");
    const weekChart = document.querySelector(".svg_week");
    const mainChart = document.querySelector(".svg1");
    const overAllChart = document.querySelector(".overall_cont");
    const mainDiv = document.querySelector(".timeRange_sec1");
    const mainDiv2 = document.querySelector(".timeRange_sec");
    const mainDiv3 = document.querySelector(".month_sec");
    const mainText = document.querySelector(".month_text");
    const mainText1 = document.querySelector(".time_text");
    const mainText2 = document.querySelector(".time_text1");

    mainChart.style.display = "none";
    monthChart.style.display = "none";
    weekChart.style.display = "none";
    timeChart.style.display = "block";
    mainDiv2.style.border = "1px solid #20a146";
    mainDiv.style.border = "1px solid #303030";
    mainDiv3.style.border = "1px solid #303030";
    mainText1.style.color = "#20a146";
    mainText.style.color = "#303030";
    mainText2.style.color = "#303030";

    var w = 1500;
    var h = 650;

    var svg = d3
      .selectAll(".timeRange_sec_svg")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var taskArray = [
      {
        task: "conceptualize",
        type: "Ganesh",
        Domain: "Frontend",
        startTime: "2013-02-03T08:00:00",
        endTime: "2013-02-03T09:00:00",
        details: "This actually didn't take any conceptualization",
      },

      {
        task: "sketch",
        type: "Sandhiya",
        Domain: "Python",
        startTime: "2013-02-03T10:00:00",
        endTime: "2013-02-03T11:00:00",
        details: "No sketching either, really",
      },

      {
        task: "color profiles",
        type: "Vijith",
        Domain: "Python",
        startTime: "2013-02-03T12:00:00",
        endTime: "2013-02-03T12:00:00",
        details: "Python Visualization",
      },

      {
        task: "HTML",
        type: "Thanveer",
        Domain: "Frontend",
        startTime: "2013-02-03T08:00:00",
        endTime: "2013-02-03T08:00:00",
        details: "all three lines of it",
      },

      {
        task: "write the JS",
        type: "Monika",
        Domain: "HR Team",
        startTime: "2013-02-03T10:00:00",
        endTime: "2013-02-03T10:20:00",
      },

      {
        task: "advertise",
        type: "Hariprasad",
        startTime: "2013-02-03T01:00:00",
        Domain: "Python",
        endTime: "2013-02-03T02:00:00",
        details: "This counts, right?",
      },

      {
        task: "spam links",
        type: "Gowtham",
        Domain: "Frontend",
        startTime: "2013-02-03T03:00:00",
        endTime: "2013-02-03T03:00:00",
        details: "All is well",
      },
      {
        task: "eat",
        type: "Janet James",
        Domain: "HR Team",
        startTime: "2013-02-03T09:00:00",
        endTime: "2013-02-03T10:00:00",
        details: "All the things",
      },

      {
        task: "crying",
        type: "Bhuvanesh",
        Domain: "HR Team",
        startTime: "2013-02-03T01:00:00",
        endTime: "2013-02-03T02:00:00",
      },
    ];

    function getHourFromTime(timeString) {
      // Function to extract hours from a time string (e.g., "2013-2-3T09:00:00")
      return new Date(timeString).getHours();
    }

    var dateFormat = d3.time.format("%Y-%m-%d");
    var theSidePad = 75;

    var timeScale = d3.scale
      .linear()
      .domain([0, 12]) // representing hours from 12 AM to 12 PM
      .range([0, w - theSidePad]);

    var categories = new Array();

    for (var i = 0; i < taskArray.length; i++) {
      categories.push(taskArray[i].type);
    }

    var catsUnfiltered = categories;

    categories = checkUnique(categories);

    taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

    // Extract unique Domains to be used as headers
    var uniqueDomains = taskArray.map((task) => task.Domain);
    uniqueDomains = uniqueDomains.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    // Rearrange the taskArray based on the order of uniqueDomains
    var reorderedTasks = [];
    uniqueDomains.forEach((domain) => {
      reorderedTasks.push({ Domain: domain }); // Add Domain as the header
      reorderedTasks = reorderedTasks.concat(
        taskArray.filter((task) => task.Domain === domain)
      );
    });

    makeGant(taskArray, w, h);

    // var title = svg
    // .append("text")
    // .text("Gantt Chart Process")
    // .attr("x", w / 2)
    // .attr("y", 25)
    // .attr("text-anchor", "middle")
    // .attr("font-size", 18)
    // .attr("fill", "#009FFC");

    function makeGant(tasks, pageWidth, pageHeight) {
      var barHeight = 20;
      var gap = barHeight + 4;
      var topPadding = 75;
      var sidePadding = 75;

      var colorScale = d3.scale
        .linear()
        .domain([0, categories.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        colorScale,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }

    function getDayFromDate(dateString) {
      var date = new Date(dateString);
      return date.getDate();
    }

    function drawRects(
      theArray,
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale,
      w,
      h
    ) {
      var bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
          return w - theSidePad / 2;
        })
        .attr("height", theGap * 11)
        .attr("stroke", "none")
        .attr("fill", "#fff")
        .attr("opacity", 0);

      var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
      var additionalSpace = 10;

      var innerRects = rectangles
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
          return timeScale(getHourFromTime(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
          );
        })
        .attr("width", function (d) {
          var startHour = getHourFromTime(d.startTime);
          var endHour = getHourFromTime(d.endTime);
          return timeScale(endHour) - timeScale(startHour);
        })
        .attr("height", theBarHeight * 1.4)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {
              return d3.rgb(theColorScale(i));
            }
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          return d.task;
        })
        .attr("x", function (d) {
          return timeScale(getHourFromTime(d.startTime)) + theSidePad + 5; // Adjust padding
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i + 10
          );
        })
        .attr("font-size", 11)
        .attr("text-anchor", "start") // Align text to the left
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      rectText
        .on("mouseover", function (e) {
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });

      innerRects
        .on("mouseover", function (e) {
          //console.log(this);
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
          var y = this.y.animVal.value + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });
    }

    function vertLabels(
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale
    ) {
      var domainEmployeeMap = {};

      taskArray.forEach((task) => {
        if (task.type && task.Domain) {
          if (!domainEmployeeMap[task.Domain]) {
            domainEmployeeMap[task.Domain] = [];
          }
          domainEmployeeMap[task.Domain].push(task.type);
        }
      });

      var sortedDomains = Object.keys(domainEmployeeMap).sort();

      var numOccurances = [];

      var yPos = theTopPad;
      var domainSpace = 5; // Space between domains
      var employeeSpace = 5; // Space between employees

      sortedDomains.forEach((domain) => {
        if (domainEmployeeMap[domain].length > 0) {
          // Only draw domain rect if it has employees
          numOccurances.push([domain, domainEmployeeMap[domain].length]);

          svg
            .append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", theSidePad);
          // .attr('height', theGap * 1.5) // Adjusted height for domain rect
          // .attr('fill', 'lightgrey');

          yPos += domainSpace; // Increment yPos after domain rect

          domainEmployeeMap[domain].forEach((employee) => {
            numOccurances.push([employee, 1]);

            yPos += employeeSpace;
          });
        } else {
          yPos += domainSpace; // If no employees, still increment yPos for spacing
        }
      });

      var axisText = svg
        .append("g")
        .selectAll("text")
        .data(numOccurances)
        .enter()
        .append("text")
        .text(function (d) {
          return d[0];
        })
        .attr("x", function (d) {
          var isDomain = sortedDomains.includes(d[0]);
          return isDomain ? 5 : 10; // Adjust x-position for domain or employee
        })
        .attr("y", function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);
          var space = isDomain ? domainSpace : employeeSpace;

          // Shift the domain header down by 10 pixels
          return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space * i;
        })
        .attr("font-size", function (d) {
          return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
        })
        .attr("text-anchor", function (d) {
          return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
        })
        .attr("text-height", 14)
        .attr("fill", "black")
        .each(function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);

          if (
            isDomain &&
            i === numOccurances.findIndex((el) => el[0] === d[0])
          ) {
            d3.select(this)
              // .insert("tspan", ":first-child")
              .attr("x", -5)
              .text(d[0])
              .attr("font-weight", "bold");

            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            svg
              .insert("rect", ":first-child")
              .attr("x", -25) // Move the domain name slightly to the left
              .attr("y", this.getBBox().y - 2)
              .attr("width", textWidth * 1.3)
              .attr("height", textHeight * 1.4)
              .attr("fill", "#F5F5F5");
          }
        });
    }

    function makeGrid(theSidePad, theTopPad, w, h) {
      console.log(timeScale);
      var xAxis = d3.svg
        .axis()
        .scale(timeScale)
        .orient("top")
        .ticks(31) // Assuming you want 31 ticks for days 1-31
        .tickSize(-h + theTopPad + 20, 0, 0)
        .tickFormat(function (d, i) {
          // Return the day of the month (1-31)
          return i + 1;
        });

      var grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + "6)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("dy", "-0.7em");
    }

    function checkUnique(arr) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }

    function getCounts(arr) {
      var i = arr.length, // var to loop over
        obj = {}; // obj to store results
      while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
      return obj;
    }

    // get specific from everything
    function getCount(word, arr) {
      return getCounts(arr)[word] || 0;
    }
  });
});

// for navigating to Home screen
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".home_icon");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }

  svgContainer.addEventListener("click", function () {
    const containerTask = document.querySelector(".container_task");
    const overallCont = document.querySelector(".overall_cont");
    const overallCont1 = document.querySelector(".overall_cont1");
    const bottomSec = document.querySelector(".bottom_sec");
    const rightSec = document.querySelector(".right_sec");
    const table = document.querySelector(".project_table");
    const svg = document.querySelector(".svg");
    const alignment = document.querySelector(".align_dashboard");

    alignment.style.top = "-95px";

    if (
      !containerTask ||
      !overallCont ||
      !overallCont1 ||
      !bottomSec ||
      !rightSec
    ) {
      console.error("One or more elements not found!");
      return;
    }

    containerTask.style.display = "block";
    overallCont.style.display = "block";
    bottomSec.style.display = "block";
    rightSec.style.display = "block";
    overallCont1.style.display = "none";
    table.style.left = "982px";
    table.style.top = "605px";
    svg.style.display = "block";
  });
});

// while clicking projects button
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".team_2");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }
  svgContainer.addEventListener("click", function () {
    const timeChart = document.querySelector(".timeRange_sec_svg");
    const monthChart = document.querySelector(".svg_month");
    const week_chart = document.querySelector(".svg_week");
    const mainChart = document.querySelector(".svg1");
    const chart = document.querySelector(".svg");
    const chart_project = document.querySelector(".svg_project");
    const sec_1 = document.querySelector(".timeRange_sec");
    const sec_2 = document.querySelector(".timeRange_sec1");
    const sec_3 = document.querySelector(".month_sec");
    const team_1 = document.querySelector(".team_1");
    const team_2 = document.querySelector(".team_2");

    timeChart.style.display = "none";
    monthChart.style.display = "none";
    week_chart.style.display = "none";
    mainChart.style.display = "none";
    chart.style.display = "none";
    chart_project.style.display = "block";
    sec_3.style.pointerEvents = "none";
    sec_2.style.pointerEvents = "none";
    sec_1.style.pointerEvents = "none";
    team_2.style.border = "1px solid #20a146";
    team_1.style.border = "1px solid #303030";

    var w = 1500;
    var h = 650;

    var svg = d3
      .selectAll(".svg_project")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var taskArray = [
      {
        task: "conceptualize",
        type: "Ux Design",
        Domain: "Design",
        startTime: "2013-2-3",
        endTime: "2013-2-5",
        details: "This actually didn't take any conceptualization",
      },

      {
        task: "sketch",
        type: "Development",
        Domain: "Development",
        startTime: "2013-2-1",
        endTime: "2013-2-6",
        details: "No sketching either, really",
      },

      {
        task: "color profiles",
        type: "Server management",
        Domain: "Development",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
        details: "Python Visualization",
      },

      {
        task: "HTML",
        type: "Client call",
        Domain: "IT Support",
        startTime: "2013-2-2",
        endTime: "2013-2-6",
        details: "all three lines of it",
      },

      {
        task: "write the JS",
        type: "Employee Selection",
        Domain: "Design",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
      },

      {
        task: "advertise",
        type: "Short listing Employees",
        startTime: "2013-2-9",
        Domain: "IT Support",
        endTime: "2013-2-12",
        details: "This counts, right?",
      },

      {
        task: "spam links",
        type: "Finance Management",
        Domain: "IT Support",
        startTime: "2013-2-12",
        endTime: "2013-2-14",
        details: "All is well",
      },
      {
        task: "eat",
        type: "Goods Tracking",
        Domain: "Design",
        startTime: "2013-2-8",
        endTime: "2013-2-13",
        details: "All the things",
      },

      {
        task: "crying",
        type: "PO Preparation",
        Domain: "Development",
        startTime: "2013-2-13",
        endTime: "2013-2-16",
      },
    ];

    var dateFormat = d3.time.format("%Y-%m-%d");

    var timeScale = d3.time
      .scale()
      .domain([1, 31])
      .range([0, w - 150]);
    var categories = new Array();

    for (var i = 0; i < taskArray.length; i++) {
      categories.push(taskArray[i].type);
    }

    var catsUnfiltered = categories;

    categories = checkUnique(categories);

    taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

    // Extract unique Domains to be used as headers
    var uniqueDomains = taskArray.map((task) => task.Domain);
    uniqueDomains = uniqueDomains.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    // Rearrange the taskArray based on the order of uniqueDomains
    var reorderedTasks = [];
    uniqueDomains.forEach((domain) => {
      reorderedTasks.push({ Domain: domain }); // Add Domain as the header
      reorderedTasks = reorderedTasks.concat(
        taskArray.filter((task) => task.Domain === domain)
      );
    });

    makeGant(taskArray, w, h);

    // var title = svg
    // .append("text")
    // .text("Gantt Chart Process")
    // .attr("x", w / 2)
    // .attr("y", 25)
    // .attr("text-anchor", "middle")
    // .attr("font-size", 18)
    // .attr("fill", "#009FFC");

    function makeGant(tasks, pageWidth, pageHeight) {
      var barHeight = 20;
      var gap = barHeight + 4;
      var topPadding = 75;
      var sidePadding = 75;

      var colorScale = d3.scale
        .linear()
        .domain([0, categories.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        colorScale,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }

    function getDayFromDate(dateString) {
      var date = new Date(dateString);
      return date.getDate();
    }

    function drawRects(
      theArray,
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale,
      w,
      h
    ) {
      var bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
          return w - theSidePad / 2;
        })
        .attr("height", theGap * 11)
        .attr("stroke", "none")
        .attr("fill", "#fff")
        .attr("opacity", 0);

      var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
      var additionalSpace = 10;

      var innerRects = rectangles
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
          return timeScale(getDayFromDate(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
          );
        })
        .attr("width", function (d) {
          var start = getDayFromDate(d.startTime);
          var end = getDayFromDate(d.endTime);
          return timeScale(end) - timeScale(start);
        })
        .attr("height", theBarHeight * 1.4)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {
              return d3.rgb(theColorScale(i));
            }
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          return d.task;
        })
        .attr("x", function (d) {
          return (
            timeScale(getDayFromDate(d.startTime)) + theSidePad + 5 // Adjust padding
          );
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i + 10
          );
        })
        .attr("font-size", 11)
        .attr("text-anchor", "start") // Align text to the left
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      rectText
        .on("mouseover", function (e) {
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });

      innerRects
        .on("mouseover", function (e) {
          //console.log(this);
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
          var y = this.y.animVal.value + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });
    }

    function vertLabels(
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale
    ) {
      var domainEmployeeMap = {};

      taskArray.forEach((task) => {
        if (task.type && task.Domain) {
          if (!domainEmployeeMap[task.Domain]) {
            domainEmployeeMap[task.Domain] = [];
          }
          domainEmployeeMap[task.Domain].push(task.type);
        }
      });

      var sortedDomains = Object.keys(domainEmployeeMap).sort();

      var numOccurances = [];

      var yPos = theTopPad;
      var domainSpace = 5; // Space between domains
      var employeeSpace = 5; // Space between employees

      sortedDomains.forEach((domain) => {
        if (domainEmployeeMap[domain].length > 0) {
          // Only draw domain rect if it has employees
          numOccurances.push([domain, domainEmployeeMap[domain].length]);

          svg
            .append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", theSidePad);
          // .attr('height', theGap * 1.5) // Adjusted height for domain rect
          // .attr('fill', 'lightgrey');

          yPos += domainSpace; // Increment yPos after domain rect

          domainEmployeeMap[domain].forEach((employee) => {
            numOccurances.push([employee, 1]);

            yPos += employeeSpace;
          });
        } else {
          yPos += domainSpace; // If no employees, still increment yPos for spacing
        }
      });

      var axisText = svg
        .append("g")
        .selectAll("text")
        .data(numOccurances)
        .enter()
        .append("text")
        .text(function (d) {
          return d[0];
        })
        .attr("x", function (d) {
          var isDomain = sortedDomains.includes(d[0]);
          return isDomain ? 5 : 10; // Adjust x-position for domain or employee
        })
        .attr("y", function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);
          var space = isDomain ? domainSpace : employeeSpace;

          // Shift the domain header down by 10 pixels
          return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space * i;
        })
        .attr("font-size", function (d) {
          return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
        })
        .attr("text-anchor", function (d) {
          return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
        })
        .attr("text-height", 14)
        .attr("fill", "black")
        .each(function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);

          if (
            isDomain &&
            i === numOccurances.findIndex((el) => el[0] === d[0])
          ) {
            d3.select(this)
              // .insert("tspan", ":first-child")
              .attr("x", -5)
              .text(d[0])
              .attr("font-weight", "bold");

            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            svg
              .insert("rect", ":first-child")
              .attr("x", -55) // Move the domain name slightly to the left
              .attr("y", this.getBBox().y - 2)
              .attr("width", textWidth * 1.3)
              .attr("height", textHeight * 1.4)
              .attr("fill", "#F5F5F5");
          }
        });
    }

    function makeGrid(theSidePad, theTopPad, w, h) {
      console.log(timeScale);
      var xAxis = d3.svg
        .axis()
        .scale(timeScale)
        .orient("top")
        .ticks(31) // Assuming you want 31 ticks for days 1-31
        .tickSize(-h + theTopPad + 20, 0, 0)
        .tickFormat(function (d, i) {
          // Return the day of the month (1-31)
          return i + 1;
        });

      var grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + "6)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("dy", "-0.7em");
    }

    function checkUnique(arr) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }

    function getCounts(arr) {
      var i = arr.length, // var to loop over
        obj = {}; // obj to store results
      while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
      return obj;
    }

    // get specific from everything
    function getCount(word, arr) {
      return getCounts(arr)[word] || 0;
    }
  });
});

// while clicking Teams button
document.addEventListener("DOMContentLoaded", function () {
  const svgContainer = document.querySelector(".team_1");
  if (!svgContainer) {
    console.error("SVG container not found!");
    return;
  }
  svgContainer.addEventListener("click", function () {
    const timeChart = document.querySelector(".timeRange_sec_svg");
    const monthChart = document.querySelector(".svg_month");
    const week_chart = document.querySelector(".svg_week");
    const mainChart = document.querySelector(".svg1");
    const chart = document.querySelector(".svg");
    const chart_project = document.querySelector(".svg_project");
    const sec_1 = document.querySelector(".timeRange_sec");
    const sec_2 = document.querySelector(".timeRange_sec1");
    const sec_3 = document.querySelector(".month_sec");
    const team_1 = document.querySelector(".team_1");
    const team_2 = document.querySelector(".team_2");

    timeChart.style.display = "none";
    monthChart.style.display = "block";
    week_chart.style.display = "none";
    mainChart.style.display = "none";
    chart.style.display = "none";
    chart_project.style.display = "none";
    sec_3.style.pointerEvents = "";
    sec_2.style.pointerEvents = "";
    sec_1.style.pointerEvents = "";
    team_1.style.border = "1px solid #20a146";
    team_2.style.border = "1px solid #303030";

    var w = 1500;
    var h = 650;

    var svg = d3
      .selectAll(".svg_month")
      //.selectAll("svg")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "svg");

    var taskArray = [
      {
        task: "conceptualize",
        type: "Ganesh",
        Domain: "Frontend",
        startTime: "2013-2-3",
        endTime: "2013-2-5",
        details: "This actually didn't take any conceptualization",
      },

      {
        task: "sketch",
        type: "Sandhiya",
        Domain: "Python",
        startTime: "2013-2-1",
        endTime: "2013-2-6",
        details: "No sketching either, really",
      },

      {
        task: "color profiles",
        type: "Vijith",
        Domain: "Python",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
        details: "Python Visualization",
      },

      {
        task: "HTML",
        type: "Thanveer",
        Domain: "Frontend",
        startTime: "2013-2-2",
        endTime: "2013-2-6",
        details: "all three lines of it",
      },

      {
        task: "write the JS",
        type: "Monika",
        Domain: "HR Team",
        startTime: "2013-2-6",
        endTime: "2013-2-9",
      },

      {
        task: "advertise",
        type: "Hariprasad",
        startTime: "2013-2-9",
        Domain: "Python",
        endTime: "2013-2-12",
        details: "This counts, right?",
      },

      {
        task: "spam links",
        type: "Gowtham",
        Domain: "Frontend",
        startTime: "2013-2-12",
        endTime: "2013-2-14",
        details: "All is well",
      },
      {
        task: "eat",
        type: "Janet James",
        Domain: "HR Team",
        startTime: "2013-2-8",
        endTime: "2013-2-13",
        details: "All the things",
      },

      {
        task: "crying",
        type: "Bhuvanesh",
        Domain: "HR Team",
        startTime: "2013-2-13",
        endTime: "2013-2-16",
      },
    ];

    var dateFormat = d3.time.format("%Y-%m-%d");

    var timeScale = d3.time
      .scale()
      .domain([1, 31])
      .range([0, w - 150]);
    var categories = new Array();

    for (var i = 0; i < taskArray.length; i++) {
      categories.push(taskArray[i].type);
    }

    var catsUnfiltered = categories;

    categories = checkUnique(categories);

    taskArray.sort((a, b) => (a.Domain > b.Domain ? 1 : -1));

    // Extract unique Domains to be used as headers
    var uniqueDomains = taskArray.map((task) => task.Domain);
    uniqueDomains = uniqueDomains.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    // Rearrange the taskArray based on the order of uniqueDomains
    var reorderedTasks = [];
    uniqueDomains.forEach((domain) => {
      reorderedTasks.push({ Domain: domain }); // Add Domain as the header
      reorderedTasks = reorderedTasks.concat(
        taskArray.filter((task) => task.Domain === domain)
      );
    });

    makeGant(taskArray, w, h);

    // var title = svg
    // .append("text")
    // .text("Gantt Chart Process")
    // .attr("x", w / 2)
    // .attr("y", 25)
    // .attr("text-anchor", "middle")
    // .attr("font-size", 18)
    // .attr("fill", "#009FFC");

    function makeGant(tasks, pageWidth, pageHeight) {
      var barHeight = 20;
      var gap = barHeight + 4;
      var topPadding = 75;
      var sidePadding = 75;

      var colorScale = d3.scale
        .linear()
        .domain([0, categories.length])
        .range(["#00B9FA", "#F95002"])
        .interpolate(d3.interpolateHcl);

      makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
      drawRects(
        tasks,
        gap,
        topPadding,
        sidePadding,
        barHeight,
        colorScale,
        pageWidth,
        pageHeight
      );
      vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
    }

    function getDayFromDate(dateString) {
      var date = new Date(dateString);
      return date.getDate();
    }

    function drawRects(
      theArray,
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale,
      w,
      h
    ) {
      var bigRects = svg
        .append("g")
        .selectAll("rect")
        .data(theArray)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * theGap + theTopPad;
        })
        .attr("width", function (d) {
          return w - theSidePad / 2;
        })
        .attr("height", theGap * 11)
        .attr("stroke", "none")
        .attr("fill", "#fff")
        .attr("opacity", 0);

      var rectangles = svg.append("g").selectAll("rect").data(theArray).enter();
      var additionalSpace = 10;

      var innerRects = rectangles
        .append("rect")
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("x", function (d) {
          return timeScale(getDayFromDate(d.startTime)) + theSidePad;
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
          );
        })
        .attr("width", function (d) {
          var start = getDayFromDate(d.startTime);
          var end = getDayFromDate(d.endTime);
          return timeScale(end) - timeScale(start);
        })
        .attr("height", theBarHeight * 1.4)
        .attr("stroke", "none")
        .attr("fill", function (d) {
          for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {
              return d3.rgb(theColorScale(i));
            }
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          return d.task;
        })
        .attr("x", function (d) {
          return (
            timeScale(getDayFromDate(d.startTime)) + theSidePad + 5 // Adjust padding
          );
        })
        .attr("y", function (d, i) {
          return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i + 10
          );
        })
        .attr("font-size", 11)
        .attr("text-anchor", "start") // Align text to the left
        .attr("text-height", theBarHeight)
        .attr("fill", "#fff");

      rectText
        .on("mouseover", function (e) {
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.getItem(this) + "px";
          var y = this.y.animVal.getItem(this) + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });

      innerRects
        .on("mouseover", function (e) {
          //console.log(this);
          var tag = "";

          if (d3.select(this).data()[0].details != undefined) {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime +
              "<br/>" +
              "Details: " +
              d3.select(this).data()[0].details;
          } else {
            tag =
              "Task: " +
              d3.select(this).data()[0].task +
              "<br/>" +
              "Type: " +
              d3.select(this).data()[0].type +
              "<br/>" +
              "Starts: " +
              d3.select(this).data()[0].startTime +
              "<br/>" +
              "Ends: " +
              d3.select(this).data()[0].endTime;
          }
          var output = document.getElementById("tag");

          var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
          var y = this.y.animVal.value + 25 + "px";

          output.innerHTML = tag;
          output.style.top = y;
          output.style.left = x;
          output.style.display = "block";
        })
        .on("mouseout", function () {
          var output = document.getElementById("tag");
          output.style.display = "none";
        });
    }

    function vertLabels(
      theGap,
      theTopPad,
      theSidePad,
      theBarHeight,
      theColorScale
    ) {
      var domainEmployeeMap = {};

      taskArray.forEach((task) => {
        if (task.type && task.Domain) {
          if (!domainEmployeeMap[task.Domain]) {
            domainEmployeeMap[task.Domain] = [];
          }
          domainEmployeeMap[task.Domain].push(task.type);
        }
      });

      var sortedDomains = Object.keys(domainEmployeeMap).sort();

      var numOccurances = [];

      var yPos = theTopPad;
      var domainSpace = 5; // Space between domains
      var employeeSpace = 5; // Space between employees

      sortedDomains.forEach((domain) => {
        if (domainEmployeeMap[domain].length > 0) {
          // Only draw domain rect if it has employees
          numOccurances.push([domain, domainEmployeeMap[domain].length]);

          svg
            .append("rect")
            .attr("x", 0)
            .attr("y", yPos)
            .attr("width", theSidePad);
          // .attr('height', theGap * 1.5) // Adjusted height for domain rect
          // .attr('fill', 'lightgrey');

          yPos += domainSpace; // Increment yPos after domain rect

          domainEmployeeMap[domain].forEach((employee) => {
            numOccurances.push([employee, 1]);

            yPos += employeeSpace;
          });
        } else {
          yPos += domainSpace; // If no employees, still increment yPos for spacing
        }
      });

      var axisText = svg
        .append("g")
        .selectAll("text")
        .data(numOccurances)
        .enter()
        .append("text")
        .text(function (d) {
          return d[0];
        })
        .attr("x", function (d) {
          var isDomain = sortedDomains.includes(d[0]);
          return isDomain ? 5 : 10; // Adjust x-position for domain or employee
        })
        .attr("y", function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);
          var space = isDomain ? domainSpace : employeeSpace;

          // Shift the domain header down by 10 pixels
          return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space * i;
        })
        .attr("font-size", function (d) {
          return d[1] > 1 ? 14 : 12; // Change font size based on domain or employee
        })
        .attr("text-anchor", function (d) {
          return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
        })
        .attr("text-height", 14)
        .attr("fill", "black")
        .each(function (d, i) {
          var isDomain = sortedDomains.includes(d[0]);

          if (
            isDomain &&
            i === numOccurances.findIndex((el) => el[0] === d[0])
          ) {
            d3.select(this)
              // .insert("tspan", ":first-child")
              .attr("x", -5)
              .text(d[0])
              .attr("font-weight", "bold");

            var textWidth = this.getComputedTextLength() + 10; // Padding for the box
            var textHeight = this.getBBox().height + 5; // Padding for the box

            svg
              .insert("rect", ":first-child")
              .attr("x", -25) // Move the domain name slightly to the left
              .attr("y", this.getBBox().y - 2)
              .attr("width", textWidth * 1.3)
              .attr("height", textHeight * 1.4)
              .attr("fill", "#F5F5F5");
          }
        });
    }

    function makeGrid(theSidePad, theTopPad, w, h) {
      console.log(timeScale);
      var xAxis = d3.svg
        .axis()
        .scale(timeScale)
        .orient("top")
        .ticks(31) // Assuming you want 31 ticks for days 1-31
        .tickSize(-h + theTopPad + 20, 0, 0)
        .tickFormat(function (d, i) {
          // Return the day of the month (1-31)
          return i + 1;
        });

      var grid = svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + theSidePad + ", " + "6)")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .attr("stroke", "none")
        .attr("font-size", 12)
        .attr("font-weight", "bold")
        .attr("dy", "-0.7em");
    }

    function checkUnique(arr) {
      var hash = {},
        result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash.hasOwnProperty(arr[i])) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }

    function getCounts(arr) {
      var i = arr.length, // var to loop over
        obj = {}; // obj to store results
      while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
      return obj;
    }

    // get specific from everything
    function getCount(word, arr) {
      return getCounts(arr)[word] || 0;
    }
  });
});

// For calendar events
function showCalendar() {
  const input = document.querySelector(".date_from");
  const placeholder = document.querySelector(".placeholder_from");

  input.style.color = "black";

  input.addEventListener("change", function () {
    const selectedDate = input.value;

    if (selectedDate) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "inline-block";
    }
  });
}

function showCalendarTo() {
  const input = document.querySelector(".date_from1");
  const placeholder = document.querySelector(".placeholder_from1");

  input.style.color = "black";

  input.addEventListener("change", function () {
    const selectedDate = input.value;

    if (selectedDate) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "inline-block";
    }
  });
}

function updateSelectedOptions() {
  const checkboxes = document.querySelectorAll(
    '.checkboxes input[type="checkbox"]'
  );
  const selectedOptions = [];

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const labelText = checkbox.parentElement.textContent.trim();
      selectedOptions.push(labelText);
    }
  });

  const selectedOptionsInput = document.getElementById("selectedOptionsInput");
  if (selectedOptionsInput) {
    if (selectedOptions.length > 3) {
      selectedOptionsInput.value =
        selectedOptions[0] + " and " + (selectedOptions.length - 1) + " more";
    } else {
      selectedOptionsInput.value = selectedOptions.join(", ");
    }
  }
}

function showCheckboxes() {
  const checkboxes = document.getElementById("checkboxes");
  checkboxes.style.display =
    checkboxes.style.display === "none" ? "block" : "none";
}

// Run after DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Access the elements after the DOM is loaded
  const selectedOptionsInput = document.getElementById("selectedOptionsInput");
  if (selectedOptionsInput) {
    updateSelectedOptions(); // Update initially selected options
  }
});