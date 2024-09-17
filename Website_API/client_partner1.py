import random
from fast_bitrix24 import Bitrix
import json
from bitrix24 import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.template.loader import get_template
from django.template.response import TemplateResponse
from django.http import HttpResponse, JsonResponse
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime, timezone, timedelta
import secrets
import string
import pytz
import numpy_financial as npf
import numpy as np
import http.client
import hashlib
from dateutil import parser
from forex_python.converter import CurrencyRates
import requests
import psycopg2
import base64

# ---- Service Call Log ----
@csrf_exempt
def submit_service_call_log(request):
    print("--- SERVICE CALL ---")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            service_call_date_split = post.get('current_date_time')
            service_call_date_time = service_call_date_split.split(' GMT')[0]
            service_call_title = post.get('service_call_title')
            serivce_call_site_location = post.get('serivce_call_site_location')
            client_company_id = post.get('client_company_id')
            service_call_raisedBy = post.get('service_call_raisedBy')
            service_call_issues = post.get('service_call_issues')
            service_call_priority = post.get('service_call_priority')
            service_call_description = post.get('service_call_description')
            service_call_document = post.get('service_call_document[]')
            client_email_id = post.get('client_email_id')
            client_id = post.get('client_id')
            # --- To GET a Solar Project ID
            project_params = {"entityTypeId": 177,"filter": {"title": serivce_call_site_location}, "select": ["ID"]}
            project_data = bx24.get_all('crm.item.list',project_params)
            project_id = project_data[0]['id']
            service_call_params = {"entityTypeId":182,
                 "fields": {
                     "categoryId":346,
                     "stageId": "DT182_346:NEW",
                     "ufCrm118_1707465258":service_call_date_time,
                     "ufCrm118_1701834775": service_call_title,
                     "ufCrm118_1701920231": serivce_call_site_location,
                     "ufCrm118_1701834912": service_call_raisedBy,
                     "ufCrm118_1705559361": service_call_issues,
                     "ufCrm118_1701835282": service_call_priority,
                     "ufCrm118_1701835447": service_call_description,
                     "ufCrm118_1701835212": service_call_document,
                     "companyId": client_company_id,
                     "contactId": client_id,
                     "ufCrm118_1701926001": project_id,
                     "ufCrm118_1705550043": client_email_id,
                     "ufCrm118_1701920231": serivce_call_site_location,
                     "mycompanyId": 24,
                     # ufCrm118_1707298092 - Related Document Link
                 }
            }
            service_call_reponse = bx24.get_all('crm.item.add', service_call_params)
            if service_call_reponse:
                json_data['Code'] = "001"
                json_data['Message'] = "Created Success"
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Faild to Sent"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))


# --- Service Request --- 
@csrf_exempt
def submit_service_request(request):
    print("--- SERVICE REQUEST --- ")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            service_request_date_split = post.get('current_date_time')
            service_request_date_time = service_request_date_split.split(' GMT')[0]
            print("date_time", service_request_date_time)
            service_req_common_service = post.get('service_req_common_service')
            service_request_type = post.get('service_request_type')
            service_req_priority = post.get('service_req_priority')
            service_request_site_location = post.get('service_request_site_location')
            preferred_date = post.get('preferred_date')
            client_company_id = post.get('client_company_id')
            client_id = post.get('client_id')
            request_person_name = post.get('request_person_name')
            request_person_email = post.get('request_person_email')
            request_person_contact_no = post.get('request_person_contact_no')
            service_request_description = post.get('service_request_description')
            service_req_document_upload = post.get('service_req_document_upload[]')
            # --- To GET a Solar Project ID
            project_params = {"entityTypeId": 177,"filter": {"title": service_request_site_location}, "select": ["ID"]}
            project_data = bx24.get_all('crm.item.list',project_params)
            project_id = project_data[0]['id']
            service_request_params = {"entityTypeId":182,
                 "fields": {
                     "categoryId":350,
                     "stageId": "DT182_350:NEW",
                     "ufCrm118_1702269704": service_req_common_service,
                     "ufCrm118_1705559361": service_request_type,
                     "ufCrm118_1705643511": service_req_priority,
                     "ufCrm118_1702267936": preferred_date,
                     "ufCrm118_1702268012": request_person_name,
                     "ufCrm118_1702268031": request_person_email,
                     "ufCrm118_1702268053": request_person_contact_no,
                     "ufCrm118_1702268125": service_req_document_upload,
                     "contactId": client_id,
                     "ufCrm118_1702268093": service_request_description,
                     "companyId": client_company_id,
                     "ufCrm118_1701926001": project_id,
                     "mycompanyId": 22,
                     "ufCrm118_1707467515":service_request_date_time
                 }
            }
            service_request_reponse = bx24.get_all('crm.item.add', service_request_params)
            if service_request_reponse:
                json_data['Code'] = "001"
                json_data['Message'] = "Created Success"
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Faild to Sent"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))


# ---- Customer Chat Add to Bitrix ----
@csrf_exempt
def customer_chat_box(request):
    print("--- Talk To US --- ")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            client_id = post.get('client_id')
            company_id = post.get('company_id')
            customer_message = post.get('customer_message')
            chat_date_split = post.get('chat_date')
            chat_date_time = chat_date_split.split(' GMT')[0]
            print("chat_date_time",chat_date_time)
            source_of_meaasge = post.get('source_of_meaasge')
            client_name = post.get('client_name')
            client_email_id = post.get('client_email_id')
            chat_params = {'entityTypeId': 182,
                    "fields": {
                        "categoryId":348,
                        "stageId": "DT182_348:NEW",
                        "ufCrm118_1702285549": customer_message,
                        "ufCrm118_1702285616": source_of_meaasge,
                        "ufCrm118_1702285560": chat_date_time,
                        "contactId": client_id,
                        "companyId": company_id,
                        }
                    }
            chat_append_result = bx24.get_all('crm.item.add', chat_params)
            # chat_item_id = chat_append_result['item']['id']
            entityTypeId = chat_append_result['item']['entityTypeId']
            # customer_id = chat_append_result['item']['ContactId']
            mail_receipient_list_params = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 188,
            "ELEMENT_ID": 19970
            }
            mail_recipient_response = bx24.get_all('lists.element.get', mail_receipient_list_params)
            for uni_list in mail_recipient_response:
                receipient_persons_universal_id = uni_list["PROPERTY_1162"]
                cc_persons_universal_id=uni_list["PROPERTY_1164"]
                
            receipient_persons_list=[]
            cc_receipient_list=[]
            for receipient_persons_id in receipient_persons_universal_id.values():
                receipient_persons_user_id = int(receipient_persons_id)
                receipient_users_list = bx24.get_all('user.get',{"ID": receipient_persons_user_id})
                receipient_persons_email_id = receipient_users_list[0]['EMAIL']
                receipient_persons_list.append(receipient_persons_email_id)
                for cc_persons in cc_persons_universal_id.values():
                    cc_person_user_id=int(cc_persons)
                    cc_users_list = bx24.get_all('user.get',{"ID": cc_person_user_id})
                    cc_persons_email_id = cc_users_list[0]['EMAIL']
                    cc_receipient_list.append(cc_persons_email_id)
            # print("-----------------receipient_persons_list",receipient_persons_list)
            # print("-----------------cc_receipient_list",cc_receipient_list)              
            
            customer_chat_link = f"https://gprogress.green.com.pg/client/message/reply/{entityTypeId}/{client_id}/{company_id}/"
            html_body = f"""
            <html>
            <body style="font-family: sans-serif;">
            <div style="background-color: #f6faff; width: 100%; padding: 25px;">
            <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
            <table style="width: 100%; text-align: right;">
            <tr>
            <td>
            <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;" />
            </td>
            </tr>
            </table>
            <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
            <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
            <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear Team,</p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">We have received an urgent message from our client, {client_name}. The details of the message are as follows: </p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">
            <b>Client Name :</b> {client_name} <br>
            <b>Client Message :</b> {customer_message} <br>
            </p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Please review the client's concerns and respond promptly using the <a href="{customer_chat_link}">following link to reply</a>.Kindly ensure that all necessary actions are taken to address {client_name} inquiries or concerns.</p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Thank you for your attention to this matter,</p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Support Team</p>
            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;"><b>GREEN Limited</b></p>
            </div>
            <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
            <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;">Green Limited</p>
            </div>
            </div>
            </div>
            </div>
            </body>
            </html>
            """
            sender_email = 'digitaladmin@green.com.pg'
            sender_password = 'WinGREEN2024*'
            to_address = receipient_persons_list
            cc_address=cc_receipient_list
            bcc_address = ["janet.james@nexttechnosolutions.co.in"]
            subject = f'Immediate Attention Required: Reply to Client Message'
            message = MIMEMultipart()
            message['From'] = "GREEN Value Engineering"
            message['To'] = ",".join(to_address)
            message['Cc']=",".join(cc_address)
            message['Bcc'] = ",".join(bcc_address)
            message['Subject'] = subject
            for bcc_email in bcc_address:
                message['Bcc'] = bcc_email
            # Send the email
            try:
                body = MIMEText(html_body, 'html')
                message.attach(body)
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(message)
                server.quit()
                html_body = ''
                print("Email sent successfully!")
                html_body = ''
            except Exception as e:
                print("Email could not be sent. Error:", str(e))
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))


# ---- Message Replay ---- 
class Client_Message_Reply(APIView):
    def get(self, request, entityTypeId, client_id, company_id,format=None):
        if request.method == "GET":
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            chat_history_filter = {
            "entityTypeId": entityTypeId,
            "filter": {"contactId": client_id, "categoryId": 348}
        }
        client_chat_history = bx24.get_all('crm.item.list', chat_history_filter)
        print(" ---- ", client_chat_history)
        sent_messages = []
        paired_messages = []

        # Function to find the nearest sent message based on date
        def find_nearest_sent_message(replayed_date):
            nearest_sent_message = None
            min_time_difference = float('inf')

            for sent_message in sent_messages:
                sent_date = datetime.strptime(sent_message["date"], "%Y-%m-%dT%H:%M:%S%z")
                replayed_date_obj = datetime.strptime(replayed_date, "%Y-%m-%dT%H:%M:%S%z")

                time_difference = abs((sent_date - replayed_date_obj).total_seconds())
                if time_difference < min_time_difference:
                    nearest_sent_message = sent_message
                    min_time_difference = time_difference

            return nearest_sent_message

        # Iterate through client_chat_history
        for chat in client_chat_history:
            if chat.get('ufCrm118_1702285616') == 3396:  # Customer Sent Message
                client_message = chat.get('ufCrm118_1702285549')
                client_chat_date = chat.get('ufCrm118_1702285560')
                sent_messages.append({"message": client_message, "date": client_chat_date})
            elif chat.get('ufCrm118_1702285616') == 3398:  # Team Replayed Message
                replayed_message = chat.get('ufCrm118_1702285549')
                replayed_chat_date = chat.get('ufCrm118_1702285560')

                # Find the nearest sent message based on date
                nearest_sent_message = find_nearest_sent_message(replayed_chat_date)

                # Remove the found sent message from the list
                if nearest_sent_message:
                    sent_messages.remove(nearest_sent_message)

                # Pair sent and replayed messages
                paired_messages.append({
                    "sent_message": nearest_sent_message["message"] if nearest_sent_message["message"] else '',
                    "replayed_message": replayed_message if replayed_message else '',
                    "sent_date": nearest_sent_message["date"],
                    "replayed_date": replayed_chat_date if replayed_chat_date else ''
                })

        # Include unreplied messages
        unreplied_messages = [{"message": sent_message["message"], "date": sent_message["date"]} for sent_message in sent_messages]

        # Add unreplied messages to the paired_messages list
        for unreplied_message in unreplied_messages:
            paired_messages.append({
                "sent_message": unreplied_message["message"] if unreplied_message["message"] else '',
                "replayed_message": '',
                "sent_date": unreplied_message["date"],
                "replayed_date": ''
            })

        # Sort the paired_messages list based on sent_date in ascending order
        paired_messages.sort(key=lambda x: datetime.strptime(x["sent_date"], "%Y-%m-%dT%H:%M:%S%z") if x["sent_date"] else datetime.min)

        # Format the date
        today = datetime.now(timezone.utc).astimezone(timezone(timedelta(hours=3)))
        for message in paired_messages:
            for date_key in ["sent_date", "replayed_date"]:
                if message[date_key]:
                    date_value = datetime.strptime(message[date_key], "%Y-%m-%dT%H:%M:%S%z")
                    if date_key == "sent_date":
                        # Update sent_date
                        formatted_date = date_value.strftime("%b %d | %I:%M %p")
                        if date_value.date() == today.date():
                            message[date_key] = "Today | " + formatted_date.split("|")[1].strip()
                        else:
                            message[date_key] = formatted_date
                    elif date_key == "replayed_date":
                        # Update replayed_date
                        if date_value > today:
                            message[date_key] = "Today | " + date_value.strftime("%I:%M %p")
                        else:
                            # Update replayed_date
                            message[date_key] = date_value.strftime("%b %d | %I:%M %p")

        chat_history = {"paired_messages": paired_messages}
        response_data = {
        'chat_history': chat_history
        }
        print(" -- RES DATA -- ", response_data)
        if request.GET.get('format') == 'json':
            return JsonResponse(response_data)
        template = get_template('chatbox.html')
        context = {'response_data': "success"}
        return TemplateResponse(request, template, context)
    
# --- Message Responase From Admin ---- 
# --- Admin Response to Store SPA --- 
@csrf_exempt
def crm_chat_box(request):
    print("--- Talk To US Admin --- ")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        company_id = post.get('company_id')
        customer_message = post.get('customer_message')
        chat_date_split = post.get('chat_date')
        chat_date_time = chat_date_split.split(' GMT')[0]
        source_of_message = post.get('source_of_message')
        chat_params = {'entityTypeId': 182,
                "fields": {
                    "categoryId":348,
                    "stageId": "DT182_348:NEW",
                    "ufCrm118_1702285549": customer_message,
                    "ufCrm118_1702285616": source_of_message,
                    "ufCrm118_1702285560": chat_date_time,
                    "contactId": client_id,
                    "companyId": company_id,
                    }
                }
        chat_append_result = bx24.get_all('crm.item.add', chat_params)
    return HttpResponse(json.dumps(json_data))

# --- Client partner Login --- 
@csrf_exempt
def customerChatHistory(request):
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        clientID = post.get('clientID')
        companyID = post.get('companyID')
        print("___ CLIENT ID ____ ", clientID)
        print("___ COMPAN ID ____ ", companyID)
        chat_history_filter = {
            "entityTypeId": 182,
            "filter": {"contactId": clientID, "categoryId": 348}
        }
        client_chat_history = bx24.get_all('crm.item.list', chat_history_filter)
        sent_messages = []
        paired_messages = []

        # Function to find the nearest sent message based on date
        def find_nearest_sent_message(replayed_date):
            nearest_sent_message = None
            min_time_difference = float('inf')

            for sent_message in sent_messages:
                sent_date = datetime.strptime(sent_message["date"], "%Y-%m-%dT%H:%M:%S%z")
                replayed_date_obj = datetime.strptime(replayed_date, "%Y-%m-%dT%H:%M:%S%z")

                time_difference = abs((sent_date - replayed_date_obj).total_seconds())
                if time_difference < min_time_difference:
                    nearest_sent_message = sent_message
                    min_time_difference = time_difference

            return nearest_sent_message

        # Iterate through client_chat_history
        for chat in client_chat_history:
            if chat.get('ufCrm118_1702285616') == 3396:  # Customer Sent Message
                client_message = chat.get('ufCrm118_1702285549')
                client_chat_date = chat.get('ufCrm118_1702285560')
                sent_messages.append({"message": client_message, "date": client_chat_date})
            elif chat.get('ufCrm118_1702285616') == 3398:  # Team Replayed Message
                replayed_message = chat.get('ufCrm118_1702285549')
                replayed_chat_date = chat.get('ufCrm118_1702285560')

                # Find the nearest sent message based on date
                nearest_sent_message = find_nearest_sent_message(replayed_chat_date)

                # Remove the found sent message from the list
                if nearest_sent_message:
                    sent_messages.remove(nearest_sent_message)

                # Pair sent and replayed messages
                paired_messages.append({
                    "sent_message": nearest_sent_message["message"] if nearest_sent_message["message"] else '',
                    "replayed_message": replayed_message if replayed_message else '',
                    "sent_date": nearest_sent_message["date"],
                    "replayed_date": replayed_chat_date if replayed_chat_date else ''
                })

        # Include unreplied messages
        unreplied_messages = [{"message": sent_message["message"], "date": sent_message["date"]} for sent_message in sent_messages]

        # Add unreplied messages to the paired_messages list
        for unreplied_message in unreplied_messages:
            paired_messages.append({
                "sent_message": unreplied_message["message"] if unreplied_message["message"] else '',
                "replayed_message": '',
                "sent_date": unreplied_message["date"],
                "replayed_date": ''
            })

        # Sort the paired_messages list based on sent_date in ascending order
        paired_messages.sort(key=lambda x: datetime.strptime(x["sent_date"], "%Y-%m-%dT%H:%M:%S%z") if x["sent_date"] else datetime.min)

        # Format the date
        today = datetime.now(timezone.utc).astimezone(timezone(timedelta(hours=3)))
        for message in paired_messages:
            for date_key in ["sent_date", "replayed_date"]:
                if message[date_key]:
                    date_value = datetime.strptime(message[date_key], "%Y-%m-%dT%H:%M:%S%z")
                    if date_key == "sent_date":
                        # Update sent_date
                        formatted_date = date_value.strftime("%b %d | %I:%M %p")
                        if date_value.date() == today.date():
                            message[date_key] = "Today | " + formatted_date.split("|")[1].strip()
                        else:
                            message[date_key] = formatted_date
                    elif date_key == "replayed_date":
                        # Update replayed_date
                        if date_value > today:
                            message[date_key] = "Today | " + date_value.strftime("%I:%M %p")
                        else:
                            # Update replayed_date
                            message[date_key] = date_value.strftime("%b %d | %I:%M %p")

        # ------------------- PROJECT IMG -------------------
        project_params = {"entityTypeId": 177, "filter": {"companyId": companyID}}
        project_data = bx24.get_all('crm.item.list', project_params)
        project_list = []
        for project in project_data:
            project_dict = {}
            project_id = project['id']
            project_title = project['title']
            project_url = project['ufCrm100_1694853869']
            project_latitude = project['ufCrm100_1704862647533']
            project_longitude = project['ufCrm100_1704862669459']
            project_dict["project_id"] = project_id
            project_dict["project_title"] = project_title
            project_dict["project_url"] = project_url
            project_dict["project_latitude"] = project_latitude
            project_dict["project_longitude"] = project_longitude
            project_list.append(project_dict)
        chat_history = {"paired_messages": paired_messages, "project_data": project_list}
        return HttpResponse(json.dumps(chat_history))

