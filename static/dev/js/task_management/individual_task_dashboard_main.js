
var globalmonth;
var globalquarter;
var globalSelectedYear;
var Quarterno;
var monthno;
var selectedWeek;

//  getting current week date

function individual_dashboard(){
$(document).ready(function() {
  
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  
  // Calculate the first day of the current month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
  // Calculate the difference in days between the current date and the first day of the month
  const pastDaysOfMonth = Math.floor((currentDate - firstDayOfMonth) / (24 * 60 * 60 * 1000));
  
  // Calculate the week number within the current month
  const currentWeekNumber = Math.ceil((pastDaysOfMonth + firstDayOfMonth.getDay() + 1) / 7);
  Quarterno =0

  console.log("Current Year:", currentYear);
  console.log("Current Month:", currentMonth);
  console.log("Current Week Number in Current Month:", currentWeekNumber);

globalSelectedYear =  currentYear
monthno = currentMonth
selectedWeek = currentWeekNumber
console.log(monthno,selectedWeek,globalSelectedYear)
yearrange();
datas()
})
}

//  year range  for date filter
function yearrange() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let yearRange = Array.from({ length: 4 }, (_, index) => currentYear - 2 + index);

  // Get the container where you want to append the year sections
  let container = document.getElementById("yearSections");

  // Loop through yearRange and create/select elements
  yearRange.forEach(year => {
    let div = document.createElement("div");
    div.className = "year_sec_new";

    // Create a select element
    let select = document.createElement("select");
    select.name = "years";
    select.id = "year_filter_" + year;

    // Loop through years and create/append options
    for (let i = 0; i < 4; i++) {
      let optionYear = document.createElement("option");
      optionYear.value = currentYear - 2 + i;
      optionYear.text = currentYear - 2 + i;
      select.add(optionYear);
    }

    // Add event listener to capture the selected year
    select.addEventListener("click", function() {
      globalSelectedYear = select.value;
      globalmonth =0;
      globalquarter =0;
      Quarterno =0;
      monthno =0;
      selectedWeek = 0;
      console.log("Selected year:", globalSelectedYear);
      MonthDropList();
      filter();

    });
    
    div.appendChild(select);
    container.appendChild(div);
    console.log("888888888888888888888888888888")
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const quater_1 = document.querySelector('.selected_1');
  const quater_2 = document.querySelector('.selected_2');
  const quater_3 = document.querySelector('.selected_3');
  const quater_4 = document.querySelector('.selected_4');
  const month_1 = document.querySelector ('.month_scale_jan');
  const month_2 = document.querySelector ('.month_scale_feb');
  const month_3 = document.querySelector ('.month_scale_mar');
  const month_4 = document.querySelector ('.month_scale_apr');
  const month_5 = document.querySelector ('.month_scale_may');
  const month_6 = document.querySelector ('.month_scale_June');
  const month_7 = document.querySelector ('.month_scale_July');
  const month_8 = document.querySelector ('.month_scale_Aug');
  const month_9 = document.querySelector ('.month_scale_Sep');
  const month_10 = document.querySelector ('.month_scale_Oct');
  const month_11 = document.querySelector ('.month_scale_Nov');
  const month_12 = document.querySelector ('.month_scale_Dec');
  
  quater_1.addEventListener('click',function (){
  month_4.style.pointerEvents = "none";
  month_5.style.pointerEvents = "none";
  month_6.style.pointerEvents = "none";
  month_7.style.pointerEvents = "none";
  month_8.style.pointerEvents = "none";
  month_9.style.pointerEvents = "none";
  month_10.style.pointerEvents = "none";
  month_11.style.pointerEvents = "none";
  month_12.style.pointerEvents = "none";
  month_1.style.pointerEvents = '';
  month_2.style.pointerEvents = '';
  month_3.style.pointerEvents = '';
  })
  
  quater_2.addEventListener('click',function (){
  month_4.style.pointerEvents = "";
  month_5.style.pointerEvents = "";
  month_6.style.pointerEvents = "";
  month_7.style.pointerEvents = "none";
  month_8.style.pointerEvents = "none";
  month_9.style.pointerEvents = "none";
  month_10.style.pointerEvents = "none";
  month_11.style.pointerEvents = "none";
  month_12.style.pointerEvents = "none";
  month_1.style.pointerEvents = 'none';
  month_2.style.pointerEvents = 'none';
  month_3.style.pointerEvents = 'none';
  })
  
  quater_3.addEventListener('click',function (){
  month_4.style.pointerEvents = "none";
  month_5.style.pointerEvents = "none";
  month_6.style.pointerEvents = "none";
  month_7.style.pointerEvents = "";
  month_8.style.pointerEvents = "";
  month_9.style.pointerEvents = "";
  month_10.style.pointerEvents = "none";
  month_11.style.pointerEvents = "none";
  month_12.style.pointerEvents = "none";
  month_1.style.pointerEvents = 'none';
  month_2.style.pointerEvents = 'none';
  month_3.style.pointerEvents = 'none';
  })
  
  quater_4.addEventListener('click',function (){
  month_4.style.pointerEvents = "none";
  month_5.style.pointerEvents = "none";
  month_6.style.pointerEvents = "none";
  month_7.style.pointerEvents = "none";
  month_8.style.pointerEvents = "none";
  month_9.style.pointerEvents = "none";
  month_10.style.pointerEvents = "";
  month_11.style.pointerEvents = "";
  month_12.style.pointerEvents = "";
  month_1.style.pointerEvents = 'none';
  month_2.style.pointerEvents = 'none';
  month_3.style.pointerEvents = 'none';
  })
  
  });
  
  function filter(){
    console.log("******")
    $(".quter_selection p").click(function() {
      globalquarter = $(this).text();
      console.log("Selected Quarter: " + globalquarter);
    });
    $(".month_scale p").click(function() {
      globalmonth = $(this).text();
      console.log("Selected Month: " + globalmonth);
      switch (globalmonth) {
        case "Jan":
          monthno = 1;
          break;
        case "Feb":
          monthno = 2;
          break;
        case "Mar":
          monthno = 3;
          break;
        case "Apr":
          monthno = 4;
          break;
        case "May":
          monthno = 5;
          break;
        case "June":
          monthno = 6;
          break;
        case "July":
          monthno = 7;
          break;
        case "Aug":
          monthno = 8;
          break;
        case "Sep":
          monthno = 9;
          break;
        case "Oct":
          monthno = 10;
          break;
        case "Nov":
          monthno = 11;
          break;
        case "Dec":
          monthno = 12;
          break;
        default:
          monthno = 0; 
      }
        $.ajax({
          url: "/individual_dashboard/get_weeks_in_month/",
          method: "POST",
          data: { format: 'json' },  
          dataType: 'json',
          data: {
            year: globalSelectedYear,
            month: monthno, 
          },
          success: function (response) {
          
        // Get the number of weeks 
        var numberOfWeeks = response.Data.week;
        console.log("Weeks in month:", numberOfWeeks);
  
        // Get the container element
        var weekContainer = document.getElementById("weekContainer");
  
        // Create the select element
        var selectElement = document.createElement("select");
      
        selectElement.name = "cars";
        selectElement.id = "cars";
        selectElement.className = "week_sec"; 

        for (var i = 0; i <= numberOfWeeks; i++) {
            var optionElement = document.createElement("option");
            optionElement.value = i;
            optionElement.text = (i === 0) ? "Week" : "Week " + i;
            if (i === 0) {
                optionElement.selected = true;
            }
            selectElement.appendChild(optionElement);
        }
        selectElement.addEventListener("change", function () {
          selectedWeek = selectElement.value;
          console.log("Selected Week:", selectedWeek);
          // You can use the selectedWeek value as needed
      });
       
        weekContainer.appendChild(selectElement);
    }
    });
    // var selectedEl = document.getElementById("cars").value
    // console.log("selected element",selectedEl)
  })
}
  
  // Add click event listener to the "Done" button
  function filterBtn(){
    console.log("Selected Month: " + globalmonth);   
   
   
    if (globalquarter === "Quater 1") {
      Quarterno = 1;
    } else if (globalquarter === "Quater 2") {
      Quarterno = 2;
    } else if (globalquarter === "Quater 3") {
      Quarterno = 3;
    } else if (globalquarter === "Quater 4") {
      Quarterno = 4;
    } else {
      Quarterno = 0; 
    }
    
    console.log("Selected Year:", globalSelectedYear);
    console.log("Selected Quarter:", Quarterno);
    console.log("Selected Month:", monthno);
    console.log("Selected Week:", selectedWeek);
    datas()
  }
