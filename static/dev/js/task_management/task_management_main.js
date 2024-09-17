

// $(document).ready(function () {
//    console.log("hiii");
//    // $("#loading").hide();
//    $.ajax({
//        url: "/task_management/task_status_data/",
//        method: "get",
//    }).done(function (json_data) {
//       var data = JSON.parse(json_data); // Access the 'data' array inside json_data
//       console.log("--- Task data List --- ", data);

//       var data_list = [];
//       for (const user of data.data) {
//          const Name = user.Name;
//          const Department = user.Department;
//          const Task = user.Task;
//          const StartDate = user.StartDate;
//          const EndDate = user.EndDate;
//          const Comments = user.Comments;

//          const userData = {
//             Name: Name,
//             Department: Department,
//             Task: Task,
//             StartDate: StartDate,
//             EndDate: EndDate,
//             Comments: Comments
//          };

//          // Append the userData object to the data_list array
//          data_list.push(userData);
//       }
// --------------------------------------------------------------


$(document).ready(function () {
   // $('#container_sec_1').empty();
   console.log("hiii");
   $("#loading").hide();
   // Replace the URL with your actual endpoint
   $.ajax({
      url: "/task_management/task_status_data/",
      method: "get",
   }).done(function (json_data) {
      var data = JSON.parse(json_data);
      console.log("--- Task data List --- ", data);

   
      

   var data_list = [];
   for (const user of data.data) {
      const task_info = [];
      const User_name = user.Name;
      const Department_name = user.Department;
   
      for (const task of user.Tasks) {
         if (task.StartDate !== null && task.EndDate !== null && task.StartDate !== "" && task.EndDate !== "") {
             const task_data = {
                 Task: task.Task,
                 StartDate: task.StartDate,
                 EndDate: task.EndDate,
                 Comments: task.Comments,
                 StartDatePlan :task.startDatePlan,
                 EndDatePlan :task.EndDatePlan,
                 Status :task.TaskStatus,
               
             };
             
             task_info.push(task_data);
             
             
         }
     }

      if(Department_name== "GREEN Limited"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);

      }
      if(Department_name== "GREEN RE - Engineering & Projects"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name == "Business Services-PG"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
   
      }
      if(Department_name == "Project Engineering"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name == "Design Engineering"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name == "Marketing & DCD Dept"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name == "FinAC Dept"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="Digital Infra Structure"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="Digital Transformation"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="Assets & Properties MM"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="DES Solution Developers"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="Front-End / UI / UX"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="FIinAC - IN"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
      if(Department_name =="Human Capital Empowerment-IN"){
         const userData = {
            Name: User_name, // Assuming Name and Department are defined elsewhere
            Department: Department_name,
            Task:task_info
         }
         data_list.push(userData);
      }
   
 
}

   // Now data_list contains objects with user data
console.log("-----data_list------",data_list);

   var w = 1500;
   var h = 2000;

   var svg = d3
   .selectAll(".svg_month")
   //.selectAll("svg")
   .append("svg")
   .attr("width", w)
   .attr("height", h)
   .attr("class", "svg");


         //   {
         //      task: "sketch",
         //      type: "Sandhiya",
         //      Domain: "Python",
         //      startTime: "2013-2-1",
         //      endTime: "2013-2-6",
         //      details: "No sketching either, really",
         //   },

         //   {
         //      task: "color profiles",
         //      type: "Vijith",
         //      Domain: "Python",
         //      startTime: "2013-2-6",
         //      endTime: "2013-2-9",
         //      details: "Python Visualization",
         //   },

         //   {
         //      task: "HTML",
         //      type: "Thanveer",
         //      Domain: "Frontend",
         //      startTime: "2013-2-2",
         //      endTime: "2013-2-6",
         //      details: "all three lines of it",
         //   },

         //   {
         //      task: "write the JS",
         //      type: "Kowsalya",
         //      Domain: "HR Team",
         //      startTime: "2013-2-6",
         //      endTime: "2013-2-9",
         //   },

         //   {
         //      task: "advertise",
         //      type: "Hariprasad",
         //      startTime: "2013-2-9",
         //      Domain: "Python",
         //      endTime: "2013-2-12",
         //      details: "This counts, right?",
         //   },

         //   {
         //      task: "spam links",
         //      type: "Gowtham",
         //      Domain: "Frontend",
         //      startTime: "2013-2-12",
         //      endTime: "2013-2-14",
         //      details: "All is well",
         //   },
         //   {
         //      task: "eat",
         //      type: "Janet James",
         //      Domain: "HR Team",
         //      startTime: "2013-2-8",
         //      endTime: "2013-2-13",
         //      details: "All the things",
         //   },

         //   {
         //      task: "crying",
         //      type: "Bhuvanesh",
         //      Domain: "HR Team",
         //      startTime: "2013-2-13",
         //      endTime: "2013-2-16",
         //   },
         // ];

   var dateFormat = d3.time.format("%Y-%m-%d");

   var timeScale = d3.time
   .scale()
   .domain([1, 31])
   .range([0, w - 150]);
   var categories = new Array();

   for (var i = 0; i < data_list.length; i++) {
   categories.push(data_list[i].type);
   console.log(categories.push(data_list[i].type))
   }

   var catsUnfiltered = categories;

   categories = checkUnique(categories);

   data_list.sort((a, b) => (a.Department > b.Department ? 1 : -1));

   // Extract unique Domains to be used as headers
   var uniqueDomains = data_list.map((task) => task.Department);
   uniqueDomains = uniqueDomains.filter(
   (value, index, self) => self.indexOf(value) === index
   );

   // Rearrange the taskArray based on the order of uniqueDomains
   var reorderedTasks = [];
   uniqueDomains.forEach((domain) => {
   reorderedTasks.push({ Department: domain }); // Add Domain as the header
   reorderedTasks = reorderedTasks.concat(
   data_list.filter((task) => task.Department === domain)
   );
   });

   makeGant(data_list, w, h);

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
         return timeScale(getDayFromDate(d.StartDate)) + theSidePad;
      })
      .attr("y", function (d, i) {
         return (
            i * theGap * 1.8 + theTopPad + theGap / 2 + additionalSpace * i
         );
      })
      .attr("width", function (d) {
         var start = getDayFromDate(d.StartDate);
         var end = getDayFromDate(d.EndDate);
         return timeScale(end) - timeScale(start);
      })
      .attr("height", theBarHeight * 1.4)
      .attr("stroke", "none")
      .attr("fill", function (d) {
         for (var i = 0; i < categories.length; i++) {
            if (d.type == categories[i]) {1
               2
               3
               4
               5
               6
               7
               8
               9
               10
               11
               12
               13
               14
               15
               16
               17
               18
               19
               20
               21
               22
               23
               24
               25
               26
               27
               28
               29
               30
               31
               
            return d3.rgb(theColorScale(i));
            }
         }
      });
      
      
   var rectText = rectangles
      .append("text")
      .text(function (d) {
         return d.Task;
      })
      .attr("x", function (d) {
         return (
            timeScale(getDayFromDate(d.StartDate)) + theSidePad + 5 // Adjust padding
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
         // var tag = "";
         if (d3.select(this).data()[0].data_list.Comments != undefined) {
            tag =
            "Task: " +
            d3.select(this).data()[0].data_list.Task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].data_list.Name +
            "<br/>" +
            "Starts: " +
            d3.select(this).data()[0].data_list.StartDate +
            "<br/>" +
            "Ends: " +
            d3.select(this).data()[0].data_list.EndDate +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].data_list.Comments;
         } else {
            tag =
            "Task: " +
            d3.select(this).data()[0].data_list.Task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].data_list.Name +
            "<br/>" +
            "Starts: " +
            d3.select(this).data()[0].data_list.StartDate +
            "<br/>" +
            "Ends: " +
            d3.select(this).data()[0].data_list.EndDate;
         }
         var output = document.getElementById("tag1");

         var x = this.x.animVal.getItem(this) + "px";
         var y = this.y.animVal.getItem(this) + 25 + "px";

         output.innerHTML = tag;
         output.style.top = y;
         output.style.left = x;
         output.style.display = "block";
      })
      .on("mouseout", function () {
         var output = document.getElementById("tag1");
         output.style.display = "none";
      });

   innerRects
      .on("mouseover", function (e) {
         console.log("-----this-----",this);
         var tag = "";

         if (d3.select(this).data()[0].data_list.Comments != undefined) {
            tag =
            "Task: " +
            d3.select(this).data()[0].data_list.Task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].data_list.Name +
            "<br/>" +
            "Starts: " +
            d3.select(this).data()[0].data_list.StartDate +
            "<br/>" +
            "Ends: " +
            d3.select(this).data()[0].data_list.EndDate +
            "<br/>" +
            "Details: " +
            d3.select(this).data()[0].data_list.Comments;
         } else {
            tag =
            "Task: " +
            d3.select(this).data()[0].data_list.Task +
            "<br/>" +
            "Type: " +
            d3.select(this).data()[0].data_list.Name +
            "<br/>" +
            "Starts: " +
            d3.select(this).data()[0].data_list.StartDate +
            "<br/>" +
            "Ends: " +
            d3.select(this).data()[0].data_list.EndDate;
         }
         var output = document.getElementById("tag1");

         var x = this.x.animVal.value + this.width.animVal.value / 2 + "px";
         var y = this.y.animVal.value + 25 + "px";

         output.innerHTML = tag;
         output.style.top = y;
         output.style.left = x;
         output.style.display = "block";
      })
      .on("mouseout", function () {
         var output = document.getElementById("tag1");
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

   data_list.forEach((task) => {
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
         return i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space /16;
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
      .attr("transform", "translate(" + "50" + ", " + "60)")
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


})
});