# --- Auto Genrated Password --- 
def genrate_password(length=8):
    characters = string.ascii_letters + string.digits
    gen_password = ''.join(secrets.choice(characters) for _ in range(length))
    return gen_password

# ---- Client Email Verification ---- 
@csrf_exempt
def email_verification(request):
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_email_id = post.get('client_username')
        client_given_password = post.get('client_password')
        contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1707795488198"]}
        contact_data = bx24.get_all('crm.contact.list', contact_params)
        # --- Admin Login --- 
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 202
        }
        universal_jobcategory_list = bx24.get_all('lists.element.get', universal_list)
        # --- Contact Details Get ---
        contact_comp_id_dict = {}
        for contact in contact_data:
            if 'EMAIL' in contact and contact['EMAIL']:
                email = contact['EMAIL'][0]['VALUE']
                company_id = contact['COMPANY_ID']
                name = contact.get('NAME', '')
                second_name = contact.get('LAST_NAME', '')
                if second_name is not None:
                    full_name = name + " " + second_name
                else:
                    full_name = name
                if company_id is not None:
                    contact_comp_id_dict[email] = int(company_id)
        contact_name_dict = {}
        for contact in contact_data:
            if 'EMAIL' in contact and contact['EMAIL']:
                email = contact['EMAIL'][0]['VALUE']
                company_id = contact['COMPANY_ID']
                name = contact.get('NAME', '')
                second_name = contact.get('LAST_NAME', '')
                if second_name is not None:
                    full_name = name + " " + second_name
                else:
                    full_name = name
                if company_id is not None:
                    contact_name_dict[email] = full_name
        contact_id_dict = {}
        for contact in contact_data:
            if 'EMAIL' in contact and contact['EMAIL']:
                contact_id = contact['ID']
                email = contact['EMAIL'][0]['VALUE']
                company_id = contact['COMPANY_ID']
                if company_id is not None:
                    contact_id_dict[email] = contact_id
        contact_password_dict = {}
        for contact in contact_data:
            if 'EMAIL' in contact and contact['EMAIL']:
                contact_id = contact['ID']
                email = contact['EMAIL'][0]['VALUE']
                contact_password = contact['UF_CRM_1707795488198']
                company_id = contact['COMPANY_ID']
                if company_id is not None:
                    contact_password_dict[email] = contact_password
        # email_id_dict = {}
        # for company in customer_comp:
        #     if 'ID' in company and 'EMAIL' in company:
        #         company_id = company['ID']
        #         emails = company['EMAIL']
        #         for email in emails:
        #             if 'VALUE' in email:
        #                 email_address = email['VALUE']
        #                 email_id_dict[email_address] = company_id
        # for element in universal_jobcategory_list:
        #     if 'PROPERTY_1190' in element and isinstance(element['PROPERTY_1190'], dict):
        #         for key, value in element['PROPERTY_1190'].items():
        #             email_id_dict[value] = element['ID']
        # Company Name Get
        # company_name_dict = {}
        # for company in customer_comp:
        #     if 'ID' in company and 'EMAIL' in company:
        #         emails = company['EMAIL']
        #         title = company['TITLE']
        #         for email in emails:
        #             if 'VALUE' in email:
        #                 email_address = email['VALUE']
        #                 company_name_dict[email_address] = title
        # for element in universal_jobcategory_list:
        #     if 'PROPERTY_1190' in element and isinstance(element['PROPERTY_1190'], dict):
        #         for key, value in element['PROPERTY_1190'].items():
        #             company_name_dict[value] = element['NAME']
        if client_email_id in contact_comp_id_dict:
            client_Comp_Id = str(contact_comp_id_dict[client_email_id])
            print(" ---- CLIENT COMP ID ---- ", client_Comp_Id)
            client_username = contact_name_dict[client_email_id]
            print(" ---- CLIENT USERNAME --- ", client_username)
            client_Id = contact_id_dict[client_email_id]
            print(" ---- CLIENT ID --------- ", client_Id)
            client_set_password = contact_password_dict[client_email_id]
            print(" - CLIENT SET PASSWORD -- ", client_set_password)
            json_data['Code'] = "001"
            json_data['Message'] = "Client Password Will Sent"
            json_data['Password'] = client_set_password
            json_data['Client_CompanyId'] = client_Comp_Id
            json_data['Client_CompanyName'] = client_username
            json_data['Client_PersonEmail'] = client_email_id
            json_data['Client_ID'] = client_Id
            return HttpResponse(json.dumps(json_data))
        else:
            json_data['Code'] = "000"
            json_data['Message'] = "Your Email ID Is Not Present In the SPA"
            return HttpResponse(json.dumps(json_data))
    else:
        json_data['Code'] = "004"
        json_data['Message'] = "Error"
        return HttpResponse(json.dumps(json_data))


# ----------------------- CLIENT HISTORY -----------------------

# ---- Service Call Log History ---------
@csrf_exempt
def serviceCallLog_History(request):
    print(" ------- HIT SERVICE CALL HISTORY ------- ")
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        ticket_status = post.get('ticket_status')
        solar_project_id = post.get('solar_project_id')
        if ticket_status == "all":
            serviceDesk = {
            "entityTypeId":133,
            "filter":{"ufCrm94_1693993762348": 3354,"ufCrm94_1705550205": solar_project_id}}
        else:
            serviceDesk = {
            "entityTypeId":133,
            "filter":{"ufCrm94_1693993762348": 3354,"ufCrm94_1693454420002": ticket_status, "ufCrm94_1705550205": solar_project_id}}
        service_call = bx24.get_all('crm.item.list', serviceDesk)
        ServiceCall_List = []
        for lst in service_call:
            item_id=lst['id']
            status_id = lst['ufCrm94_1693454420002']
            service_request_source=lst['ufCrm94_1693993762348']
            raised_by=lst['ufCrm94_1694254376554']
            raised_by_email=lst['ufCrm94_1694254397944']
            site_location=lst['ufCrm94_1705557424']
            title=lst['ufCrm94_1693286605']
            issue_description=lst['ufCrm94_1693470985532']
            issue_related_document=lst['ufCrm94_1693286718'][0]['urlMachine']
            priority_id=lst['ufCrm94_1693286652']
            service_request_type=lst["ufCrm94_1705560052"]
            created_time_str = lst["ufCrm94_1694583394392"]
            ticket_id = lst['title']
            created_time = datetime.fromisoformat(created_time_str[:-6])
            today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            is_today = today <= created_time < today + timedelta(days=1)
            if is_today:
                ticketRaisedDate = created_time.strftime("Today at %I:%M %p")
            else:
                ticketRaisedDate = created_time.strftime("%d-%b-%Y at %I:%M %p")

            if status_id == 1850: status_id = 'open'
            if status_id == 1852: status_id = 'answered'
            if status_id == 1854: status_id = 'resolved'
            if status_id == 1856: status_id = 'verified'
            if status_id == 1858: status_id = 'closed'
            if status_id == 1860: status_id = 'reopen'

            if priority_id == 1836: priority_id = 'High'
            if priority_id == 1840: priority_id = 'Low'
            if priority_id == 1862: priority_id = 'Critical'    
            if priority_id == 1838: priority_id = 'Medium'

            if service_request_type == 19288: service_request_type = "Account Access/Password Reset"
            if service_request_type == 19286: service_request_type = "Billing Inquiry"
            if service_request_type == 19290: service_request_type = "Cancellation Request"    
            if service_request_type == 19278: service_request_type = "Maintenance Request"
            if service_request_type == 19282: service_request_type = "Product Replacement"
            if service_request_type == 19280: service_request_type = "Technical Support"
            if service_request_type == 19284: service_request_type = "Warranty Claim"

            servicecall_history = {
                "item_id": item_id,
                "status": status_id,
                "service_request_source":service_request_source,
                "raised_by":raised_by,
                "raised_by_email":raised_by_email,
                "site_location":site_location,
                "title":title,
                "issue_description":issue_description,
                "priority":priority_id,
                "service_request_type": service_request_type,
                "ticket_raised_date": ticketRaisedDate,
                "ticket_id": ticket_id,
                "related_document_link": issue_related_document}
            ServiceCall_List.append(servicecall_history)
        service_call_history = {
        'service_call_history': ServiceCall_List
        }
        # print("-- SERVICE CALL HISTORY -- ", service_call_history)
        return HttpResponse(json.dumps(service_call_history))

# ---- Service Call Request History ---------
@csrf_exempt
def serviceCallRequest_History(request):
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        params = {
            "entityTypeId":182,
            "filter":{"categoryId": 350,"contactId":client_id, "ufCrm118_1701926001": solar_project_id}        
        }
        service_request = bx24.get_all('crm.item.list', params)
        ServiceRequest_list = []
        for lst in service_request:
            item_id=lst['id']
            service_name=lst['ufCrm118_1702269704']
            Service_Priority=lst['ufCrm118_1705643511']
            service_request_type=lst["ufCrm118_1705559361"]
            preferred_date=lst["ufCrm118_1702267936"]
            related_document=lst["ufCrm118_1702268125"]
            request_person_name=lst["ufCrm118_1702268012"]
            request_person_mail=lst["ufCrm118_1702268031"]
            contact_no=lst["ufCrm118_1702268053"]
            service_description=lst["ufCrm118_1702268093"]
            document_link = lst["ufCrm118_1707306715"]
            service_request_id = lst["title"]
            item_created_date = lst["ufCrm118_1707467515"]
            created_time = datetime.fromisoformat(item_created_date[:-6])
            today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            is_today = today <= created_time < today + timedelta(days=1)
            if is_today:
                RequestRaisedDate = created_time.strftime("Today at %I:%M %p")
            else:
                RequestRaisedDate = created_time.strftime("%d-%b-%Y at %I:%M %p")
            preferred_date_created_time = datetime.fromisoformat(preferred_date[:-6])
            prefered_date_today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            is_today = prefered_date_today <= preferred_date_created_time < prefered_date_today + timedelta(days=1)
            if is_today:
                request_prefered_date = preferred_date_created_time.strftime("Today at %I:%M %p")
            else:
                request_prefered_date = preferred_date_created_time.strftime("%d-%b-%Y")
            if service_name == 3386: service_name = 'Installation Services'
            if service_name == 3388: service_name = 'Project Management'
            if service_name == 3390: service_name = 'Design and Engineering'    
            if service_name == 3392: service_name = 'Solar Consultation'
            if service_name == 3394: service_name = 'Training and Education'    
            if Service_Priority == 3436: Service_Priority = 'High'
            if Service_Priority == 3440: Service_Priority = 'Low'
            if Service_Priority == 3434: Service_Priority = 'Critical'    
            if Service_Priority == 3438: Service_Priority = 'Medium'
            if service_request_type == 19288: service_request_type = "Account Access/Password Reset"
            if service_request_type == 19286: service_request_type = "Billing Inquiry"
            if service_request_type == 19290: service_request_type = "Cancellation Request"    
            if service_request_type == 19278: service_request_type = "Maintenance Request"
            if service_request_type == 19282: service_request_type = "Product Replacement"
            if service_request_type == 19280: service_request_type = "Technical Support"
            if service_request_type == 19284: service_request_type = "Warranty Claim"                
            servicerequest_history = {
                "item_id": item_id,
                "service_name": service_name,
                "service_priority":Service_Priority,
                "service_request_type":service_request_type,
                "preferred_date":preferred_date,
                "related_document":related_document,
                "request_person_name":request_person_name,
                "request_person_mail":request_person_mail,
                "contact_no":contact_no,
                "service_description":service_description,
                "document_link": document_link,
                "service_request_id": service_request_id,
                "request_prefered_date": request_prefered_date,
                "RequestRaisedDate": RequestRaisedDate}
            ServiceRequest_list.append(servicerequest_history)
        service_request_history = {
        'service_request_history': ServiceRequest_list
        }
        # print(" --- SERVICE REQUEST HISTORY --- ", service_request_history)
        return HttpResponse(json.dumps(service_request_history))
    
# --- HISTORY CHART ---- 
# --- HISTORY CHART ----
@csrf_exempt
def Get_customer_satisfaction_score(request):
    print("--------- SCORE HIT ---------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:
            client_id = post.get('client_id')
            print("client_id", client_id)
            solar_project_id = post.get('solar_project_id')
            print("solar_project_id", solar_project_id)
            client_partner_service = {
                "entityTypeId": 133,
                "filter": {
                    "ufCrm94_1693993762348": 3354,
                    "ufCrm94_1705550205": solar_project_id ,
                    "stageId": ["DT133_284:UC_OBFKZC","DT133_284:UC_QU6E1M" ]
                }
            }
            service_desk_customer_feedback = bx24.get_all('crm.item.list', client_partner_service)
            total_feedback = len(service_desk_customer_feedback)
            total_no_of_positive_feedback = sum(1 for feedback in service_desk_customer_feedback
                                             if feedback['ufCrm94_1695731117311'] in [1912, 1910, 1908])
            total_positive_feedback_percentage = (total_no_of_positive_feedback / total_feedback) * 100 if total_feedback > 0 else 0
            # Count tickets for each status
            open_tickets = 0
            answered_tickets = 0
            resolved_tickets = 0
            verified_tickets = 0
            closed_tickets = 0
            reopen_tickets = 0
            client_partner_service_log_history = {
                "entityTypeId": 133,
                "filter": {
                    "ufCrm94_1693993762348": 3354,
                    "ufCrm94_1705550205": solar_project_id ,
                }
            }
            service_desk_ticket_count = bx24.get_all('crm.item.list', client_partner_service_log_history)
            for ticket in service_desk_ticket_count:
                status_id = ticket.get('ufCrm94_1693454420002', 0)
                if status_id == 1850:
                    open_tickets += 1
                elif status_id == 1852:
                    answered_tickets += 1
                elif status_id == 1854:
                    resolved_tickets += 1
                elif status_id == 1856:
                    verified_tickets += 1
                elif status_id == 1858:
                    closed_tickets += 1
                elif status_id == 1860:
                    reopen_tickets += 1
            tickets_count_list = [open_tickets, answered_tickets, resolved_tickets, verified_tickets, closed_tickets, reopen_tickets]
            json_data['total_positive_feedback'] = round(total_positive_feedback_percentage)
            json_data['tickets_count_list'] = tickets_count_list
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))

def parse_iso8601_with_timezone(iso_string):
    if iso_string is not None:
        return datetime.fromisoformat(iso_string.replace("Z", "+00:00"))
    else:
        return None

@csrf_exempt
def Get_Average_Response_Time(request):
    json_data={}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        response_time_params = {
            "entityTypeId": 133,
            "filter": {
                "ufCrm94_1693993762348": 3354,
                # "contactId": client_id,
                "stageId": ["DT133_284:PREPARATION","DT133_284:CLIENT","DT133_284:UC_OBFKZC","DT133_284:UC_QU6E1M"]
            }
        }
        average_response_time = bx24.get_all('crm.item.list', response_time_params)
        print("average_response_time",average_response_time)
        
        priority_response_data = {'High': {'total_difference': 0, 'count': 0},
                                 'Low': {'total_difference': 0, 'count': 0},
                                 'Critical': {'total_difference': 0, 'count': 0},
                                 'Medium': {'total_difference': 0, 'count': 0}}
        # print("average_response_time",average_response_time)
        for lst in average_response_time:
            item_id=lst['id']
            created_datetime = parse_iso8601_with_timezone(lst['ufCrm94_1694583394392'])
            responded_datetime = parse_iso8601_with_timezone(lst['ufCrm94_1694693956'])
            priority = lst['ufCrm94_1693286652']
            print(f"id:{item_id}Created: {created_datetime}, Responded: {responded_datetime}, Priority: {priority}")
            if priority == 1836:
                priority = 'High'
            elif priority == 1840:
                priority = 'Low'
            elif priority == 1862:
                priority = 'Critical'
            elif priority == 1838:
                priority = 'Medium'

            if responded_datetime > created_datetime:
                print("condition-------------------------------------")
                difference = responded_datetime - created_datetime
                print("time differenceeeeeeeeeeeeeee",difference)
                priority_response_data[priority]['total_difference'] += difference.total_seconds() / 3600
                priority_response_data[priority]['count'] += 1
        total_tickets = sum(data['count'] for data in priority_response_data.values())
        json_data = {}
        for priority, data in priority_response_data.items():
            if data['count'] > 0:
                average_difference = data['total_difference'] / total_tickets
                json_data[priority.lower()] = round(average_difference, 2)
            else:
                json_data[priority.lower()] = 0
        return HttpResponse(json.dumps(json_data)) 

# ---------------------------------------------------------------------------------------------

