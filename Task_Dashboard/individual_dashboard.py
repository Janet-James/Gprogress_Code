import json
import random
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from fast_bitrix24 import Bitrix
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from dateutil import parser, tz
from datetime import datetime, timedelta, date
import calendar
from django.http import HttpResponseRedirect
from django.template.loader import get_template 
from django.template.response import TemplateResponse

from django.urls import reverse




class individual_task_dashboard_Template_Load(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        return super(individual_task_dashboard_Template_Load, self).dispatch(request, *args, **kwargs)
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'individual_task_dashboard.html'
        else:
            template_name = 'individual_task_dashboard.html'
        return [template_name]
    def get(self, request, *args, **kwargs):
        context = super(individual_task_dashboard_Template_Load, self).get_context_data(**kwargs)
        return self.render_to_response(context)
    


responsible_id = None 


@csrf_exempt
def from_overalldashboard(request):
    global responsible_id
    post = request.POST
    json_data = {}
    
    if post:
        print("9090900090900009099")
        responsible_id = int(post.get('individual_id'))
        print("responsible -------- ", responsible_id)
        print(type(responsible_id),"---------------responsible type")
        
        User_Id = {"id": responsible_id}
        json_data['Data'] = User_Id
        
        # Assuming these are functions you have defined
        another_function()

    return JsonResponse(json_data)

def another_function():
    global responsible_id
    if responsible_id:
        print("************************Accessing responsible_id in another_function:", responsible_id)
    else:
        print("************************responsible_id is not set in another_function.")
     


@csrf_exempt
def get_weeks_in_month(request):
    json_data = {}
    try:
        post = request.POST
        if post:
            str_year = post.get('year')
            str_month = post.get('month')
            year= int(str_year)
            month = int(str_month)
            print(year ,month)
            cal = calendar.monthcalendar(year, month)
            num_weeks = len(cal)
            week_data = {"week":num_weeks}
            json_data['Data']= week_data
            print("----------------weeks in month -----------",json_data)
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))


    
def user_data (request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        user_params = {'filter': {'ACTIVE': "true"}}
        user_method = bx24.get_all("user.get",user_params)
        user_data_list = []
        for i in user_method:
            id = i["ID"]
            first_name = i["NAME"]
            last_name = i["LAST_NAME"]
            if first_name and first_name.upper() == "GREEN":
                continue 
            personal_photo = i.get("PERSONAL_PHOTO")
            work_position = i.get("WORK_POSITION")
            user_data = {
                "User_Id" : id,
                "User_Name" :first_name+" "+last_name,
                "User_Photo": personal_photo,
                "Work_Position" : work_position
            }
            print(id,"--",first_name+" "+last_name,"--",personal_photo,"--",work_position)
            user_data_list.append(user_data)
        json_data.update({
            "user_list": user_data_list
        })
    return HttpResponse(json.dumps(json_data))
        



@csrf_exempt
def get_task_completion_rate(request):
    global responsible_id
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            current_datetime = datetime.now(tz.tzutc())
            current_year = datetime.now().year
            year_range = list(range(current_year - 2, current_year + 2))
            print(year_range)
            year_str = post.get('year')
            select_week_str = post.get('week')
            select_month_str = post.get('month')
            Qno_str = post.get('Qno')
            # responsible_id = 42
            year =int(year_str)
            select_week = int(select_week_str)
            select_month = int(select_month_str)
            Qno = int(Qno_str)

            # Set date range based on user input
            if select_month != 0:
                weeks_in_month = (calendar.monthrange(year, select_month)[1] - 1) // 7 + 1
                print(weeks_in_month)
                if select_week != 0:
                    # Calculate the first day of the month
                    first_day_of_month = datetime(year, select_month, 1)

                    # Find the first day of the selected week
                    while first_day_of_month.weekday() != 0:
                        first_day_of_month -= timedelta(days=1)

                    # Calculate the start and end dates of the selected week
                    week_start_date = first_day_of_month + timedelta(weeks=select_week - 1)
                    week_end_date = week_start_date + timedelta(days=6)

                    # Format the start and end dates as strings
                    start_date, end_date = week_start_date.strftime("%Y-%m-%d"), week_end_date.strftime("%Y-%m-%d")
                else:
                    # If select_week is 0, consider the entire month
                    start_date = f"{year}-{select_month:02d}-01"
                    end_date = f"{year}-{select_month:02d}-{calendar.monthrange(year, select_month)[1]:02d}"

            elif Qno != 0:
                start_month, end_month = [(1, 3), (4, 6), (7, 9), (10, 12)][Qno - 1]
                start_date = f"{year:04d}-{start_month:02d}-01"
                _, last_day = calendar.monthrange(year, end_month)
                end_date = f"{year:04d}-{end_month:02d}-{last_day:02d}"
            else:
                start_date, end_date = f"{year}-01-01", f"{year}-12-31"

            task_data_list = []
        
            filter_params = {
                "filter": {
                    "RESPONSIBLE_ID": responsible_id,
                    ">=CREATED_DATE": start_date,
                    "<=CREATED_DATE": end_date,
                },
                "select": ["RESPONSIBLE_ID","DEADLINE", "CREATED_DATE", "STATUS", "PRIORITY", "TIME_ESTIMATE","DATE_START","CLOSED_DATE","STAGE_ID","NOT_VIEWED"]
            }
            print(responsible_id,"-------------8 responsible_id",start_date ,end_date)
            task_data_method= bx24.get_all('tasks.task.list', filter_params)
            # print(task_created_id)

            # Initializing task counts
            total_task = 0
            completed_tasks = 0
            supposedly_completed_task=0
            active_tasks = 0
            overdue_tasks = 0
            pending_tasks = 0
            new_tasks = 0
            Declined_task = 0
            deferred_task = 0
            pending_not_viewed_task = 0
            pending_viewed_task = 0
            overdue_inprogress = 0
            overdue_pending = 0
            total_time_estimate_hours = 0

            
            for task in task_data_method:
                total_task +=1 
            # Time spend on task
                time_estimate = task['timeEstimate']
                print("----------------",time_estimate)
                format_time_estimate = int(time_estimate)
                print("*******",format_time_estimate)
                time_estimate_hours = format_time_estimate * 60
                total_time_estimate_hours += time_estimate_hours
                print("----time_estimate----", time_estimate_hours)

            # Task status
                status = task['status']
                substatus = task['subStatus']
                notviewed = task['notViewed']

                if substatus == '-1':
                    task_status = "Overdue"
                    overdue_tasks += 1
                    if status == '3':
                        overdue_inprogress += 1
                    elif status == '2':
                        overdue_pending += 1

                elif status == '1':
                    task_status ="New task"
                    new_tasks += 1

                elif status == '2':
                    task_status ="Pending"
                    pending_tasks += 1

                elif status == '3':
                    task_status ="Active"
                    active_tasks += 1

                elif status == '4':
                    task_status ="Supposedly completed"
                    supposedly_completed_task +=1

                elif status == '5':
                    task_status = "Completed"
                    completed_tasks += 1

                elif status == '6':
                    task_status ="Deferred"
                    deferred_task += 1

                elif status == '7':
                    task_status ="Declined"
                    Declined_task += 1


                if notviewed =='Y' and status == '2':
                    pending_not_viewed_task +=1
                elif notviewed =='N' and status == '2':
                    pending_viewed_task +=1

            # Total completed task and total inprogress task
            Total_completed_task = supposedly_completed_task + completed_tasks
            Total_inprogress_task  = active_tasks + deferred_task

            # Task completion rate percentage
            if completed_tasks!=0 and total_task !=0 :
                completion_rate = round((completed_tasks / total_task) * 100)
            else:
                completion_rate = 0


            # in_progress percentage
            if active_tasks!=0 and total_task !=0 :
                in_progress_rate = round((active_tasks / total_task)* 100)
            else:
                in_progress_rate = 0


            #task_severity
            if overdue_tasks != 0 and total_task != 0:
                task_severity = round((overdue_tasks / total_task) * 100)
                if task_severity <= 33.3:
                    task_severity_level = "Low"
                elif task_severity <= 66.6: 
                    task_severity_level = "Medium"
                else:
                    task_severity_level = "High"
            else:
                task_severity = 0
                task_severity_level = "Low"


            # Time spend on work

            working_hours_per_day = 8
            start_date_str = datetime.strptime(start_date, "%Y-%m-%d")
            end_date_str = datetime.strptime(end_date, "%Y-%m-%d")
            total_working_hours = 0
            current_date = start_date_str
            while current_date <= end_date_str:
                # Check if the current day is a weekday (Monday to Friday)
                if current_date.weekday() < 5:
                    total_working_hours += working_hours_per_day
                current_date += timedelta(days=1)
            time_spend_on_task = total_time_estimate_hours
            working_hours = total_working_hours
           
            # Project Statistics
            if completed_tasks!=0 and total_task !=0 :
                complete_task_rate = round((completed_tasks/total_task)*100 )
            else:
                complete_task_rate = 0

            
            other_tasks = overdue_tasks + pending_tasks + new_tasks
            other_active_task = other_tasks +active_tasks
            if other_active_task!=0 and total_task !=0 :
                Inprogress_task_rate = round((other_active_task/total_task)* 100)
            else:
                Inprogress_task_rate  = 0

            if Total_completed_task != 0 and completed_tasks !=0:
                complete_task_scale = (completed_tasks/Total_completed_task)*100
            else:
                complete_task_scale =0
            if Total_completed_task != 0 and supposedly_completed_task !=0:
                supposedly_task_scale = (supposedly_completed_task/Total_completed_task)*100
            else:
                supposedly_task_scale =0

            if Total_inprogress_task != 0 and active_tasks !=0:
                active_task_scale = (active_tasks/Total_inprogress_task)*100
            else:
                active_task_scale =0
            
            if Total_inprogress_task != 0 and deferred_task !=0:
                deferred_task_scale = (deferred_task/Total_inprogress_task)*100
            else:
                deferred_task_scale =0
            
            if pending_tasks != 0 and pending_viewed_task !=0:
                pending_viewed_task_scale = (pending_viewed_task/pending_tasks)*100
            else:
                pending_viewed_task_scale =0
            
            if pending_tasks != 0 and pending_not_viewed_task !=0:
                pending_not_viewed_task_scale = (pending_not_viewed_task/pending_tasks)*100
            else:
                pending_not_viewed_task_scale =0
            
            if overdue_tasks != 0 and overdue_pending !=0:
                overdue_pending_scale = (overdue_pending/overdue_tasks)*100
            else:
                overdue_pending_scale =0
            
            if overdue_tasks != 0 and overdue_inprogress !=0:
                overdue_inprogress_scale = (overdue_inprogress/overdue_tasks)*100
            else:
                overdue_inprogress_scale =0



            task_data = {
            "User_id" : responsible_id,
            "Total_Task" : total_task,
            "Total_completed_task" : Total_completed_task,
            "Completed_Task" : completed_tasks,
            "Supposedly_Completed_Task" : supposedly_completed_task,
            "Total_Inprogress_Task" : Total_inprogress_task,
            "Active_Task" : active_tasks,
            "Deferred_Task" : deferred_task,
            "Total_Pending_Task" : pending_tasks,
            "Pending_Viewed_Task" : pending_viewed_task,
            "Pending_Not_Viewed_Task" : pending_not_viewed_task,
            "Total_Overdue_Task" : overdue_tasks,
            "Overdue_Pending_Task" : overdue_pending,
            "Overdue_Inprogress_Task" : overdue_inprogress,
            "New_Task_Count" : new_tasks,
            "Completion_Rate" : completion_rate,
            "In_Progress" : in_progress_rate,  
            "Task_Severity" : task_severity,
            "Task_severity_level" : task_severity_level,
            "Complete_Task_Rate" : complete_task_rate,
            "Inprogress_Task_Rate" : Inprogress_task_rate,
            # "Other_Task_Rate" : other_task_rate,
            "Time_Spend_On_Task":time_spend_on_task,
            "Working_Hours":working_hours,
            "Complete_Task_Scale":complete_task_scale,
            "Supposedly_Task_Scale":supposedly_task_scale,
            "Active_Task_Scale":active_task_scale,
            "Deferred_Task_Scale":deferred_task_scale,
            "Pending_Viewed_Task_Scale":pending_viewed_task_scale,
            "Pending_Not_Viewed_Task_Scale":pending_not_viewed_task_scale,
            "Overdue_Pending_Scale":overdue_pending_scale,
            "Overdue_Inprogress_Scale":overdue_inprogress_scale,
           
            }
            task_data_list.append(task_data)
            json_data['Data']=task_data_list
            print(responsible_id,"----------------get_task_completion_rate (data)-----------",json_data)
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))