// // -------------------------------------------------------------------------------------------

// // $(document).ready(function(){
// // //    console.log("hiii")
// //     $("#loading").hide();
// // //    $.ajax({
// // //     url: "/task_management/task_status_data/",
// // //     method: "get",
// // //    }).done(function(json_data) {
// // //    const data = JSON.parse(json_data);
// // //    console.log("--- Task data List --- ", data)
// // //    })
// // // });

// $(document).ready(function () {
//    // $("#loading").hide();
//    $.ajax({
//        url: "/task_management/task_status_data/",
//        method: "get",
//    }).done(function (json_data) {
//        var data = JSON.parse(json_data); // Access the 'data' array inside json_data
//       console.log(data)

//        const groupedTasks = {}; // Object to hold tasks grouped by employee names
   
//        for (const user of data.data) {
//         const Name = user.Name;
//         const Department = user.Department;
//         const Tasks = user.Tasks;
//         if (!groupedTasks[Name]) {
//            groupedTasks[Name] = [];
//         }
   
//         // Push tasks for each employee into the grouped object
//         groupedTasks[Name].push(
//            ...Tasks.map((task) => ({
//             Name: Name,
//             Department: Department,
//             Task: task.Task,
//             StartDate: task.StartDate,
//             EndDate: task.EndDate,
//             Comments: task.Comments,
//            }))
//         );
//        }
//        console.log(groupedTasks);
//        var w = 1500;
//        var h = 2000;
   