def Accounts_and_Statement(solar_project_id):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    # Fetch over-due invoices
    over_due_invoice_params = {"entityTypeId": 144, "filter": {"ufCrm8_1705746214":solar_project_id,"categoryId": 142,"stageId": ["DT144_142:UC_BKXI09","DT144_142:NEW", "DT144_142:UC_8NQN4C", "DT144_142:UC_LM5JVE", "DT144_142:UC_NKGDMX", "DT144_142:UC_5JWW2W", "DT144_142:UC_WDF5H5", "DT144_142:UC_VBPVCF", "DT144_142:PREPARATION", "DT144_142:CLIENT", "DT144_142:UC_ICUD1H", "DT144_142:UC_TYW6QL","DT144_142:UC_NE3TQB","DT144_142:UC_BKXI09"]}}
    over_due_invoice = bx24.get_all('crm.item.list', over_due_invoice_params)
    # Fetch paid invoices
    paid_invoice_params = {"entityTypeId": 144, "filter": {"ufCrm8_1705746214":solar_project_id,"categoryId": 142,"stageId": ["DT144_142:UC_YCCLRQ","DT144_142:UC_Z828I7", "DT144_142:UC_29SLZH", "DT144_142:UC_C01F2M", "DT144_142:UC_QWYQOK"]}}
    paid_invoice = bx24.get_all('crm.item.list', paid_invoice_params)
    # All Receivables
    receivables_params = {"entityTypeId": 144, "filter": {"ufCrm8_1705746214":solar_project_id,"categoryId": 142}}
    all_receivales_list = bx24.get_all('crm.item.list', receivables_params)
    return over_due_invoice, paid_invoice, all_receivales_list

def get_current_date():
    current_datetime_utc = datetime.now(timezone.utc)
    current_datetime_timezone = current_datetime_utc + timedelta(hours=3)
    formatted_date = current_datetime_timezone.strftime('%Y-%m-%dT%H:%M:%S%z')
    # Get the current date
    current_datetime = datetime.now(pytz.utc)
    desired_timezone = pytz.timezone('Asia/Dubai')
    current_datetime_zone = current_datetime.astimezone(desired_timezone)
    return formatted_date, current_datetime_zone

def currency_amount_convertion(amount,due_amount_currency_id,filter_currency):
    if due_amount_currency_id == filter_currency:
        return amount
    else:
        cr = CurrencyRates()
        output = cr.convert(due_amount_currency_id, filter_currency, amount)
        # print("The converted rate is:", output)
        return output

@csrf_exempt
def accounts_and_statement_cal(request):
    print(" ------------------ ACCOUNTS AND STMT ------------------")
    post = request.POST
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Revenue_FilterYear = int(post.get('revenue_filter_year'))
        Currency_Type = post.get("currency_type")
        print(" --- Client_Id --- ", client_id)
        print(" --- Solar_Project_Id --- ", solar_project_id)
        print(" --- Revenue_FilterYear --- ", Revenue_FilterYear)
        print(" --- Currency_Type --- ", Currency_Type)
        over_due_invoice, paid_invoice,all_receivales_list = Accounts_and_Statement(solar_project_id)
        overdue_total_sum = 0
        due_date_total_sum = 0
        invoice_status = None
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "PGK"
        # --- Transaction History ---
        transaction_history_list = []
        # --- Days Elapsed ---
        overdue_days_elapsed_list = []
        overdue_invoice_title_list = []
        overdue_days = []
        # --- Revenue Report ---
        outstanding_quoter_paid_list = []
        total_paid_quoter_list = []
        monthly_overdue_amounts = {'01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0}
        monthly_paid_amounts = {'01': 0, '02': 0, '03': 0, '04': 0, '05': 0, '06': 0, '07': 0, '08': 0, '09': 0, '10': 0, '11': 0, '12': 0}
        # ---- Over Due ----
        for currency in over_due_invoice:
            opportunity_value = currency['opportunity']
            
            opportunity_currency_id = currency['currencyId']
            opportunity_value=currency_amount_convertion(opportunity_value,opportunity_currency_id,filter_currency)
            overdue_total_sum += opportunity_value
            today_date,current_datetime_zone = get_current_date()
            due_date = currency['ufCrm8_1698898026']
            due_date_slice = due_date[5:7]
            due_year_slice = int(due_date[:4])
            if Revenue_FilterYear == due_year_slice:
                if due_date_slice in monthly_overdue_amounts:
                    monthly_overdue_amounts[due_date_slice] += opportunity_value
                    outstanding_quoter_paid_list = list(monthly_overdue_amounts.values())
            if today_date > due_date:
                days_elapsed_dict = {}
                invoice_title = currency['title']
                invoice_doc_link = currency['ufCrm8_1698988252']
                support_doc_link = currency['ufCrm8_1699607846080']
                # invoice_due_date = due_date
                due_date_total_sum += opportunity_value
                invoice_dt_object = datetime.fromisoformat(due_date)
                date_difference = current_datetime_zone - invoice_dt_object
                payment_delay_days = date_difference.days
                if payment_delay_days == 1:
                    days_text = "day"
                else:
                    days_text = "days"
                input_date = datetime.fromisoformat(due_date)
                invoice_overdue_date = input_date.strftime("%d/%b/%Y")
                days_elapsed_dict['title'] = invoice_title
                days_elapsed_dict['due_date_amount'] =opportunity_value
                days_elapsed_dict['invoice_overdue_date'] = invoice_overdue_date
                days_elapsed_dict['invoice_doc_link'] = invoice_doc_link
                days_elapsed_dict['support_doc_link'] = support_doc_link
                overdue_days_elapsed_list.append(days_elapsed_dict)
                overdue_invoice_title_list.append(invoice_title)
                overdue_days.append(payment_delay_days)
        # --- Total Paid ---
        overall_paid_invoice_sum = 0
        for paid_cur in paid_invoice:
            paid_invoice_amount = paid_cur['opportunity']
            paid_invoice_amt_currency_id = currency['currencyId']
            paid_invoice_amount=currency_amount_convertion(paid_invoice_amount,paid_invoice_amt_currency_id,filter_currency)
            overall_paid_invoice_sum += paid_invoice_amount
            # paid_confirm_date = paid_cur['ufCrm8_1699262636417'][5:7]
            # overall_paid_invoice_sum += paid_invoice_amount
            # print(" -- paid_confirm_date -- ", paid_confirm_date)
            # if paid_confirm_date in monthly_paid_amounts:
            #     monthly_paid_amounts[paid_confirm_date] += paid_invoice_amount
            #     total_paid_quoter_list = list(monthly_paid_amounts.values())
            paid_confirm_date = paid_cur['ufCrm8_1698898213']
            print("PAID --- DATE --- ", paid_confirm_date)
            paid_confirm_date_slice = str(paid_confirm_date[5:7])
            paid_confirm_year_slice = int(paid_confirm_date[:4])
            if Revenue_FilterYear == paid_confirm_year_slice:
                if paid_confirm_date_slice in monthly_paid_amounts:
                    monthly_paid_amounts[paid_confirm_date_slice] += paid_invoice_amount
                    total_paid_quoter_list = list(monthly_paid_amounts.values())
            print(" -- PAID -- ", total_paid_quoter_list)
        total_invoice_sum = 0
        for invoice in all_receivales_list:
            transactionhistory_dict = {}
            total_invoice_amount = invoice['opportunity']
            
            invoice_amount_currency_id = currency['currencyId']
            total_invoice_amount=currency_amount_convertion(total_invoice_amount,invoice_amount_currency_id,filter_currency)
            total_invoice_sum += total_invoice_amount
            invoice_title = invoice['title']
            invoice_date = invoice['ufCrm8_1698898213']
            invoice_due_date = invoice['ufCrm8_1698898026']
            input_date = datetime.fromisoformat(invoice_date)
            invoice_created_date = input_date.strftime("%d/%b/%Y")
            invoice_dt_object = datetime.fromisoformat(invoice_due_date)
            date_difference = current_datetime_zone - invoice_dt_object
            payment_delay_days = date_difference.days
            if payment_delay_days == 1:
                days_text = "Day"
            else:
                days_text = "Days"
            # OverDue
            if invoice['stageId'] in ["DT144_142:UC_NE3TQB','DT144_142:UC_BKXI09"]:
                invoice_status = "overdue"

            # Paid Invoice
            if invoice['stageId'] in ["DT144_142:UC_YCCLRQ", "DT144_142:UC_Z828I7", "DT144_142:UC_29SLZH", "DT144_142:UC_C01F2M", "DT144_142:UC_QWYQOK"]:
                invoice_status = "paid"

            # UpComming Invoice
            if invoice['stageId'] in ["DT144_142:UC_BKXI09","DT144_142:NEW", "DT144_142:UC_8NQN4C", "DT144_142:UC_LM5JVE", "DT144_142:UC_NKGDMX", "DT144_142:UC_5JWW2W", "DT144_142:UC_WDF5H5", "DT144_142:UC_VBPVCF", "DT144_142:PREPARATION", "DT144_142:CLIENT", "DT144_142:UC_ICUD1H", "DT144_142:UC_TYW6QL"]:
                invoice_status = "overdue"

            transactionhistory_dict["title"] = invoice_title
            transactionhistory_dict["date"] = invoice_created_date
            transactionhistory_dict["amount"] =total_invoice_amount
            transactionhistory_dict["status"] = invoice_status
            transactionhistory_dict["delay_days"] = payment_delay_days
            transactionhistory_dict["days_text"] = days_text
            transaction_history_list.append(transactionhistory_dict)

        print(" -- overdue_total_sum -- ", overdue_total_sum)
        print(" -- overall_paid_invoice_sum -- ", overall_paid_invoice_sum)
        print(" -- total_invoice_sum -- ", total_invoice_sum)
        over_due_total_invoice = (overdue_total_sum / total_invoice_sum) * 100
        total_paid_invoice = (overall_paid_invoice_sum / total_invoice_sum) * 100
        over_due_total_invoice = round(over_due_total_invoice)
        total_paid_invoice = round(total_paid_invoice)
        print(" -- TOTAL PAID INVOICE PRESENTAGE -- ", over_due_total_invoice)
        print(" -- OVERDUE INVOICE PRESENTAGE -- ", total_paid_invoice)
        return JsonResponse({"pending_invoice_list": overdue_days_elapsed_list,'outstanding_total': overdue_total_sum,"invoice_paid_total": overall_paid_invoice_sum,'over_due_total_invoice_precentage': int(over_due_total_invoice), "total_paid_invoice_precentage": int(total_paid_invoice),
                             "total_paid_quoter_list":total_paid_quoter_list,"outstanding_quoter_paid_list":outstanding_quoter_paid_list,"filter_currency":filter_currency,
                             'transaction_history': transaction_history_list, "overdue_invoice_title": overdue_invoice_title_list, "invoice_overdue_days": overdue_days})

# --------------------- Financial Calculation -----------------------

def currency_amount_convertion(amount,base_currency,target_currency):
    if base_currency == target_currency:
        return amount
    else:
        # cr = CurrencyRates()
        # output = cr.convert(due_amount_currency_id, filter_currency, amount)
        # print("The converted rate is:", output)
        url = f"https://api.exchangerate-api.com/v4/latest/{base_currency}"
        response = requests.get(url)
        data = response.json()
        exchange_rate= data['rates'].get(target_currency)
        print("EXCHANNNNNNN",exchange_rate)
        output=amount*exchange_rate
        print("Output",output)
        return output

@csrf_exempt
def clientPartnerFinacialCalc(request):
    print(" --------------------------- FINANCIAL ROI MAIN DIV CONTENT ---------------------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Currency_Type = post.get('financial_roi_currency_type')
        print(" -- FINANCIAL ROI Currency Type -- ", Currency_Type)
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "USD"
        params = {"entityTypeId": 144, "filter": {"stageId": "DT144_142:UC_C01F2M","ufCrm8_1705746214":solar_project_id}}
        result = bx24.get_all('crm.item.list', params)

        financial_roi_calculation = []
        total_initial_investment = 0

        for i,data in enumerate(result):
            solar_projectId = data['ufCrm8_1705746214']
            initial_investment = float(data['opportunity'])
            print(" --- INITIAL INVESTMENT --- ", initial_investment)
            currency_Id = data['currencyId']
            initial_investment = currency_amount_convertion(initial_investment,currency_Id,filter_currency)
            print(" --- >>>>>>> INITIAL INVESTMENT <<<<<<< --- ", initial_investment)
            total_initial_investment += initial_investment
        last_total_investment = round(total_initial_investment)
        
        solar_params = {"entityTypeId": 177, "filter": {"id": solar_projectId}}
        solar_project_response = bx24.get_all('crm.item.list', solar_params)
        print("ELECTTTTTTTTTTT",type(solar_project_response[0]['ufCrm100_1705746355'][0]))
        electricity_cost_for_kwh = currency_amount_convertion(int(solar_project_response[0]['ufCrm100_1705746355'][0]),'USD',filter_currency)
        maintenance_cost = currency_amount_convertion(int(solar_project_response[0]['ufCrm100_1705746403'][0]),'USD',filter_currency)
        total_generation = solar_project_response[0]['ufCrm100_1694244101473']
        capacity = solar_project_response[0]['ufCrm100_1694243678567']
        total_generation_daily = round(float(total_generation) * float(capacity) / 1000, 2)
        annual_energy_product = round(float(total_generation_daily) * 365, 2)
        annual_saving = round(float(annual_energy_product) * float(electricity_cost_for_kwh), 2)
        payback_period = round(float(last_total_investment) / float(annual_saving), 1)
        total_saving = round(float(annual_saving) * 25 - float(maintenance_cost), 2)
        roi = round(float(total_saving) / float(last_total_investment) * 100)
        financial_roi_data = {
            "initial_investment": last_total_investment,
            "annual_saving": annual_saving,
            "payback_period": payback_period,
            "total_saving": total_saving,
            "roi": roi,
            "Currency_Type":Currency_Type
        }
        financial_roi_calculation.append(financial_roi_data)
        json_data['financial_roi_data'] = financial_roi_calculation
        print(" ----------- FINANCIAL ROI MAIN DIV RESULT ----------- ", json_data)
    return HttpResponse(json.dumps(json_data))



@csrf_exempt
def calculate_payback(request):
    print(" ------------------------ PAYBACK CHART ------------------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Currency_Type = post.get('financial_roi_currency_type')
        print(" -- PAYBACK Currency Type -- ", Currency_Type)
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "USD"
        params = {"entityTypeId": 144,"filter":{"stageId": "DT144_142:UC_C01F2M","ufCrm8_1705746214":solar_project_id}}
        result = bx24.get_all('crm.item.list', params)
        total_initial_investment = 0
        for i, data in enumerate(result):
            solar_projectId = data['ufCrm8_1705746214']
            initial_investment = float(data['opportunity'])
            currency_Id = data['currencyId']
            initial_investment = currency_amount_convertion(initial_investment,currency_Id,filter_currency)
            total_initial_investment += initial_investment
        last_total_investment = total_initial_investment
        solar_params = {"entityTypeId": 177,
                    "filter":{"id": solar_projectId}}
        solar_project_response = bx24.get_all('crm.item.list', solar_params)
        electricity_cost_for_kwh = currency_amount_convertion(int(solar_project_response[0]['ufCrm100_1705746355'][0]),'USD',filter_currency)
        total_generation = solar_project_response[0]['ufCrm100_1694244101473']
        capacity = solar_project_response[0]['ufCrm100_1694243678567']
        total_generation_daily = round(float(total_generation)*float(capacity)/1000,2)
        annual_energy_product = round(float(total_generation_daily)*365,2)
        annual_saving = round(float(annual_energy_product)*float(electricity_cost_for_kwh),2)
        initial_amount = -last_total_investment
        cumulative = annual_saving
        cumulative_data = []
        payback_data = []
        payback_balance = initial_amount
        year = 0
        while True:
            cumulative_cost_saving = cumulative * (year + 1)  # Increment cumulative_cost_saving each year
            cumulative_data.append({'year': year, 'cumulative_cost_saving': cumulative_cost_saving})
            payback_data.append({'year': year, 'payback_balance': payback_balance})
            payback_balance += cumulative  # Increment payback_balance by 20000 each year
            year += 1
            if payback_balance >= 0:
                cumulative_cost_saving = cumulative * (year + 1)  # Update cumulative_cost_saving for the final year
                cumulative_data.append({'year': year, 'cumulative_cost_saving': cumulative_cost_saving})
                payback_data.append({'year': year, 'payback_balance': payback_balance})
                break
        json_data['cummulative'] = cumulative_data
        json_data['payback_balance'] = payback_data
        print(" ------ PAYBACK CHART RESULT ------ ", json_data)
        return JsonResponse(json_data)
    
    
@csrf_exempt
def calculate_roi(request):
    print(" ----------------------------------- HIT ROI CHART -----------------------------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Currency_Type = post.get('financial_roi_currency_type')
        print(" -- HIT ROI CHART Currency Type -- ", Currency_Type)
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "USD"
        params = {"entityTypeId": 144, "filter": {"stageId": "DT144_142:UC_C01F2M","ufCrm8_1705746214":solar_project_id}}
        result = bx24.get_all('crm.item.list', params)
        total_initial_investment = 0
        for i, data in enumerate(result):
            solar_projectId = data['ufCrm8_1705746214']
            initial_investment = float(data['opportunity'])
            currency_Id = data['currencyId']
            initial_investment = currency_amount_convertion(initial_investment,currency_Id,filter_currency)
            total_initial_investment += initial_investment
        last_total_investment = total_initial_investment
        cumulative_cost_saving = 0
        solar_params = {"entityTypeId": 177, "filter": {"id": solar_projectId}}
        solar_project_response = bx24.get_all('crm.item.list', solar_params)
        date_commissioned=solar_project_response[0]['ufCrm100_1694243456358']
        initial_year = datetime.fromisoformat(date_commissioned).year
        electricity_cost_for_kwh = currency_amount_convertion(int(solar_project_response[0]['ufCrm100_1705746355'][0]),'USD',filter_currency)
        total_generation = solar_project_response[0]['ufCrm100_1694244101473']
        capacity = solar_project_response[0]['ufCrm100_1694243678567']
        total_generation_daily = round(float(total_generation) * float(capacity) / 1000, 2)
        annual_energy_product = round(float(total_generation_daily) * 365, 2)
        annual_saving = round(float(annual_energy_product) * float(electricity_cost_for_kwh), 2)
        for year in range(initial_year, initial_year + 25):
            cumulative_cost_saving += annual_saving
            roi =round ((cumulative_cost_saving / last_total_investment) * 100,2)
            json_data[str(year)] = {
                'cumulative_cost_saving': cumulative_cost_saving,
                'roi': roi
            }
        print(" -------- HIT ROI RESULT -------- ", json_data)
    return HttpResponse(json.dumps(json_data))
    

@csrf_exempt
def internal_rate_of_return(request):
    print("---------------------------------------- RETURN ON INVESTMENT CHART ----------------------------------------")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Currency_Type = post.get('financial_roi_currency_type')
        print(" -- RETURN ON INVESTMENT Currency Type -- ", Currency_Type)
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "USD"
        params = {"entityTypeId": 144,"filter":{"stageId": "DT144_142:UC_C01F2M", "ufCrm8_1705746214":solar_project_id}}
        result = bx24.get_all('crm.item.list', params)
        total_initial_investment = 0
        for i,data in enumerate(result):
            solar_projectId = data['ufCrm8_1705746214']
            initial_investment = float(data['opportunity'])
            currency_Id = data['currencyId']
            initial_investment = currency_amount_convertion(initial_investment,currency_Id,filter_currency)
            total_initial_investment += initial_investment
            last_total_investment = total_initial_investment
        solar_project_params = {
            "entityTypeId": 177,
            "filter": {"id": solar_projectId}
        }
        solar_project_result = bx24.get_all('crm.item.list',solar_project_params)
        discount_rate = float(solar_project_result[0]['ufCrm100_1705997550263'])/100
        # print("ssssssssssssssssssssssssssssss",discount_rate)
        total_generation = solar_project_result[0]['ufCrm100_1694244101473']
        electricity_cost_for_kwh = currency_amount_convertion(int(solar_project_result[0]['ufCrm100_1705746355'][0]),'USD',filter_currency)
        capacity = solar_project_result[0]['ufCrm100_1694243678567']
        total_generation_daily = round(float(total_generation)*float(capacity)/1000,2)
        annual_energy_product = round(float(total_generation_daily)*365,2)
        annual_cost_saving = round(float(annual_energy_product)*float(electricity_cost_for_kwh),2)
        # print("annual_cost_saving",annual_cost_saving)
        years = 25
        cash_flows = [-last_total_investment] + [annual_cost_saving] * years
        # print("cash_flows",cash_flows)
        irr = npf.irr(cash_flows)
        npv = npf.npv(discount_rate, cash_flows)
        rounded_npv = round(npv)
        discount_rates =  [round(rate*1000) for rate in np.linspace(0, 0.1, 300)]
        discount_ratess =  [rate for rate in np.linspace(0, 0.1, 300)]
        # print(discount_rates)
        npv_values = [npf.npv(rate, cash_flows) for rate in discount_ratess]
        rounded_npv_values = [round(npv, 2) for npv in npv_values]

        # print(npv_values)
        json_data = {
                'discount_rates': list(discount_rates),
                'npv_values': list(npv_values),
                'irr': irr * 100
            }
        print(" ----- RETURN ON INVESTMENT RESULT ----- ", json_data)
        return HttpResponse(json.dumps(json_data))
    

def calculate_lcoe_sum(last_total_investment, om_cost_per_year, project_lifetime, electricity_saving_annual, discount_rate):
    fuel_cost = 0
    numerator = last_total_investment + om_cost_per_year - project_lifetime
    denominator = sum([(1 + discount_rate) ** t * electricity_saving_annual for t in range(1, project_lifetime + 1)])
    lcoe = numerator / denominator
    return lcoe

@csrf_exempt
def calculate_lcoe(request):
    print(" ---------------------- CALCULATE LCOE ------------------------ ")
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if post:
        client_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        Currency_Type = post.get('financial_roi_currency_type')
        print(" -- CALCULATE LCOE Currency Type -- ", Currency_Type)
        if Currency_Type:
            filter_currency = Currency_Type
        else:
            filter_currency = "USD"
        params = {"entityTypeId": 144, "filter": {"stageId": "DT144_142:UC_C01F2M", "ufCrm8_1705746214":solar_project_id}}
        result = bx24.get_all('crm.item.list', params)
        total_initial_investment = 0
        for i,data in enumerate(result):
            solar_projectId = data['ufCrm8_1705746214']
            initial_investment = float(data['opportunity'])
            currency_Id = data['currencyId']
            initial_investment = currency_amount_convertion(initial_investment,currency_Id,filter_currency)
            total_initial_investment += initial_investment
        last_total_investment = total_initial_investment
        solar_project_params = {"entityTypeId": 177, "filter": {"id": solar_projectId}}
        solar_project_result = bx24.get_all('crm.item.list', solar_project_params)
        discount_rate = float(solar_project_result[0]['ufCrm100_1705997550263'])/100
        total_generation = solar_project_result[0]['ufCrm100_1694244101473']
        electricity_cost_for_kwh = currency_amount_convertion(int(solar_project_result[0]['ufCrm100_1705746355'][0]),'USD',filter_currency)
        capacity = solar_project_result[0]['ufCrm100_1694243678567']
        total_generation_daily = round(float(total_generation) * float(capacity) / 1000, 2)
        om_cost_per_year = 0  
        project_lifetime = 25
        electricity_saving_annual = round(float(total_generation_daily) * 365, 2)
        lcoe_result = calculate_lcoe_sum(
            last_total_investment, om_cost_per_year, project_lifetime, electricity_saving_annual, discount_rate
        )
        json_data[solar_projectId] = {"LCOE": round(lcoe_result, 2), "Currency_Type": Currency_Type}
        print(" ------- LCOE RESULT ------- ", json_data)
        return HttpResponse(json.dumps(json_data))


# --- Environmental Calculation ---

def Get_Access_Token():
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    secret = "ce35717972b25a49f6e97480bb115a84"
    username = "re-engineer03@green.com.pg"
    password = "Green@12345*"
    orgId = 195002
    passhash = hashlib.sha256(password.encode()).hexdigest()
    conn = http.client.HTTPSConnection(url)
    if orgId:
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash, "orgId": orgId})
    else:
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash})
    headers = {"Content-Type": "application/json"}
    endpoint = f"/account/v1.0/token?appId="+appid+"&language=en&="
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    data = json.loads(res.decode('utf-8'))
    # print(data["access_token"])
    return data["access_token"]

