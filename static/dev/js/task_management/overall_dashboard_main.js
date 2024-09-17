
var Individual_userId
var selected_user_name =0 ;
var selected_stage = 3;
var selected_date =0;

var today_btn = 1;
var week_btn=0;
var month_btn=0;
var to_btn=0;
var from_btn=0;
var selected_dept = 0;

var allEmployeeTasks = [];

var asigned_value;
var completed_value;
var total_value;

var fixedWeeklyData;
var fetchData;

$(document).ready(function () {
  console.log("hii");
  individual_user();
  $.ajax({
    url: "/task_management/overall_task/",
    method: "GET",
  })
    .done(function (json_data) {
      var data = JSON.parse(json_data);
      console.log("--- overall_task --- ", data);

      var overallTaskData = data.Overall_task_data;

      var taskData = overallTaskData[0];

      var completedTasks = taskData.Completed_Tasks;
      var inprogressTasks = taskData.Inprogress_Tasks;
      var newTasks = taskData.New_Tasks;
      var overdueTasks = taskData.Overdue_Tasks;
      console.log(newTasks);

      var completedTaskProgress = taskData.Completed_Task_Progress;
      var inprogressTaskProgress = taskData.Inprogress_Task_Progress;
      var newTasksProgress = taskData.New_Tasks_Progress;
      var overdueTaskProgress = taskData.Overdue_Task_Progress;

      var newTaskImages = taskData.New_Task_Image;
      var completedTaskImages = taskData.Completed_Task_Image;
      var ongoingTaskImages = taskData.Inprogress_Task_Image;
      var overdueTaskImages = taskData.Overdue_Task_Image;

      completedTaskImages.forEach(function (innerArray, outerIndex) {
        innerArray.forEach(function (imageUrl, innerIndex) {
          var imageappend = "";
          imageappend += `<img class="img_test" id = "img${innerIndex}" src="${imageUrl}" alt="Completed Task Image"> </img>`;
          $("#new_image2").append(imageappend);
        });
      });
      newTaskImages.forEach(function (innerArray, outerIndex) {
        innerArray.forEach(function (imageUrl, innerIndex) {
          var imageappend = "";
          imageappend += `<img class="img_test" id = "img${innerIndex}" src="${imageUrl}" alt="Completed Task Image"> </img>`;
          $("#new_image").append(imageappend);
        });
      });
      ongoingTaskImages.forEach(function (innerArray, outerIndex) {
        innerArray.forEach(function (imageUrl, innerIndex) {
          var imageappend = "";
          imageappend += `<img class="img_test" id = "img${innerIndex}" src="${imageUrl}" alt="Completed Task Image"> </img>`;
          $("#new_image3").append(imageappend);
        });
      });
      overdueTaskImages.forEach(function (innerArray, outerIndex) {
        innerArray.forEach(function (imageUrl, innerIndex) {
          var imageappend = "";
          imageappend += `<img class="img_test" id = "img${innerIndex}" src="${imageUrl}" alt="Completed Task Image"> </img>`;
          $("#new_image4").append(imageappend);
        });
      });

      $(".new_count").text(newTasks);
      $(".complete_count").text(completedTasks);
      $(".ongoing_count").text(inprogressTasks);
      $(".overdue_count").text(overdueTasks);
      $(".complete_progress").text(completedTaskProgress + " %");
      $(".ongoing_progress").text(inprogressTaskProgress + " %");
      $(".new_progress").text(newTasksProgress + " %");
      $(".overdue_progress").text(overdueTaskProgress + " %");
      $(".filler").css("width", newTasksProgress + "%");
      $(".filler1").css("width", completedTaskProgress + "%");
      $(".filler2").css("width", inprogressTaskProgress + "%");
      $(".filler3").css("width", overdueTaskProgress + "%");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Request Failed: " + textStatus, errorThrown);
    });

  // weekly chart
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
      .style("width", "1226" + "px")
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
        (array) => array.StartDate !== undefined && array.EndDate !== undefined
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
        (array) => array.StartDate !== undefined && array.EndDate !== undefined
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
//  check while loading
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
            ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 + theSidePad + 500;
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
              return "#f16d8a"; // Color for Name1
            case "Pending":
              return "#f4be66"; // Color for Name2
            case "Active":
              return "#619bea"; // Color for Name3
            case "Completed":
              return "#58c76c"; // Color for Name4
            default:
              return "#ccc"; // Default color if Name doesn't match
          }
        });

      var rectText = rectangles
        .append("text")
        .text(function (d) {
          var task = d.Task || ""; // Ensure there's a value for task
          if (task.length > 3) {
            return task.substring(0, 3) + "..."; // Display the first three letters followed by "..."
          }
          return task; // If the task length is less than or equal to 3, display the full task
        })
        .attr("x", function (d) {
          var xValue =
            ((Number(d.day) - 1) * (w - theSidePad * 7)) / 7 + theSidePad + 5;
          return isNaN(xValue) ? 150 : Math.abs(xValue);
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
          return isNaN(yValue) ? 150 : Math.abs(yValue);
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
        var y = bbox.y + bbox.height - 200;
        output.innerHTML = tag;
        output.style.top = y + "px";
        output.style.left = x + "px";
        output.style.display = "block";
      }

      function hideTooltip() {
        var output = document.getElementById("tag");
        output.style.display = "none";
      }
      innerRects.on('click', function (e, d) {
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

// individual user side list
function individual_user() {
  
  $.ajax({
    url: "/task_management/all_user_data/",
    method: "GET",
    dataType: "json",
  }).done(function (datas) {
    console.log("-- Individual_analysis--", datas);
    response_datas = datas.user_list;
    fetchData = response_datas;
    console.log(" response_data ", response_datas);

    let currentPage = 1;
    const usersPerPage = 9; // Number of users per page
    const container = $(".emp_container");
    const totalUsers = response_datas.length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    function displayUsers(startIndex, endIndex) {
      container.empty(); // Clear previous users
    
      const searchTerm = $("#searchInput").val().toLowerCase();
    
      // Filter data based on search input
      const filteredData = response_datas.filter(user => {
        // Check if user is defined and has User_Name property
        const userName = user && user.User_Name ? user.User_Name.toLowerCase() : '';
    
        // Use a case-insensitive comparison for search
        return userName.includes(searchTerm);
      });
    
      for (let i = startIndex; i < endIndex && i < filteredData.length; i++) {
        const user = filteredData[i];
    
        // Add additional check to ensure user is defined
        if (user) {
          const empElement = $('<div class="emp_name_1"></div>');
          const imgElement = $('<img class="dynamic_img" />')
            .attr("src", user.User_Photo)
            .attr("width", "20px");
          const empContainer = $('<div class="emp_container"></div>');
          const empDetails = $('<div class="emp_dets"></div>');
          const empName = $('<p class="emp_name"></p>')
            .text(user.User_Name)
            .data("user-id", user.User_Id); // Add user ID as data attribute
    
          const empDomain = $('<p class="emp_domain"></p>').text(user.Work_Position || ''); // Handling cases where Work_Position may not be present
    
          empDetails.append(empName, empDomain);
          empContainer.append(empDetails);
          empElement.append(imgElement, empContainer);
    
          // Append emp_name_1 to emp_container
          container.append(empElement);
        }
      }
    
      // Add click event handler for emp_name elements
      $(".emp_name").on("click", function () {
        Individual_userId = $(this).data("user-id");
        // Now you have the user ID, you can perform further actions
        console.log("Clicked user ID:", Individual_userId);
    
        $("#overall_dash_div").hide();
        $("#individual_div").show();
        $('#individual_user_list').show();
        ToIndividualDashboard();
        changeStyleBasedOnDiv();
      });
    
    
      function ToIndividualDashboard() {
        $.ajax({
          url: "/individual_task_dashboard/individual_templete_load/",
          method: "POST",
          data: {
            format: "json",
            individual_id: Individual_userId,
          },
          success: function (response) {
            // Get the number of weeks 
            var User_id = response.Data.id;  // Access 'id' from the response
            console.log("User ID:", User_id);
      
          individual_dashboard();
          // individual_user();
          
          }
        });
      }
    }

    // Attach an event listener to the search input for real-time filtering
    $("#searchInput").on("input", function () {
      // Reset current page to 1 when search changes
      currentPage = 1;
      showCurrentPage(); // Redisplay users based on the search input
    });

  function changeStyleBasedOnDiv() {
    const targetDiv = document.getElementById('individual_div');
const scriptElement = document.getElementById('scriptElement');
const styleLink = document.getElementById('styleLink');

if (targetDiv.style.display === 'none') {
    // Add or enable the script
    if (!scriptElement) {
     const newScript = document.createElement('script');
     newScript.src = 'https://d3js.org/d3.v3.min.js';
     newScript.id = 'scriptElement';
     document.head.appendChild(newScript);
     styleLink.href = '/static/css/task_management_css/overall_style.css';
    }
} else {
    // Remove or disable the script
    if (scriptElement) {
     scriptElement.parentNode.removeChild(scriptElement);
     styleLink.href = '/static/css/task_management_css/individual_style.css';
    }
  }
  }

  function changeStyleBasedOnDiv() {
    const targetDiv = document.getElementById('individual_div');
    const styleLink = document.getElementById('styleLink');
    const scriptElement = document.getElementById('scriptElement');
  
    if (targetDiv.style.display === 'block') {
      styleLink.href = '/static/css/task_management_css/individual_style.css';
  
      // Remove the script element if it exists
        scriptElement.remove();
    } else {
      styleLink.href = '/static/css/task_management_css/overall_style.css';
  
      // Create a new script element
      const newScriptElement = document.createElement('script');
      newScriptElement.id = 'scriptElement';
      newScriptElement.src = 'https://d3js.org/d3.v3.min.js'; // Set the appropriate source
  
      // Append the new script element to the head of the document
      document.head.appendChild(newScriptElement);
    }
  }
  
  
    function updatePagination() {
      $("#currentPage").text(currentPage);
      $("#totalPages").text(totalPages);

      $("#prevPage").prop("disabled", currentPage === 1);
      $("#nextPage").prop("disabled", currentPage === totalPages);
    }

    function showCurrentPage() {
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;

      displayUsers(startIndex, endIndex);
      updatePagination();
    }

    $(document).on("click", "#prevPage", () => {
      if (currentPage > 1) {
        currentPage--;
        showCurrentPage();
      }
    });

    $(document).on("click", "#nextPage", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showCurrentPage();
      }
    });

    // Initialize Pagination
    const paginationHTML = `
      <div class="pagination">
        <button id="prevPage">&laquo;</button>
        <span id="number_of_pages">Page <span id="currentPage">1</span> of <span id="totalPages">${totalPages}</span></span>
        <button id="nextPage">&raquo;</button>
      </div>
    `;
    container.after(paginationHTML);
    showCurrentPage(); // Show the initial page

  });
}


// project estimate
  $.ajax({
    url: "/task_management/project_estimate/",
    method: "GET",
    dataType: "json", 
  })
    .done(function (data) {
      console.log("--- project_estimate --- ", data);

      var dataArray = data.data;
      var projectData = dataArray[0];
      var totalProjects = projectData.Total_project;
      var assignedProjects = projectData.Assignes_Project;
      var completedProjects = projectData.Completed_project;
      var assign_percent = projectData.Assigned_percent;
      var complete_percent = projectData.completed_percent;

      total_value = totalProjects;
      completed_value = complete_percent;
      asigned_value = assign_percent;

      console.log(asigned_value, completed_value, total_value);

      updateCircle(total_value);
      updateCircle2(completed_value);
      updateCircle1(asigned_value);

      $(".pro_total1").text(totalProjects);
      $(".pro_asn").text(assignedProjects);
      $(".com_number").text(completedProjects);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("AJAX Request Failed: " + textStatus, errorThrown);
    });

    $.ajax({
      url: "/task_management/task_report_filter/",
      method: "GET",
      dataType: "json",
    }).done(function (data_list) {
      response_data = data_list.data;
      console.log(" ---- ", response_data);
    
      var selectElement = document.getElementById("employeeSelect");
    
      // Loop through the data and create option elements
      response_data.forEach(function (res_data, index) {
        var res_id = res_data.Responsible_Id;
        var res_name = res_data.Name;
    
        var optionElement = document.createElement("option");
        optionElement.className = "emp_option";
        optionElement.value = res_id;
        optionElement.textContent = res_name;
        selectElement.appendChild(optionElement);
    
        // Set the first employee name globally
        if (index === 11) {
          selected_user_name = res_id;
        }
      });
    
    
      console.log("First Employee Name Globally:", selected_user_name);
    
    
// current month 
var currentDate = new Date();
var startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
selected_date = startOfMonth.toISOString().split('T')[0];
console.log("Start of Current Month:", selected_date);

task_report()
  });

  $(".emp_select").click(function () {
    selected_user_name = $(this).val();
    console.log("Selected name: " + selected_user_name);
    task_report();
  });
  $(".emp_select1").click(function () {
    selected_stage = $(this).val();
    console.log("Selected stage: " + selected_stage);
    task_report();
  });
  $(".calendar-input").change(function () {
    selected_date = $(this).val();
    console.log("Selected date: " + selected_date);
    task_report();
  });


  // resource management
  $(".svg_cont").click(function () {
    

    $.ajax({
      url: "/task_management/resource_management_dept_filter/",
      method: "GET",
      dataType: "json",
    }).done(function (data) {
      dept_response_data = data.data;
      console.log("---dept_filter---", dept_response_data);
      var selectElement = $("#resources");
    
      // Loop through the data and create option elements
      dept_response_data.forEach(function (dept_data) {
        // Access properties directly within the loop
        var dept_id = dept_data.Dept_Id;
        var dept_name = dept_data.Dept_Name;
    
        var optionElement = $("<option>", {
          value: dept_id,
          text: dept_name
        });
    
        // Append the option to the select element
        selectElement.append(optionElement);
      });
    
      // Use the on() method to attach the click event to dynamically added options
      selectElement.on("change", function () {
        
        selected_dept = $(this).val();
        console.log("Selected dept: " + selected_dept);
        
      });
    });
 
    
 

  
//  resource management user filter
  $.ajax({
    url: "/task_management/resource_management_user_filter/",
    method: "GET",
    dataType: "json",
  }).done(function (response) {
    console.log("---user_filter---", response);
  
    var data = response.data; 
  
    if (Array.isArray(data)) {
      var checkboxesContainer = $("#checkboxes");
  
      // Clear existing checkboxes
      checkboxesContainer.empty();
  
      data.forEach(function (user) {
        var user_id = user.User_Id;
        var user_name = user.User_Name;
  
        var checkboxLabel = $("<label>").attr("for", "user_" + user_id);
        var checkboxInput = $("<input>", {
          type: "checkbox",
          onchange: "updateSelectedOptions()",
          id: "user_" + user_id,
          value: user_id,
        }).appendTo(checkboxLabel);
  
        checkboxLabel.append(" " + user_name);
        checkboxesContainer.append(checkboxLabel);
      });
    } else {
      console.error("Data is not an array:", data);
    }
  });
  
  
});

  $(".timeRange_sec").click(function () {
   
    today_btn = 1;

    console.log("today_btn" + today_btn);
  });
  $(".timeRange_sec1").click(function () {
   
    today_btn = 0;
    week_btn = 1;

    console.log("week_btn: " + week_btn);
    console.log("today_btn" + today_btn);
  });
  $(".month_sec").click(function () {
    
    today_btn = 0;
    week_btn=0;
    month_btn = 1;
   
    console.log("month_btn" + month_btn);
    console.log("week_btn" + week_btn);
  });


  resource_manage_team();

  $(".team_1").click(function () {
   
    resource_manage_team();
  });

  $(".team_2").click(function () {
   
    resource_manage_project();
  });

  function resource_manage_team() {
    $.ajax({
      url: "/task_management/resource_management_team/",
      method: "POST",
      data: {
        format: "json",
        today: today_btn,
        month: month_btn,
        week: week_btn,
        from_date: from_btn,
        to_date: to_btn,
        dept_id: selected_dept,
      },
      dataType: "json",
      success: function (response) {
        var teamList = response;
        console.log("---team---", teamList);
        // storeWeeklyData(response);
      },
    });
  }

  function resource_manage_project() {
    $.ajax({
      url: "/task_management/resource_management_project/",
      method: "POST",
      data: {
        format: "json",
        today: today_btn,
        month: month_btn,
        week: week_btn,
        from_date: from_btn,
        to_date: to_btn,
        dept_id: selected_dept,
      },
      dataType: "json",
      success: function (response) {
        var projectList = response;
        console.log("---project---", projectList);
      },
    });
  }
 
});