function datas(){
    console.log("77777777",globalSelectedYear,Quarterno,monthno,selectedWeek)
    // Use AJAX to send the selected values to the backend
    $.ajax({
      url: "/individual_task_dashboard/get_task_completion_rate/",
      method: "POST",
      data: { format: 'json' },  // Include the format=json query parameter
      dataType: 'json',
      data: {
        year: globalSelectedYear,
        Qno: Quarterno,
        month: monthno,
        week: selectedWeek
      },
      success: function (response) {
      data = response
      console.log("Backend response:", data);
  
       $(".new_number_1").text(data.Data[0].Total_completed_task);
       $(".new_completed_number").text(data.Data[0].Completed_Task+" Completed ");
       $(".new_filler").text(data.Data[0].Completed_Task);
       $(".new_pending_number").text(data.Data[0].Supposedly_Completed_Task + " Supposedly Completed");
       $(".new_filler_sec1").text(data.Data[0].Supposedly_Completed_Task);

       $(".total_overdue").text(data.Data[0].Total_Overdue_Task);
       $(".overdue_pending").text(data.Data[0].Overdue_Pending_Task+" Pending ");
       $(".overdue_inprogress").text(data.Data[0].Overdue_Inprogress_Task+ " Inprogress ");
       
       $(".active_total").text(data.Data[0].Total_Inprogress_Task);
       $(".active_1").text(data.Data[0].Active_Task+" Inprogress ");
       $(".active_2").text(data.Data[0].Deferred_Task + " Deferred ");

       $(".pending_total").text(data.Data[0].Total_Pending_Task);
       $(".new_pending_number_12").text(data.Data[0].Pending_Viewed_Task+" Viewed ");
       $(".new_completed_number_sec1").text(data.Data[0].Pending_Not_Viewed_Task+ " Not Viewed ");

       $(".total_number_text").text(data.Data[0].Total_Task);
       $(".second_percent_text").text(data.Data[0].Task_Severity+" %");
       $(".new_high_text").text(data.Data[0].Task_severity_level);
       $(".third_new_text").text(data.Data[0].Complete_Task_Rate+" %");
       var Total_working_hours = parseInt(data.Data[0].Working_Hours);
       $(".time_spend").text(data.Data[0].Time_Spend_On_Task+" / "+Total_working_hours);
       
       $(".stat_new_precent_text").text(data.Data[0].Complete_Task_Rate+" %");
       $(".stat_completed_Text").text(data.Data[0].Complete_Task_Rate+" %");
       $(".stat_progress_number").text(data.Data[0].Inprogress_Task_Rate+" %");

       $(document).ready(function (){
          const percentage = parseInt(data.Data[0].Complete_Task_Scale);
          const percentage1 = parseInt(data.Data[0].Active_Task_Scale);
          const percentage2 = parseInt(data.Data[0].Pending_Viewed_Task_Scale);
          const percentage3 = parseInt(data.Data[0].Overdue_Inprogress_Scale);
          const percentage4 = parseInt(data.Data[0].Supposedly_Task_Scale);
          const percentage5 = parseInt(data.Data[0].Deferred_Task_Scale);
          const percentage6 = parseInt(data.Data[0].Pending_Not_Viewed_Task_Scale);
          const percentage7 = parseInt(data.Data[0].Overdue_Pending_Scale);
          const filler = document.querySelector(".new_filler");
          const filler1 = document.querySelector(".new_filler_sec1");
          const filler2 = document.querySelector(".new_filler_sec2");
          const filler3 = document.querySelector(".new_filler_sec3");
          const filler4 = document.querySelector(".new_filler1");
          const filler5 = document.querySelector(".new_filler1_sec1");
          const filler6 = document.querySelector(".new_filler1_sec2");
          const filler7 = document.querySelector(".new_filler1_sec3");
          filler.style.width = percentage + "%";
          filler1.style.width = percentage1 + "%";
          filler2.style.width = percentage2 + "%";
          filler3.style.width = percentage3 + "%";
          filler4.style.width = percentage4 + "%";
          filler5.style.width = percentage5 + "%";
          filler6.style.width = percentage6 + "%";
          filler7.style.width = percentage7 + "%"; 

         
          const complete_task_scale = parseInt(data.Data[0].Complete_Task_Rate);
          function updateCircle(complete_task_scale) {
            const circle = document.getElementById("circle");
            const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
            const offset = circumference - (complete_task_scale / 100) * circumference;

            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
          }
          setTimeout(() => {
            updateCircle(complete_task_scale);
          }, 0);
          const project_statistics_scale =  parseInt(data.Data[0].Complete_Task_Rate);
          function updateArchBorder(project_statistics_scale) {
            const archBorder = document.getElementById("archBorder");
            const centerX = 50;
            const centerY = 50;
            const radius = 40;
            const startAngle = 90;
            let endAngle =project_statistics_scale

            if (endAngle > 90 && endAngle <= 100) {
              console.log("endAngle: ", endAngle);
              endAngle = 9 - (endAngle - 91);
             }
             else(
              endAngle = project_statistics_scale -100
             )
         
            console.log("--endAngle--",endAngle)
        
            const startRadians = (startAngle * Math.PI) / 90;
            const endRadians = (endAngle * Math.PI) / 90;
        
            const startX = centerX + radius * Math.cos(startRadians);
            const startY = centerY + radius * Math.sin(startRadians);
        
            const endX = centerX + radius * Math.cos(endRadians);
            const endY = centerY + radius * Math.sin(endRadians);
        
            const archPathData = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
        
            archBorder.setAttribute("d", archPathData);
          }
        
          updateArchBorder(project_statistics_scale);
        });
 

      compareAndSetText();

      },
      error: function (error) {
        
        console.error("Error:", error);
      }
    });

  
    // previous date data
    $.ajax({
      url: "/individual_dashboard/previous_task/",
      method: "POST",
      // data: { format: 'json' }, 
      dataType: 'json',
      data: {
        "year": globalSelectedYear,
        "Qno": Quarterno,
        "month": monthno,
        "week": selectedWeek,
      },
      success: function (response) {
      var previous_task_data = response;
      console.log("--- previous tasks data++ --- ", previous_task_data);
      

      $(".Completed_task").text(previous_task_data.Previous_Task_Data[0].Completed_Task);
      $(".active_task").text(previous_task_data.Previous_Task_Data[0].Active_Task);
      $(".pending_task").text(previous_task_data.Previous_Task_Data[0].Pending_Task);
      $(".overdue_task").text(previous_task_data.Previous_Task_Data[0].Overdue_Task);
      $(".date_range1").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".date_range2").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".date_range3").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".date_range4").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".new_bottom_last_text").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".new_bottom_text").text(previous_task_data.Previous_Task_Data[0].Date_Range);
      $(".total_white_text").text(previous_task_data.Previous_Task_Data[0].Date_Range);

     compareAndSetText();
  },
  error: function (error) {
    console.error("Error:", error);
  }
});