//        var svg = d3
//         .selectAll(".svg_month")
//         //.selectAll("svg")
//         .append("svg")
//         .attr("width", w)
//         .attr("height", h)
//         .attr("class", "svg");
   
//        var dateFormat = d3.time.format("%Y-%m-%d");
   
//        var timeScale = d3.time
//         .scale()
//         .domain([1, 31])
//         .range([0, w - 150]);
//        var categories = new Array();
   
//        for (const name in groupedTasks) {
//         if (Object.prototype.hasOwnProperty.call(groupedTasks, name)) {
//            categories.push(name);
//         }
//        }
   
//        var catsUnfiltered = categories;
   
//        categories = checkUnique(categories);
   
//    // Extract unique employee names from groupedTasks
//    var uniqueEmployees = Object.keys(groupedTasks);
   
//    // Rearrange tasks based on the order of unique employees
//    var reorderedTasks = [];
//    uniqueEmployees.forEach((employee) => {
//    // Get tasks for the current employee
//    const employeeTasks = groupedTasks[employee].map((task) => ({
//        Name: employee,
//        Department: task.Department,
//        Task: task.Task,
//        StartDate: task.StartDate,
//        EndDate: task.EndDate,
//        Comments: task.Comments
//    }));
//    reorderedTasks = reorderedTasks.concat(employeeTasks);
//    });
   