// For calendar events
function showCalendar() {
  const input = document.querySelector(".date_from");
  const placeholder = document.querySelector(".placeholder_from");

  input.style.color = "black";

  input.addEventListener("change", function () {
    const selectedDatefrom = input.value;
   
    if (selectedDatefrom) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "inline-block";
    }
    from_btn =selectedDatefrom
    week_btn=0;
    month_btn = 0;
    today_btn = 0;
    console.log(from_btn)
  });
}

function showCalendarTo() {
  const input = document.querySelector(".date_from1");
  const placeholder = document.querySelector(".placeholder_from1");

  input.style.color = "black";

  input.addEventListener("change", function () {
    const selectedDateto = input.value;

    if (selectedDateto) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "inline-block";
    }
    to_btn = selectedDateto
    today_btn = 0;
    week_btn=0;
    month_btn = 0;
    console.log(to_btn)
  });
}


function task_report(pageNumber = 1) {
  var tableBody = $("#tableBody");
  var tableHeader = $(".main_table table thead");
  tableBody.empty();
  tableHeader.empty();
  $.ajax({
    url: "/task_management/task_report/",
    method: "POST",
    data: {
      format: "json",
      responsible_id: selected_user_name,
      status: selected_stage,
      date: selected_date,
    },
    dataType: "json",
    success: function (response) {
      var taskList = response.task_report_list;
      var itemsPerPage = 4; // Number of items per page
      var startIndex = (pageNumber - 1) * itemsPerPage;
      var endIndex = startIndex + itemsPerPage;

      var tableBody = $("#tableBody");
      var tableHeader = $(".main_table table thead");
      tableBody.empty();
      tableHeader.empty();

      // ... your table header creation code remains the same

      // Render rows for the current page
      taskList.slice(startIndex, endIndex).forEach(function (task) {
        var row = $("<tr>");
        row.append($("<td>").text(task.Task_Id));
        row.append($("<td>").text(task.Task_Name));
        row.append($("<td>").text(task.Start_Date));
        row.append($("<td>").text(task.End_Date));
        row.append($("<td>").text(task.Observer_Name));

        var statusColumn = $("<td>").addClass("table_status");
        var statusDot = $("<div>").addClass(
          getStatusDotClass(task.Task_Status)
        );
        statusColumn.append(statusDot);
        statusColumn.append(task.Task_Status);
        row.append(statusColumn);

        tableBody.append(row);
      });

      // Calculate the height of the table content
      var tableHeight = $(".main_table").height() + 100;

      // Set the height of report_table to accommodate the table content
      $(".report_table").height(tableHeight);

      // Render pagination controls
      renderPaginationControls(
        Math.ceil(taskList.length / itemsPerPage),
        pageNumber
      );
    },
    error: function (error) {
      // Handle error if AJAX call fails
    },
  });
}