def SolarMan_HistoryList(plant_timezone,plantId,filter_type,from_date,to_date,generation_parameter,consumption_parameter):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    stationId = plantId
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    # print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"startTime":from_date,"endTime":to_date,"stationId": 3560357,"timeType":filter_type})
    endpoint = "//station/v1.0/history?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    # print(res)
    data = json.loads(res.decode('utf-8'))
    print(data)
    stationData=data['stationDataItems']
    print(stationData)
    generation_hours_list=[]
    consumption_hours_list=[]
    for i in stationData:
        generation_hours={}
        consumption_hours={}
        if filter_type==1:
            timezone_data = pytz.timezone(plant_timezone)
            timestamp = i['dateTime']
            datetime_obj = datetime.datetime.fromtimestamp(timestamp, timezone_data)
            formatted_date_time = datetime_obj.strftime("%Y-%m-%d %H:%M:%S")
            metric_date=(datetime_obj).isoformat()
            generation_metric=round(i[generation_parameter]/1000, 2)
            consumption_metric=round(i[consumption_parameter]/1000, 2)
        elif filter_type==2:
            print(i['year'],i['month'],i['day'])
            date = datetime.datetime(year=i['year'], month=i['month'], day=i['day'])
            formatted_date_time = date.strftime("%Y-%m-%d")
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        else:
            print(i['year'],i['month'])
            date = datetime(year=i['year'], month=i['month'], day=1)
            formatted_date_time = date.strftime('%Y-%m-%d %H:%M:%S')
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        generation_hours['x']=metric_date
        generation_hours['y']=generation_metric
        generation_hours_list.append(generation_hours)
        consumption_hours['x']=metric_date
        consumption_hours['y']=consumption_metric
        consumption_hours_list.append(consumption_hours)
        # print("Formatted Date and Time:", formatted_date_time)
    # print(generation_hours_list,consumption_hours_list)
    return generation_hours_list,consumption_hours_list

@csrf_exempt
def environmental_saving(request):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    post = request.POST
    if post:
        CarbonEmissionFilterYear = post.get("CarbonEmissionFilterYear")
        browser_date = CarbonEmissionFilterYear+"-12-31T18:29:59.999Z"
        browserTimezone=post.get("browserTimezone")
        solar_project_id = post.get('solar_project_id')
        # deal_id = int(post.get("deal_id"))
        filterd_data = "year"
        print('--- filterd_data --- ', filterd_data)
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
        params = {
            "entityTypeId": 177,
            "select": ["id", "title", "ufCrm100_1694243456358", "ufCrm100_1694243641441", "ufCrm100_1694243678567", "ufCrm100_1694244101473", "ufCrm100_1694853869","ufCrm100_1697701213648","ufCrm100_1697701244248","ufCrm100_1697699343842"],
            "filter": {"id":solar_project_id}
        }
        project_data = bx24.get_all('crm.item.list', params)
        browser_datetime = datetime.fromisoformat(browser_date[:-1])
        desired_timezone = pytz.timezone(browserTimezone)
        browser_datetime = browser_datetime.astimezone(desired_timezone)
        start_of_month = browser_datetime.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        end_of_month = browser_datetime.replace(day=30, hour=0, minute=0, second=0, microsecond=0)
        total_kwh_production_hourly_basis_list = []
        for item in project_data:
            date_str = item.get('ufCrm100_1694243456358')
            item_id = int(item.get('id'))
            # if deal_id == item_id:
            if date_str:
                date = parser.parse(date_str)
                days_difference = (browser_datetime - date).days
                item['no_of_days'] = days_difference
                item['capacity_in_kwh'] = round(float(item.get('ufCrm100_1694243678567')) / 1000, 2)
                item['total_generation_todate_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')) * days_difference, 2)
                item['total_generation_daily_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')), 2)
                item['total_generation_weekly_in_kwh'] = round(7 * float(item.get('total_generation_daily_in_kwh')), 2)
                item['total_generation_monthly_in_kwh'] = round(30 * float(item.get('total_generation_daily_in_kwh')), 2)
                item['carbon_emission_saved_todate'] = round((0.9 * float(item.get('total_generation_todate_in_kwh'))) / 1000, 2)
                item['consumption']= round(float((item.get('total_generation_todate_in_kwh'))-(item.get('capacity_in_kwh') *int(days_difference))),3)
                item['total_consumption_daily_in_kwh'] = item['consumption']/days_difference
                item['total_consumption_monthly_in_kwh'] = round(30 * float(item.get('total_consumption_daily_in_kwh')), 2)
                monthly_total_generation = round(item['total_generation_daily_in_kwh']*30,2)
                yearly_total_generation = round(item['total_generation_daily_in_kwh']*365,2)
                current_datetime_without_tz = browser_datetime.replace(tzinfo=None)
                start_of_year = datetime(current_datetime_without_tz.year, 1, 1)
                months_passed = (current_datetime_without_tz.year - start_of_year.year) * 12 + (current_datetime_without_tz.month - start_of_year.month)
                year_list = []
                for month in range(1, months_passed + 1):
                    first_day_of_month = datetime(current_datetime_without_tz.year, month, 1)
                    year_list.append(first_day_of_month)
                starting_of_the_year = browser_datetime.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
                
                days_passed_in_month = (browser_datetime - start_of_month).days + 1
                month_list = [start_of_month + timedelta(days=day - 1) for day in range(1, days_passed_in_month + 1)]
                generation_monthy_list = []
                consumption_monthy_list = []
                generation_yearly_list = []
                consumption_yearly_list = []
                min_value = 0.1
                max_value = 0.3
            if filterd_data == "month":
                if item.get('ufCrm100_1697699343842')==2528:
                    plant_timezone=item.get('ufCrm100_1697701213648')
                    plant_id=item.get('ufCrm100_1697701244248')
                    start_month_string=start_of_month.strftime("%Y-%m-%d")
                    end_month_string=end_of_month.strftime("%Y-%m-%d")
                    print(start_month_string,end_month_string)
                    generation_monthy_list, consumption_monthy_list =SolarMan_HistoryList(plant_timezone,plant_id,2,start_month_string,end_month_string,'generationValue','useValue')
                else:
                    for day in month_list:
                        value= random.uniform(min_value, max_value)
                        generation_monthy = {}
                        generation_monthly_cal = (item['total_generation_daily_in_kwh']) * value
                        generation_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                        generation_monthy['y'] = round(generation_monthly_cal, 2)
                        generation_monthy_list.append(generation_monthy)
                        # consumption_monthy = {}
                        # consumption_monthly_cal = item['total_consumption_daily_in_kwh'] * value
                        # consumption_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                        # consumption_monthy['y'] = round(consumption_monthly_cal, 2)
                        # consumption_monthy_list.append(consumption_monthy)
            print("--- MONTHLY LIST --- ",generation_monthy_list)
            if filterd_data == "year":
                if item.get('ufCrm100_1697699343842')==2528:
                    plant_timezone=item.get('ufCrm100_1697701213648')
                    plant_id=item.get('ufCrm100_1697701244248')
                    # start_date=start_of_month.strftime("%Y-%m-%d")
                    start_date = start_of_month.replace(month=1)
                    # Format the date as "YYYY-MM-dd"
                    # start_month_string = start_date.strftime("%Y-%m")
                    # end_month_string=end_of_month.strftime("%Y-%m")
                    start_month_string = CarbonEmissionFilterYear+'-01'
                    end_month_string=CarbonEmissionFilterYear+'-12'
                    print(start_month_string,end_month_string)
                    generation_yearly_list, consumption_yearly_list =SolarMan_HistoryList(plant_timezone,plant_id,3,start_month_string,end_month_string,'generationValue','useValue')
                    print(generation_yearly_list)
                else:
                    print("-- ENTER -- ")
                    for month_date in year_list:
                        value= random.uniform(min_value, max_value)
                        generation_yearly = {}
                        generation_yearly_cal = (item['total_generation_monthly_in_kwh']) * value
                        generation_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                        generation_yearly['y'] = round(generation_yearly_cal, 2)
                        generation_yearly_list.append(generation_yearly)
                        # consumption_yearly = {}
                        # consumption_yearly_cal = item['total_consumption_monthly_in_kwh'] * value
                        # consumption_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                        # consumption_yearly['y'] = round(consumption_yearly_cal, 2)
                        # consumption_yearly_list.append(consumption_yearly)
        generation_yearly_list.sort(key=lambda x: x['x'])
        emission_yearly_list = []
        Emission_Month_List = []
        for emission in generation_yearly_list:
            emission_month_str = emission['x']
            emission_month_datetime = datetime.strptime(emission_month_str, '%Y-%m-%d %H:%M:%S')
            emission_month = emission_month_datetime.strftime('%b')
            emission_value = round((emission['y']*0.000793),2)
            emission_yearly_list.append(emission_value)
            Emission_Month_List.append(emission_month)
        print("MONTH ---- ",Emission_Month_List)
        print("EMM ---- ",emission_yearly_list)
        # ------ PROJECT ENVIRONENTAL FACTORS ------
        url = "globalapi.solarmanpv.com"
        appid = "2023050914561532"
        conn = http.client.HTTPSConnection(url)
        access_token = Get_Access_Token()
        headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
        payload_real_data = json.dumps({"stationId": 3560357})
        endpoint_real_data = "//station/v1.0/realTime?language=en"
        conn.request("POST", endpoint_real_data, payload_real_data, headers)
        res_real_data = conn.getresponse().read()
        data_real_data = json.loads(res_real_data.decode('utf-8'))
        # print(" -- Data Real Data -- ", data_real_data)
        # --- Append Plant Real Data ---
        # production = data_real_data.get('generationPower', None)
        consumption = data_real_data.get('usePower', None)
        generation_power = data_real_data.get('generationTotal', None)
        yearly_basis_calc = generation_power - consumption
        # print(" --YEAR -- ", yearly_basis_calc)
        # print(" --TODATE-- ", generation_power)
        # --- Todate ---
        Todate_CO2_Saved = generation_power*0.000793
        print(" -- CO2 Saved -- ", Todate_CO2_Saved)
        Todate_CO2_Saved_Pounds = round(Todate_CO2_Saved*2204.62)
        # print(" -- CO2_Saved_Pounds -- ", Todate_CO2_Saved_Pounds)
        Todate_CO2_Saved_KG = round(Todate_CO2_Saved*1000)
        # print(" -- CO2_Saved_KG -- ", Todate_CO2_Saved_KG)
        # --- Yearly ---
        Yearly_CO2_Saved = generation_power*0.000793
        # print(" -- CO2 Saved -- ", Yearly_CO2_Saved)
        Yearly_CO2_Saved_Pounds = round(Todate_CO2_Saved*2204.62)
        # print(" -- CO2_Saved_Pounds -- ", Yearly_CO2_Saved_Pounds)
        Yearly_CO2_Saved_KG = round(Todate_CO2_Saved*1000)
        # print(" -- CO2_Saved_KG -- ", Yearly_CO2_Saved_KG)

        Coal_Saved = 0.000305*generation_power*1000
        # print(" --- Coal Saved --- ", Coal_Saved)

        Trees_Planted = round(generation_power*0.0545)
        # print(" --- Trees_Planted --- ", Trees_Planted)

        Fossil_Fuel_Saved = round(Todate_CO2_Saved/0.43)
        print("--- Fossil_Fuel_Saved --- ",Fossil_Fuel_Saved)
        
        
        gasoline_saved=round(generation_power/12.67)
        print("gasoline_saved",gasoline_saved)
        gallon_to_diesel=round(gasoline_saved/1.155)
        print("gallon_to_diesel",gallon_to_diesel)
        total_diesel_saved_litre=round(gallon_to_diesel*3.785)
        print("total_diesel_saved_litre",total_diesel_saved_litre)

        


        # Disel_Saved = round(Coal_Saved/0.84)
        # # print("--- Disel_Saved --- ", Disel_Saved)

        LightBulbs_Powered = round(yearly_basis_calc/60)
        # print(" -- Light Bulb Powerd -- ", LightBulbs_Powered)

        CarsTaken_of_the_road = round(Yearly_CO2_Saved_KG/7484.27)
        # print(" -- CarsTaken_of_the_road -- ", CarsTaken_of_the_road)
        total_production_presentage = generation_power/100/2
        total_consumption_presentage = consumption/100/2
        total_production_presentage = round(total_production_presentage)
        total_consumption_presentage = round(total_consumption_presentage)
        return JsonResponse({"Todate_CO2_Saved_KG": Todate_CO2_Saved_KG,"Trees_Planted": Trees_Planted, "Disel_Saved": total_diesel_saved_litre,
                             "LightBulbs_Powered": LightBulbs_Powered, "CarsTaken_of_the_road": CarsTaken_of_the_road, "Total_Production": generation_power,
                             "Total_Consumption": consumption, "Emission_Yearly_List": emission_yearly_list, "Emission_Month_List": Emission_Month_List,
                             "Total_Production_Presentage": total_production_presentage, "Total_Consumption_Presentage": total_consumption_presentage})