//    // Now, reorderedTasks contains tasks arranged by employees and their departments
//    console.log(reorderedTasks);
   
   
   
//        makeGant(data_list, w, h);
//        function makeGant(tasks, pageWidth, pageHeight) {
//         var barHeight = 20;
//         var gap = barHeight + 4;
//         var topPadding = 75;
//         var sidePadding = 75;
   
//         var colorScale = d3.scale
//            .linear()
//            .domain([0, categories.length])
//            .range(["#00B9FA", "#F95002"])
//            .interpolate(d3.interpolateHcl);
   
//         makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
//         drawRects(
//            tasks,
//            gap,
//            topPadding,
//            sidePadding,
//            barHeight,
//            colorScale,
//            pageWidth,
//            pageHeight
//         );
//         vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);
//        }
   
//        function getDayFromDate(dateString) {
//         var date = new Date(dateString);
//         return date.getDate();
//        }
   
//        function vertLabels(
//         theGap,
//         theTopPad,
//         theSidePad,
//         theBarHeight,
//         theColorScale
//        ) {
//         var domainEmployeeMap = {};
   
//         data_list.forEach((task) => {
//            if (task.Name && task.Department) {
//             if (!domainEmployeeMap[task.Department]) {
//                domainEmployeeMap[task.Department] = [];
//             }
//             domainEmployeeMap[task.Department].push(task.Name);
//            }
//         });
   
//         var sortedDomains = Object.keys(domainEmployeeMap).sort();
   
//         var numOccurances = [];
   
//         var yPos = theTopPad;
//         var domainSpace = 5; // Space between domains
//         var employeeSpace = 5; // Space between employees
   
//         sortedDomains.forEach((domain) => {
//            if (domainEmployeeMap[domain].length > 0) {
//             // Only draw domain rect if it has employees
//             numOccurances.push([domain, domainEmployeeMap[domain].length]);
   
//             svg
//                .append("rect")
//                .attr("x", 0)
//                .attr("y", yPos)
//                .attr("width", theSidePad);
//             // .attr('height', theGap * 1.5) // Adjusted height for domain rect
//             // .attr('fill', 'lightgrey');
   
//             yPos += domainSpace; // Increment yPos after domain rect
   
//             domainEmployeeMap[domain].forEach((employee) => {
//                numOccurances.push([employee, 1]);
   
//                yPos += employeeSpace;
//             });
//            } else {
//             yPos += domainSpace; // If no employees, still increment yPos for spacing
//            }
//         });
   
//         var axisText = svg
//            .append("g")
//            .selectAll("text")
//            .data(numOccurances)
//            .enter()
//            .append("text")
//            .text(function (d) {
//             return d[0];
//            })
//            .attr("x", function (d) {
//             var isDomain = sortedDomains.includes(d[0]);
//             return isDomain ? -5 : 40; // Adjust x-position for domain or employee
//            })
//            .attr("y", function (d, i) {
//             var isDomain = sortedDomains.includes(d[0]);
//             var space = isDomain ? domainSpace : employeeSpace;
   