// Function to render pagination controls with Previous, Current Page, and Next icons
function renderPaginationControls(totalPages, currentPage) {
  var paginationControls = $(".pagination-controls");
  paginationControls.empty();

  var prevButton = $("<button>")
    .addClass("pagination-previous")
    .html("&laquo;"); // HTML entity for "Previous" symbol
  if (currentPage === 1) {
    prevButton.prop("disabled", true);
  } else {
    prevButton.on("click", function () {
      task_report(currentPage - 1);
    });
  }

  var currentPageDisplay = $("<span>")
    .addClass("pagination-text") // Add a class to the span element
    .text("Page " + currentPage + " of " + totalPages);

  var nextButton = $("<button>").addClass("pagination-next").html("&raquo;"); // HTML entity for "Next" symbol
  if (currentPage === totalPages) {
    nextButton.prop("disabled", true);
  } else {
    nextButton.on("click", function () {
      task_report(currentPage + 1);
    });
  }

  paginationControls.append(prevButton);
  paginationControls.append(currentPageDisplay);
  paginationControls.append(nextButton);
}

// Function to set the fill percentage of the SVG path

function updateCircle(percentage) {
  const circle = document.getElementById("circle");
  const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
  const offset = circumference - (percentage / 100) * circumference;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
}

setTimeout(() => {
  updateCircle(total_value);
}, 0);