// Upcoming task
    $.ajax({
      method: "POST",
      url: "/individual_dashboard/upcoming_task/",
      data: { format: 'json' }, 
      dataType: 'json',
      data: {
        "year": globalSelectedYear,
        "Qno": Quarterno,
        "month": monthno,
        "week": selectedWeek,
      },
      success: function (response) {
      var upcoming_task_data = response;
  console.log("--- Upcoming tasks data --- ", upcoming_task_data);
  var upcomingTasks = upcoming_task_data.Upcoming_Task_Data[0].Upcoming_tasks;
  var taskPulseValue;
  var upcomingTasksHtml = "";
  const pulseFiller = document.querySelector('.taskFiller');

  upcomingTasks.forEach(function (task) {
    const pulseWidth = task.Task_Pulse === null || task.Task_Pulse === undefined
    ? `${task.Task_Pulse}0%`
    : task.Task_Pulse === 25 ? '25%' :
    task.Task_Pulse === 50 ? '50%' :
    task.Task_Pulse === 100 ? '100%' : '0%';
      upcomingTasksHtml += `
          <tr>
              <td>${task.Task_Title}</td>
              <td>${task.Task_Deadline}</td>
              <td>
                  <div class="taskPulse">
                      <div class="taskFiller" style="width: ${pulseWidth};"></div>
                      <p class="taskIndication">${task.Task_Pulse}%</p>
                  </div>
              </td>
          </tr>`;
          if(taskPulseValue === null || taskPulseValue ===undefined){
            taskPulseValue = task.Task_Pulse;
          }
          console.log(taskPulseValue)
  });
  $(".upcoming_task_table tbody").html(upcomingTasksHtml);
},

error: function (error) {
  console.error("Error:", error);
}
});

