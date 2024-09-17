from django.shortcuts import render
from fast_bitrix24 import Bitrix
import json
from django.http import HttpResponse
from django.views.generic.base import TemplateView
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response







# Create your views here.

class Service_Desk_Template_Load(TemplateView):
    def dispatch(self, request, *args, **kwargs):
        return super(Service_Desk_Template_Load, self).dispatch(request, *args, **kwargs)
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'service-desk-dashboard.html'
        # else:
        #     template_name = 'login.html'
        return [template_name]
    def get(self, request, *args, **kwargs):
        context = super(Service_Desk_Template_Load, self).get_context_data(**kwargs)
        return self.render_to_response(context)



def service_desk_dashboard(request):
    json_data = {}
    if request.method == 'GET':
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
        # Company Based List View
        company_list_response = bx24.get_all('crm.company.list')
        company_data_list = []
        for company_list in company_list_response:
            company_id = int(company_list['ID'])
            company_name = company_list['TITLE']
            if company_id == 2:
                company_data = {"company_id": company_id, "company_name": company_name}
                company_data_list.append(company_data)
            if company_id == 22:
                company_data = {"company_id": company_id, "company_name": company_name}
                company_data_list.append(company_data)
            if company_id == 20:
                company_data = {"company_id": company_id, "company_name": company_name}
                company_data_list.append(company_data)
            if company_id == 24:
                company_data = {"company_id": company_id, "company_name": company_name}
                company_data_list.append(company_data)
            if company_id == 692:
                company_data = {"company_id": company_id, "company_name": company_name}
                company_data_list.append(company_data)
        print("Company list ---- ", company_data_list)
        json_data.update({
            "company_list": company_data_list
        })
        return HttpResponse(json.dumps(json_data))