@csrf_exempt
def SolarMan_PlantData(request):
    print(" ---------------------- SOLAR MAN PLANT DATA ----------------------")
    json_data = {}
    post = request.POST
    if post:
        solar_project_id = post.get("solar_project_id")
        url = "globalapi.solarmanpv.com"
        appid = "2023050914561532"
        conn = http.client.HTTPSConnection(url)
        access_token = Get_Access_Token()
        print("++++++++++ACCESS TOKEN+++++++++", access_token)
        headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
        payload_real_data = json.dumps({"stationId": 3560357})
        endpoint_real_data = "//station/v1.0/realTime?language=en"
        conn.request("POST", endpoint_real_data, payload_real_data, headers)
        res_real_data = conn.getresponse().read()
        data_real_data = json.loads(res_real_data.decode('utf-8'))
        result_list = []
        # Append Plant Real Data
        production = round(data_real_data.get('generationPower', None)/1000,2)
        consumption = round(data_real_data.get('usePower', None)/1000,2)
        generation_power = data_real_data.get('generationTotal', None)
        battery_power = round(data_real_data.get('batteryPower', None)/1000)
        grid = round(data_real_data.get('gridValue', 0))
        plant_real_data = {
            'production': production,
            'consumption': consumption,
            'generation_power': generation_power,
            'battery_power': battery_power,
            'grid': grid
        }
        result_list.append({'plant_real_data': [plant_real_data]})
        payload_plant_list = json.dumps({"page": 1, "size": 50})
        endpoint_plant_list = "//station/v1.0/list?language=en"
        conn.request("POST", endpoint_plant_list, payload_plant_list, headers)
        res_plant_list = conn.getresponse().read()
        data_plant_list = json.loads(res_plant_list.decode('utf-8'))
        specified_station_id = 3560357
        if 'stationList' in data_plant_list:
            for station in data_plant_list['stationList']:
                if station.get('id') == specified_station_id:
                    installed_capacity = station.get('installedCapacity', None)
                    power_normalized=round(production/installed_capacity*100,2)
                    station_data = {
                        'capacity': installed_capacity,
                        'power_normalized':power_normalized,
                        'name': station.get('name', None),

                    }
                    result_list.append({'station_data': [station_data]})

        json_data['solar_plant_data'] = result_list
        return HttpResponse(json.dumps(json_data))
    
    
def SolarMan_HistoryList(plant_timezone,plantId,filter_type,from_date,to_date,generation_parameter,consumption_parameter):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    stationId = plantId
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    # print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"startTime":from_date,"endTime":to_date,"stationId": 3560357,"timeType":filter_type})
    endpoint = "//station/v1.0/history?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    # print(res)
    data = json.loads(res.decode('utf-8'))
    print(data)
    stationData=data['stationDataItems']
    print(stationData)
    generation_hours_list=[]
    consumption_hours_list=[]
    for i in stationData:
        generation_hours={}
        consumption_hours={}
        if filter_type==1:
            timezone_data = pytz.timezone(plant_timezone)
            timestamp = i['dateTime']
            datetime_obj = datetime.fromtimestamp(timestamp, timezone_data)
            formatted_date_time = datetime_obj.strftime("%Y-%m-%d %H:%M:%S")
            metric_date=(datetime_obj).isoformat()
            generation_metric=round(i[generation_parameter]/1000, 2)
            consumption_metric=round(i[consumption_parameter]/1000, 2)
        elif filter_type==2:
            print(i['year'],i['month'],i['day'])
            date = datetime(year=i['year'], month=i['month'], day=i['day'])
            formatted_date_time = date.strftime("%Y-%m-%d")
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        else:
            print(i['year'],i['month'])
            date = datetime(year=i['year'], month=i['month'], day=1)
            formatted_date_time = date.strftime('%Y-%m-%d %H:%M:%S')
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        generation_hours['x']=metric_date
        generation_hours['y']=generation_metric
        generation_hours_list.append(generation_hours)
        consumption_hours['x']=metric_date
        consumption_hours['y']=consumption_metric
        consumption_hours_list.append(consumption_hours)
        # print("Formatted Date and Time:", formatted_date_time)
    # print(generation_hours_list,consumption_hours_list)
    return generation_hours_list,consumption_hours_list



@csrf_exempt
def month_and_year_basis_solarmetrics_calc(request):
    print("============= Solar Metrix Monthly & Yearly Basis Calculation =============")
    json_data = {}
    # try:
    if request:
        post = request.POST
        if post:
            browser_date =post.get("date")
            print("browser_date",browser_date)
            browserTimezone=post.get("browserTimezone")
            print("browserTimezone",browserTimezone)
            filterd_data = post.get("filterdData")
            print('--- filterd_data --- ', filterd_data)
            solar_project_id = post.get("solar_project_id")
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            params = {
                "entityTypeId": 177,
                "select": ["id", "title", "ufCrm100_1694243456358", "ufCrm100_1694243641441", "ufCrm100_1694243678567", "ufCrm100_1694244101473", "ufCrm100_1694853869","ufCrm100_1697701213648","ufCrm100_1697701244248","ufCrm100_1697699343842"],
                "filter": {"id": solar_project_id}
            }
            project_data = bx24.get_all('crm.item.list', params)
            browser_datetime = datetime.fromisoformat(browser_date[:-1])
            desired_timezone = pytz.timezone(browserTimezone)
            browser_datetime = browser_datetime.astimezone(desired_timezone)
            start_of_month = browser_datetime.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            end_of_month = browser_datetime.replace(day=29, hour=0, minute=0, second=0, microsecond=0)
            browser_datetime = datetime.fromisoformat(browser_date[:-1]) # Remove 'Z' and parse
            desired_timezone = pytz.timezone(browserTimezone)
            browser_datetime = browser_datetime.astimezone(desired_timezone)
            hours_in_desired_timezone = browser_datetime.hour
            start_of_day_utc = browser_datetime.replace(hour=0, minute=0, second=0, microsecond=0)
            current_day_utc = browser_datetime.replace(hour=hours_in_desired_timezone, minute=0, second=0, microsecond=0)
            passed_hours_list = [hour for hour in range(0, int(hours_in_desired_timezone) + 1)]
            
            total_kwh_production_hourly_basis_list = []
            for item in project_data:
                date_str = str(item.get('ufCrm100_1694243456358'))
                item_id = int(item.get('id'))
                date = parser.parse(date_str)
                days_difference = (browser_datetime - date).days
                item['no_of_days'] = days_difference
                item['capacity_in_kwh'] = round(float(item.get('ufCrm100_1694243678567')) / 1000, 2)
                item['total_generation_todate_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')) * days_difference, 2)
                item['total_generation_daily_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')), 2)
                item['total_generation_weekly_in_kwh'] = round(7 * float(item.get('total_generation_daily_in_kwh')), 2)
                item['total_generation_monthly_in_kwh'] = round(30 * float(item.get('total_generation_daily_in_kwh')), 2)
                item['carbon_emission_saved_todate'] = round((0.9 * float(item.get('total_generation_todate_in_kwh'))) / 1000, 2)
                item['consumption']= round(float((item.get('total_generation_todate_in_kwh'))-(item.get('capacity_in_kwh') *int(days_difference))),3)
                item['total_consumption_daily_in_kwh'] = item['consumption']/days_difference
                item['total_consumption_monthly_in_kwh'] = round(30 * float(item.get('total_consumption_daily_in_kwh')), 2)
                monthly_total_generation = round(item['total_generation_daily_in_kwh']*30,2)
                yearly_total_generation = round(item['total_generation_daily_in_kwh']*365,2)
                current_datetime_without_tz = browser_datetime.replace(tzinfo=None)
                start_of_year = datetime(current_datetime_without_tz.year, 1, 1)
                months_passed = (current_datetime_without_tz.year - start_of_year.year) * 12 + (current_datetime_without_tz.month - start_of_year.month)
                year_list = []
                for month in range(1, months_passed + 1):
                    first_day_of_month = datetime(current_datetime_without_tz.year, month, 1)
                    year_list.append(first_day_of_month)
                starting_of_the_year = browser_datetime.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
                
                days_passed_in_month = (browser_datetime - start_of_month).days + 1
                month_list = [start_of_month + timedelta(days=day - 1) for day in range(1, days_passed_in_month + 1)]
                generation_monthy_list = []
                consumption_monthy_list = []
                generation_yearly_list = []
                consumption_yearly_list = []
                generation_hours_list=[]
                consumption_hours_list=[]
                min_value = 0.1
                max_value = 0.3
                if filterd_data == "days":
                    if item.get('ufCrm100_1697699343842')==2528:
                        plant_timezone=item.get('ufCrm100_1697701213648')
                        plant_id=item.get('ufCrm100_1697701244248')
                        current_date_string=start_of_day_utc.strftime("%Y-%m-%d")
                        generation_hours_list, consumption_hours_list =SolarMan_HistoryList(plant_timezone,plant_id,1,current_date_string,current_date_string,'generationPower','usePower')
                    else:
                        for hours in passed_hours_list:
                            generation_hours={}
                            consumption_hours={}
                            value= random.uniform(min_value, max_value)
                            generation_hours['x']=(browser_datetime.replace(hour=hours, minute=0, second=0, microsecond=0)).isoformat()
                            generation_hours['y']=round(item['total_generation_daily_in_kwh'] * value, 2)
                            generation_hours_list.append(generation_hours)
                            consumption_hours['x']=(browser_datetime.replace(hour=hours, minute=0, second=0, microsecond=0)).isoformat()
                            consumption_hours['y']=round((item['consumption']/days_difference) * value, 2)
                            consumption_hours_list.append(consumption_hours)
                if filterd_data == "month":
                    if item.get('ufCrm100_1697699343842')==2528:
                        plant_timezone=item.get('ufCrm100_1697701213648')
                        plant_id=item.get('ufCrm100_1697701244248')
                        start_month_string=start_of_month.strftime("%Y-%m-%d")
                        end_month_string=end_of_month.strftime("%Y-%m-%d")
                        print(start_month_string,end_month_string)
                        generation_monthy_list, consumption_monthy_list =SolarMan_HistoryList(plant_timezone,plant_id,2,start_month_string,end_month_string,'generationValue','useValue')
                    else:
                        for day in month_list:
                            value= random.uniform(min_value, max_value)
                            generation_monthy = {}
                            generation_monthly_cal = (item['total_generation_daily_in_kwh']) * value
                            generation_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                            generation_monthy['y'] = round(generation_monthly_cal, 2)
                            generation_monthy_list.append(generation_monthy)
                            consumption_monthy = {}
                            consumption_monthly_cal = item['total_consumption_daily_in_kwh'] * value
                            consumption_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                            consumption_monthy['y'] = round(consumption_monthly_cal, 2)
                            consumption_monthy_list.append(consumption_monthy)
                print("--- MONTHLY LIST --- ",generation_monthy_list)
                if filterd_data == "year":
                    if item.get('ufCrm100_1697699343842')==2528:
                        plant_timezone=item.get('ufCrm100_1697701213648')
                        plant_id=item.get('ufCrm100_1697701244248')
                        start_date = start_of_month.replace(month=1)
                        start_month_string = start_date.strftime("%Y-%m")
                        end_month_string=end_of_month.strftime("%Y-%m")
                        print(start_month_string,end_month_string)
                        generation_yearly_list, consumption_yearly_list =SolarMan_HistoryList(plant_timezone,plant_id,3,start_month_string,end_month_string,'generationValue','useValue')
                        print(generation_yearly_list)
                    else:
                        print("-- ENTER -- ")
                        for month_date in year_list:
                            value= random.uniform(min_value, max_value)
                            generation_yearly = {}
                            generation_yearly_cal = (item['total_generation_monthly_in_kwh']) * value
                            generation_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                            generation_yearly['y'] = round(generation_yearly_cal, 2)
                            generation_yearly_list.append(generation_yearly)
                            consumption_yearly = {}
                            consumption_yearly_cal = item['total_consumption_monthly_in_kwh'] * value
                            consumption_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                            consumption_yearly['y'] = round(consumption_yearly_cal, 2)
                            consumption_yearly_list.append(consumption_yearly)

                print("--generation_hours_list--",generation_hours_list)
                print("--consumption_hours_list--",consumption_hours_list)
                print("--generation_monthy_list--",generation_monthy_list)
                print("--consumption_monthy_list--",consumption_monthy_list)
                print("--generation_yearly_list--",generation_yearly_list)
                print("--consumption_yearly_list--",consumption_yearly_list)
                minimum_date_day = start_of_day_utc.isoformat()
                print("minimum_date",minimum_date_day)
                maximum_date_day = current_day_utc.isoformat()
                print("maximum_date",maximum_date_day)
        
                minimum_date = start_of_month.isoformat()
                print("minimum_date",minimum_date)
                maximum_date = browser_datetime.isoformat()
                print("minimum_date",maximum_date)
                year_minimum_date = starting_of_the_year.isoformat()
                
                year_minimum_date = starting_of_the_year.isoformat()
                total_project_production = {"total_generation_monthly_in_kwh": monthly_total_generation,
                                            "total_generation_yearly_in_kwh": yearly_total_generation,
                                            "generation_monthy_list": generation_monthy_list,
                                            "consumption_monthy_list": consumption_monthy_list,
                                            "minimum_date": minimum_date_day,
                                            "maximum_date": maximum_date_day,
                                            "generation_yearly_list": generation_yearly_list,
                                            "consumption_yearly_list": consumption_yearly_list,
                                            "filterd_data":filterd_data,
                                            "year_minimum_date": year_minimum_date,
                                            "generation_hours_list": generation_hours_list,
                                            "consumption_yearly_list": consumption_yearly_list,
                                            "consumption_hours_list": consumption_hours_list,
                                            "minimum_date_month":minimum_date,
                                            "maximum_date_month":maximum_date,
                                            "year_minimum_date":year_minimum_date
                                            
                                            # "data_count_list": data_count_list}
                }
                total_kwh_production_hourly_basis_list.append(total_project_production)
            json_data['monthly_solar_production_data'] = total_kwh_production_hourly_basis_list
            return HttpResponse(json.dumps(json_data))

#  -------------- DATA BASE INSERTION -----------------

def get_database_connection():
    return psycopg2.connect(
        dbname="gprogress",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )

def userActivityUpdate(contact_id, solar_project_id, user_activity, user_activity_id):
    conn = get_database_connection()
    cur = conn.cursor()
    data_base_id = None  # Initialize data_base_id to None before the try block
    try:
        cur.execute("""select contact_id from client_partner_logs where id = {0} """.format(user_activity_id))
        contact_id = cur.fetchone()[0]
        print(" ___CONTA ID___ ", contact_id)
        cur.execute("""select user_activity FROM client_partner_logs where id = {0} """.format(user_activity_id))
        existing_user_activity = cur.fetchone()[0]
        if existing_user_activity:
            new_user_activity = str(existing_user_activity) + "," + str(user_activity)
        else:
            new_user_activity = user_activity
        if contact_id:
            cur.execute('''
                UPDATE client_partner_logs
                SET solar_project_id = %s,
                    user_activity = %s
                WHERE id = %s returning id
            ''', (solar_project_id, new_user_activity, user_activity_id))
            data_base_id = cur.fetchone()[0]
            print("--- Update Success --- ")
        conn.commit()
    except Exception as e:
        print(" --- Update --- DB Data --- ", e)
    finally:
        cur.close()
        conn.close()
        return data_base_id


def databaseIntegration(contact_id, company_id, contact_email, contact_name, contact_logged_in_status, contact_logged_in_time,user_timezone,user_geolocation,country_code,country_name):
    conn = get_database_connection()
    cur = conn.cursor()
    data_base_id = None
    try:
        cur.execute('''
            INSERT INTO client_partner_logs(
                contact_id,
                company_id,
                contact_person_email,
                contact_person_name,
                logged_in_status,
                logged_in_time,
                user_timezone,
                user_geolocation,
                country_code,
                country_name
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) returning id
        ''', (contact_id, company_id, contact_email, contact_name, contact_logged_in_status, contact_logged_in_time, user_timezone,user_geolocation,country_code,country_name))
        print("--- NEW USER Insertion Success --- ")
        data_base_id = cur.fetchone()[0]
        conn.commit()
    except Exception as e:
        print("--- Insertion ERROR --- :", e)
    finally:
        cur.close()
        conn.close()
        return data_base_id


def userLogOut(contact_id,user_logout_time, contact_logged_in_status, user_activity_id):
    conn = get_database_connection()
    cur = conn.cursor()
    data_base_id = None
    try:
        cur.execute("""select contact_id from client_partner_logs where id={0} """.format(user_activity_id))
        contact_id = cur.fetchone()[0]
        if contact_id:
            cur.execute('''
                UPDATE client_partner_logs
                SET logged_out_time = %s,
                    logged_in_status = %s
                WHERE id = %s returning id
            ''', (user_logout_time,contact_logged_in_status,user_activity_id))
            print("--- Update Success --- ")
            data_base_id = cur.fetchone()[0]
        conn.commit()
    except Exception as e:
        print("--- Log Out --- :", e)
    finally:
        cur.close()
        conn.close()
        return data_base_id
    