// yearly graph
$.ajax({
  method: "POST",
  url: "/individual_dashboard/yearly_task_graph/",
  data: { format: 'json' },  
  dataType: 'json',
  data: {
    "year": globalSelectedYear,
  },
  success: function (response) {
  var yearly_graph_data = response;
  console.log("--- yearly_graph_data--- ", yearly_graph_data);

  const yearly_task_data = yearly_graph_data.Yearly_Graph;

     
    // Set up SVG container for the chart
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    // Remove existing SVG if it exists
    d3.select("#chart svg").remove();

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define the scales
    const x = d3.scale.ordinal()
      .domain(yearly_task_data.map(function(d) { return d.Month; }))
      .rangeRoundBands([0, width], 0.1);

    const y = d3.scale.linear().domain([0, d3.max(yearly_task_data, function(d) { return d.Completed_Task_count; })]).range([height, 0]);

    // Draw bars
    // Define the linear gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#46A4FC");

    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#357BBD");

    // Append rectangles and apply the gradient as the fill
    svg
      .selectAll("rect")
      .data(yearly_task_data)
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.Month); })
      .attr("y", function(d) { return y(d.Completed_Task_count); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.Completed_Task_count); })
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", "url(#gradient)");

    // Add x-axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.svg.axis().scale(x).orient("bottom"));

    // Add y-axis
    svg.append("g")
      .attr("class", "axis")
      .call(d3.svg.axis().scale(y).orient("left"));
},