@csrf_exempt
def help_topic_details(request):
    print("================== HELP TOPIC =================")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
        if post:
            help_topic_id = post.get("help_topic_id")
            company_id = post.get("company_id")
            print("--- Help Topic Company ID --- ", company_id)
            # Service Desk
            params = {"entityTypeId": 133, "filter": {"ufCrm94_1693286572": help_topic_id, "mycompanyId": company_id}}
            help_topic_based_response = bx24.get_all('crm.item.list', params)
            # Help Topic Data Fetching Maintanence Issue
            helptopic_ticket_status_list = {
                "helptopic_opened_tickets": 0,
                "helptopic_answered_tickets": 0,
                "helptopic_resolved_tickets": 0,
                "helptopic_verified_tickets": 0,
                "helptopic_closed_tickets": 0,
                "helptopic_reopen_tickets": 0,
            }
            helptopic_critical_priority_status_count = {
                "helptopic_critical_priority_opened_ticket_count": 0,
                "helptopic_critical_priority_answered_ticket_count": 0,
                "helptopic_critical_priority_resolved_ticket_count": 0,
                "helptopic_critical_priority_verified_ticket_count": 0,
                "helptopic_critical_priority_closed_ticket_count": 0,
                "helptopic_critical_priority_reopen_ticket_count": 0,
            }
            helptopic_high_priority_status_count = {
                "helptopic_high_priority_opened_ticket_count": 0,
                "helptopic_high_priority_answered_ticket_count": 0,
                "helptopic_high_priority_resolved_ticket_count": 0,
                "helptopic_high_priority_verified_ticket_count": 0,
                "helptopic_high_priority_closed_ticket_count": 0,
                "helptopic_high_priority_reopen_ticket_count": 0,
            }
            helptopic_medium_priority_status_count = {
                "helptopic_medium_priority_opened_ticket_count": 0,
                "helptopic_medium_priority_answered_ticket_count": 0,
                "helptopic_medium_priority_resolved_ticket_count": 0,
                "helptopic_medium_priority_verified_ticket_count": 0,
                "helptopic_medium_priority_closed_ticket_count": 0,
                "helptopic_medium_priority_reopen_ticket_count": 0,
            }
            helptopic_low_priority_status_count = {
                "helptopic_low_priority_opened_ticket_count": 0,
                "helptopic_low_priority_answered_ticket_count": 0,
                "helptopic_low_priority_resolved_ticket_count": 0,
                "helptopic_low_priority_verified_ticket_count": 0,
                "helptopic_low_priority_closed_ticket_count": 0,
                "helptopic_low_priority_reopen_ticket_count": 0,
            }
            for item in help_topic_based_response:
                ticket_status = item['ufCrm94_1693454420002']          
                priority_status = item['ufCrm94_1693286652']
                # Help Topic Functionality Here
                if priority_status == 1862: # Critical
                    if ticket_status == 1850: # open
                        helptopic_critical_priority_status_count['helptopic_critical_priority_opened_ticket_count'] += 1                    
                    elif ticket_status == 1852: # answered
                        helptopic_critical_priority_status_count['helptopic_critical_priority_answered_ticket_count'] += 1
                    elif ticket_status == 1854: # resolved
                        helptopic_critical_priority_status_count['helptopic_critical_priority_resolved_ticket_count'] += 1
                    elif ticket_status == 1856: # verified
                        helptopic_critical_priority_status_count['helptopic_critical_priority_verified_ticket_count'] += 1
                    elif ticket_status == 1858: # closed
                        helptopic_critical_priority_status_count['helptopic_critical_priority_closed_ticket_count'] += 1
                    elif ticket_status == 1860: # reopen
                        helptopic_critical_priority_status_count['helptopic_critical_priority_reopen_ticket_count'] += 1
                elif priority_status == 1836: # High
                    if ticket_status == 1850: # open
                        helptopic_high_priority_status_count['helptopic_high_priority_opened_ticket_count'] += 1                    
                    elif ticket_status == 1852: # answered
                        helptopic_high_priority_status_count['helptopic_high_priority_answered_ticket_count'] += 1
                    elif ticket_status == 1854: # resolved
                        helptopic_high_priority_status_count['helptopic_high_priority_resolved_ticket_count'] += 1
                    elif ticket_status == 1856: # verified
                        helptopic_high_priority_status_count['helptopic_high_priority_verified_ticket_count'] += 1
                    elif ticket_status == 1858: # closed
                        helptopic_high_priority_status_count['helptopic_high_priority_closed_ticket_count'] += 1
                    elif ticket_status == 1860: # reopen
                        helptopic_high_priority_status_count['helptopic_high_priority_reopen_ticket_count'] += 1
                elif priority_status == 1838: # Medium
                    if ticket_status == 1850: # open
                        helptopic_medium_priority_status_count['helptopic_medium_priority_opened_ticket_count'] += 1                    
                    elif ticket_status == 1852: # answered
                        helptopic_medium_priority_status_count['helptopic_medium_priority_answered_ticket_count'] += 1
                    elif ticket_status == 1854: # resolved
                        helptopic_medium_priority_status_count['helptopic_medium_priority_resolved_ticket_count'] += 1
                    elif ticket_status == 1856: # verified
                        helptopic_medium_priority_status_count['helptopic_medium_priority_verified_ticket_count'] += 1
                    elif ticket_status == 1858: # closed
                        helptopic_medium_priority_status_count['helptopic_medium_priority_closed_ticket_count'] += 1
                    elif ticket_status == 1860: # reopen
                        helptopic_medium_priority_status_count['helptopic_medium_priority_reopen_ticket_count'] += 1
                elif priority_status == 1840: # Low
                    if ticket_status == 1850: # open
                        helptopic_low_priority_status_count['helptopic_low_priority_opened_ticket_count'] += 1                    
                    elif ticket_status == 1852: # answered
                        helptopic_low_priority_status_count['helptopic_low_priority_answered_ticket_count'] += 1
                    elif ticket_status == 1854: # resolved
                        helptopic_low_priority_status_count['helptopic_low_priority_resolved_ticket_count'] += 1
                    elif ticket_status == 1856: # verified
                        helptopic_low_priority_status_count['helptopic_low_priority_verified_ticket_count'] += 1
                    elif ticket_status == 1858: # closed
                        helptopic_low_priority_status_count['helptopic_low_priority_closed_ticket_count'] += 1
                    elif ticket_status == 1860: # reopen
                        helptopic_low_priority_status_count['helptopic_low_priority_reopen_ticket_count'] += 1
            json_data.update({
                "helptopic_ticket_status_list": helptopic_ticket_status_list,
                "helptopic_critical_priority_status_count": helptopic_critical_priority_status_count,
                "helptopic_high_priority_status_count": helptopic_high_priority_status_count,
                "helptopic_medium_priority_status_count": helptopic_medium_priority_status_count,
                "helptopic_low_priority_status_count": helptopic_low_priority_status_count
            })    
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# Company Based Details Get
@csrf_exempt
def company_based_details_get(request):
    print("----------------- vvvvvvvvv--------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
    try:
        if post:
            company_id = post.get('company_id')
            # Service Desk
            params = {"entityTypeId": 133,
                      "filter": {"mycompanyId": company_id}}
            tickets_status_based_response = bx24.get_all('crm.item.list', params)
            # Help Topic
            uni_list_params = {"IBLOCK_TYPE_ID": "lists",
                             "IBLOCK_ID": 180}
            uni_list_params_response = bx24.get_all('lists.element.get', uni_list_params)
            # Total Ticket Count
            ticket_status_counts = {
                "total_number_of_tickets": 0,
                "opened_tickets": 0,
                "answered_tickets": 0,
                "resolved_tickets": 0,
                "verified_tickets": 0,
                "closed_tickets": 0,
                "reopen_tickets": 0,
            }
            # Status Priority Based Tickets Count
            critical_priority = {
                "critical_priority_opened_ticket_status_count": 0,
                "critical_priority_answered_ticket_status_count": 0,
                "critical_priority_resolved_ticket_status_count": 0,
                "critical_priority_verified_ticket_status_count": 0,
                "critical_priority_closed_ticket_status_count": 0,
                "critical_priority_reopen_ticket_status_count": 0,
            }
            high_priority = {
                "high_priority_opened_ticket_status_count": 0,
                "high_priority_answered_ticket_status_count": 0,
                "high_priority_resolved_ticket_status_count": 0,
                "high_priority_verified_ticket_status_count": 0,
                "high_priority_closed_ticket_status_count": 0,
                "high_priority_reopen_ticket_status_count": 0,
            }
            medium_priority = {
                "medium_priority_opened_ticket_status_count": 0,
                "medium_priority_answered_ticket_status_count": 0,
                "medium_priority_resolved_ticket_status_count": 0,
                "medium_priority_verified_ticket_status_count": 0,
                "medium_priority_closed_ticket_status_count": 0,
                "medium_priority_reopen_ticket_status_count": 0,
            }
            low_priority = {
                "low_priority_opened_ticket_status_count": 0,
                "low_priority_answered_ticket_status_count": 0,
                "low_priority_resolved_ticket_status_count": 0,
                "low_priority_verified_ticket_status_count": 0,
                "low_priority_closed_ticket_status_count": 0,
                "low_priority_reopen_ticket_status_count": 0,
            }
            # Unresolved Tickets By Priority
            opened_ticket_priority_counts = {
                "opened_ticket_critical_priority": 0,
                "opened_ticket_high_priority": 0,
                "opened_ticket_medium_priority": 0,
                "opened_ticket_low_priority": 0,
            }
            answered_ticket_priority_counts = {
                "answered_ticket_critical_priority": 0,
                "answered_ticket_high_priority": 0,
                "answered_ticket_medium_priority": 0,
                "answered_ticket_low_priority": 0,
            }
            # Priority Based Ticket Counts
            priority_based_tickets_counts = {
                "total_tickets_in_critical_priority": 0,
                "total_tickets_in_high_priority": 0,
                "total_tickets_in_medium_priority": 0,
                "total_tickets_in_low_priority": 0,
            }
            open_ticket_service_req_source_count = {
                "request_from_email":0,
                "request_from_internal":0,
                "request_from_chat":0,
                "request_from_phone":0,
            }
            answered_ticket_service_req_source_count = {
                "request_from_email":0,
                "request_from_internal":0,
                "request_from_chat":0,
                "request_from_phone":0,
            }
            resolved_ticket_service_req_source_count = {
                "request_from_email":0,
                "request_from_internal":0,
                "request_from_chat":0,
                "request_from_phone":0,
            }
            verified_ticket_service_req_source_count = {
                "request_from_email":0,
                "request_from_internal":0,
                "request_from_chat":0,
                "request_from_phone":0,
            }
            todays_raised_total_ticket_count = {
                "todays_raised_total_ticket_count": 0
            }
            todays_created_ticket_status_count = {
                "todays_created_opened_ticket_status_count": 0,
                "todays_created_answered_ticket_status_count": 0,
                "todays_created_resolved_ticket_status_count": 0,
                "todays_created_verified_ticket_status_count": 0,
                "todays_created_closed_ticket_status_count": 0,
                "todays_created_reopen_ticket_status_count": 0,
            }
            yesterday_raised_total_ticket_count = {
                "yesterday_raised_total_ticket_count": 0
            }
            yesterday_created_ticket_status_count = {
                "yesterday_created_opened_ticket_status_count": 0,
                "yesterday_created_answered_ticket_status_count": 0,
                "yesterday_created_resolved_ticket_status_count": 0,
                "yesterday_created_verified_ticket_status_count": 0,
                "yesterday_created_closed_ticket_status_count": 0,
                "yesterday_created_reopen_ticket_status_count": 0,
            }
            customer_ratings_total_count = {
                "postive_rating_count": 0,
                "negative_rating_count": 0
            }
            current_date = datetime.now().date()
            yesterday_date = current_date - timedelta(days=1)
            # Serivce Desk - SPA
            for item_list in tickets_status_based_response:
                ticket_status = item_list['ufCrm94_1693454420002']
                priority_status = item_list['ufCrm94_1693286652']
                cteated_ticket_date = item_list['createdTime']
                deal_id = item_list['id']
                service_req_source = item_list['ufCrm94_1693993762348']
                customer_ratings = item_list['ufCrm94_1695731117311']
                # Total Tickets Count
                if deal_id:
                    ticket_status_counts["total_number_of_tickets"] += 1
                if ticket_status == 1850: # Opend
                    ticket_status_counts["opened_tickets"] += 1
                    if service_req_source == 1868:
                        open_ticket_service_req_source_count["request_from_email"] += 1
                    elif service_req_source == 1870:
                        open_ticket_service_req_source_count["request_from_internal"] += 1
                    elif service_req_source == 1872:
                        open_ticket_service_req_source_count["request_from_chat"] += 1
                    elif service_req_source == 1874:
                        open_ticket_service_req_source_count["request_from_phone"] += 1
                elif ticket_status == 1852: # Answered
                    ticket_status_counts["answered_tickets"] += 1
                    if service_req_source == 1868:
                        answered_ticket_service_req_source_count["request_from_email"] += 1
                    elif service_req_source == 1870:
                        answered_ticket_service_req_source_count["request_from_internal"] += 1
                    elif service_req_source == 1872:
                        answered_ticket_service_req_source_count["request_from_chat"] += 1
                    elif service_req_source == 1874:
                        answered_ticket_service_req_source_count["request_from_phone"] += 1
                elif ticket_status == 1854: # Resolved
                    ticket_status_counts["resolved_tickets"] += 1
                    if service_req_source == 1868:
                        resolved_ticket_service_req_source_count["request_from_email"] += 1
                    elif service_req_source == 1870:
                        resolved_ticket_service_req_source_count["request_from_internal"] += 1
                    elif service_req_source == 1872:
                        resolved_ticket_service_req_source_count["request_from_chat"] += 1
                    elif service_req_source == 1874:
                        resolved_ticket_service_req_source_count["request_from_phone"] += 1
                elif ticket_status == 1856: # Verified
                    ticket_status_counts["verified_tickets"] += 1
                    if service_req_source == 1868:
                        verified_ticket_service_req_source_count["request_from_email"] += 1
                    elif service_req_source == 1870:
                        verified_ticket_service_req_source_count["request_from_internal"] += 1
                    elif service_req_source == 1872:
                        verified_ticket_service_req_source_count["request_from_chat"] += 1
                    elif service_req_source == 1874:
                        verified_ticket_service_req_source_count["request_from_phone"] += 1
                elif ticket_status == 1858: # Closed
                    ticket_status_counts["closed_tickets"] += 1
                elif ticket_status == 1860: # Reopen
                    ticket_status_counts["reopen_tickets"] += 1
                # Status Priority Based Tickets Count
                elif priority_status == 1862: # Critical
                    priority_based_tickets_counts["total_tickets_in_critical_priority"] += 1
                    if ticket_status == 1850: # Opend
                        critical_priority["critical_priority_opened_ticket_status_count"] += 1
                    elif ticket_status == 1852: # Answered
                        critical_priority["critical_priority_answered_ticket_status_count"] += 1
                    elif ticket_status == 1854: # resolved
                        critical_priority["critical_priority_resolved_ticket_status_count"] += 1
                    elif ticket_status == 1856: # verified
                        critical_priority["critical_priority_verified_ticket_status_count"] += 1
                    elif ticket_status == 1858: # closed
                        critical_priority["critical_priority_closed_ticket_status_count"] += 1
                    elif ticket_status == 1860: # reopen
                        critical_priority["critical_priority_reopen_ticket_status_count"] += 1
                elif priority_status == 1836: # High
                    priority_based_tickets_counts["total_tickets_in_high_priority"] += 1
                    if ticket_status == 1850: # Opend
                        high_priority["high_priority_opened_ticket_status_count"] += 1
                    elif ticket_status == 1852: # Answered
                        high_priority["high_priority_answered_ticket_status_count"] += 1
                    elif ticket_status == 1854: # resolved
                        high_priority["high_priority_resolved_ticket_status_count"] += 1
                    elif ticket_status == 1856: # verified
                        high_priority["high_priority_verified_ticket_status_count"] += 1
                    elif ticket_status == 1858: # closed
                        high_priority["high_priority_closed_ticket_status_count"] += 1
                    elif ticket_status == 1860: # reopen
                        high_priority["high_priority_reopen_ticket_status_count"] += 1
                elif priority_status == 1838: # Medium
                    priority_based_tickets_counts["total_tickets_in_medium_priority"] += 1
                    if ticket_status == 1850: # Opend
                        medium_priority["medium_priority_opened_ticket_status_count"] += 1
                    elif ticket_status == 1852: # Answered
                        medium_priority["medium_priority_answered_ticket_status_count"] += 1
                    elif ticket_status == 1854: # resolved
                        medium_priority["medium_priority_resolved_ticket_status_count"] += 1
                    elif ticket_status == 1856: # verified
                        medium_priority["medium_priority_verified_ticket_status_count"] += 1
                    elif ticket_status == 1858: # closed
                        medium_priority["medium_priority_closed_ticket_status_count"] += 1
                    elif ticket_status == 1860: # reopen
                        medium_priority["medium_priority_reopen_ticket_status_count"] += 1
                elif priority_status == 1840: # Low
                    priority_based_tickets_counts["total_tickets_in_low_priority"] += 1
                    if ticket_status == 1850: # Opend
                        low_priority["low_priority_opened_ticket_status_count"] += 1
                    elif ticket_status == 1852: # Answered
                        low_priority["low_priority_answered_ticket_status_count"] += 1
                    elif ticket_status == 1854: # resolved
                        low_priority["low_priority_resolved_ticket_status_count"] += 1
                    elif ticket_status == 1856: # verified
                        low_priority["low_priority_verified_ticket_status_count"] += 1
                    elif ticket_status == 1858: # closed
                        low_priority["low_priority_closed_ticket_status_count"] += 1
                    elif ticket_status == 1860: # reopen
                        low_priority["low_priority_reopen_ticket_status_count"] += 1
                # Unresolved Tickets Count
                # Opened
                elif ticket_status == 1850 and priority_status == 1862: # Critical
                    opened_ticket_priority_counts["opened_ticket_critical_priority"] += 1
                elif ticket_status == 1850 and priority_status == 1836: # High
                    opened_ticket_priority_counts["opened_ticket_high_priority"] += 1
                elif ticket_status == 1850 and priority_status == 1838: # Medium
                    opened_ticket_priority_counts["opened_ticket_medium_priority"] += 1
                elif ticket_status == 1850 and priority_status == 1840: # Low
                    opened_ticket_priority_counts["opened_ticket_low_priority"] += 1
                # Answered Tickets
                elif ticket_status == 1852 and priority_status == 1862: # Critical
                    answered_ticket_priority_counts["answered_ticket_critical_priority"] += 1
                elif ticket_status == 1852 and priority_status == 1836: # High
                    answered_ticket_priority_counts["answered_ticket_high_priority"] += 1
                elif ticket_status == 1852 and priority_status == 1838: # Medium
                    answered_ticket_priority_counts["answered_ticket_medium_priority"] += 1
                elif ticket_status == 1852 and priority_status == 1840: # Low
                    answered_ticket_priority_counts["answered_ticket_low_priority"] += 1
                # Date Formation Calculation
                todays_created_ticket_str = cteated_ticket_date.split('T')[0]
                yesterday_created_ticket_str = cteated_ticket_date.split('T')[0]
                today_date_str = str(current_date)
                yesterday_date_str = str(yesterday_date)
                # Yesterday Tickets Raised Based Count
                if yesterday_created_ticket_str == yesterday_date_str:
                    yesterday_raised_total_ticket_count["yesterday_raised_total_ticket_count"] += 1
                    yesterday_generated_tickets_id = deal_id
                    params = {"entityTypeId": 133,
                             "filter": {"id": yesterday_generated_tickets_id}
                    }
                    yesterday_tickets_based_response = bx24.get_all('crm.item.list', params)
                    for lst_data in yesterday_tickets_based_response:
                        yesterday_ticket_status = lst_data['ufCrm94_1693454420002']
                        if yesterday_ticket_status == 1850: # opend
                            yesterday_created_ticket_status_count['yesterday_created_opened_ticket_status_count'] += 1
                        elif yesterday_ticket_status == 1852: # answered
                            yesterday_created_ticket_status_count['yesterday_created_answered_ticket_status_count'] += 1
                        elif yesterday_ticket_status == 1854: # resolved
                            yesterday_created_ticket_status_count['yesterday_created_resolved_ticket_status_count'] += 1
                        elif yesterday_ticket_status == 1856: # verified
                            yesterday_created_ticket_status_count['yesterday_created_verified_ticket_status_count'] += 1
                        elif yesterday_ticket_status == 1858: # closed
                            yesterday_created_ticket_status_count['yesterday_created_closed_ticket_status_count'] += 1
                        elif yesterday_ticket_status == 1860: # reopen
                            yesterday_created_ticket_status_count['yesterday_created_reopen_ticket_status_count'] += 1
                # Todays Tickets Raised Based Count
                elif todays_created_ticket_str == today_date_str:
                    todays_raised_total_ticket_count["todays_raised_total_ticket_count"] += 1
                    todays_generated_tickets_id = deal_id
                    params = {"entityTypeId": 133,
                             "filter": {"id": todays_generated_tickets_id}
                    }
                    todays_tickets_based_response = bx24.get_all('crm.item.list', params)
                    for lst_data in todays_tickets_based_response:
                        todays_ticket_status = lst_data['ufCrm94_1693454420002']
                        if todays_ticket_status == 1850: # opend
                            todays_created_ticket_status_count['todays_created_opened_ticket_status_count'] += 1
                        elif todays_ticket_status == 1852: # answered
                            todays_created_ticket_status_count['todays_created_answered_ticket_status_count'] += 1
                        elif todays_ticket_status == 1854: # resolved
                            todays_created_ticket_status_count['todays_created_resolved_ticket_status_count'] += 1
                        elif todays_ticket_status == 1856: # verified
                            todays_created_ticket_status_count['todays_created_verified_ticket_status_count'] += 1
                        elif todays_ticket_status == 1858: # closed
                            todays_created_ticket_status_count['todays_created_closed_ticket_status_count'] += 1
                        elif todays_ticket_status == 1860: # reopen
                            todays_created_ticket_status_count['todays_created_reopen_ticket_status_count'] += 1
                # Customer Rating
                if customer_ratings == 1908:
                    customer_ratings_total_count['postive_rating_count'] +=1
                elif customer_ratings == 1910:
                    customer_ratings_total_count['postive_rating_count'] +=1
                elif customer_ratings == 1912:
                    customer_ratings_total_count['postive_rating_count'] +=1
                elif customer_ratings == 1914:
                    customer_ratings_total_count['negative_rating_count'] +=1
                elif customer_ratings == 1916:
                    customer_ratings_total_count['negative_rating_count'] +=1
            # Create the help_topic_list dictionary
            help_topic_list = []
            # Universal Help Topic
            for uni_list in uni_list_params_response:
                uni_id = int(uni_list['ID'])
                help_topic_name = uni_list['NAME']
                # Add the values to the dictionary
                help_topic_data = {"list_id": uni_id, "name": help_topic_name}
                help_topic_list.append(help_topic_data)
            # OverDue
            over_due_params = {"entityTypeId":133,
                        "filter":{ "stageId":"DT133_284:UC_57W83N"}
                     }
            overdue_response_data = bx24.get_all('crm.item.list', over_due_params)
            overdue_item_total_count = 0
            for overdue in overdue_response_data:
                item_id = overdue['id']
                overdue_item_total_count += 1
            # Total Ticket Count & Status Priority Based Tickets Count & Unresolved Tickets Count By Priority
            # print("-- yesterday_raised_total_ticket_count -- ", yesterday_raised_total_ticket_count)
            # print("-- yesterday_created_ticket_status_count -- ", yesterday_created_ticket_status_count)
            # print("------------------------------------------------------------------------------------")
            # print("-- todays_raised_total_ticket_count -- ", todays_raised_total_ticket_count)
            # print("-- todays_created_ticket_status_count -- ", todays_created_ticket_status_count)
            print("--- customer_ratings_total_count --- ", customer_ratings_total_count)
            json_data.update({
                "ticket_status_counts": ticket_status_counts,
                "critical_priority": critical_priority,
                "high_priority": high_priority,
                "medium_priority": medium_priority,
                "low_priority": low_priority,
                "priority_based_total_tickets_counts": priority_based_tickets_counts,
                "yesterday_raised_total_ticket_count": yesterday_raised_total_ticket_count,
                "todays_raised_total_ticket_count": todays_raised_total_ticket_count,
                "help_topic_list": help_topic_list,
                "yesterday_created_ticket_status_count": yesterday_created_ticket_status_count,
                "todays_created_ticket_status_count": todays_created_ticket_status_count,
                "overdue_item_total_count": overdue_item_total_count,
                "open_ticket_service_req_source_count": open_ticket_service_req_source_count,
                "answered_ticket_service_req_source_count": answered_ticket_service_req_source_count,
                "resolved_ticket_service_req_source_count": resolved_ticket_service_req_source_count,
                "verified_ticket_service_req_source_count": verified_ticket_service_req_source_count,
                "customer_ratings_total_count": customer_ratings_total_count
            })
    except Exception as e:
        print(str(e))
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def total_ticket_count_monthbased(request):
    print("================== Weekly total count =================")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
        if post:
            company_id = post.get('company_id')
            print("Company Id ---- ", company_id)
            # Get the current date
            current_date = datetime.now()
            first_day_of_month = current_date.replace(day=1)
            last_day_of_month = (first_day_of_month + timedelta(days=32)).replace(day=1) - timedelta(days=1)
            print("last_day_of_month ----- ",last_day_of_month)
            # Define the ticket status codes
            ticket_status_codes = [1850, 1852, 1854, 1856, 1858, 1860]
            weekly_ticket_status_counts = {} # Initialize the dictionary
            for status_code in ticket_status_codes:
                weekly_ticket_status_counts[f'total_{status_code}_ticket_status_count'] = {}
            current_week_start = first_day_of_month
            current_week_end = first_day_of_month + timedelta(days=6)
            week_number = 1 # Initialize the week number
            result_json = {
                "total_ticket_status_count": {
                    "open": {},
                    "answered": {},
                    "resolved": {},
                    "verified": {},
                    "closed": {},
                    "reopen": {}
                }
            }
            while current_week_start <= last_day_of_month:
                # Define a filter for tickets within the current week
                filter = {
                    ">createdTime": current_week_start.isoformat(),
                    "<createdTime": current_week_end.isoformat(),
                    "mycompanyId": company_id
                }
                params = {
                    "entityTypeId": 133,
                    "filter": filter
                }
                ticket_list = bx24.get_all('crm.item.list', params)
                # Calculate the ticket status counts for the current week
                for status_code in ticket_status_codes:
                    status_count_key = f'total_{status_code}_ticket_status_count'
                    status_count = 0
                    for ticket in ticket_list:
                        if ticket['ufCrm94_1693454420002'] == status_code:
                            status_count += 1
                    weekly_ticket_status_counts[status_count_key][f'week{week_number}'] = status_count
                # Move to the next week and increment the week number
                current_week_start += timedelta(days=7)
                current_week_end += timedelta(days=7)
                week_number += 1
            # Update the JSON data with weekly counts
            result_json["total_ticket_status_count"]["open"] = weekly_ticket_status_counts["total_1850_ticket_status_count"]
            result_json["total_ticket_status_count"]["answered"] = weekly_ticket_status_counts["total_1852_ticket_status_count"]
            result_json["total_ticket_status_count"]["resolved"] = weekly_ticket_status_counts["total_1854_ticket_status_count"]
            result_json["total_ticket_status_count"]["verified"] = weekly_ticket_status_counts["total_1856_ticket_status_count"]
            result_json["total_ticket_status_count"]["closed"] = weekly_ticket_status_counts["total_1858_ticket_status_count"]
            result_json["total_ticket_status_count"]["reopen"] = weekly_ticket_status_counts["total_1860_ticket_status_count"]
            # Update the JSON data
            json_data.update(result_json)
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))