def individualLogInsertion(log_type, log_date, log_user, user_id):
    conn = get_database_connection()
    cur = conn.cursor()
    data_base_id = None
    try:
        cur.execute('''
            INSERT INTO individual_user_log(
                log_type,
                log_date,
                log_user_id,
                user_id
            ) VALUES (%s, %s, %s, %s) returning id
        ''', (log_type, log_date, log_user, user_id))
        print("--- Individual Log Insertion Success --- ")
        data_base_id = cur.fetchone()[0]
        conn.commit()
    except Exception as e:
        print("--- Insertion ERROR --- :", e)
    finally:
        cur.close()
        conn.close()
        return data_base_id

@csrf_exempt
def client_partner_database_insertion(request):
    print(" ------ INSERTION DATABASE HIT ------")
    json_data = {}
    post = request.POST
    if post:
        contact_id = post.get('clientID')
        company_id = post.get('companyID')
        contact_email = post.get('client_email')
        contact_name = post.get('client_name')
        contact_logged_in_status = post.get('logged_in_status')
        contact_logged_in_time = post.get('logged_in_time')
        user_timezone = post.get('user_timezone')
        user_geolocation = post.get('user_geolocation')
        country_code = post.get('user_country_code')
        country_name = post.get('user_country')
        login_data_insertion = databaseIntegration(contact_id,company_id,contact_email,contact_name,contact_logged_in_status,contact_logged_in_time,user_timezone,user_geolocation,country_code,country_name)
        print("-- LOGIN -- DATA -- ",login_data_insertion)
        json_data['data_base_id'] = login_data_insertion
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def client_partner_user_activity(request):
    print(" ------ USER ACTIVITY TRACKING ------")
    json_data = {}
    post = request.POST
    if post:
        contact_id = post.get('client_id')
        solar_project_id = post.get('solar_project_id')
        user_activity = post.get('user_activity')
        user_logout_time = post.get('logged_out_time')
        user_activity_id = post.get('user_activity_id')
        user_log_date = post.get('user_log_date')
        user_activity_insertion = userActivityUpdate(contact_id, solar_project_id, user_activity, user_activity_id)
        user_activity_data = json.loads(user_activity)
        module_value = user_activity_data[0]["Module"]
        user_individual_log = individualLogInsertion(module_value,user_log_date,user_activity_id,contact_id)
        if user_logout_time:
            user_logout_time = user_logout_time.split(' GMT')[0]
            contact_logged_in_status = post.get('logged_in_status')
            user_logout = userLogOut(contact_id, user_logout_time, contact_logged_in_status,user_activity_id)
            data_base_id = user_logout
    return HttpResponse(json.dumps(json_data))


def project_monitoring_control(request):
    json_data={}
    # database connection established
    conn = psycopg2.connect(database="gprogress", user="postgres", password="postgres", host="localhost", port="5432")
    cr = conn.cursor()
    # try:
    if request.method == 'GET':
        project_id =74

    #    project calender and monthly project completion percent
        
        cr.execute("""SELECT total_days_of_project,elapsed_days,remaining_days,delay_days,engineering_phase1_completion,procurement_phase2_completion,
                   construction_phase3_completion,overall_progress,planned_man_power,actual_man_power,start_date,end_date,engineering_phase1_total_task_count,
                    procurement_phase2_total_task_count ,construction_phase3_total_task_count,forecast_end_date FROM cp_project_monitoring_metrics
                   WHERE id = %s""", (project_id,))
        
        cp_project_monitoring_metrics = cr.fetchall()

        total_days_of_project = cp_project_monitoring_metrics[0][0]
        if not total_days_of_project:
            total_days_of_project = 0

        elapsed_days = cp_project_monitoring_metrics[0][1]
        if not elapsed_days:
            elapsed_days = 0

        remaining_days = cp_project_monitoring_metrics[0][2]
        if not remaining_days:
            remaining_days = 0

        delay_days =  cp_project_monitoring_metrics[0][3]
        if not delay_days:
            delay_days = 0

        engineering_phase1_completion = cp_project_monitoring_metrics[0][4]   
        procurement_phase2_completion = cp_project_monitoring_metrics[0][5]
        construction_phase3_completion = cp_project_monitoring_metrics[0][6]
        overall_progress =  cp_project_monitoring_metrics[0][7]
        planned_man_power = cp_project_monitoring_metrics[0][8]
        actual_man_power = cp_project_monitoring_metrics[0][9]
        project_start_date = cp_project_monitoring_metrics[0][10]
        project_end_date = cp_project_monitoring_metrics[0][11]
        engineering_phase1_total_task_count=cp_project_monitoring_metrics[0][12]
        procurement_phase2_total_task_count = cp_project_monitoring_metrics[0][13]
        construction_phase3_total_task_count = cp_project_monitoring_metrics[0][14]
        forecast_end_date = cp_project_monitoring_metrics[0][15]

        # phase based actual completed task
        phase1_actual_completed_task = round((engineering_phase1_completion / 100) * engineering_phase1_total_task_count)
        phase2_actual_completed_task = round((procurement_phase2_completion / 100)* procurement_phase2_total_task_count)
        phase3_actual_completed_task = round((construction_phase3_completion / 100)* construction_phase3_total_task_count)

        # Parsed date
        parsed_date_only = forecast_end_date.date()
        paresed_date_str = parsed_date_only.strftime("%d-%b-%Y")

        project_start_date = "2023-01-05 03:11:15+05:30"
        project_end_date = "2023-06-09 03:43:55+05:30"

    #   project start date
        date_object_start = datetime.strptime(project_start_date, "%Y-%m-%d %H:%M:%S%z")
        start_date= date_object_start.strftime("%d-%b-%Y")
    # project end date
        date_object_end = datetime.strptime(project_end_date, "%Y-%m-%d %H:%M:%S%z")
        end_date= date_object_end.strftime("%d-%b-%Y")

      
        print(engineering_phase1_total_task_count,procurement_phase2_total_task_count,construction_phase3_total_task_count,project_start_date,project_end_date)
    #  change format to filter data (month and year) 
        startdate = datetime.strptime(project_start_date, "%Y-%m-%d %H:%M:%S%z")
        enddate = datetime.strptime(project_end_date, "%Y-%m-%d %H:%M:%S%z")
        current_date = startdate

        overall_data_list=[]
        phase1_completion_list =[]
        phase2_completion_list=[]
        phase3_completion_list=[]

        while current_date <= enddate:
            month = int(current_date.strftime("%m"))
            year = current_date.strftime("%Y")   

            print("Month:", month)
            print("Year:", year)
            current_date = current_date + timedelta(days=30)  


            cr.execute("""SELECT phase1_planned_completion_count ,phase1_actual_completion_count,phase2_planned_completion_count,phase2_actual_completion_count,
                    phase3_planned_completion_count,phase3_actual_completion_count FROM cp_monthly_wise_project_data WHERE project_id = %s AND month = %s AND year = %s""",(project_id,month,year))
            phase_completion_data = cr.fetchall()
            print(phase_completion_data)

            phase1_planned_completion_value = phase_completion_data[0][0]
            phase1_actual_completion_value = phase_completion_data[0][1]
            phase2_planned_completion_value = phase_completion_data[0][2]
            phase2_actual_completion_value = phase_completion_data[0][3]
            phase3_planned_completion_value = phase_completion_data[0][4]
            phase3_actual_completion_value = phase_completion_data[0][5]

# phase1_planned_completion_count,phase1_planned_completion_count
            if phase1_planned_completion_value and engineering_phase1_total_task_count:
                phase1_planned_completion_percent = round((phase1_planned_completion_value/engineering_phase1_total_task_count)*100)
            else:
                phase1_planned_completion_percent=0
   

            if phase1_actual_completion_value and engineering_phase1_total_task_count:
                phase1_actual_completion_percent = round((phase1_actual_completion_value/engineering_phase1_total_task_count)*100)
            else:
                phase1_actual_completion_percent=0


            phase1_completion_list.append({
                        "phase1_planned_completion_percent": phase1_planned_completion_percent,
                        "phase1_actual_completion_percent": phase1_actual_completion_percent ,
                        "month": month,
                        "year":year})
            
# phase2_planned_completion_count,phase2_planned_completion_count

            if phase2_planned_completion_value and procurement_phase2_total_task_count:
                phase2_planned_completion_percent = round((phase2_planned_completion_value/procurement_phase2_total_task_count)*100)
            else:
                phase2_planned_completion_percent=0
        
            if phase2_actual_completion_value and procurement_phase2_total_task_count:
                phase2_actual_completion_percent = round((phase2_actual_completion_value/procurement_phase2_total_task_count)*100)
            else:
                phase2_actual_completion_percent=0

            phase2_completion_list.append({
                        "phase2_planned_completion_percent": phase2_planned_completion_percent,
                        "phase2_actual_completion_percent": phase2_actual_completion_percent ,
                        "month": month,
                        "year":year})
            
# phase3_planned_completion_count,phase3_planned_completion_count

            if phase3_planned_completion_value and construction_phase3_total_task_count:
                phase3_planned_completion_percent = round((phase3_planned_completion_value/construction_phase3_total_task_count)*100)
            else:
                phase3_planned_completion_percent=0

            if phase3_actual_completion_value and construction_phase3_total_task_count:
                phase3_actual_completion_percent = round((phase3_actual_completion_value/construction_phase3_total_task_count)*100)
            else:
                phase3_actual_completion_percent =0 

            phase3_completion_list.append({
                        "phase3_planned_completion_percent": phase3_planned_completion_percent,
                        "phase3_actual_completion_percent": phase3_actual_completion_percent ,
                        "month": month,
                        "year":year})

        overall_data = {"phase1_completion_list": phase1_completion_list,
                        "phase2_completion_list": phase2_completion_list,
                        "phase3_completion_list": phase3_completion_list,
                        "engineering_phase1_completion_percent":engineering_phase1_completion,
                        "procurement_phase2_completion_percent":procurement_phase2_completion,
                        "construction_phase3_completion_percent":construction_phase3_completion,
                        "overall_progress":overall_progress,
                        "planned_man_power":planned_man_power,
                        "actual_man_power":actual_man_power,
                        "start_date":start_date,
                        "end_date":end_date,
                        "total_days_of_project":total_days_of_project,
                        "elapsed_days":elapsed_days,
                        "remaining_days":remaining_days,
                        "delay_days":delay_days,
                        "parsed_date_only":paresed_date_str,
                        "phase1_actual_completed_task":phase1_actual_completed_task,
                        "phase2_actual_completed_task":phase2_actual_completed_task,
                        "phase3_actual_completed_task":phase3_actual_completed_task,
                        "engineering_phase1_total_task_count":engineering_phase1_total_task_count,
                        "procurement_phase2_total_task_count":procurement_phase2_total_task_count,
                        "construction_phase3_total_task_count":construction_phase3_total_task_count
                        }
        
        overall_data_list.append(overall_data)
        json_data['project_monitoring_data'] = overall_data_list
            
    # except Exception as e:
    #     print("Error:", e)
    print(json_data)
    return HttpResponse(json.dumps(json_data))


# ------ CLIENT PARTNER REGISTRATION -------
# @csrf_exempt
# def client_partner_registration(request):
#     json_data = {}
#     post = request.POST
#     bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
#     if post:
#         first_name = post.get('firstname')
#         last_name = post.get('lastname')
#         gender = post.get('gender')
#         organization_email = post.get('organization_email')
#         mobile_number = post.get('mobile_number')
#         organization = post.get('organization')
#         project = post.get('project')
#         project_capacity = post.get('project_capacity')
#         registration_params = {
#             'entityTypeId': 182,
#             "fields": {
#                 "categoryId":358,
#                 "ufCrm118_1707719834": first_name,
#                 "ufCrm118_1707719863": last_name,
#                 "ufCrm118_1707719873": gender,
#                 "ufCrm118_1707719903": organization_email,
#                 "ufCrm118_1707719927": mobile_number,
#                 "ufCrm118_1707719966": organization,
#                 "ufCrm118_1707719993": project,
#                 "ufCrm118_1707720013": project_capacity,
#                 }
#             }
#         registration_result = bx24.get_all('crm.item.add', registration_params)
#         if registration_result:
#             html_body = f"""
#             <html>
#             <body style="font-family: sans-serif;">
#             <div style="background-color: #f6faff; width: 100%; padding: 25px;">
#             <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
#             <table style="width: 100%; text-align: right;">
#             <tr>
#             <td>
#             <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;" />
#             </td>
#             </tr>
#             </table>
#             <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
#             <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
#             <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {first_name} {last_name},</p>
#             <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Thank you for registering with GREEN Client Partner. We appreciate your trust in us.</p>
#             <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Our team is processing your registration, and we'll be in touch soon. If there are any additional details needed or if you have questions, feel free to reach us.</p>
#             <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;">Stay tuned for updates and details , and we look forward to serving you!</p>
#             <p style="margin-top: 30px; font-size: 14px; font-family: sans-serif;"><b>Support Team</b></p>
#             <p style="margin-top: 5px; font-size: 14px; font-family: sans-serif;">GREEN Limited</p>
#             </div>
#             <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
#             <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;">Green Limited</p>
#             </div>
#             </div>
#             </div>
#             </div>
#             </body>
#             </html>
#             """
#             sender_email = 'digitaladmin@green.com.pg'
#             sender_password = 'WinGREEN2024*'
#             to_address = ['sandhiya.arjunan@nexttechnosolutions.co.in']
#             cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
#             bcc_address = ["janet.james@nexttechnosolutions.co.in"]
#             subject = f'Thank You for Registering with Us!'
#             message = MIMEMultipart()
#             message['From'] = "GREEN ADMIN"
#             message['To'] = ",".join(to_address)
#             message['Cc']=",".join(cc_address)
#             message['Bcc'] = ",".join(bcc_address)
#             message['Subject'] = subject
#             for bcc_email in bcc_address:
#                 message['Bcc'] = bcc_email
#             # Send the email
#             try:
#                 body = MIMEText(html_body, 'html')
#                 message.attach(body)
#                 server = smtplib.SMTP('smtp.gmail.com', 587)
#                 server.starttls()
#                 server.login(sender_email, sender_password)
#                 server.send_message(message)
#                 server.quit()
#                 html_body = ''
#                 print("Email sent successfully!")
#                 html_body = ''
#             except Exception as e:
#                 print("Email could not be sent. Error:", str(e))
#             json_data['Code'] = "001"
#             json_data['Message'] = "Registration Success"
#             return HttpResponse(json.dumps(json_data))
#     else:
#         json_data['Code'] = "002"
#         json_data['Message'] = "Registration Faild"
#         return HttpResponse(json.dumps(json_data))

@csrf_exempt
def client_partner_resetpassword(request):
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        post = request.POST
        if post:
            client_id = int(post.get('client_id'))
            client_partner_reset_password = post.get('newpassword')
            client_email_id = post.get("client_email")
            params = {"id": client_id,
                             "fields": {
                                 "UF_CRM_1707795488198": client_partner_reset_password
                             }}
            contact_password_update = bx24.get_all('crm.contact.update', params)

            contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1707795488198"]}
            contact_data = bx24.get_all('crm.contact.list', contact_params)
            contact_name_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    name = contact.get('NAME', '')
                    second_name = contact.get('LAST_NAME', '')
                    if company_id is not None:
                        contact_name_dict[email] = second_name
            company_contact_list_params={"filter":{"ID":client_id},"select": ["ID","NAME","LAST_NAME","EMAIL","HONORIFIC","UF_CRM_1707795488198"]}
            company_contact_list_response = bx24.get_all('crm.contact.list', company_contact_list_params)
            contact_salutation_dict = {}
            for contact in company_contact_list_response:
                contact_email_address=contact['EMAIL'][0]['VALUE']
                contact_salutation=contact['HONORIFIC']
                if contact_salutation == 'HNR_EN_1':
                    contact_salutation = 'Mr.'
                elif contact_salutation == 'HNR_EN_2':
                    contact_salutation = 'Mrs.'
                elif contact_salutation == 'HNR_EN_3':
                    contact_salutation = 'Ms.'
                elif contact_salutation == 'HNR_EN_4':
                    contact_salutation = 'Dr.'
                contact_salutation_dict[contact_email_address] = contact_salutation
            contact_person_salutation = contact_salutation_dict[client_email_id]
            contact_person_name = contact_name_dict[client_email_id]
            if contact_password_update:
                html_body = f"""
             <html>
                <body style="font-family: sans-serif;">
                <div style="background-color: #f6faff;width: 100%;/* padding: 25px; */">
                <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                <table style="width: 100%; text-align: right;">
                <tr>
                <td>
                <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;"/>
                </td>
                </tr>
                </table>
                <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
                <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_person_salutation} {contact_person_name},</p>
                <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">The password reset request for your GREEN's Value Engineering account was successful. Your account is safe with your new password.</p>
                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">Thank you for choosing us and we value your belief in us.</p>
                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">For inquiries or help, contact our support team.    </p>
                <p style="margin-top: 30px; font-size: 14px; font-family: sans-serif;text-align:justify">Thanks,</p>
                <p style="margin-top: -7px; font-size: 14px; font-family: sans-serif;text-align:justify">Support Team</p>
                <p style="margin-top: -4px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>GREEN Limited</b></p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">Note: This is a system generated e-mail, please do not reply to it.</p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">* This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system *</p>
                </div>
                <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
                <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;"><a href="https://green.com.pg/" style="text-decoration: none; color:#646464;">GREEN Limited</a></p>
                </div>
                </div>
                </div>
                </div>
                </body>
                </html>
                """
                sender_email = 'digitaladmin@green.com.pg'
                sender_password = 'WinGREEN2024*'
                to_address = [client_email_id]
                #to_address = ['jennyjamesmsc@gmail.com']
                # cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
                #bcc_address = ["janet.james@nexttechnosolutions.co.in, bernard@green.com.pg, sobhan.kumar@green.com.pg"]
                #bcc_address = ["sandhiya.arjunan@nexttechnosolutions.co.in, vijith.vijayan@nexttechnosolutions.co.in"]
                subject = f"GREEN's Value Engineering - Password Reset Confirmation"
                '''<p style="margin-top: 10px; font-size: 14px; margin-bottom: 10px; font-family: sans-serif;text-align:justify">If you did not initiate this password change, then please click on the link below to set a new password. We take the security of your account seriously and will assist you in resolving any issues promptly.</p>
                <a href="https://green.com.pg/client-partner-forgotpassword.html?email={client_email_id}&id{client_id}" style="background-color: #23b14d;padding: 8px 25px;margin-left: auto;margin-right: auto;display: table;border: 0;color: #fff;font-size: 15px;letter-spacing: 0.5px;font-weight: bold;border-radius: 5px;text-decoration: none;">Reset Here</a>'''
                message = MIMEMultipart()
                message['From'] = "GREEN Value Engineering"
                message['To'] = ",".join(to_address)
                # message['Cc']=",".join(cc_address)
                #message['Bcc'] = ",".join(bcc_address)
                message['Subject'] = subject
                #for bcc_email in bcc_address:
                 #   message['Bcc'] = bcc_email
                # Send the email
                try:
                    body = MIMEText(html_body, 'html')
                    message.attach(body)
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(sender_email, sender_password)
                    server.send_message(message)
                    server.quit()
                    html_body = ''
                    print("Email sent successfully!")
                    html_body = ''
                    json_data['Code'] = "001"
                    return HttpResponse(json.dumps(json_data))
                except:
                    json_data['Code'] = "002"
                    return HttpResponse(json.dumps(json_data))
    except exceptions as e:
        json_data['Code'] = "002"
        return HttpResponse(json.dumps(json_data))

    
