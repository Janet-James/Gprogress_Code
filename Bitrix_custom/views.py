from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.db import connection
import json
from django.http import HttpResponse, HttpResponseServerError 
from django.views.decorators.csrf import csrf_exempt
from bitrix24 import *
from fast_bitrix24 import Bitrix
from datetime import datetime
import pytz 
from datetime import timedelta
import pandas as pd
import re
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Image
from reportlab.lib import colors
from django.contrib.staticfiles import finders
import os
from django.core.files.storage import FileSystemStorage
# from xhtml2pdf import pisa 
import xhtml2pdf.pisa as pisa
import jinja2

now = datetime.now()
current_datetime = now.strftime("%d%b%Y_%H:%M:%S_%f")[:-3]

print("DATREEEEEEEEEEE,,,,,",current_datetime)

def dictfetchall(cursor):
    "Returns all rows from a cursor as a dictionary."
    """
            Returns all rows from a cursor as a dictionary
            @param cursor:cursor object
            @return: dictionary contains the details fetch from the cursor object
            @rtype: dictionary
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]

class IndexView(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        return super(IndexView, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'tasks.index.html'
        else:
            template_name = 'login.html'
        return [template_name]

    def get(self, request, *args, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
        params = {"select": [ 'ID', 'NAME' ]}
        project_options = bx24.get_all('socialnetwork.api.workgroup.list', params)
        print("projecttttt oprions",project_options)    
        if project_options:
            project_options = project_options
        else:
            project_options = []
        context['project_options'] = project_options        
        return self.render_to_response(context)

class Task_list(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        return super(Task_list, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'project_list.html'
        else:
            template_name = 'login.html'
        return [template_name]

    def get(self, request, *args, **kwargs):
        context = super(Task_list, self).get_context_data(**kwargs)
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
        params = {"select": [ 'ID', 'NAME' ]}
        project_options = bx24.get_all('socialnetwork.api.workgroup.list', params) 
        if project_options:
            project_options = project_options
        else:
            project_options = [] 
        context['project_options'] = project_options
        return self.render_to_response(context)

class TaskReport(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        return super(TaskReport, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'TaskReport.html'
        else:
            template_name = 'login.html'
        return [template_name]

    def get(self, request, *args, **kwargs):
        context = super(TaskReport, self).get_context_data(**kwargs)
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
        params = {"FILTER": {'ACTIVE':True}}
        employee_data = bx24.get_all('user.get', params)
        employee_data.sort(key = lambda d: (d['NAME']))
        employee =  [{"Id":d["ID"],"Name": d["NAME"] + " " + d["LAST_NAME"]} for d in employee_data]
        print("projecttttt oprions",employee)    
        if employee:
            employee = employee
        else:
            employee = []
        context['employee'] = employee        
        return self.render_to_response(context)

        
@csrf_exempt
def main_task(request):
    post = request.POST
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
    if post:
        group_id = request.POST.get('selectedValue')              
        filter_params = {"filter":{"GROUP_ID":group_id,"!UF_AUTO_568791689340": "None"},"select": ['ID','TITLE','GROUP_ID','START_DATE_PLAN','END_DATE_PLAN','DEADLINE','STATUS','UF_AUTO_568791689340','CREATED_DATE']}
        task_dropdown = bx24.get_all('tasks.task.list', filter_params)
        task_dropdown.sort(key = lambda d: (d['title']))
        json_data['data'] = task_dropdown
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def child_task(request):
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
    if post:
        sub_tasks = request.POST.get('child_dropdown')
        sort_type= request.POST.get('sort_type')
        child_params = {"filter":{"PARENT_ID": sub_tasks},"select": ['ID','TITLE','UF_AUTO_568791689340','CREATED_DATE']}                        
        child_tasks = bx24.get_all('tasks.task.list',child_params)
        child_tasks.sort(key = lambda d: (d[sort_type]))
        json_data['data'] = child_tasks
    return HttpResponse(json.dumps(json_data))  

@csrf_exempt
def task_info(request):
    json_data = {}
    post = request.POST
    if post:
        project_id = request.POST.get('project_id')
        print("project_id ---------: ", project_id)
    # bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
    b = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
    filter_params = {
    "filter":{"GROUP_ID": project_id,"!STATUS": 5},"select": ['ID','TITLE','START_DATE_PLAN','END_DATE_PLAN','DEADLINE','STATUS','UF_AUTO_568791689340','UF_AUTO_460562949421','SUBORDINATE','PARENT_ID']
    }
    taskList=b.get_all('tasks.task.list', filter_params)
    print(taskList)
    deadline_list=[]
    for li in taskList:
        deadline_dict={}
        item_id = li["id"]
        title = li["title"]
        deadline_dict['taskId']=item_id
        print(item_id, title,li['startDatePlan'],li['endDatePlan'],li['deadline'],li['ufAuto460562949421'])
        if li['endDatePlan']!=None:
            EndDate=datetime.strptime(li['endDatePlan'],"%Y-%m-%dT%H:%M:%S%z")
            if li['ufAuto460562949421']!=None:
                deadline=EndDate + timedelta(days=int(li['ufAuto460562949421']))
                formatted_deadline = deadline.strftime("%Y-%m-%d %H:%M")
                # update=c.callMethod('tasks.task.update',id= item_id, fields= {"DEADLINE": formatted_deadline} )
                # deadline_dict['ID']=item_id
                deadline_dict['fields']={'DEADLINE':formatted_deadline}
            else:
                formatted_enddate=EndDate.strftime("%Y-%m-%d %H:%M")
                # update=c.callMethod('tasks.task.update',id= item_id, fields= {"DEADLINE": formatted_enddate} )
                # deadline_dict['ID']=item_id
                deadline_dict['fields']={'DEADLINE':formatted_enddate}
            deadline_list.append(deadline_dict)
    # tasks = [
    #     {
    #         'taskId': d['ID'],
    #         'fields': {
    #             'DEADLINE': d['DEADLINE']
    #         }
    #     }
    #     for d in deadline_list
    # ]
    print(deadline_list)
    try:
        taskCall=b.call('tasks.task.update', deadline_list)
        json_data['Status']="GD-001"
        json_data["Message"]="Task Deadline Updated"
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(e.args[0])
        json_data['Status']="ERROR"
        json_data["Message"]="An Unexpected Error Occurred. Please Check the Project Dates in Bitrix"

    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def taskSequenceUpdate(request):
    json_data = {}
    post = request.POST    
    b = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
    if post:       
        task = request.POST.get('task_detail') 
        task_detail = json.loads(task)               
        print(task_detail)
        task_list=[]
        for i in task_detail:
            task_dict={}
            task_dict['taskId'] = i['task_id']
            title = i['task_title'].split('_')
            print(is_matching_number_pattern(title[0]))
            sequence_check=is_matching_number_pattern(title[0])
            print("TITLE1---------",title[0])
            print("TITLE2---------","_".join(title[1:]))
            remaining_title="_".join(title[1:])
            if sequence_check:
                # sequence_title = str(i['sequence']) +'_'+ title[1]
                sequence_title = str(i['sequence']) +'_'+ remaining_title
            else:
                sequence_title = str(i['sequence']) +'_'+ i['task_title']
            print(sequence_title)
            task_dict['fields']={'TITLE':sequence_title}
            task_list.append(task_dict)
    try:
        taskCall=b.call('tasks.task.update', task_list)
        json_data['Status']="GD-001"
        json_data["Message"]="Task Sequence Updated"
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(e.args[0])
        json_data['Status']="ERROR"
        json_data["Message"]="An Unexpected Error Occurred. Please Check with Admin"

    return HttpResponse(json.dumps(json_data))


def is_matching_number_pattern(s):
    pattern = r'^(\d+(\.\d+)*)$'
    return re.match(pattern, s) is not None

@csrf_exempt
def EmployeeTaskList(request):
    post = request.POST
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/58/5sni2jcl01fbh3io/')
    if post:
        employee_id = request.POST.get('selectedValue')    
        employee_name=request.POST.get('employee_name')
        status=request.POST.get('task_status')    
        download_type=request.POST.get('download_type')
        # filter_params = {"filter":{"RESPONSIBLE_ID":employee_id}}
        task_fields = bx24.get_all('tasks.task.getFields')
        print("STATUS______________",status)
        if status=="all":
            filter_params = {"filter":{"RESPONSIBLE_ID":employee_id},"select": ['ID','TITLE','CREATED_DATE','START_DATE_PLAN','END_DATE_PLAN','STATUS','REAL_STATUS','DATE_START','STAGE_ID','COMMENTS_COUNT','DEADLINE','STATUS','CLOSED_BY','CLOSED_DATE','CREATED_BY','RESPONSIBLE_ID']}
        else:
            filter_params = {"filter":{"RESPONSIBLE_ID":employee_id,"STATUS":status},"select": ['ID','TITLE','CREATED_DATE','START_DATE_PLAN','END_DATE_PLAN','STATUS','REAL_STATUS','DATE_START','STAGE_ID','COMMENTS_COUNT','DEADLINE','STATUS','CLOSED_BY','CLOSED_DATE','CREATED_BY','RESPONSIBLE_ID']}
        task_dropdown = bx24.get_all('tasks.task.list', filter_params)
        task_dropdown.sort(key = lambda d: (d['title']))
        # print(task_dropdown)
        date_format = "%Y-%m-%dT%H:%M:%S%z"
        tasks = [
                {
                    'no':  i + 1,
                    'task_id': d['id'],
                    'title': d['title'],
                    'createdDate': datetime.strptime(d['createdDate'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['createdDate'] else None,
                    'startDatePlan': datetime.strptime(d['startDatePlan'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['startDatePlan'] else None,
                    'endDatePlan': datetime.strptime(d['endDatePlan'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['endDatePlan'] else None,
                    'deadline':datetime.strptime(d['deadline'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['deadline'] else None,
                    'dateStart': datetime.strptime(d['dateStart'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['dateStart'] else None,
                    'closedDate':datetime.strptime(d['closedDate'], date_format).strftime("%d-%b-%Y %I:%M %p") if d['closedDate'] else None,
                    'responsible':d['responsible']['name'],
                    'createdBy':d['creator']['name'],
                    'status': 'Task Almost Overdue' if d.get('status') == '-3' else
                        'Task Not Viewed' if d.get('status') == '-2' else
                        'Overdue Task' if d.get('status') == '-1' else 
                        'New' if d.get('status') == '1' else 
                        'Pending' if d.get('status') == '2' else 
                        'In Progress' if d.get('status') == '3' else 
                        'Supposedly Completed' if d.get('status') == '4' else 
                        'Completed' if d.get('status') == '5' else 
                        'Deffered' if d.get('status') == '6' else 
                        'Declined' if d.get('status') == '7' else d.get('status'),
                    # 'subStatus': d['subStatus'],
                }
                for i, d in enumerate(task_dropdown)
                ]
        
        print(tasks)  
        
        if download_type=='pdf':
            file_name=taskGeneratePDFReport(tasks,employee_name)
            json_data['file_name']=file_name
            json_data['status'] = 'Task PDF Report Generated' 
        elif download_type=='excel':
            file_name=taskGenerateExcelReport(tasks,employee_name)
            json_data['file_name']=file_name
            json_data['status'] = 'Task Excel Report Generated' 
        else:
            json_data['status'] = 'Task Retrieved'  
            json_data['data'] = tasks
    return HttpResponse(json.dumps(json_data))

def taskGenerateExcelReport(tasks,employee_name):
    df =  pd.DataFrame(tasks)
    # Define the Excel file path
    file_name='GL_Task_Report_of_'+employee_name+str(current_datetime)+'.xlsx'
    excel_file_path = '/var/www/gpros/.gprogress/Task_Report/'+file_name
    # Save the DataFrame to an Excel file
    df.to_excel(excel_file_path, index=False)
    print(f'Data saved to {excel_file_path}')
    return file_name

def taskGeneratePDFReport(tasks,employee_name):
    data=tasks
    print(current_datetime,employee_name)
    # Define the Excel file path
    file_name='GL_Task_Report_of_'+employee_name+str(current_datetime)+'.pdf'
    # Create a PDF document
    doc = SimpleDocTemplate('/var/www/gpros/.gprogress/Task_Report/'+file_name, pagesize=landscape(letter))
    templateLoader = jinja2.FileSystemLoader(searchpath="/var/www/gpros/GProgress/Bitrix_custom/templates")
    templateEnv = jinja2.Environment(loader=templateLoader)
    TEMPLATE_FILE = "TaskPDFReportGenerator.html"
    template = templateEnv.get_template(TEMPLATE_FILE)
    sourceHtml = template.render(data=data,responsible=employee_name)
    # Create the PDF file
    with open('/var/www/gpros/.gprogress/Task_Report/'+file_name, "wb") as resultFile:
        pisaStatus = pisa.CreatePDF(
            src=sourceHtml,
            dest=resultFile,
            encoding='utf-8'
        )
    # resultFile = open('/home/digitall/.gprogress/Task_Report/'+file_name, "w+b")
    # pisaStatus = pisa.CreatePDF(
    #         src=sourceHtml,            
    #         dest=resultFile)           
    # resultFile.close()
    print("PDF generated successfully.")
    return file_name
    