//             // Shift the domain header down by 10 pixels
//             return (
//                i * theGap * 1.5 + theTopPad + (isDomain ? 10 : 0) + space / 16
//             );
//            })
//            .attr("font-size", function (d) {
//             return d[1] > 1 ? 12 : 12; // Change font size based on domain or employee
//            })
//            .attr("text-anchor", function (d) {
//             return sortedDomains.includes(d[0]) ? "start" : "middle"; // Align text differently for domain or employee
//            })
//            .attr("text-height", 12)
//            .attr("fill", "black")
//            .each(function (d, i) {
//             var isDomain = sortedDomains.includes(d[0]);
   
//             if (
//                isDomain &&
//                i === numOccurances.findIndex((el) => el[0] === d[0])
//             ) {
//                d3.select(this)
//                 // .insert("tspan", ":first-child")
//                 .attr("x", -5)
//                 .text(d[0])
//                 .attr("font-weight", "bold");
   
//                var textWidth = this.getComputedTextLength() + 10; // Padding for the box
//                var textHeight = this.getBBox().height + 5; // Padding for the box
   
//                svg
//                 .insert("rect", ":first-child")
//                 .attr("x", -25) // Move the domain name slightly to the left
//                 .attr("y", this.getBBox().y - 2)
//                 .attr("width", textWidth * 1.3)
//                 .attr("height", textHeight * 1.1)
//                 .attr("fill", "#F5F5F5");
//             }
//            });
   
//         var employeeYPositions = {};
   
//         let newArray = data_list.filter(
//            (array) => array.StartDate !== undefined && array.EndDate !== undefined
//         );
//         console.log(newArray);
//         setTimeout(() => {
//            var axisText = svg.selectAll("text");
   
//            axisText[0].forEach((textElement) => {
//             var employeeName = textElement.textContent;
   
//             if (
//                !sortedDomains.includes(employeeName) &&
//                newArray.some((el) => el.Name === employeeName)
//             ) {
//                var yPosFromDOM = textElement.getBoundingClientRect().top;
//                employeeYPositions[employeeName] = yPosFromDOM;
//             }
//            });
//            drawRects(
//             newArray,
//             theGap,
//             theTopPad,
//             theSidePad,
//             theBarHeight,
//             theColorScale,
//             employeeYPositions
//            );
//         }, 0);
//        }
   
//        function drawRects(
//         theArray,
//         theGap,
//         theTopPad,
//         theSidePad,
//         theBarHeight,
//         theColorScale,
//         employeeYPositions,
//         w,
//         h
//        ) {
//         let newArray = theArray.filter(
//            (array) => array.StartDate !== undefined && array.EndDate !== undefined
//         );
//         console.log(employeeYPositions);
//         var bigRects = svg
//            .append("g")
//            .selectAll("rect")
//            .data(newArray)
//            .enter()
//            .append("rect")
//            .attr("x", 0)
//            .attr("y", function (d, i) {
//             return i * theGap * 1.8 + theTopPad + theGap / 2;
//            })
//            .attr("width", function (d) {
//             return w - theSidePad / 2;
//            })
//            .attr("height", theGap * 1.5)
//            .attr("stroke", "none")
//            .attr("fill", "#fff")
//            .attr("opacity", 0);
   
//         var rectangles = svg.append("g").selectAll("rect").data(newArray).enter();
//         var additionalSpace = 10;
   
