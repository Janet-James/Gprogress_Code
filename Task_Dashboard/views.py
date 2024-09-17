

import json
import random
from django.http import HttpResponse
from django.shortcuts import render
from fast_bitrix24 import Bitrix
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from dateutil import parser, tz
from datetime import datetime, timedelta, date





class task_management_Template_Load(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        return super(task_management_Template_Load, self).dispatch(request, *args, **kwargs)
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'task_manager.html'
        else:
            template_name = 'task_manager.html'
        return [template_name]
    def get(self, request, *args, **kwargs):
        context = super(task_management_Template_Load, self).get_context_data(**kwargs)
        return self.render_to_response(context)



def overall_task (request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        user_params = {'filter': {'ACTIVE': "true"}}
        user_method = bx24.get_all("user.get",user_params)
        overall_data_list = []
        new_tasks= 0
        completed_tasks = 0
        inprogress_tasks =0
        overdue_tasks =0
        overdue_image_list =[]
        new_tasks_image_list =[]
        inprogress_tasks_image_list =[]
        completed_tasks_image_list =[]
        for i in user_method:
            id = i["ID"]
            first_name = i["NAME"]
            last_name = i["LAST_NAME"]
            if first_name and first_name.upper() == "GREEN":
                continue 
            personal_photo = i.get("PERSONAL_PHOTO")
            all_tasks_count_params = {"filter":{"RESPONSIBLE_ID":id},"select":["ID","RESPONSIBLE_ID","DEADLINE", "CREATED_DATE", "STATUS"]}
            all_tasks_count = bx24.get_all('tasks.task.list', all_tasks_count_params)
           
            for all_tasks in all_tasks_count:
                user_id = all_tasks['responsibleId']
                task_id = all_tasks['id']
                status = all_tasks['status']
                substatus  = all_tasks['subStatus']

                if substatus == '-1':
                    task_status = "Overdue"
                    overdue_tasks += 1
                    overdue_image = personal_photo
                    if overdue_image not in overdue_image_list and overdue_image != None:
                        overdue_image_list.append(overdue_image)
                
                elif status == '1':
                    task_status ="New task"
                    new_tasks += 1
                    new_tasks_image = personal_photo
                    if new_tasks_image not in new_tasks_image_list and new_tasks_image != None:
                        new_tasks_image_list.append(new_tasks_image)

                elif status == '3':
                    task_status ="Active"
                    inprogress_tasks += 1
                    inprogress_tasks_image = personal_photo
                    if inprogress_tasks_image not in inprogress_tasks_image_list and inprogress_tasks_image != None:
                        inprogress_tasks_image_list.append(inprogress_tasks_image)

                elif status == '5':
                    task_status = "Completed"
                    completed_tasks += 1
                    completed_tasks_image = personal_photo
                    if completed_tasks_image not in completed_tasks_image_list and completed_tasks_image != None:
                        completed_tasks_image_list.append(completed_tasks_image)

        total_task = overdue_tasks + new_tasks + inprogress_tasks + completed_tasks
        if new_tasks !=0 and total_task !=0:
            new_tasks_progress = round((new_tasks/total_task )*100)
        else:
            new_tasks_progress = 0
        if completed_tasks !=0 and total_task !=0:
            completed_tasks_progress = round((completed_tasks / total_task)*100)
        else:
            completed_tasks_progress = 0
        if inprogress_tasks !=0 and total_task !=0:
            inprogress_tasks_progress = round((inprogress_tasks / total_task)*100)
        else:
            inprogress_tasks_progress = 0
        if overdue_tasks !=0 and total_task !=0:
            overdue_tasks_progress = round(( overdue_tasks / total_task)*100)
        else:
            overdue_tasks_progress = 0

        if len(new_tasks_image_list) >= 4:
            new_task_image = [random.sample(new_tasks_image_list, 4)]
           
        else:
            new_task_image= new_tasks_image_list
        
        if len(overdue_image_list) >= 4:
            overdue_task_image = [random.sample(overdue_image_list, 4)]
           
        else:
            overdue_task_image= overdue_image_list
        
        if len(inprogress_tasks_image_list) >= 4:
            inprogress_task_image = [random.sample(inprogress_tasks_image_list, 4)]
           
        else:
            inprogress_task_image= inprogress_tasks_image_list

        if len(completed_tasks_image_list) >= 4:
            completed_task_image = [random.sample(completed_tasks_image_list, 4)]
           
        else:
            completed_task_image= completed_tasks_image_list
    
 
        print(total_task,"\n",overdue_tasks,"\n",new_tasks,"\n",inprogress_tasks,"\n",completed_tasks,"\n",new_tasks_progress,"\n",completed_tasks_progress,"\n",inprogress_tasks_progress,"\n",overdue_tasks_progress,"\n",)
        overall_data = {"New_Tasks":new_tasks,
                        "Completed_Tasks":completed_tasks,
                        "Inprogress_Tasks":inprogress_tasks,
                        "Overdue_Tasks":overdue_tasks,
                        "New_Tasks_Progress":new_tasks_progress,
                        "Completed_Task_Progress":completed_tasks_progress,
                        "Inprogress_Task_Progress":inprogress_tasks_progress,
                        "Overdue_Task_Progress":overdue_tasks_progress,
                        "New_Task_Image":new_task_image,
                        "Overdue_Task_Image":overdue_task_image,
                        "Inprogress_Task_Image":inprogress_task_image,
                        "Completed_Task_Image":completed_task_image,}
        overall_data_list.append(overall_data)
        json_data.update({
            "Overall_task_data": overall_data_list
        })
    return HttpResponse(json.dumps(json_data))



# current_week gantt chart
def current_week_chart(request):    
    json_data = {}
    if request.method == 'GET':
        print("----weekly_chart----------------")
        current_date = datetime.now()
        start_of_week = current_date - timedelta(days=current_date.weekday() + 1)
        end_of_week = start_of_week + timedelta(days=6)
        week_start_date = start_of_week.replace(hour=0, minute=0, second=0)
        week_end_date = end_of_week.replace(hour = 23,minute = 59,second= 59)

        format_start_of_week = week_start_date.strftime('%Y-%m-%dT%H:%M:%S%z')
        format_end_of_week = week_end_date.strftime('%Y-%m-%dT%H:%M:%S%z')
        print("--------------------------",format_start_of_week,"\n",format_end_of_week)
        # current_datetime = datetime.now(tz.tzutc())

        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

        # Getting all user id
        User_params = {'filter': {'ACTIVE': "true"}}
        user_method = bx24.get_all('user.get', User_params)

        user_data_list = []
       
        for user_data in user_method:
            responsible_id = user_data['ID']
            first_name = user_data['NAME']
            last_name = user_data['LAST_NAME']
            # Check if first_name is "GREEN" ,Skip this iteration if first_name is "GREEN"
            if first_name and first_name.upper() == "GREEN":
                continue 
            name = f"{first_name} {last_name}"
            dept_id = user_data['UF_DEPARTMENT'][0]

            # Retrieving department name
            dept_params = {'ID': dept_id}
            dept_method = bx24.get_all('department.get', dept_params)
            department = dept_method[0]['NAME']

            # Retrieving task data 
            month_params = {
            "filter": {
            "RESPONSIBLE_ID": responsible_id,
            ">=CREATED_DATE": format_start_of_week,
            "<=CREATED_DATE": format_end_of_week,
            },
            "select": ["ID", "TITLE", "CREATED_DATE", "DATE_START", "CLOSED_DATE", "START_DATE_PLAN","END_DATE_PLAN","DEADLINE","STATUS","COMMENTS_COUNT","SERVICE_COMMENTS_COUNT"]
            }
            task_data_method = bx24.get_all('tasks.task.list', month_params)

            task_info = []
          
            for task in task_data_method:
                task_id = task['id']
                task_name = task['title']
                deadline = task['deadline']
                if deadline:
                    Deadline = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                else:
                    Deadline = None

                created_date_str = task['createdDate']
                CreatedDate = datetime.strptime(created_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
        # start date
                start_date_str = task['dateStart']
                start_date_plan = task['startDatePlan']

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    StartDate = startDatePlan

                elif start_date_str:
                    StartDate = datetime.strptime(start_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

                else:
                    StartDate = CreatedDate
        # End date
                
                closed_date_str = task['closedDate']
                end_date_plan = task['endDatePlan']

                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    EndDate = endDatePlan
                    DateAccuracy = "Accurate Date"

                elif closed_date_str:
                    EndDate = datetime.strptime(closed_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                elif deadline:
                    EndDate = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                else:
                    EndDate = None
                    DateAccuracy = "Inaccurate Date"

        # start_plan_date

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    startDatePlan = None

        # End_date_plan                
                
                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    endDatePlan = None
                
                
        # Task_status               
                status = task['status']
                substatus = task['subStatus']
                if substatus == '-1':
                    task_status = "Overdue"
                elif status == '5':
                    task_status = "Completed"   
                elif status == '3':
                    task_status = "Active"
                elif status == '1':
                    task_status ="New"
                elif status == '4':
                    task_status ="Supposedly completed"
                elif status == '6':
                    task_status ="Deferred"
                elif status == '7':
                    task_status ="Declined"
                # elif deadline is not None:
                #     deadline_date = parser.parse(deadline)
                #     if deadline_date < current_datetime:
                #         task_status = "Overdue"
                #     elif status == '2':
                #         task_status ="Pending"
                elif status == '2':
                    task_status ="Pending"
                
                total_comments_count = task['commentsCount']
                service_comment_count = task['serviceCommentsCount']
                if total_comments_count and service_comment_count:
                    user_comments_count =int(total_comments_count) - int(service_comment_count)
                else:
                    user_comments_count =None
        # Retrieving comments
                comment_params = {'taskId': task_id}
                comment_list = bx24.get_all('tasks.task.result.list', comment_params)
                # if comment_list:
                #     first_comment = comment_list[0]
                #     Comments = first_comment['text']
                # else:
                #     Comments = None
                comment_list_data = []
                for comment in comment_list:
                    createdby_id = comment['createdBy']
                    summary = comment['text']
                    comment_date = comment['createdAt']
                    datetime_obj = datetime.strptime(comment_date, '%Y-%m-%dT%H:%M:%S%z')
                    comment_formatted_date = datetime_obj.strftime('%Y-%m-%d')
                    User_params = {"filter": {"ID": createdby_id}}
                    user_method = bx24.get_all('user.get', User_params)
                    if user_method:
                        user = user_method[0]
                        first_name = user.get('NAME', '')
                        last_name = user.get('LAST_NAME', '')

                    comment_list_data.append({
                        "Comment_Createdby": first_name + " " + last_name,
                        "Comment": summary,
                        "Comment_Date": comment_formatted_date,})
                
                task_info.append({
                "Task": task_name,
                "TaskId":task_id,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "TaskStatus":task_status,
                "StartDatePlan":startDatePlan,
                "EndDatePlan":endDatePlan,
                "CreatedDate":CreatedDate,
                "DateAccuracy":DateAccuracy,
                "Deadline":Deadline,
                "CommentsCount":user_comments_count,
                "Comments_data":comment_list_data,
                })

            # Append user data to the list
            user_data_list.append({
            "Name": name,
            "Department": department,
            'Tasks': task_info
            })

        json_data = json.dumps({"data": user_data_list})
        print("--weekly_chart--",json_data)
    return HttpResponse(json_data)



def all_user_data (request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        user_params = {'filter': {'ACTIVE': "true"}}
        user_method = bx24.get_all("user.get",user_params)

        user_list = []
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
            user_list.append(user_data)
        json_data.update({"user_list": user_list})
    return HttpResponse(json.dumps(json_data))
        

@csrf_exempt
def task_report(request):
    
    json_data = {}
    post = request.POST
    if post:
        selected_date = post.get('date')
        user_id = post.get('responsible_id')
        status = post.get('status')
        print(type(selected_date))
        print(type(user_id))
        print(status)
        current_date_int = datetime.now().date()
        current_date = str(current_date_int)


        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        filter_task_params = {"filter":{'RESPONSIBLE_ID':user_id,">=CREATED_DATE": selected_date,"<=CREATED_DATE": current_date,"STATUS":status},
                            "select": ["ID", "TITLE", "CREATED_DATE", "DATE_START", "CLOSED_DATE", "START_DATE_PLAN","END_DATE_PLAN","DEADLINE","STATUS","ACCOMPLICE"]}
        task_data_method = bx24.get_all('tasks.task.list', filter_task_params)
        task_report_list =[]
        for tasks in task_data_method:
            print(tasks)
            task_id = tasks['id']
            task_name = tasks['title']
            deadline = tasks['deadline']
            if deadline:
                Deadline = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
            else:
                Deadline = None

            created_date_str = tasks['createdDate']
            CreatedDate = datetime.strptime(created_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
            start_date_str = tasks['dateStart']
            start_date_plan = tasks['startDatePlan']
        #start_date
            
            if start_date_plan:
                startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                StartDate = startDatePlan

            elif start_date_str:
                StartDate = datetime.strptime(start_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

            else:
                StartDate = CreatedDate
        # End date
            
            closed_date_str = tasks['closedDate']
            end_date_plan = tasks['endDatePlan']

            if end_date_plan:
                endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                EndDate = endDatePlan

            elif closed_date_str:
                EndDate = datetime.strptime(closed_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

            elif deadline:
                EndDate = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

            else:
                EndDate = None
            
        #task_status
            status = tasks['status']
            substatus = tasks['subStatus']
            if substatus == '-1':
                task_status = "Overdue"
            elif status == '5':
                task_status = "Completed"   
            elif status == '3':
                task_status = "Active"
            elif status == '1':
                task_status ="New"
            elif status == '4':
                task_status ="Supposedly completed"
            elif status == '6':
                task_status ="Deferred"
            elif status == '7':
                task_status ="Declined"
            # elif deadline is not None:
            #     deadline_date = parser.parse(deadline)
            #     if deadline_date < current_datetime:
            #         task_status = "Overdue"
            #     elif status == '2':
            #         task_status ="Pending"
            elif status == '2':
                task_status ="Pending"
            observer = tasks.get("accomplices")
            if observer:
                observer_params= {'filter': {'NAME_SEARCH':observer}}
                observer_method = bx24.get_all("user.get",observer_params)
                for observer in observer_method:
                    observer_fname = observer['NAME']
                    observer_lname = observer['LAST_NAME']
                    observer_name =observer_fname+" "+observer_lname
            else:
                observer_name = None
        
            
            task_report_list.append({
                "Task_Id":task_id,
                "Task_Name": task_name,
                'Start_Date': StartDate,
                'End_Date':EndDate,
                "Observer_Name":observer_name,
                'Task_Status':task_status,
                })

            json_data = json.dumps({"task_report_list": task_report_list})
            print(json_data)
    return HttpResponse(json_data)

#project_estimate

def project_estimate(request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        project_data_list =[]
        assigned_project = 0
        completed_project =0
        total_project = 0
        project_params = {"select":["ACTIVE", "OPENED", "CLOSED", "PROJECT","NUMBER_OF_MEMBERS","PROJECT_DATE_FINISH"]}
        projects_method = bx24.get_all('socialnetwork.api.workgroup.list',project_params)
       
        for project in projects_method:
            projects = project['project']
            if projects =="Y":
                total_project +=1
                # active = project['active']
                finish_date = project['projectDateFinish']
                members = project['numberOfMembers']
                if members !=0:
                    assigned_project +=1
                if finish_date != None:
                    completed_project +=1
        assigned_percent = round((assigned_project/total_project)*100)
        completed_percent = round((completed_project/total_project)*100)
        project_data ={"Total_project":total_project,
                       "Assignes_Project":assigned_project,
                       "Completed_project":completed_project,
                       "Assigned_percent":assigned_percent,
                       "completed_percent":completed_percent}
        project_data_list.append(project_data)

        json_data = json.dumps({"data": project_data_list})
        print(json_data)
    return HttpResponse(json_data)

    
def task_report_filter(request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        user_params = {'filter': {'ACTIVE': "true"}}
        user_data_method = bx24.get_all('user.get', user_params)

        user_name_list = []

        for user_data in user_data_method:
            responsible_id = user_data['ID']
            first_name = user_data['NAME']
            last_name = user_data['LAST_NAME']
            # Check if first_name is "GREEN" ,Skip this iteration if first_name is "GREEN"
            if first_name and first_name.upper() == "GREEN":
                continue 
            name = f"{first_name} {last_name}"
            user_list = {"Responsible_Id":responsible_id,
                         "Name": name,}
            user_name_list.append(user_list)
        json_data = json.dumps({"data": user_name_list})
        print(json_data)
    return HttpResponse(json_data)



     
#resource_management dept filter

def resource_management_dept_filter(request):
    json_data = {}
    if request.method == "GET":
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

        dept_method = bx24.get_all('department.get')
        dept_data_list =[]
        for dept_data in dept_method:
            dept_id = dept_data['ID']
            dept_name = dept_data['NAME']

            dept_list ={"Dept_Id":dept_id,
                        "Dept_Name":dept_name}
            dept_data_list.append(dept_list)
        json_data = json.dumps({"data": dept_data_list})
        print(json_data)
    return HttpResponse(json_data)




def resource_management_user_filter(request):
    json_data = {}
    if request.method == "GET":
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        User_params = {'filter': {'ACTIVE': "true"}}
        user_data = bx24.get_all('user.get', User_params)
        user_data_list=[]
        for i in user_data:
            responsible_id = i['ID']
            first_name = i['NAME']
            last_name = i['LAST_NAME']
            # Check if first_name is "GREEN" ,Skip this iteration if first_name is "GREEN"
            if first_name and first_name.upper() == "GREEN":
                continue 
            name = f"{first_name} {last_name}"
            user_list = {"User_Id":responsible_id,"User_Name":name}
            user_data_list.append(user_list)
        json_data = json.dumps({"data": user_data_list})
        print(json_data)
    return HttpResponse(json_data)



            
# resource management  gantt chart
@csrf_exempt
def resource_management_team(request):    
    
    json_data = {}
    post = request.POST
    if post:
        is_week = int(post.get('week'))
        is_month = int(post.get('month'))
        from_date = str(post.get('from_date'))
        from_date_int = int(from_date[:4])  
        to_date = str(post.get('to_date'))
        to_date_int = int(to_date[:4])  
        selected_dept_id = int(post.get('dept_id'))
        print(is_week,is_month,from_date,to_date,selected_dept_id)
#  for week filter
        if is_week ==1:
            current_date = datetime.now()
            start_of_week = current_date - timedelta(days=current_date.weekday() + 1)
            end_of_week = start_of_week + timedelta(days=6)
            week_start_date = start_of_week.replace(hour=0, minute=0, second=0)
            week_end_date = end_of_week.replace(hour = 23,minute = 59,second= 59)

            format_start_date = week_start_date.strftime('%Y-%m-%dT%H:%M:%S%z')
            format_end_date = week_end_date.strftime('%Y-%m-%dT%H:%M:%S%z')
            print(format_start_date,"\n",format_end_date)
            print("******week******")
# for monthly filter
        elif is_month ==1:
            current_date = datetime.now()
            start_of_month = current_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            last_day_of_month = (start_of_month.replace(month=start_of_month.month % 12 + 1, day=1) - timedelta(days=1))
            end_of_month = last_day_of_month.replace(hour=23, minute=59, second=59)
            format_start_date = start_of_month.strftime('%Y-%m-%dT%H:%M:%S%z')
            format_end_date = end_of_month.strftime('%Y-%m-%dT%H:%M:%S%z')

            print(format_start_date, "\n", format_end_date)
            print("******month******")
# selected date range
        elif from_date_int != 0 and to_date_int != 0:
            format_start_date = from_date
            format_end_date = to_date
            print("----calender----",format_start_date)
            print("----calender----",format_end_date)
            print("******calender team******")
# today(default)
        else:
            current_date = datetime.now()
            format_start_date = current_date.strftime('%Y-%m-%d')
            format_end_date = current_date.strftime('%Y-%m-%d')
            print("******today******")

        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

        # Getting all user id
        if selected_dept_id != 0:
            team_params = {'filter': {'ACTIVE': "true","UF_DEPARTMENT":selected_dept_id}}
            team_method = bx24.get_all('user.get', team_params)
        else:
            team_params = {'filter': {'ACTIVE': "true"}}
            team_method = bx24.get_all('user.get', team_params)
            
        user_data_list = []
        print("---from_date----",format_start_date)
        print("-----to_date-----",format_end_date)
        for team_data in team_method:
            responsible_id = team_data['ID']
            first_name = team_data['NAME']
            last_name = team_data['LAST_NAME']
            # Check if first_name is "GREEN" ,Skip this iteration if first_name is "GREEN"
            if first_name and first_name.upper() == "GREEN":
                continue 
            name = f"{first_name} {last_name}"
          
            dept_id = team_data['UF_DEPARTMENT'][0]
           
            # Retrieving department name
            dept_params = {'ID': dept_id}
            dept_method = bx24.get_all('department.get', dept_params)
            department = dept_method[0]['NAME']

            # Retrieving task data 
            month_params = {
            "filter": {
            "RESPONSIBLE_ID": responsible_id,
            ">=CREATED_DATE": format_start_date,
            "<=CREATED_DATE": format_end_date,
            },
            "select": ["ID", "TITLE", "CREATED_DATE", "DATE_START", "CLOSED_DATE", "START_DATE_PLAN","END_DATE_PLAN","DEADLINE","STATUS","COMMENTS_COUNT","SERVICE_COMMENTS_COUNT"]
            }
            task_data_method = bx24.get_all('tasks.task.list', month_params)

            print("---------team-------",task_data_method)
            task_info = []
            
            for task in task_data_method:
                task_id = task['id']
                task_name = task['title']
                deadline = task['deadline']
                if deadline:
                    Deadline = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                else:
                    Deadline = None

                created_date_str = task['createdDate']
                CreatedDate = datetime.strptime(created_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
        # start date
                start_date_str = task['dateStart']
                start_date_plan = task['startDatePlan']

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    StartDate = startDatePlan

                elif start_date_str:
                    StartDate = datetime.strptime(start_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

                else:
                    StartDate = CreatedDate
        # End date
                
                closed_date_str = task['closedDate']
                end_date_plan = task['endDatePlan']

                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    EndDate = endDatePlan
                    DateAccuracy = "Accurate Date"

                elif closed_date_str:
                    EndDate = datetime.strptime(closed_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                elif deadline:
                    EndDate = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                else:
                    EndDate = None
                    DateAccuracy = "Inaccurate Date"

        # start_plan_date

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    startDatePlan = None

        # End_date_plan                
                
                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    endDatePlan = None
                
                
        # Task_status               
                status = task['status']
                substatus = task['subStatus']
                if substatus == '-1':
                    task_status = "Overdue"
                elif status == '5':
                    task_status = "Completed"   
                elif status == '3':
                    task_status = "Active"
                elif status == '1':
                    task_status ="New"
                elif status == '4':
                    task_status ="Supposedly completed"
                elif status == '6':
                    task_status ="Deferred"
                elif status == '7':
                    task_status ="Declined"
                # elif deadline is not None:
                #     deadline_date = parser.parse(deadline)
                #     if deadline_date < current_datetime:
                #         task_status = "Overdue"
                #     elif status == '2':
                #         task_status ="Pending"
                elif status == '2':
                    task_status ="Pending"
                
                total_comments_count = task['commentsCount']
                service_comment_count = task['serviceCommentsCount']
                if total_comments_count and service_comment_count:
                    user_comments_count =int(total_comments_count) - int(service_comment_count)
                else:
                    user_comments_count =None
        # Retrieving comments
                comment_params = {'taskId': task_id}
                comment_list = bx24.get_all('tasks.task.result.list', comment_params)
                # if comment_list:
                #     first_comment = comment_list[0]
                #     Comments = first_comment['text']
                # else:
                #     Comments = None
                comment_list_data = []
                for comment in comment_list:
                    createdby_id = comment['createdBy']
                    summary = comment['text']
                    comment_date = comment['createdAt']
                    datetime_obj = datetime.strptime(comment_date, '%Y-%m-%dT%H:%M:%S%z')
                    comment_formatted_date = datetime_obj.strftime('%Y-%m-%d')
                    User_params = {"filter": {"ID": createdby_id}}
                    user_method = bx24.get_all('user.get', User_params)
                    if user_method:
                        user = user_method[0]
                        first_name = user.get('NAME', '')
                        last_name = user.get('LAST_NAME', '')

                    comment_list_data.append({
                        "Comment_Createdby": first_name + " " + last_name,
                        "Comment": summary,
                        "Comment_Date": comment_formatted_date,})
                
                
                task_info.append({
                "Task": task_name,
                "Task_Id":task_id,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "TaskStatus":task_status,
                "StartDatePlan":startDatePlan,
                "EndDatePlan":endDatePlan,
                "CreatedDate":CreatedDate,
                "DateAccuracy":DateAccuracy,
                "Deadline":Deadline,
                "Comments_count":user_comments_count,
                "CommentData":comment_list_data,
                })

            # Append user data to the list
            user_data_list.append({
            "Name": name,
            "Department": department,
            'Tasks': task_info
            })

        json_data = json.dumps({"--team chart--": user_data_list})
        print(json_data)
    return HttpResponse(json_data)




@csrf_exempt
def resource_management_project(request):    
    json_data = {}
    post = request.POST
    if post:
        is_week = int(post.get('week'))
        is_month = int(post.get('month'))
        from_date = str(post.get('from_date'))
        from_date_int = int(from_date[:4])  
        to_date = str(post.get('to_date'))
        to_date_int = int(to_date[:4])  
        selected_dept_id = int(post.get('dept_id'))
        print(is_week,is_month,from_date,to_date,selected_dept_id)
#  for week filter
        if is_week ==1:
            current_date = datetime.now()
            start_of_week = current_date - timedelta(days=current_date.weekday() + 1)
            end_of_week = start_of_week + timedelta(days=6)
            week_start_date = start_of_week.replace(hour=0, minute=0, second=0)
            week_end_date = end_of_week.replace(hour = 23,minute = 59,second= 59)

            format_start_date = week_start_date.strftime('%Y-%m-%dT%H:%M:%S%z')
            format_end_date = week_end_date.strftime('%Y-%m-%dT%H:%M:%S%z')
            print(format_start_date,"\n",format_end_date)
            print("******week project******")
# for monthly filter
        elif is_month ==1:
            current_date = datetime.now()
            start_of_month = current_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            last_day_of_month = (start_of_month.replace(month=start_of_month.month % 12 + 1, day=1) - timedelta(days=1))
            end_of_month = last_day_of_month.replace(hour=23, minute=59, second=59)
            format_start_date = start_of_month.strftime('%Y-%m-%dT%H:%M:%S%z')
            format_end_date = end_of_month.strftime('%Y-%m-%dT%H:%M:%S%z')

            print(format_start_date, "\n", format_end_date)
            print("******month project******")
# selected date range
        elif from_date_int !=0 and to_date_int !=0:
            format_start_date = from_date
            format_end_date = to_date
            print("----calender----",format_start_date)
            print("----calender----",format_end_date)
            print("******calender project******")
# today(default)
        else:
            current_date = datetime.now()
            format_start_date = current_date.strftime('%Y-%m-%d')
            format_end_date = current_date.strftime('%Y-%m-%d')
            print("******today project******")

        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

        # Getting all user id
        if selected_dept_id != 0:
            User_params = {'filter': {'ACTIVE': "true","UF_DEPARTMENT":selected_dept_id}}
            user_data = bx24.get_all('user.get', User_params)
        else:
            User_params = {'filter': {'ACTIVE': "true"}}
            user_data = bx24.get_all('user.get', User_params)
        # print(user_method)
        user_data_list=[]
        for i in user_data:
            responsible_id = i['ID']
            first_name = i['NAME']
            last_name = i['LAST_NAME']
            # Check if first_name is "GREEN" ,Skip this iteration if first_name is "GREEN"
            if first_name and first_name.upper() == "GREEN":
                continue 
            name = f"{first_name} {last_name}"
            dept_id = i['UF_DEPARTMENT'][0]

            # Retrieving department name
            dept_params = {'ID': dept_id}
            dept_method = bx24.get_all('department.get', dept_params)
            department = dept_method[0]['NAME']
            
            # Retrieving task data 
            month_params = {
            "filter": {
            "RESPONSIBLE_ID": responsible_id,
            ">=CREATED_DATE": format_start_date,
            "<=CREATED_DATE": format_end_date,
            },
            "select": ["ID", "TITLE", "CREATED_DATE", "DATE_START", "CLOSED_DATE", "START_DATE_PLAN","END_DATE_PLAN","DEADLINE","STATUS","GROUP_ID","COMMENTS_COUNT","SERVICE_COMMENTS_COUNT"]
            }
            task_data_method = bx24.get_all('tasks.task.list', month_params)

            task_info = []
            
            for task in task_data_method:
                task_id = task['id']
                task_name = task['title']
                deadline = task['deadline']
                group_id = task["groupId"]

                if isinstance(task['group'], list):
                    for group in task['group']:
                        group_name = group.get('name', 'N/A')  
                        print(group_name)
                else:
                    group_name = task['group'].get('name', 'N/A') 
                    print(group_name)

                if deadline:
                    Deadline = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                else:
                    Deadline = None

                created_date_str = task['createdDate']
                CreatedDate = datetime.strptime(created_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
        # start date
                start_date_str = task['dateStart']
                start_date_plan = task['startDatePlan']

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    StartDate = startDatePlan

                elif start_date_str:
                    StartDate = datetime.strptime(start_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')

                else:
                    StartDate = CreatedDate
        # End date
                
                closed_date_str = task['closedDate']
                end_date_plan = task['endDatePlan']

                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                    EndDate = endDatePlan
                    DateAccuracy = "Accurate Date"

                elif closed_date_str:
                    EndDate = datetime.strptime(closed_date_str, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                elif deadline:
                    EndDate = datetime.strptime(deadline, '%Y-%m-%dT%H:%M:%S%z').strftime('%Y-%m-%d')
                    DateAccuracy = "Accurate Date"

                else:
                    EndDate = None
                    DateAccuracy = "Inaccurate Date"

        # start_plan_date

                if start_date_plan:
                    startDatePlan = datetime.strptime(start_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    startDatePlan = None

        # End_date_plan                
                
                if end_date_plan:
                    endDatePlan = datetime.strptime(end_date_plan, "%Y-%m-%dT%H:%M:%S%z").strftime('%Y-%m-%d')
                else:
                    endDatePlan = None
                
                
        # Task_status               
                status = task['status']
                substatus = task['subStatus']
                if substatus == '-1':
                    task_status = "Overdue"
                elif status == '5':
                    task_status = "Completed"   
                elif status == '3':
                    task_status = "Active"
                elif status == '1':
                    task_status ="New"
                elif status == '4':
                    task_status ="Supposedly completed"
                elif status == '6':
                    task_status ="Deferred"
                elif status == '7':
                    task_status ="Declined"
                # elif deadline is not None:
                #     deadline_date = parser.parse(deadline)
                #     if deadline_date < current_datetime:
                #         task_status = "Overdue"
                #     elif status == '2':
                #         task_status ="Pending"
                elif status == '2':
                    task_status ="Pending"


                total_comments_count = task['commentsCount']
                service_comment_count = task['serviceCommentsCount']
                if total_comments_count and service_comment_count:
                    user_comments_count =int(total_comments_count) - int(service_comment_count)
                else:
                    user_comments_count =None    
        # Retrieving comments
                comment_params = {'taskId': task_id}
                comment_list = bx24.get_all('tasks.task.result.list', comment_params)
                # if comment_list:
                #     first_comment = comment_list[0]
                #     Comments = first_comment['text']
                # else:
                #     Comments = None
                comment_list_data = []
                for comment in comment_list:
                    createdby_id = comment['createdBy']
                    summary = comment['text']
                    comment_date = comment['createdAt']
                    datetime_obj = datetime.strptime(comment_date, '%Y-%m-%dT%H:%M:%S%z')
                    comment_formatted_date = datetime_obj.strftime('%Y-%m-%d')
                    User_params = {"filter": {"ID": createdby_id}}
                    user_method = bx24.get_all('user.get', User_params)
                    if user_method:
                        user = user_method[0]
                        first_name = user.get('NAME', '')
                        last_name = user.get('LAST_NAME', '')

                    comment_list_data.append({
                        "Comment_Createdby": first_name + " " + last_name,
                        "Comment": summary,
                        "Comment_Date": comment_formatted_date,})
               
                
                task_info.append({
                "Task": task_name,
                "Task_Id":task_id,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Comments_count": user_comments_count,
                "TaskStatus":task_status,
                "StartDatePlan":startDatePlan,
                "EndDatePlan":endDatePlan,
                "CreatedDate":CreatedDate,
                "DateAccuracy":DateAccuracy,
                "Deadline":Deadline,
                "GroupName":group_name,
                "CommentData":comment_list_data,
                })

            # Append user data to the list
            user_data_list.append({
            "Name": name,
            "Department": department,
            'Tasks': task_info
            })

        json_data = json.dumps({"--project_chart--": user_data_list})
        print(json_data)
    return HttpResponse(json_data)