error: function (error) {
  // Handle the error
  console.error("Error:", error);
}
});
refreshFunction()
}

// $(document).ready(function(){
function MonthDropList(){
  $(".dropdown_icon").click(function() {
    $(".quter_selection").removeClass("hide_select");
    $(".month_scale").removeClass("hide_select");
  });
};


// Task by assignees
function refreshFunction(){
$.ajax({
  method: "POST",
  url: "/individual_dashboard/task_by_assignees/",
  data: { format: 'json' },  // Include the format=json query parameter
  dataType: 'json',
  data: {
    "year": globalSelectedYear,
    "Qno": Quarterno,
    "month": monthno,
    "week": selectedWeek,
  },
  success: function (response) {
  var task_by_assignees = response;
  console.log("--- task_by_assignees --- ", task_by_assignees);

  const employeeNames = task_by_assignees.Assignies_task_Data.map(data => data.User_Name);
  const completedTasks = task_by_assignees.Assignies_task_Data.map(data => data.completed_tasks);
  const activeTasks = task_by_assignees.Assignies_task_Data.map(data => data.active_tasks);
  const newTasks = task_by_assignees.Assignies_task_Data.map(data => data.new_tasks);
  console.log(employeeNames)
  console.log(completedTasks)
  console.log(activeTasks)
  console.log(newTasks)


  const values = [completedTasks, activeTasks, newTasks];
  const colors = ['#8DE45F', '#FEED47', '#FF922C'];

  // Get the existing canvas element
  const canvas = document.getElementById('myChartLoad');
  
  // Check if a Chart instance is already associated with the canvas
  if (canvas && canvas.chart) {
    // Destroy the existing Chart instance
    canvas.chart.destroy();
  }

  // Creating the chart
  const ctx = canvas.getContext('2d');

  canvas.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: employeeNames,
      datasets: colors.map((color, index) => ({
        label: `Task Status ${index + 1}`,
        data: values[index],
        backgroundColor: color,
        borderWidth: 0,
        barThickness: 15,
        stack: 'stack 1', //refreshFunction Ensure bars stack on top of each other
      }))
    },
    options: {
      scales: {
        y: {
          stacked: true, // Enable stacking on y-axis
          beginAtZero: true,
          grid: {
            display: false // Hide y-axis grid lines
          }
        },
        x: {
          stacked: true // Enable stacking on x-axis
        }
      }
    }
  });

}
})
}