@csrf_exempt
# previous date range task count
def previous_date_range_data(request): 
    global responsible_id    
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:
            print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            year_str = post.get('year')
            select_week_str = post.get('week')
            select_month_str = post.get('month')
            Qno_str = post.get('Qno')
            # responsible_id = 42
            year =int(year_str)
            select_week = int(select_week_str)
            select_month = int(select_month_str)
            Qno = int(Qno_str)
            print(year_str,select_week_str,select_month_str,Qno_str)
            #year
            previous_year = year - 1

            # Set date range based on user input
            if select_month != 0:   
                if select_week != 0:
                    date_range = "Last week"
                    if select_month == 1 and select_week == 1:
                        select_month = 12
                        select_week = 4
                        first_day_of_month = datetime(previous_year, select_month, 1)
                        while first_day_of_month.weekday() != 0:
                            first_day_of_month -= timedelta(days=1)
                            week_starts_date = first_day_of_month + timedelta(weeks=select_week - 1)
                            week_ends_date = week_starts_date + timedelta(days=6)
                        start_date, end_date = week_starts_date.strftime("%Y-%m-%d"), week_ends_date.strftime("%Y-%m-%d")
                    elif select_month != 1 and select_week == 1:
                        previous_month = select_month -1
                        select_week = 4
                        first_day_of_month = datetime(year, previous_month, 1)
                        while first_day_of_month.weekday() != 0:
                            first_day_of_month -= timedelta(days=1)
                            week_starts_date = first_day_of_month + timedelta(weeks=select_week - 1)
                            week_ends_date = week_starts_date + timedelta(days=6)
                        start_date, end_date = week_starts_date.strftime("%Y-%m-%d"), week_ends_date.strftime("%Y-%m-%d")
                    else:
                        previous_week = select_week - 1
                        first_day_of_month = datetime(year, select_month, 1)
                        while first_day_of_month.weekday() != 0:
                            first_day_of_month -= timedelta(days=1)
                            week_starts_date = first_day_of_month + timedelta(weeks=select_week - 1)
                            week_ends_date = week_starts_date + timedelta(days=6)
                        start_date, end_date = week_starts_date.strftime("%Y-%m-%d"), week_ends_date.strftime("%Y-%m-%d")
                    
                else:
                    date_range = "Last Month"
                    if select_month == 1:
                        month = 12
                        start_date, end_date = f"{previous_year}-{month:02d}-01", f"{previous_year}-{month:02d}-{calendar.monthrange(previous_year,month)[1]:02d}"
                    else:
                        previous_month = select_month -1
                        start_date, end_date = f"{year}-{previous_month:02d}-01", f"{year}-{previous_month:02d}-{calendar.monthrange(year,previous_month)[1]:02d}"
            elif Qno != 0:
                date_range = "Last Quater"
                if Qno == 1:
                    start_month, end_month = [(1, 3), (4, 6), (7, 9), (10, 12)][3]
                    start_date = f"{previous_year:04d}-{start_month:02d}-01"
                    _, last_day = calendar.monthrange(previous_year, end_month)
                    end_date = f"{previous_year:04d}-{end_month:02d}-{last_day:02d}"
                else:
                    previous_Qno = Qno-1
                    start_month, end_month = [(1, 3), (4, 6), (7, 9), (10, 12)][previous_Qno - 1]
                    start_date = f"{year:04d}-{start_month:02d}-01"
                    _, last_day = calendar.monthrange(year, end_month)
                    end_date = f"{year:04d}-{end_month:02d}-{last_day:02d}"
            else:
                date_range = "Last Year"
                start_date, end_date = f"{previous_year}-01-01", f"{previous_year}-12-31"

            print("----previous_start_date---",start_date)
            print("---- previous_end_date----",end_date)

            filter_params = {
                    "filter": {
                        "RESPONSIBLE_ID": responsible_id,
                        ">=CREATED_DATE": start_date,
                        "<=CREATED_DATE": end_date,
                    },
                    "select": ["CREATED_DATE", "STATUS"]
                }
            complete_task = 0
            pending_task = 0
            overdue_task = 0
            active_task = 0
            task_status = ""
            previous_task_data_list=[]
            previous_task_data_method= bx24.get_all('tasks.task.list', filter_params)
            for previous_task_data in previous_task_data_method:
                status = previous_task_data['status']
                substatus = previous_task_data['subStatus']
                if substatus == '-1':
                    task_status = "Overdue Tasks"
                    overdue_task += 1

                elif status == '2':
                    task_status ="Pending Tasks"
                    pending_task += 1

                elif status == '3':
                    task_status ="Active Tasks"
                    active_task += 1

                elif status == '5':
                    task_status = "Completed Tasks"
                    complete_task += 1
      
            previous_data = {
                "Completed_Task":complete_task,
                "Active_Task":active_task,
                "Pending_Task":pending_task,
                "Overdue_Task":overdue_task,
                "Date_Range":date_range,
            }
            previous_task_data_list.append(previous_data)
            json_data['Previous_Task_Data']=previous_task_data_list
            print(responsible_id,"-----previous_tasks_data (data)----",json_data)
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))


   
#Upcoming_task
@csrf_exempt
def upcoming_task(request): 
    global responsible_id  
      
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:
            print("--upcoming_task---")
            year_str = post.get('year')
            select_week_str = post.get('week')
            select_month_str = post.get('month')
            Qno_str = post.get('Qno')
            # responsible_id = 42
            year =int(year_str)
            select_week = int(select_week_str)
            select_month = int(select_month_str)
            Qno = int(Qno_str)    
   

        # # Get the year range based on the current year
            current_datetime = datetime.now(tz.tzutc())

            # Set date range based on user input
            if select_month != 0:
                weeks_in_month = (calendar.monthrange(year, select_month)[1] - 1) // 7 + 1
                print(weeks_in_month)
                if select_week != 0:
                    # Calculate the first day of the month
                    first_day_of_month = datetime(year, select_month, 1)

                    # Find the first day of the selected week
                    while first_day_of_month.weekday() != 0:
                        first_day_of_month -= timedelta(days=1)

                    # Calculate the start and end dates of the selected week
                    week_start_date = first_day_of_month + timedelta(weeks=select_week - 1)
                    week_end_date = week_start_date + timedelta(days=6)

                    # Format the start and end dates as strings
                    start_date, end_date = week_start_date.strftime("%Y-%m-%d"), week_end_date.strftime("%Y-%m-%d")
                else:
                    # If select_week is 0, consider the entire month
                    start_date = f"{year}-{select_month:02d}-01"
                    end_date = f"{year}-{select_month:02d}-{calendar.monthrange(year, select_month)[1]:02d}"
            elif Qno != 0:
                start_month, end_month = [(1, 3), (4, 6), (7, 9), (10, 12)][Qno - 1]
                start_date = f"{year:04d}-{start_month:02d}-01"
                _, last_day = calendar.monthrange(year, end_month)
                end_date = f"{year:04d}-{end_month:02d}-{last_day:02d}"
            else:
                start_date, end_date = f"{year}-01-01", f"{year}-12-31"

            Upcoming_task_data_list = []

            filter_params = {
                "filter": {
                    "RESPONSIBLE_ID": responsible_id,
                    ">=CREATED_DATE": start_date,
                    "<=CREATED_DATE": end_date,
                },
                "select": ["ID", "TITLE", "DEADLINE", "CREATED_DATE","PRIORITY",]
            }

            task_data_method= bx24.get_all('tasks.task.list', filter_params)
            # print(task_data_method)
            upcoming_tasks = []
            for task in task_data_method:
                title = task['title']
            # Task priority
                priority = task['priority']
                if priority == "0":
                    priority_level = 25 # Low
                elif priority == "1":
                    priority_level = 50 # medium
                elif priority == "2":
                    priority_level = 100 # High


            # upcoming tasks (if deadline is 48 hours above from current date )
                deadline = task['deadline']
                deadline_threshold = current_datetime + timedelta(hours=24)
                if deadline is not None:
                    deadline_date = parser.parse(deadline)

                    if deadline_date > deadline_threshold:
                        deadline_date = deadline_date
                        formatted_date = deadline_date.strftime("%Y-%b-%d")
                        upcoming_tasks.append({"Task_Title":title,"Task_Deadline": formatted_date,"Task_Pulse":priority_level})
            upcoming_task_data ={"Upcoming_tasks":upcoming_tasks}
            Upcoming_task_data_list.append(upcoming_task_data)
            json_data['Upcoming_Task_Data']=Upcoming_task_data_list
            print(responsible_id,"------upcomming_task------",json_data)
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def yearly_task_graph(request):
    global responsible_id
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:

            year_str = post.get('year')
            year = int(year_str)
            # responsible_id = 42
            month_range = list(range(1, 13))  
            
            # Create a dictionary to map month numbers to names
            month_name_mapping = {i: calendar.month_abbr[i] for i in range(1, 13)}

            task_complete_count_list = []

            for month_number in month_range:
                month_name = month_name_mapping[month_number]
                start_date = f"{year}-{month_number:02d}-01"
                end_date = f"{year}-{month_number:02d}-31"
                
                filter_params = {
                    "filter": {
                        "RESPONSIBLE_ID": responsible_id,
                        ">=CREATED_DATE": start_date,
                        "<=CREATED_DATE": end_date,
                    },
                    "select": ["CREATED_DATE", "STATUS"]
                }
                
                completed_task_count = 0
                task_data_method = bx24.get_all('tasks.task.list', filter_params)
                
                for task in task_data_method:
                    status = task['status']
                    if status == '5':
                        completed_task_count += 1
                
                monthly_data = {
                    "Month": month_name,
                    "Completed_Task_count": completed_task_count
                }
                
                task_complete_count_list.append(monthly_data)
                
            json_data['Yearly_Graph'] = task_complete_count_list
            print(responsible_id,"----yearly_task_graph  (data)---",json_data)
    except Exception as e:
        print(e)
    
    return HttpResponse(json.dumps(json_data))
        


