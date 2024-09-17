from django.shortcuts import render
from fast_bitrix24 import Bitrix
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import TemplateView
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from django import template
from django.template.loader import get_template 
from django.template.response import TemplateResponse
from django.http import JsonResponse
from django.utils import timezone
import pytz



class Get_Client_Verification(APIView):
    def get(self, request, entityTypeId, id,format=None):
        if request.method == "GET":
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            params = {
                "entityTypeId": entityTypeId,
                "filter":{"id": id}        
            }
            ticket_list = bx24.get_all('crm.item.list', params)
            company_list_params = {"select":["ID", "TITLE" ]}
            company_list_response = bx24.get_all('crm.company.list', company_list_params)
            universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 108
            }
            project_list_response = bx24.get_all('lists.element.get', universal_list)
            client_verification_list = []
            company_list = [] 
            project_list = []
            for lst in ticket_list:
                item_id=lst['id']
                status_id = lst['ufCrm94_1693454420002']
                title =lst['title']
                client_name=lst['companyId']
                client_representative=lst['ufCrm94_1694254376554']
                reported_on=lst['ufCrm94_1694583394392']
                answered_on=lst['ufCrm94_1694693956']
                resolved_on=lst['ufCrm94_1694691339851']
                issue_title=lst['ufCrm94_1693286605']
                issue_description=lst['ufCrm94_1693470985532']
                project_site=lst['ufCrm94_1694523310']
                priority_id=lst['ufCrm94_1693286652']
                if status_id==1850:
                    status_id=='open'
                if status_id == 1852:
                    status_id=='answered'
                if status_id == 1854:
                    status_id =='resolved'
                if status_id == 1856:
                    status_id == 'verified'
                if status_id == 1858:
                    status_id == 'closed'
                if status_id == 1860:
                    status_id == 'reopen'
                if priority_id ==1836:
                    priority_id =='High'
                if priority_id == 1840:
                    priority_id == 'Low'
                if priority_id == 1862:
                    priority_id == 'Critical'    
                if priority_id == 1838:
                    priority_id == 'Medium'  
                    
                for comp_lst in company_list_response:
                    company_id = comp_lst['ID']
                    company_name = comp_lst['TITLE']

                    client_company_data = {    
                        "company_id": company_id,
                        "company_name": company_name,
                    }
                    company_list.append(client_company_data)
                
                for proj_lst in project_list_response:
                    project_id = proj_lst['ID']
                    project_name = proj_lst['NAME']
                    project_code_dict =proj_lst['PROPERTY_766']
                    project_code = next(iter(project_code_dict.values()))
                    project_data = {    
                        "project_id": project_id,
                        "project_name": project_name,
                        "project_code":project_code

                    }
                    project_list.append(project_data)
                      
                response = {"item_id": item_id,
                            "status": status_id,
                            "title": title,
                            "client_name":client_name,
                            "client_representative": client_representative,
                            "reported_on": reported_on,
                            "answered_on": answered_on,
                            "resolved_on":resolved_on,
                            "issue_title":issue_title,
                            "issue_description":issue_description,
                            "project_site":project_site,
                            "priority":priority_id,
                            "company_name_list": company_list,
                            "project_list": project_list}
                client_verification_list.append(response)

            response_data = {
            'client_verification_list': client_verification_list
            }
            if request.GET.get('format') == 'json':
                return JsonResponse(response_data)
            print("response_data-------------",response_data)

            template = get_template('servicedesk_client_verification.html')
            context = {'response_data': response_data}
            return TemplateResponse(request, template, context)
       

@csrf_exempt
def Update_Client_Verification(request):
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            verified_person_name = post.get("verified_person_name")
            customer_issue = post.get("customer_issue")
            customer_feedback = post.get("customer_feedback")
            customer_ratings = post.get("customer_ratings")
            entityTypeId = post.get("entityTypeId")
            item_id = int(post.get("item_id"))
            verified_source=post.get("verified_source")                                            
            browser_date = post.get("date")
            timezone_offset = post.get("timezoneOffset")
            browserTimezone=post.get("browserTimezone")
            browser_datetime = datetime.fromisoformat(browser_date[:-1])
            desired_timezone = pytz.timezone(browserTimezone)
            browser_datetime = browser_datetime.astimezone(desired_timezone)
            verified_on = browser_datetime.strftime("%Y-%m-%d %I:%M:%S %p")
            print("---- verified_on ----",verified_on)
            
            params = {
                "entityTypeId": 133,
                "filter":{"stageId": "DT133_284:UC_OBFKZC"}        
            }
            verified_ticket_list = bx24.get_all('crm.item.list', params)
            item_already_verified = False;
            for i in verified_ticket_list:
                verified_item_id=int(i['id'] )
                if item_id == verified_item_id:
                    item_already_verified = True
                    break                                
            if item_already_verified:
                print("alreadyyyyy verified")
                json_data['Code'] = "002"
                json_data['Message'] = "Already Verified" 
                               
            else:
                service_desk_item_update = {
                                "entityTypeId":entityTypeId,
                                "id":item_id,
                                "fields": {
                                    "stageId": "DT133_284:UC_OBFKZC",
                                    "ufCrm94_1694691361658":verified_on,
                                    "ufCrm94_1695791093": verified_person_name,
                                    "ufCrm94_1695890155": customer_feedback  ,
                                    "ufCrm94_1695731117311": customer_ratings,
                                    "ufCrm94_1696393644": customer_issue,
                                    "ufCrm94_1695727493621" :   verified_source
                                }
                            }
                service_desk_updated_response = bx24.get_all('crm.item.update', service_desk_item_update)   
                
                if service_desk_updated_response:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Updated Successfully" 
                        
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))
       