function updateCircle1(percentage) {
  const circle = document.getElementById("circle1");
  const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
  const offset = circumference - (percentage / 100) * circumference;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
  console.log(asigned_value, completed_value, total_value);
}

setTimeout(() => {
  updateCircle1(asigned_value);
}, 0);

function updateCircle2(percentage) {
  const circle = document.getElementById("circle2");
  const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
  const offset = circumference - (percentage / 100) * circumference;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
}

setTimeout(() => {
  updateCircle2(completed_value);
}, 0);

// Function to determine the appropriate class for the status dot based on the status
function getStatusDotClass(status) {
  switch (status.toLowerCase()) {
    case "completed":
      return "dot";
    case "waiting":
      return "dot_blue";
    case "pending":
      return "dot_yellow";
    // Add more cases as needed
    default:
      return "";
  }
}


function showComments(commentData) {
  var popup = document.getElementById("popup");
  var commentContent = document.getElementById("commentContent");
  
  commentContent.innerHTML = ""; // Clear previous content
  
  // Check if commentData is undefined or empty
  if (!commentData || commentData.length === 0) {
  var noWorkSummary = document.createElement("p");
  noWorkSummary.textContent = "No work summary updated.";
  commentContent.appendChild(noWorkSummary);
  } else {
  // Construct the comment content
  commentData.forEach((comment) => {
  var commentText = document.createElement("p");
  commentText.textContent = comment.Comment;
  commentContent.appendChild(commentText);
  });
  }
  
  popup.style.display = "block";
  }
  
  function closePopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
  }