//         var innerRects = rectangles
//            .append("rect")
//            .attr("rx", 3)
//            .attr("ry", 3)
//            .attr("x", function (d) {
//             var startDay = new Date(d.StartDate).getDate(); // Get day of the month for StartDate
//             return timeScale(startDay) + theSidePad + 125;
//            })
//            .attr("y", function (d, i) {
//             return employeeYPositions[d.Name] - 9;
//            })
//            .attr("width", function (d) {
//             var start = new Date(d.StartDate).getDate(); // Get day of the month for StartDate
//             var end = new Date(d.EndDate).getDate(); // Get day of the month for EndDate
//             return timeScale(end) - timeScale(start);
//            })
//            .attr("height", theBarHeight * 1.4)
//            .attr("stroke", "none")
//            .attr("fill", function (d) {
//             for (var i = 0; i < categories.length; i++) {
//                if (d.Name == categories[i]) {
//                 1;
//                 2;
//                 3;
//                 4;
//                 5;
//                 6;
//                 7;
//                 8;
//                 9;
//                 10;
//                 11;
//                 12;
//                 13;
//                 14;
//                 15;
//                 16;
//                 17;
//                 18;
//                 19;
//                 20;
//                 21;
//                 22;
//                 23;
//                 24;
//                 25;
//                 26;
//                 27;
//                 28;
//                 29;
//                 30;
//                 31;
   
//                 return d3.rgb(theColorScale(i));
//                }
//             }
//            });
//         innerRects = innerRects
//            .filter(function (d) {
//             return isNaN(employeeYPositions[d.Name]);
//            })
//            .remove();
//         var rectText = rectangles
//            .append("text")
//            .text(function (d) {
//             return d.Task;
//            })
//            .attr("x", function (d) {
//             var startDay = new Date(d.StartDate).getDate(); // Get day of the month for StartDate
//             return timeScale(startDay) + theSidePad + 5 + 125;
//            })
//            .attr("y", function (d, i) {
//             return employeeYPositions[d.Name] - 10 + (theBarHeight * 1.4) / 2; // Adjust y position to center text
//            })
//            .attr("font-size", 11)
//            .attr("text-anchor", "start") // Align text to the left
//            .attr("text-height", theBarHeight)
//            .attr("fill", "#fff")
//            .each(function (d) {
//             var startDay = new Date(d.StartDate).getDate(); // Get day of the month for StartDate
//             var xPos = timeScale(startDay) + theSidePad + 5 + 125;
//             var yPos = employeeYPositions[d.Name] - 10 + (theBarHeight * 1.4) / 2;
   
//             var text = d3.select(this);
//             var words = d.Task.split(/\s+/).reverse();
//             var word;
//             var line = [];
//             var lineNumber = 0;
//             var lineHeight = 1.1; // Adjust this value for line spacing
   
//             var tspan = text
//                .append("tspan")
//                .attr("x", xPos)
//                .attr("y", yPos)
//                .attr("dy", 0);
   
//             while ((word = words.pop())) {
//                line.push(word);
//                tspan.text(line.join(" "));
//                if (tspan.node().getComputedTextLength() > 100) {
//                 // Adjust this value for line width
//                 line.pop();
//                 tspan.text(line.join(" "));
//                 line = [word];
//                 tspan = text
//                    .append("tspan")
//                    .attr("x", xPos)
//                    .attr("y", yPos)
//                    .attr("dy", ++lineNumber * lineHeight + "em")
//                    .text(word);
//                }
//             }
//            });
   
//         rectText
//            .on("mouseover", function (e) {
//             var tag = "";
   
//             if (d3.select(this).data()[0].Comments != undefined) {
//                tag =
//                 "Task: " +
//                 d3.select(this).data()[0].Task +
//                 "<br/>" +
//                 "Type: " +
//                 d3.select(this).data()[0].Name +
//                 "<br/>" +
//                 "Starts: " +
//                 d3.select(this).data()[0].StartDate +
//                 "<br/>" +
//                 "Ends: " +
//                 d3.select(this).data()[0].EndDate;
//                "<br/>" + "Comments: " + d3.select(this).data()[0].Comments;
//             } else {
//                tag =
//                 "Task: " +
//                 d3.select(this).data()[0].Task +
//                 "<br/>" +
//                 "Type: " +
//                 d3.select(this).data()[0].Name +
//                 "<br/>" +
//                 "Starts: " +
//                 d3.select(this).data()[0].StartDate +
//                 "<br/>" +
//                 "Ends: " +
//                 d3.select(this).data()[0].EndDate;
//             }
//             var output = document.getElementById("tag1");
   