@csrf_exempt
def update_forgotpassword(request):
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        post = request.POST
        if post:
            client_id = post.get('client_id')
            client_email_id = post.get('client_email')
            client_partner_new_password = post.get('newpassword')
            contact_params = {"id": client_id,
                             "fields":{
                                 "UF_CRM_1707795488198": client_partner_new_password
                             }}
            contact_password_update = bx24.get_all('crm.contact.update', contact_params)
            contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1707795488198","UF_CRM_1708064405348"]}
            contact_data = bx24.get_all('crm.contact.list', contact_params)
            contact_name_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    name = contact.get('NAME', '')
                    second_name = contact.get('LAST_NAME', '')
                    if company_id is not None:
                        contact_name_dict[email] = second_name
            company_contact_list_params={"filter":{"ID":client_id},"select": ["ID","NAME","LAST_NAME","EMAIL","HONORIFIC","UF_CRM_1707795488198"]}
            company_contact_list_response = bx24.get_all('crm.contact.list', company_contact_list_params)
            contact_salutation_dict = {}
            for contact in company_contact_list_response:
                contact_email_address=contact['EMAIL'][0]['VALUE']
                contact_salutation=contact['HONORIFIC']
                if contact_salutation == 'HNR_EN_1':
                    contact_salutation = 'Mr.'
                elif contact_salutation == 'HNR_EN_2':
                    contact_salutation = 'Mrs.'
                elif contact_salutation == 'HNR_EN_3':
                    contact_salutation = 'Ms.'
                elif contact_salutation == 'HNR_EN_4':
                    contact_salutation = 'Dr.'
                contact_salutation_dict[contact_email_address] = contact_salutation
            contact_person_salutation = contact_salutation_dict[client_email_id]
            contact_person_name = contact_name_dict[client_email_id]
            temporary_code_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    temporary_code = contact['UF_CRM_1708064405348']
                    if company_id is not None:
                        temporary_code_dict[email] = temporary_code
            valid_temporary_code = temporary_code_dict[client_email_id]
            # Encode the values
            encoded_email = base64.b64encode(client_email_id.encode()).decode()
            encoded_id = base64.b64encode(str(client_id).encode()).decode()
            encoded_code = base64.b64encode(valid_temporary_code.encode()).decode()
            if contact_password_update:
                html_body = f"""
                <html>
                <body style="font-family: sans-serif;">
                <div style="background-color: #f6faff;width: 100%;/* padding: 25px; */">
                <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                <table style="width: 100%; text-align: right;">
                <tr>
                <td>
                <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;"/>
                </td>
                </tr>
                </table>
                <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
                <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_person_salutation} {contact_person_name},</p>
                <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Your GREEN's Value Engineering account password was changed successful.</p>
                <p style="margin-top: 10px; font-size: 14px; margin-bottom: 10px; font-family: sans-serif;text-align:justify">If you did not initiate this password change, please change your password by clicking here:                </p>
                <a href="https://green.com.pg/client-partner-forgotpassword.html?email={encoded_email}&id={encoded_id}&c={encoded_code}" style="background-color: #23b14d;padding: 8px 25px;margin-left: auto;margin-right: auto;display: table;border: 0;color: #fff;font-size: 15px;letter-spacing: 0.5px;font-weight: bold;border-radius: 5px;text-decoration: none;">Reset Here</a>

                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">Thank you for choosing GREEN's Value Engineering. We value your belief in us.</p>
                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">For inquiries or help, contact our support team.</p>

                <p style="margin-top: 34px; font-size: 14px; font-family: sans-serif;text-align:justify">Thanks,</p>
                <p style="margin-top: -7px; font-size: 14px; font-family: sans-serif;text-align:justify">Support Team</p>
                <p style="margin-top: -7px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>GREEN Limited</b></p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">Note: This is a system generated e-mail, please do not reply to it.</p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">* This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system *</p>
                </div>
                <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
                <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;"><a href="https://green.com.pg/" style="text-decoration: none; color:#646464;">GREEN Limited</a></p>
                </div>
                </div>
                </div>
                </div>
                </body>
                </html>
                """
                sender_email = 'digitaladmin@green.com.pg'
                sender_password = 'WinGREEN2024*'
                to_address = [client_email_id]
                #to_address = ['jennyjamesmsc@gmail.com']
                #cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
                #bcc_address = ["janet.james@nexttechnosolutions.co.in, bernard@green.com.pg, sobhan.kumar@green.com.pg"]
                #bcc_address = ["janet.james@nexttechnosolutions.co.in, sandhiya.arjunan@nexttechnosolutions.co.in, vijith.vijayan@nexttechnosolutions.co.in"]
                subject = f"GREEN's Value Engineering - Password Change Confirmation"
                message = MIMEMultipart()
                message['From'] = "GREEN Value Engineering"
                message['To'] = ",".join(to_address)
               # message['Cc']=",".join(cc_address)
                #message['Bcc'] = ",".join(bcc_address)
                message['Subject'] = subject
                #for bcc_email in bcc_address:
                 #   message['Bcc'] = bcc_email
                # Send the email
                try:
                    body = MIMEText(html_body, 'html')
                    message.attach(body)
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(sender_email, sender_password)
                    server.send_message(message)
                    server.quit()
                    html_body = ''
                    print("Update Password Email sent successfully!")
                    html_body = ''
                    json_data['Code'] = "001"
                    return HttpResponse(json.dumps(json_data))
                except:
                    json_data['Code'] = "002"
                    return HttpResponse(json.dumps(json_data))
    except exceptions as e:
        json_data['Code'] = "002"
        return HttpResponse(json.dumps(json_data))
    
@csrf_exempt
def client_partner_forgotpassword(request):
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        post = request.POST
        if post:
            client_id = post.get('client_id')
            client_email_id = post.get('client_email')
            client_partner_new_password = post.get('newpassword')
            # Random Digits Generate
            digits = list(range(10))
            random.shuffle(digits)
            while digits[0] == 0:
                random.shuffle(digits)
            four_digit_random_number = int(''.join(map(str, digits[:4])))
            contact_params = {"id": client_id,
                             "fields":{
                                 "UF_CRM_1708064405348": four_digit_random_number
                             }}
            contact_password_update = bx24.get_all('crm.contact.update', contact_params)
            contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1707795488198","UF_CRM_1708064405348"]}
            contact_data = bx24.get_all('crm.contact.list', contact_params)
            temporary_code_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    temporary_code = contact['UF_CRM_1708064405348']
                    if company_id is not None:
                        temporary_code_dict[email] = temporary_code
            contact_name_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    name = contact.get('NAME', '')
                    second_name = contact.get('LAST_NAME', '')
                    if company_id is not None:
                        contact_name_dict[email] = second_name
            company_contact_list_params={"filter":{"ID":client_id},"select": ["ID","NAME","LAST_NAME","EMAIL","HONORIFIC","UF_CRM_1707795488198"]}
            company_contact_list_response = bx24.get_all('crm.contact.list', company_contact_list_params)
            contact_salutation_dict = {}
            for contact in company_contact_list_response:
                contact_email_address=contact['EMAIL'][0]['VALUE']
                contact_salutation=contact['HONORIFIC']
                if contact_salutation == 'HNR_EN_1':
                    contact_salutation = 'Mr.'
                elif contact_salutation == 'HNR_EN_2':
                    contact_salutation = 'Mrs.'
                elif contact_salutation == 'HNR_EN_3':
                    contact_salutation = 'Ms.'
                elif contact_salutation == 'HNR_EN_4':
                    contact_salutation = 'Dr.'
                contact_salutation_dict[contact_email_address] = contact_salutation
            contact_person_salutation = contact_salutation_dict[client_email_id]
            contact_person_name = contact_name_dict[client_email_id]
            forgot_password_code = temporary_code_dict[client_email_id]
            encoded_email = base64.b64encode(client_email_id.encode()).decode()
            encoded_id = base64.b64encode(str(client_id).encode()).decode()
            if contact_password_update:
                html_body = f"""
                <html>
                <body style="font-family: sans-serif;">
                <div style="background-color: #f6faff;width: 100%;/* padding: 25px; */">
                <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                <table style="width: 100%; text-align: right;">
                <tr>
                <td>
                <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;"/>
                </td>
                </tr>
                </table>
                <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
                <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_person_salutation} {contact_person_name},</p>
                <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Your GREEN's Value Engineering account password change request was successful.</p>
                <p style="margin-top: 10px; font-size: 14px; margin-bottom: 10px; font-family: sans-serif;text-align:justify"> Change your password by clicking here:                </p>
                <a href="https://green.com.pg/client-partner-forgotpassword.html?email={encoded_email}&id={encoded_id}" style="background-color: #23b14d;padding: 8px 25px;margin-left: auto;margin-right: auto;display: table;border: 0;color: #fff;font-size: 15px;letter-spacing: 0.5px;font-weight: bold;border-radius: 5px;text-decoration: none;">Reset Here</a>
                <p style="margin-top: 10px;font-size: 14px;font-family: sans-serif;text-align: center;">The code is <span style="font-size: 14px; color: #23b14d; font-weight: bold;letter-spacing: 1px;">{forgot_password_code}</span></p>
                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">Thank you for choosing GREEN's Value Engineering. We value your belief in us.</p>
                <p style="margin-top: 10px; margin-bottom: 0; font-size: 14px; font-family: sans-serif;text-align:justify">For inquiries or help, contact our support team.                </p>
                <p style="margin-top: 37px; font-size: 14px; font-family: sans-serif;text-align:justify">Thanks,</p>
                <p style="margin-top: -7px; font-size: 14px; font-family: sans-serif;text-align:justify">Support Team</p>
                <p style="margin-top: -7px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>GREEN Limited</b></p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">Note: This is a system generated e-mail, please do not reply to it.</p>
                <p style="margin-top: 10px; font-size: 9px; font-family: sans-serif;text-align:justify">* This message is intended only for the person or entity to which it is addressed and may contain confidential and/or privileged information. If you have received this message in error, please notify the sender immediately and delete this message from your system *</p>
                </div>
                <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
                <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;"><a href="https://green.com.pg/" style="text-decoration: none; color:#646464;">GREEN Limited</a></p>
                </div>
                </div>
                </div>
                </div>
                </body>
                </html>
                """
                sender_email = 'digitaladmin@green.com.pg'
                sender_password = 'WinGREEN2024*'
                to_address = [client_email_id]
                #to_address = ['jennyjamesmsc@gmail.com']
                #cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
                #bcc_address = ["janet.james@nexttechnosolutions.co.in, bernard@green.com.pg, sobhan.kumar@green.com.pg"]
                #bcc_address = ["sandhiya.arjunan@nexttechnosolutions.co.in, vijith.vijayan@nexttechnosolutions.co.in"]
                subject = f"GREEN's Value Engineering - Password Change Request Initiated"
                message = MIMEMultipart()
                message['From'] = "GREEN Value Engineering"
                message['To'] = ",".join(to_address)
                #message['Cc']=",".join(cc_address)
                #message['Bcc'] = ",".join(bcc_address)
                message['Subject'] = subject
                #for bcc_email in bcc_address:
                 #   message['Bcc'] = bcc_email
                # Send the email
                try:
                    body = MIMEText(html_body, 'html')
                    message.attach(body)
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(sender_email, sender_password)
                    server.send_message(message)
                    server.quit()
                    html_body = ''
                    print("Email sent successfully!")
                    html_body = ''
                    json_data['Code'] = "001"
                    return HttpResponse(json.dumps(json_data))
                except:
                    json_data['Code'] = "002"
                    return HttpResponse(json.dumps(json_data))
    except exceptions as e:
        json_data['Code'] = "002"
        return HttpResponse(json.dumps(json_data))

# --- Temporary Code Check --- 
@csrf_exempt
def temporary_code_check(request):
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        post = request.POST
        if post:
            client_email = post.get('client_email')
            given_temporary_code = post.get('temporary_code')
            contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1708064405348"]}
            contact_data = bx24.get_all('crm.contact.list', contact_params)
            temporary_code_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    email = contact['EMAIL'][0]['VALUE']
                    company_id = contact['COMPANY_ID']
                    temporary_code = contact['UF_CRM_1708064405348']
                    if company_id is not None:
                        temporary_code_dict[email] = temporary_code
            valid_temporary_code = temporary_code_dict[client_email]
            if given_temporary_code == valid_temporary_code:
                json_data['Code'] = "001"
                return HttpResponse(json.dumps(json_data))
            else:
                json_data['Code'] = "002"
                return HttpResponse(json.dumps(json_data))
    except exceptions as e:
        json_data['Code'] = "003"
        return HttpResponse(json.dumps(json_data))


@csrf_exempt
def client_partner_oldpasswordcheck(request):
    json_data = {}
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        post = request.POST
        if post:
            client_email = post.get('client_email')
            client_given_password = post.get('oldpassword')
            contact_params = {"select": ["ID", "COMPANY_ID", "EMAIL", "NAME", "LAST_NAME","UF_CRM_1707795488198"]}
            contact_data = bx24.get_all('crm.contact.list', contact_params)
            contact_password_dict = {}
            for contact in contact_data:
                if 'EMAIL' in contact and contact['EMAIL']:
                    contact_id = contact['ID']
                    email = contact['EMAIL'][0]['VALUE']
                    contact_password = contact['UF_CRM_1707795488198']
                    company_id = contact['COMPANY_ID']
                    if company_id is not None:
                        contact_password_dict[email] = contact_password
            client_set_password = contact_password_dict[client_email]
            if client_set_password == client_given_password:
                json_data['Code'] = "001"
                return HttpResponse(json.dumps(json_data))
            else:
                json_data['Code'] = "002"
                return HttpResponse(json.dumps(json_data))
    except exceptions as e:
        json_data['Code'] = "002"
        return HttpResponse(json.dumps(json_data))

def generate_password():
    # Generate a random 3-digit number
    random_number = secrets.randbelow(900) + 100 # Ensures a 3-digit number
    
    # Combine the random number and additional characters
    gen_password = f'UrValue{random_number}'
    
    return gen_password    