function compareAndSetText() {
  var completedTaskValue = parseFloat($(".Completed_task").text());
  var totalCompletedTaskValue = parseFloat($(".new_number_1").text());

  if (completedTaskValue !== 0) {
    var percentageDifference = Math.round(((totalCompletedTaskValue - completedTaskValue) / completedTaskValue) * 100);
      if (percentageDifference > 0) {
          $(".svg_detail_text").text("You completed " + percentageDifference + "% more project than Previous completed task");
      } else if (percentageDifference < 0) {
          $(".svg_detail_text").text("You completed " + Math.abs(percentageDifference) + "% less project than Previous completed task");
      } else {
          $(".svg_detail_text").text("Total completed task is equal to the previous task");
      }
  } else {
      $(".svg_detail_text").text("Previous completed task value is zero");
  }
};



document.addEventListener("DOMContentLoaded", function () {
  const quarters = document.querySelectorAll(".quter_selection > p");
  const months = document.querySelectorAll(".month_scale > p");
  const customDropdown = document.querySelector(".custom_textNode");
  const quaterSelect = document.querySelector(".quter_selection");
  const monthSelect = document.querySelector(".month_scale");
  
  let selectedQuarter = "";
  let selectedMonth = "";
  
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  quarters.forEach((quarter) => {
      quarter.addEventListener("click", function () {
       selectedQuarter = this.textContent.trim();
       customDropdown.textContent = `Q${selectedQuarter.slice(-1)}`;
      });
  });
  
  months.forEach((month) => {
      month.addEventListener("click", function () {
       selectedMonth = this.textContent.trim();
       if (selectedQuarter && selectedMonth) {
          const formattedText = `Q${selectedQuarter.slice(
           -1
          )}/${capitalizeFirstLetter(selectedMonth)}`;
          console.log(formattedText);
          customDropdown.textContent = formattedText;
          quaterSelect.classList.add("hide_select");
          monthSelect.classList.add("hide_select");
       }
      
       else {
          if (selectedMonth) {
           if (
              selectedMonth === "Jan" ||
              selectedMonth === "Feb" ||
              selectedMonth === "Mar"
           ) {
              const formattedText = `Q1${selectedQuarter.slice(
               -1
              )}/${capitalizeFirstLetter(selectedMonth)}`;
              console.log(formattedText);
              customDropdown.textContent = formattedText;
              quaterSelect.classList.add("hide_select");
              monthSelect.classList.add("hide_select");
           }
           if (
              selectedMonth === "Apr" ||
              selectedMonth === "May" ||
              selectedMonth === "Jun"
           ) {
              const formattedText = `Q2${selectedQuarter.slice(
               -1
              )}/${capitalizeFirstLetter(selectedMonth)}`;
              console.log(formattedText);
              customDropdown.textContent = formattedText;
              quaterSelect.classList.add("hide_select");
              monthSelect.classList.add("hide_select");
           }
  
           if (
              selectedMonth === "Jul" ||
              selectedMonth === "Aug" ||
              selectedMonth === "Sep"
           ) {
              const formattedText = `Q3${selectedQuarter.slice(
               -1
              )}/${capitalizeFirstLetter(selectedMonth)}`;
              console.log(formattedText);
              customDropdown.textContent = formattedText;
              quaterSelect.classList.add("hide_select");
              monthSelect.classList.add("hide_select");
           }
  
           if (
              selectedMonth === "Oct" ||
              selectedMonth === "Nov" ||
              selectedMonth === "Dec"
           ) {
              const formattedText = `Q4${selectedQuarter.slice(
               -1
              )}/${capitalizeFirstLetter(selectedMonth)}`;
              console.log(formattedText);
              customDropdown.textContent = formattedText;
              quaterSelect.classList.add("hide_select");
              monthSelect.classList.add("hide_select");
           }
  
          }
       }
      });
  });
  });
  