//             var bbox = this.getBBox(); // Get bounding box of the text element
//             var x = bbox.x;
//             var y = bbox.y + bbox.height;
//             output.innerHTML = tag;
//             output.style.top = y + "px";
//             output.style.left = x + "px";
//             output.style.display = "block";
//            })
//            .on("mouseout", function () {
//             var output = document.getElementById("tag1");
//             output.style.display = "none";
//            });
   
//         innerRects
//            .on("mouseover", function (e) {
//             // console.log("-----this-----",this);
//             var tag = "";
   
//             if (d3.select(this).data()[0].Comments != undefined) {
//                tag =
//                 "Task: " +
//                 d3.select(this).data()[0].Task +
//                 "<br/>" +
//                 "Type: " +
//                 d3.select(this).data()[0].Name +
//                 "<br/>" +
//                 "Starts: " +
//                 d3.select(this).data()[0].StartDate +
//                 "<br/>" +
//                 "Ends: " +
//                 d3.select(this).data()[0].EndDate;
//                "<br/>" +
//                 "Comments: " +
//                 d3.select(this).data()[0].data_list.Comments;
//             } else {
//                tag =
//                 "Task: " +
//                 d3.select(this).data()[0].Task +
//                 "<br/>" +
//                 "Type: " +
//                 d3.select(this).data()[0].Name +
//                 "<br/>" +
//                 "Starts: " +
//                 d3.select(this).data()[0].StartDate +
//                 "<br/>" +
//                 "Ends: " +
//                 d3.select(this).data()[0].EndDate;
//             }
//             var output = document.getElementById("tag1");
//             var bbox = this.getBBox(); // Get bounding box of the rectangle element
//             var x = bbox.x;
//             var y = bbox.y + bbox.height;
//             output.innerHTML = tag;
//             output.style.top = y + "px";
//             output.style.left = x + "px";
//             output.style.display = "block";
//            })
//            .on("mouseout", function () {
//             var output = document.getElementById("tag1");
//             output.style.display = "none";
//            });
//        }
   
//        function makeGrid(theSidePad, theTopPad, w, h) {
//         // console.log(timeScale);
//         var xAxis = d3.svg
//            .axis()
//            .scale(timeScale)
//            .orient("top")
//            .ticks(31) // Assuming you want 31 ticks for days 1-31
//            .tickSize(-h + theTopPad + 20, 0, 0)
//            .tickFormat(function (d, i) {
//             // Return the day of the month (1-31)
//             return i + 1;
//            });
   
//         var grid = svg
//            .append("g")
//            .attr("class", "grid")
//            .attr("transform", "translate(" + "200" + ", " + "60)")
//            .call(xAxis)
//            .selectAll("text")
//            .style("text-anchor", "middle")
//            .attr("fill", "#000")
//            .attr("stroke", "none")
//            .attr("font-size", 12)
//            .attr("font-weight", "bold")
//            .attr("dy", "-0.7em");
//        }
   
//        function checkUnique(arr) {
//         var hash = {},
//            result = [];
//         for (var i = 0, l = arr.length; i < l; ++i) {
//            if (!hash.hasOwnProperty(arr[i])) {
//             hash[arr[i]] = true;
//             result.push(arr[i]);
//            }
//         }
//         return result;
//        }
   
//        function getCounts(arr) {
//         var i = arr.length, // var to loop over
//            obj = {}; // obj to store results
//         while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
//         return obj;
//        }
   
//        // get specific from everything
//        function getCount(word, arr) {
//         return getCounts(arr)[word] || 0;
//        }
//    });
//    });
   