# Task_by_assignees_chart
@csrf_exempt
def get_task_by_assignees(request):

    print("---task_By_assignees------")     
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:
            print("--task_By_assignees---")
            year_str = post.get('year')
            select_week_str = post.get('week')
            select_month_str = post.get('month')
            Qno_str = post.get('Qno')
            
            year =int(year_str)
            select_week = int(select_week_str)
            select_month = int(select_month_str)
            Qno = int(Qno_str)    

        # Set date range based on user input
        if select_month != 0:
            weeks_in_month = (calendar.monthrange(year, select_month)[1] - 1) // 7 + 1
            print(weeks_in_month)
            if select_week != 0:
                    # Calculate the first day of the month
                    first_day_of_month = datetime(year, select_month, 1)

                    # Find the first day of the selected week
                    while first_day_of_month.weekday() != 0:
                        first_day_of_month -= timedelta(days=1)

                    # Calculate the start and end dates of the selected week
                    week_start_date = first_day_of_month + timedelta(weeks=select_week - 1)
                    week_end_date = week_start_date + timedelta(days=6)

                    # Format the start and end dates as strings
                    start_date, end_date = week_start_date.strftime("%Y-%m-%d"), week_end_date.strftime("%Y-%m-%d")
            else:
                # If select_week is 0, consider the entire month
                start_date = f"{year}-{select_month:02d}-01"
                end_date = f"{year}-{select_month:02d}-{calendar.monthrange(year, select_month)[1]:02d}"

        elif Qno != 0:
            start_month, end_month = [(1, 3), (4, 6), (7, 9), (10, 12)][Qno - 1]
            start_date = f"{year:04d}-{start_month:02d}-01"
            _, last_day = calendar.monthrange(year, end_month)
            end_date = f"{year:04d}-{end_month:02d}-{last_day:02d}"
        else:
            start_date, end_date = f"{year}-01-01", f"{year}-12-31"

        user_params = {'filter': {'ACTIVE': "true"}}
        user_method = bx24.get_all("user.get",user_params)
        task_by_assignees_list = []
        random.shuffle(user_method)
        for i in range(min(3, len(user_method))): 
            id = user_method[i]["ID"]
            print(id)
            first_name = user_method[i]["NAME"]
            last_name = user_method[i]["LAST_NAME"]
            user_name = first_name+" "+last_name
            if first_name and first_name.upper() == "GREEN":
                continue 
            personal_photo = user_method[i].get("PERSONAL_PHOTO", None)

            filter_params = {
                                "filter": {
                                    "RESPONSIBLE_ID": id,
                                    ">=CREATED_DATE": start_date,
                                    "<=CREATED_DATE": end_date,
                                },
                                "select": ["STATUS"]
                            }

            task_method = bx24.get_all('tasks.task.list', filter_params)
            # print(task_created_id)
            total_task = 0
            completed_tasks = 0
            active_tasks = 0
            new_tasks = 0
            
            for task in task_method:
                status = task['status']
                total_task += 1

                if status == '5':
                    # print("Completed task")
                    completed_tasks += 1
                elif status == '3':
                    # print("Active task")
                    active_tasks += 1
                
                elif status == '1':
                    # print("New task")
                    new_tasks += 1


            task_by_assignees = {
                "User_Id":id,
                "User_Name": user_name,
                "Personal_Photo": personal_photo,
                "completed_tasks": completed_tasks,
                "active_tasks": active_tasks,
                "new_tasks": new_tasks}
            task_by_assignees_list.append(task_by_assignees)
        json_data['Assignies_task_Data']=task_by_assignees_list
        print("----get_task_by_assignees(data)---",json_data)
    except Exception as e:
        print(e)
    
    return HttpResponse(json.dumps(json_data))