class client_partner_invitation(APIView):
    def get(self, request, solar_id, company_id,format=None):
        json_data={}
        if request.method == "GET":
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            params = {
                "entityTypeId": 177,
                "filter":{"id": solar_id,"companyId":company_id}        
            }
            solar_project_list = bx24.get_all('crm.item.list', params)
            for project in solar_project_list:
                project_id=project['id']
                project_name=project['title']
                project_company_id=project['companyId']
                print("project_company_id",project_company_id)
                company_list_params = {"ID":project_company_id}
                company_list_response = bx24.get_all('crm.company.contact.items.get', company_list_params)
                for company in company_list_response:
                    company_contact_id=int(company['CONTACT_ID'])
                    company_contact_list_params={"filter":{"ID":company_contact_id},"select": ["ID","NAME","LAST_NAME","EMAIL","HONORIFIC","UF_CRM_1707795488198"]}
                    company_contact_list_response = bx24.get_all('crm.contact.list', company_contact_list_params)
                    print("company_contact_list_response",company_contact_list_response)
                    for contact in company_contact_list_response:
                        contact_id=contact['ID']
                        contact_first_name=contact['NAME']
                        contact_last_name=contact['LAST_NAME']
                        contact_email_address=contact['EMAIL'][0]['VALUE']
                        contact_salutation=contact['HONORIFIC']
                        if contact_salutation == 'HNR_EN_1':
                            contact_salutation = 'Mr.'
                        elif contact_salutation == 'HNR_EN_2':
                            contact_salutation = 'Mrs.'
                        elif contact_salutation == 'HNR_EN_3':
                            contact_salutation = 'Ms.'
                        elif contact_salutation == 'HNR_EN_4':
                            contact_salutation = 'Dr.'
                        random_generated_password = generate_password()
                        print("random_generated_password",random_generated_password)
                        contact_params = {"id": contact_id,
                             "fields":{
                                 "UF_CRM_1707795488198": random_generated_password
                             }}
                        contact_password_update = bx24.get_all('crm.contact.update', contact_params)
                        if contact_password_update:
                            #client_password=random_generated_password
                            client_password=random_generated_password
                    
                            html_body = f"""
                            <html>
                            <body style="font-family: sans-serif;">
                            <div style="background-color: #f6faff;width: 100%;/* padding: 25px; */">
                            <div style="max-width: 800px; margin-left: auto; margin-right: auto;">
                            <table style="width: 100%; text-align: right;">
                            <tr>
                            <td>
                            <img src="https://bitrix24public.com/greenltd.bitrix24.com/docs/pub/dea9dcf43c07fbdbccd66e0e22b6a8bd/showFile/?&token=kk8c9bspjicc" width="250" style="margin-bottom: 20px;" />
                            </td>
                            </tr>
                            </table>
                            <div style="background-color: #fff; margin-left: auto; margin-right: auto; border-radius: 0;">
                            <div style="margin-left: auto; margin-right: auto; border-radius: 0; padding: 15px;">
                            <p style="margin-top: 10px; margin-bottom: 5px; font-size: 16px; font-weight: bold; font-family: sans-serif;">Dear {contact_salutation}{contact_last_name},</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">We GREEN Ltd a front-runner in Renewable Energy engineering and Solution Delivery in Papua New Guinea, pleased to be associated with your organization and delivered RE Power solutions {project_name}.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Your commitment to sustainability and environmental responsibility is commendable. We feel honored to assist with establishing solar energy solutions at {project_name}. We appreciate this opportunity.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Enhancing value across the entire project is the objective of value engineering. After World War II, GE developed value engineering, which benefits numerous industries and enterprises. Prototyping design iterations and evaluating multiple functions in an effort to increase the value of the system employs a methodical approach.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">GREEN has effectively implemented value engineering within the solar industry. In this instance, value engineering encompasses the procurement of materials, the implementation of wiring and components, and the design of the engineering for solution delivery layout of the system.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Furthermore, GREEN is distinguished by its financial value return following implementation, sustainability, service consistency, and environmental impact resulting from value engineering.</p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">Please Click below to view your Solar Power Plant's Value Engineering</p>
                            <a href="https://green.com.pg/client-partner-login.html" style="background-color: #23b14d;padding: 8px 25px;margin-left: auto;margin-right: auto;display: table;border: 0;color: #fff;font-size: 15px;letter-spacing: 0.5px;font-weight: bold;border-radius: 5px;text-decoration: none;">Access to Your Value Yields</a>
                            <p style="margin-top: 10px;font-size: 14px;font-family: sans-serif;text-align: center;">The password is <span style="font-size: 14px; color: #23b14d; font-weight: bold;letter-spacing: 1px;">{client_password}</span></p>
                            <p style="margin-top: 10px; font-size: 14px; font-family: sans-serif;text-align:justify">I'm glad to be working with you on this significant undertaking again. We anticipate to bring additional value as we progress.</p>
                            <p style="margin-top: 30px; font-size: 14px; font-family: sans-serif;text-align:justify">Warm Regards</p>
                            <p style="margin-top: 8px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>Bernard George</b></p>
                            <p style="margin-top: -11px; font-size: 14px; font-family: sans-serif;text-align:justify"><b>Chief Executive Officer</b></p>
                            </div>
                            <div style="background-color: #fbfbfb; margin-left: auto; margin-right: auto; border-radius: 0; padding: 10px;">
                            <p style="text-align: center; font-size: 9px; margin-top: 0; color: #646464; letter-spacing: 0.5px;"><a href="https://green.com.pg/" style="text-decoration: none; color:#646464;">GREEN Limited</a></p>
                            </div>
                            </div>
                            </div>
                            </div>
                            </body>
                            </html>"""
                            sender_email = 'digitaladmin@green.com.pg'
                            sender_password = 'WinGREEN2024*'
                            #to_address =[contact_email_address]
                            to_address = ['jennyjamesmsc@gmail.com']
                            # cc_address=['vijith.vijayan@nexttechnosolutions.co.in']
                            #bcc_address = ["sandhiya.arjunan@nexttechnosolutions.co.in, vijith.vijayan@nexttechnosolutions.co.in"]
                            subject = f'Introducing GREEN’s Value Engineering! A step ahead for your Value Yields with Energy Augmentation.!'
                            message = MIMEMultipart()
                            message['From'] = "GREEN Value Engineering"
                            message['To'] = ",".join(to_address)
                            # message['Cc']=",".join(cc_address)
                            #message['Bcc'] = ",".join(bcc_address)
                            message['Subject'] = subject
                            #for bcc_email in bcc_address:
                             #   message['Bcc'] = bcc_email
                            # Send the email
                            try:
                                body = MIMEText(html_body, 'html')
                                message.attach(body)
                                server = smtplib.SMTP('smtp.gmail.com', 587)
                                server.starttls()
                                server.login(sender_email, sender_password)
                                server.send_message(message)
                                server.quit()
                                html_body = ''
                                print("Email sent successfully!")
                                html_body = ''
                            except Exception as e:
                                print("Email could not be sent. Error:", str(e))    
            return HttpResponse(json.dumps(json_data))

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

@csrf_exempt
def userActivityLog(request):
    json_data = {}
    conn = get_database_connection()
    cur = conn.cursor()
    result = None
    post = request.POST
    if post:
        filterMode = str(post.get('filterMode'))
        filterCategoryType = str(post.get('filterCategoryType'))
        countryFilter = (post.get('countryFilter'))
        if countryFilter=="ALL":
            country_filter_query = " "
        else:
            country_filter_query = f"AND country_code = '{countryFilter}'"

        if filterCategoryType == "Month":
            cur.execute("""
                SELECT
                 cpl.id,
                 contact_person_name,
                 contact_person_email,
                 logged_in_status,
                 logged_in_time,
                 logged_out_time,
                 user_timezone,
                 country_code,
                 JSON_AGG(JSON_BUILD_OBJECT('Module', iul.log_type, 'Viewed Time', iul.log_date)) AS user_activity
                FROM client_partner_logs cpl
                JOIN individual_user_log iul ON cpl.contact_id = iul.user_id
                WHERE TO_CHAR(logged_in_time, 'MM/YYYY') = %s """ + country_filter_query + """
                GROUP BY cpl.id, contact_person_name, contact_person_email, logged_in_status, logged_in_time, logged_out_time, user_timezone, country_code;
            """, ((filterMode,)))
            result = dictfetchall(cur)
        elif filterCategoryType == "Days":
            cur.execute("""
                SELECT
                 cpl.id,
                 contact_person_name,
                 contact_person_email,
                 logged_in_status,
                 logged_in_time,
                 logged_out_time,
                 user_timezone,
                 country_code,
                 JSON_AGG(JSON_BUILD_OBJECT('Module', iul.log_type, 'Viewed Time', iul.log_date)) AS user_activity
                FROM client_partner_logs cpl
                JOIN individual_user_log iul ON cpl.contact_id = iul.user_id
                WHERE TO_CHAR(logged_in_time, 'DD/MM/YYYY') = %s """ + country_filter_query + """
                GROUP BY cpl.id, contact_person_name, contact_person_email, logged_in_status, logged_in_time, logged_out_time, user_timezone, country_code;
            """, ((filterMode,)))
            result = dictfetchall(cur)
        elif filterCategoryType == "Year":
            cur.execute("""
                SELECT
                 cpl.id,
                 contact_person_name,
                 contact_person_email,
                 logged_in_status,
                 logged_in_time,
                 logged_out_time,
                 user_timezone,
                 country_code,
                 JSON_AGG(JSON_BUILD_OBJECT('Module', iul.log_type, 'Viewed Time', iul.log_date)) AS user_activity
                FROM client_partner_logs cpl
                JOIN individual_user_log iul ON cpl.contact_id = iul.user_id
                WHERE TO_CHAR(logged_in_time, 'YYYY') = %s """ + country_filter_query + """
                GROUP BY cpl.id, contact_person_name, contact_person_email, logged_in_status, logged_in_time, logged_out_time, user_timezone, country_code;
            """, ((filterMode,)))
            result = dictfetchall(cur)

        if result:
            PageDurationSessionList = []
            s_no = 0
            for data in result:
                pageDurationDict = {}
                contact_person_name = data['contact_person_name']
                contact_person_email = data['contact_person_email']
                logged_in_status = data['logged_in_status']
                user_timezone = data['user_timezone']
                user_activity_str = data['user_activity']
                if user_activity_str:
                    user_activity = user_activity_str
                else:
                    user_activity = None
                logged_in_time = data['logged_in_time']
                logged_out_time = data['logged_out_time'] if data['logged_out_time'] else None
                desired_timezone = pytz.timezone(user_timezone)
                if logged_in_status == True:
                    logged_in_status = "online"
                else:
                    logged_in_status = "offline"
                logged_in_time_timezone = logged_in_time.astimezone(desired_timezone)
                formatted_logged_in_time = logged_in_time_timezone.strftime('%d-%m-%Y %I:%M:%S %p')
                logged_out_time_timezone = logged_out_time.astimezone(desired_timezone) if logged_out_time else None
                formatted_logged_out_time = logged_out_time_timezone.strftime('%d-%m-%Y %I:%M:%S %p') if logged_out_time_timezone else None
                s_no += 1
                pageDurationDict['s_no'] = s_no
                pageDurationDict['contact_person_name'] = contact_person_name
                pageDurationDict['contact_person_email'] = contact_person_email
                pageDurationDict['logged_status'] = logged_in_status
                pageDurationDict['logged_in_time'] = formatted_logged_in_time
                pageDurationDict['logged_out_time'] = formatted_logged_out_time
                pageDurationDict['user_activity'] = user_activity
                PageDurationSessionList.append(pageDurationDict)
            if PageDurationSessionList:
                json_data['Code'] = "001"
                json_data['PageDurationList'] = PageDurationSessionList
            else:
                json_data['Code'] = "002"
                return JsonResponse(json_data)
    return JsonResponse(json_data)


@csrf_exempt
def IndividualUserLog(request):
    json_data = {}
    conn = get_database_connection()
    cur = conn.cursor()

    post = request.POST
    if post:
        filterMode = str(post.get('filterMode'))
        filterCategoryType = str(post.get('filterCategoryType'))
        countryFilter = str(post.get('countryFilter'))

        total_users_count = None
        log_type_counts = None
        module_visitors_count = None
        ModuleTrafficPrecentage = []
        MostVisitedLog = []

        if countryFilter=="ALL":
            country_filter_query = " "
        else:
            country_filter_query = f"AND cpl.country_code = '{countryFilter}'"

        if filterCategoryType == "Month" :
            cur.execute("""
                SELECT COUNT(DISTINCT user_id) AS unique_user_count
                FROM individual_user_log iul
                JOIN client_partner_logs cpl ON iul.user_id = cpl.contact_id
                WHERE TO_CHAR(log_date, 'MM/YYYY') = %s """+ country_filter_query+"""
            """, (filterMode,))
            total_users_count = dictfetchall(cur)[0]['unique_user_count']
            # Count of log_type values
            if total_users_count != 0:
                cur.execute("""
                    SELECT
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service and Support' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_and_Support,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service Call History' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_Call_History,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Environmental Saving' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Environmental_Saving,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Financial ROI' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Financial_ROI,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Site Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Site_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Project Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Project_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Accounts and Statement' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Accounts_and_Statement,
                        COUNT(DISTINCT iul.log_user_id) AS unique_user_count
                    FROM individual_user_log iul
                    JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                    WHERE TO_CHAR(iul.log_date, 'MM/YYYY') = %s """+ country_filter_query+""";
                """,((filterMode,)))
                log_type_counts = dictfetchall(cur)
                # Count of Members Visit
                cur.execute("""
                    SELECT
                         COUNT(CASE WHEN log_type = 'Service and Support' THEN iul.id ELSE NULL END) AS Service_and_Support,
                         COUNT(CASE WHEN log_type = 'Service Call History' THEN iul.id ELSE NULL END) AS Service_Call_History,
                         COUNT(CASE WHEN log_type = 'Environmental Saving' THEN iul.id ELSE NULL END) AS Environmental_Saving,
                         COUNT(CASE WHEN log_type = 'Financial ROI' THEN iul.id ELSE NULL END) AS Financial_ROI,
                         COUNT(CASE WHEN log_type = 'Site Monitoring' THEN iul.id ELSE NULL END) AS Site_Monitoring,
                         COUNT(CASE WHEN log_type = 'Project Monitoring' THEN iul.id ELSE NULL END) AS Project_Monitoring,
                         COUNT(CASE WHEN log_type = 'Accounts and Statement' THEN iul.id ELSE NULL END) AS Accounts_and_Statement
                        FROM individual_user_log iul
                        LEFT JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                        WHERE TO_CHAR(iul.log_date, 'MM/YYYY') = %s """+ country_filter_query+"""
                """,((filterMode,)))
                module_visitors_count = dictfetchall(cur)
            else:
                json_data['Code'] = "002"

        elif filterCategoryType == "Days":
            cur.execute("""
                SELECT COUNT(DISTINCT user_id) AS unique_user_count
                FROM individual_user_log iul
                JOIN client_partner_logs cpl ON iul.user_id = cpl.contact_id
                WHERE TO_CHAR(iul.log_date, 'DD/MM/YYYY') = %s """+ country_filter_query+"""
            """, (filterMode,))
            total_users_count = dictfetchall(cur)[0]['unique_user_count']
            if total_users_count != 0:
                # Count of log_type values
                cur.execute("""
                    SELECT
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service and Support' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_and_Support,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service Call History' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_Call_History,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Environmental Saving' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Environmental_Saving,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Financial ROI' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Financial_ROI,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Site Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Site_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Project Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Project_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Accounts and Statement' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Accounts_and_Statement,
                        COUNT(DISTINCT iul.log_user_id) AS unique_user_count
                    FROM individual_user_log iul
                    JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                    WHERE TO_CHAR(iul.log_date, 'DD/MM/YYYY') = %s """+ country_filter_query+""";
                """,((filterMode,)))
                log_type_counts = dictfetchall(cur)
                # Count of Members Visit
                cur.execute("""
                    SELECT
                         COUNT(CASE WHEN log_type = 'Service and Support' THEN iul.id ELSE NULL END) AS Service_and_Support,
                         COUNT(CASE WHEN log_type = 'Service Call History' THEN iul.id ELSE NULL END) AS Service_Call_History,
                         COUNT(CASE WHEN log_type = 'Environmental Saving' THEN iul.id ELSE NULL END) AS Environmental_Saving,
                         COUNT(CASE WHEN log_type = 'Financial ROI' THEN iul.id ELSE NULL END) AS Financial_ROI,
                         COUNT(CASE WHEN log_type = 'Site Monitoring' THEN iul.id ELSE NULL END) AS Site_Monitoring,
                         COUNT(CASE WHEN log_type = 'Project Monitoring' THEN iul.id ELSE NULL END) AS Project_Monitoring,
                         COUNT(CASE WHEN log_type = 'Accounts and Statement' THEN iul.id ELSE NULL END) AS Accounts_and_Statement
                        FROM individual_user_log iul
                        LEFT JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                        WHERE TO_CHAR(iul.log_date, 'DD/MM/YYYY') = %s """+ country_filter_query+"""
                """,((filterMode,)))
                module_visitors_count = dictfetchall(cur)
            else:
                json_data['Code'] = "002"

        elif filterCategoryType == "Year":
            cur.execute("""
                SELECT COUNT(DISTINCT user_id) AS unique_user_count
                FROM individual_user_log iul
                JOIN client_partner_logs cpl ON iul.user_id = cpl.contact_id
                WHERE TO_CHAR(log_date, 'YYYY') = %s """+ country_filter_query+"""
            """,((filterMode,)))
            total_users_count = dictfetchall(cur)[0]['unique_user_count']
            if total_users_count != 0:
                # Count of log_type values
                cur.execute("""
                    SELECT
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service and Support' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_and_Support,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Service Call History' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Service_Call_History,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Environmental Saving' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Environmental_Saving,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Financial ROI' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Financial_ROI,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Site Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Site_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Project Monitoring' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Project_Monitoring,
                        CAST(COUNT(CASE WHEN iul.log_type = 'Accounts and Statement' THEN 1 END) * 100 / COUNT(iul.id) AS INTEGER) AS Accounts_and_Statement,
                        COUNT(DISTINCT iul.log_user_id) AS unique_user_count
                    FROM individual_user_log iul
                    JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                    WHERE TO_CHAR(iul.log_date, 'YYYY') = %s """+ country_filter_query+""";
                """,((filterMode,)))
                log_type_counts = dictfetchall(cur)
                # Count of Members Visit
                cur.execute("""
                    SELECT
                         COUNT(CASE WHEN log_type = 'Service and Support' THEN iul.id ELSE NULL END) AS Service_and_Support,
                         COUNT(CASE WHEN log_type = 'Service Call History' THEN iul.id ELSE NULL END) AS Service_Call_History,
                         COUNT(CASE WHEN log_type = 'Environmental Saving' THEN iul.id ELSE NULL END) AS Environmental_Saving,
                         COUNT(CASE WHEN log_type = 'Financial ROI' THEN iul.id ELSE NULL END) AS Financial_ROI,
                         COUNT(CASE WHEN log_type = 'Site Monitoring' THEN iul.id ELSE NULL END) AS Site_Monitoring,
                         COUNT(CASE WHEN log_type = 'Project Monitoring' THEN iul.id ELSE NULL END) AS Project_Monitoring,
                         COUNT(CASE WHEN log_type = 'Accounts and Statement' THEN iul.id ELSE NULL END) AS Accounts_and_Statement
                        FROM individual_user_log iul
                        LEFT JOIN client_partner_logs cpl ON iul.log_user_id = cpl.id
                        WHERE TO_CHAR(iul.log_date, 'YYYY') = %s """+ country_filter_query+"""
                """,((filterMode,)))
                module_visitors_count = dictfetchall(cur)
            else:
                json_data['Code'] = "002"

        if module_visitors_count:
            log_types_order = ['service_and_support', 'service_call_history', 'environmental_saving', 'financial_roi', 'site_monitoring', 'project_monitoring', 'accounts_and_statement']
            MostVisitedLog = [module_visitors_count[0].get(log_type, 0) for log_type in log_types_order]
        else:
            json_data['Code'] = "002"
        if log_type_counts:
            log_types_order = ['service_and_support', 'service_call_history', 'environmental_saving', 'financial_roi', 'site_monitoring', 'project_monitoring', 'accounts_and_statement']
            ModuleTrafficPrecentage = [log_type_counts[0].get(log_type, 0) for log_type in log_types_order]
        else:
            json_data['Code'] = "002"
        if total_users_count is not None and log_type_counts is not None and module_visitors_count is not None:
            json_data['Code'] = "001"
            json_data['total_members_count'] = total_users_count
            json_data['module_traffic'] = ModuleTrafficPrecentage
            json_data['most_visited_log'] = MostVisitedLog
        else:
            json_data['Code'] = "002"
            return HttpResponse(json.dumps(json_data))
    return HttpResponse(json.dumps(json_data))
