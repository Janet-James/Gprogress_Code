from fast_bitrix24 import Bitrix
from rest_framework.views import APIView
from django.http import HttpResponse
import json
from bitrix24 import *
from django.views.decorators.csrf import csrf_exempt
from fast_bitrix24 import Bitrix
from datetime import datetime, timezone
import http.client  # Import the 'http.client' module
import hashlib  # Import the hashlib module


# ---- List Out Job Category Item List ------
class JobCategoryListView(APIView):
    def get(self, request, format=None):
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        # Univeral Job Category List
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 176
        }
        univeral_jobcategory_list = bx24.get_all('lists.element.get', universal_list)
        response_data = {}
        # List Out HCM PG Job-Category List
        for lst in univeral_jobcategory_list:
            uni_list_id = lst['ID']              # Universal Job Category List Item Id 
            job_category_name = lst['NAME']      # List Out the Job Category name
            # List Out the Workforce Item List in HCM PG
            params = {
                "entityTypeId": 172,
                "filter": {"ufCrm22_1690961621": uni_list_id, "stageId": "DT172_182:UC_0QMB0M"}
            }
            workforce_item_list = bx24.get_all('crm.item.list', params)
            positions = []    # Response item Append From the list
            for item in workforce_item_list:
                published_on_website = item['ufCrm22_1685203942']   # To check the condition on published website or not
                if published_on_website == 748:
                    deal_id = item['id']
                    position = item['ufCrm22_1684209062']
                    experience = item['ufCrm22_1684817771']
                    location = item['ufCrm22_1684394069']
                    job_type = item['ufCrm22_1684209394']
                    job_description = item['ufCrm22_1684394291']
                    required_skills = item['ufCrm22_1684209207']
                    resume_folder_id = item['ufCrm22_1691485594663']
                    job_position_id = item['ufCrm22_1691562596919']
                    job_position_number = item['title']
                    # Created Date
                    created_date_str = item["createdTime"]
                    created_date = datetime.strptime(created_date_str, "%Y-%m-%dT%H:%M:%S%z")
                    created_date = created_date.replace(tzinfo=timezone.utc)
                    job_position_created_date = created_date.isoformat()
                    job_position_created_date = datetime.fromisoformat(job_position_created_date)
                    job_position_created_date = job_position_created_date.strftime("%d %B %Y")
                    posted_timedelta = datetime.now(timezone.utc) - created_date
                    posted_date = posted_timedelta.days 
                    # Closing Date
                    closed_date_str = item["closedate"]
                    closed_date = datetime.strptime(closed_date_str, "%Y-%m-%dT%H:%M:%S%z")
                    closed_date = closed_date.replace(tzinfo=timezone.utc)
                    closing_timedelta = datetime.now(timezone.utc) - closed_date
                    closing_date = closing_timedelta.days 
                    if job_type == 652:
                        job_type = "Full Time"
                    if job_type == 654:
                        job_type = "Part time"
                    if job_type == 690:
                        job_type = "Contractual"
                    if job_type == 706:
                        job_type = "Freelance"
                    if job_type == 708:
                        job_type = "Internship"
                    if position:
                        positions.append({
                            "deal_id": deal_id,
                            "position": position,
                            "experience": experience,
                            "location": location,
                            "job_type": job_type,
                            "job_description": job_description,
                            "required_skills": required_skills,
                            "posted_date" : posted_date,
                            "closed_date": closing_date,
                            "resume_folder_id": resume_folder_id,
                            "job_position_id": job_position_id,
                            "job_position_number": job_position_number,
                            "job_position_created_date": job_position_created_date
                        })
            if positions:
                response_data[job_category_name] = {         # List Out the API Respose
                    "openings": positions
                }
        return HttpResponse(json.dumps(response_data))

# ---- Job Application Submit -----
@csrf_exempt
def submit_job_application(request):
    print("===========  submit_job_application ============")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            print("ppppp")
            firstname = post.get("firstname")
            lastname = post.get("lastname")
            email = post.get("email")
            mobile = post.get("mobile")
            gender = post.get("gender")
            date_of_birth = post.get("date_of_birth")
            city = post.get("city")
            region = post.get("region")
            experience = post.get("experience")
            message = post.get("message")
            resume = post.get("resume")
            candidate_source = post.get("source")
            # deal_id = post.get("deal_id")
            resume_folder_id = post.get("resume_folder_id")
            job_type = post.get("job_type")
            salutation_Mr = post.get("salutation_Mr")
            salutation_Ms = post.get("salutation_Ms")
            job_position_id = int(post.get("job_position_id"))
            resume_extension = post.get("resume_extension")
            login_from = int(post.get("login_from"))
            alternative_mobile = post.get("alternative_mobile")
            country = post.get("country")
            educational_certification = post.get("educational_certification")
            employement_certification = post.get("employement_certification")
            flag_country_name = post.get("flag_country_name")
            flag_country_code = post.get("flag_country_code")
            send_notification_to_candidate = post.get("send_notification_to_candidate")
            # cancatinate firstname and last name
            fullname = firstname + ' ' + lastname
            # cancatinate region and city 
            location = region + ', ' + city
            # salutation
            if gender == "8488":
                salutation = salutation_Mr
            if gender == "8486":
                salutation = salutation_Ms
            # job type
            if job_type == "Full Time":
                job_type = 652
            if job_type == "Part time":
                job_type = 654
            if job_type == "Contractual":
                job_type = 690
            if job_type == "Freelance":
                job_type = 706
            if job_type == "Internship":
                job_type = 708
            # resume upload in bitrix drive
            drive_resume_upload_params = {
                "id": resume_folder_id,
                "file":resume,
                "name": fullname
            }
            drive_educational_certifications_upload_params = {
                "id": 88728,
                "file":resume,
                "name": fullname
            }
            drive_employement_certifications_upload_params = {
                "id": 88730,
                "file":resume,
                "name": fullname
            }
            # green website item filter
            green_spa_list_params = {
            "entityTypeId": 176,
            "filter": {
                "categoryId": 306,
                "stageId": "DT176_306:NEW"
            },
            "select": ["ufCrm90_1691570347", "id"]
            }
            green_spa_response = bx24.get_all('crm.item.list', green_spa_list_params)
            green_existing_deal_id = None
            multiple_job_application_check = None
            green_login_from = None
            global_country_list_id = None
            # Country List DropDown
            country_dropdownlist ={                
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 152,
            "FILTER": {
            "=PROPERTY_1122": flag_country_code},
             }
            country_dropdown_response = bx24.get_all('lists.element.get', country_dropdownlist)
            for country in country_dropdown_response:
                country_list_id=country['ID']
                global_country_list_id = country_list_id
                
            print("country list selected id",global_country_list_id) 
            # Green Website list items
            for lst in green_spa_response:
                existing_email = lst['ufCrm90_1691570347']
                green_deal_id = lst['id']
                
                if email == existing_email:                       # to check already existing green spa email id and to given the email id are same
                    green_existing_deal_id = green_deal_id                    # if same in the sense that deal id alrady existing  
                    break 
            # Talent Aqusition and green website existing deal id
            if green_existing_deal_id:
                print(">>>>>>>>>>> Exists >>>>>>>>>>")
                # green website item filter
                green_spa_list_params = {
                "entityTypeId": 176,
                "filter": {
                    "categoryId": 306,
                    "stageId": "DT176_306:NEW",
                    "ufCrm90_1691570347": email
                },
                "select": ["ufCrm90_1692158190"]
                }
                green_spa_response = bx24.get_all('crm.item.list', green_spa_list_params)
                # Green SPA Mail Automation User Already Exixting or NOT
                for email_lst in green_spa_response:
                    green_login_from = int(email_lst['ufCrm90_1692158190'])
                    if login_from == green_login_from:  # Not Sent a mail again user alredy existing in green SPA
                        print(" --- Already Applied Job Position In Talent Aquisition --- ")
                        # Same Position To Apply User
                        hcm_users_list_params = {
                            "entityTypeId": 172,
                            "filter": {"categoryId": 176, "stageId": "DT172_176:NEW", "ufCrm22_1691577281": green_existing_deal_id},
                            "select": ["ufCrm22_1684931413"]
                        }
                        hcm_users_list_response = bx24.get_all('crm.item.list', hcm_users_list_params)
                        print("--- Position ---", hcm_users_list_response)
                        # Condition for Same User Multiple Apply
                        for position_list in hcm_users_list_response:
                            user_position_id = int(position_list['ufCrm22_1684931413'])
                            if job_position_id == user_position_id:
                                print("--- Same User Same Job Multiple Apply ---")
                                multiple_job_application_check = 1846
                        talent_acqusition_item_add = {
                            "entityTypeId": 172,
                            "fields": {
                                "categoryId":176,
                                "stageId": "DT172_176:NEW",
                                "title": fullname,
                                "ufCrm22_1684210215": firstname,
                                "ufCrm22_1684210224": lastname,
                                "ufCrm22_1684210133": email,
                                "ufCrm22_1691403443433": mobile,
                                "ufCrm22_1684843117": gender,
                                "ufCrm22_1684814080": date_of_birth,
                                "ufCrm22_1692954575": experience,
                                "ufCrm22_1691403379962": message,
                                "ufCrm22_1684209550": location,
                                "ufCrm22_1691403509475": candidate_source,
                                "ufCrm22_1684999563": salutation,
                                "ufCrm22_1684209394": job_type,
                                "ufCrm22_1684931413": job_position_id,
                                "ufCrm22_1685946581947": resume,    
                                "ufCrm22_1686024622499": resume_extension,
                                "ufCrm22_1691577281": green_existing_deal_id,
                                "ufCrm22_1692692205": alternative_mobile,
                                "ufCrm22_1692935915": global_country_list_id,
                                "ufCrm22_1693389277340": multiple_job_application_check,
                                "ufCrm22_1684817369": educational_certification,
                                "ufCrm22_1684817791": employement_certification,
                                "ufCrm22_1697080391": flag_country_code,
                                "ufCrm22_1697080361": flag_country_name,
                                "ufCrm22_1685204971169": send_notification_to_candidate
                            }
                        }
                        talent_acqusition_add_result = bx24.get_all('crm.item.add', talent_acqusition_item_add)
                        if talent_acqusition_add_result:
                            json_data['Code'] = "001"
                            json_data['Message'] = "Add Success - Already Applied Job Position In Talent Aquisition"
                        else:
                            json_data['Code'] = "002"
                            json_data['Message'] = "Failed - Already Applied Job Position In Talent Aquisition"

                    else:
                        print(" --- Apply From Apply Job Form ---")
                        # Update User Phone Number in Green SPA
                        green_spa_update_list = {
                            "entityTypeId":"176",
                            "id":green_existing_deal_id,
                            "fields":{
                            "categoryId": 306,
                            "stageId": "DT176_306:PREPARATION",
                            "ufCrm90_1692158190":login_from,
                            "ufCrm90_1692691641":mobile
                            }
                        }
                        green_spa_update_list_response = bx24.get_all('crm.item.update', green_spa_update_list)
                        # Automatic Stage Change In Green SPA
                        green_spa_change_stage = {
                            "entityTypeId":"176",
                            "id":green_existing_deal_id,
                            "fields":{
                            "categoryId": 306,
                            "stageId": "DT176_306:NEW"
                            }
                        }
                        green_spa_change_stage_result = bx24.get_all('crm.item.update', green_spa_change_stage)
                        # Same Position To Apply User
                        hcm_users_list_params = {
                            "entityTypeId": 172,
                            "filter": {"categoryId": 176, "stageId": "DT172_176:NEW", "ufCrm22_1691577281": green_existing_deal_id},
                            "select": ["ufCrm22_1684931413"]
                        }
                        hcm_users_list_response = bx24.get_all('crm.item.list', hcm_users_list_params)
                        print("--- Position ---", hcm_users_list_response)
                        # Condition for Same User Multiple Apply
                        for position_list in hcm_users_list_response:
                            user_position_id = int(position_list['ufCrm22_1684931413'])

                            if job_position_id == user_position_id:
                                print("--- Same User Same Job Multiple Apply ---")
                                multiple_job_application_check = 1846
                        talent_acqusition_item_add = {
                            "entityTypeId": 172,
                            "fields": {
                                "categoryId":176,
                                "stageId": "DT172_176:NEW",
                                "title": fullname,
                                "ufCrm22_1684210215": firstname,
                                "ufCrm22_1684210224": lastname,
                                "ufCrm22_1684210133": email,
                                "ufCrm22_1691403443433": mobile,
                                "ufCrm22_1684843117": gender,
                                "ufCrm22_1684814080": date_of_birth,
                                "ufCrm22_1692954575": experience,
                                "ufCrm22_1691403379962": message,
                                "ufCrm22_1684209550": location,
                                "ufCrm22_1691403509475": candidate_source,
                                "ufCrm22_1684999563": salutation,
                                "ufCrm22_1684209394": job_type,
                                "ufCrm22_1684931413": job_position_id,
                                "ufCrm22_1685946581947": resume,    
                                "ufCrm22_1686024622499": resume_extension,
                                "ufCrm22_1691577281": green_existing_deal_id,
                                "ufCrm22_1692692205": alternative_mobile,
                                "ufCrm22_1692935915": global_country_list_id,
                                "ufCrm22_1693389277340": multiple_job_application_check,
                                "ufCrm22_1684817369": educational_certification,
                                "ufCrm22_1684817791": employement_certification,
                                "ufCrm22_1697080391": flag_country_code,
                                "ufCrm22_1697080361": flag_country_name,
                                "ufCrm22_1685204971169": send_notification_to_candidate
                            }
                        }
                        talent_acqusition_add_result = bx24.get_all('crm.item.add', talent_acqusition_item_add)
                        if talent_acqusition_add_result and green_spa_update_list_response:
                            json_data['Code'] = "001"
                            json_data['Message'] = "Add Success - Apply From Job Apply Form"
                        else:
                            json_data['Code'] = "002"
                            json_data['Message'] = "Failed - Apply From Job Apply Form"
            else:
                print(">>>>>>>>> New Item >>>>>>>>>>")
                green_spa_params = {
                    "entityTypeId": 176,
                    "fields": {
                        "categoryId": 306,
                        "stageId": "DT176_306:NEW",
                        "ufCrm90_1692860376718": firstname,
                        "ufCrm90_1692860387673": lastname,
                        "ufCrm90_1691570292": fullname,
                        "ufCrm90_1691570347": email,
                        "ufCrm90_1692691641": mobile,
                        "ufCrm90_1692158190" : login_from
                        }
                    }
                green_spa_item_add_result = bx24.get_all('crm.item.add', green_spa_params)
                talent_acqusition_item_add = {
                        "entityTypeId": 172,
                        "fields": {
                            "categoryId":176,
                            "stageId": "DT172_176:NEW",
                            "title": fullname,
                            "ufCrm22_1684210215": firstname,
                            "ufCrm22_1684210224": lastname,
                            "ufCrm22_1684210133": email,
                            "ufCrm22_1691403443433": mobile,
                            "ufCrm22_1684843117": gender,
                            "ufCrm22_1684814080": date_of_birth,
                            "ufCrm22_1692954575": experience,
                            "ufCrm22_1691403379962": message,
                            "ufCrm22_1684209550": location,
                            "ufCrm22_1691403509475": candidate_source,
                            "ufCrm22_1684999563": salutation,
                            "ufCrm22_1684209394": job_type,
                            "ufCrm22_1684931413": job_position_id,
                            "ufCrm22_1685946581947": resume,
                            "ufCrm22_1686024622499": resume_extension,
                            "ufCrm22_1691577281": green_spa_item_add_result['item']['id'],
                            "ufCrm22_1692692205": alternative_mobile,
                            "ufCrm22_1692935915": global_country_list_id,
                            "ufCrm22_1684817369": educational_certification,
                            "ufCrm22_1684817791": employement_certification,
                            "ufCrm22_1697080391": flag_country_code,
                            "ufCrm22_1697080361": flag_country_name,
                            "ufCrm22_1685204971169": send_notification_to_candidate
                            }
                        }
                talent_accqusition_item_add_result = bx24.get_all('crm.item.add', talent_acqusition_item_add)
                if green_spa_item_add_result and talent_accqusition_item_add_result:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Sent Success - New Item In Talent Aqusition and Green Website"
                else:
                    json_data['Code'] = "002"
                    json_data['Message'] = "Failed - To Add New Item In Talent Aqusition and Green Website"
            # Upload Resume In a Bitrix Drive 
            resume_upload_response = bx24.call('disk.folder.uploadfile', drive_resume_upload_params)
            if "result" in resume_upload_response and resume_upload_response["result"]:
                json_data['Code'] = "002"
                json_data['Message'] = "Resume Upload Failed"
            else:
                json_data['Code'] = "001"
                json_data['Message'] = "Resume Upload success"
            # Attach Educational Certification In a Bitrix Drive 
            resume_upload_response = bx24.call('disk.folder.uploadfile', drive_educational_certifications_upload_params)
            if "result" in resume_upload_response and resume_upload_response["result"]:
                json_data['Code'] = "002"
                json_data['Message'] = "Edu Certificate Upload Failed"
            else:
                json_data['Code'] = "001"
                json_data['Message'] = "Edu Certificate Upload success"
            # Attach Employment Certification In a Bitrix Drive 
            resume_upload_response = bx24.call('disk.folder.uploadfile', drive_employement_certifications_upload_params)
            if "result" in resume_upload_response and resume_upload_response["result"]:
                json_data['Code'] = "002"
                json_data['Message'] = "Employement Certificate Upload Failed"
            else:
                json_data['Code'] = "001"
                json_data['Message'] = "Employement Certificate Upload success"
    except Exception as e:
        print("rrrr",e)
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# --- Track Candidate List Drop Down ---
class JobQueryDropdownList(APIView):
    def get(self, request, format=None):
        print("========== JobQuery Dropdown List ===========")
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        # Univeral Job Category List
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 176
        }
        univeral_jobcategory_list_response = bx24.get_all('lists.element.get', universal_list)
        response_data = {}
        for lst in univeral_jobcategory_list_response:
            uni_list_id = lst['ID']
            job_category_name = lst['NAME']
            # SPA Item List
            params = {
                "entityTypeId": 172,
                "filter": {"ufCrm22_1690961621": uni_list_id, "stageId": "DT172_182:UC_0QMB0M"}
            }
            spa_item_list_response = bx24.get_all('crm.item.list', params)
            response_data[job_category_name] = {    # list out the jobcategory name
                "job_category_id": uni_list_id,     # list out the jobcategory id 
            }
        return HttpResponse(json.dumps(response_data))

# ---- Job Query Rise ----
@csrf_exempt
def submit_jobquery_form(request):
    print("========== JOB QUERY =========")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        green_spa_list_params = {
            "entityTypeId": 176,
            "filter": {
                "categoryId": 306,
                "stageId": "DT176_306:NEW"
            },
            "select": ["ufCrm90_1691570347", "id"]
        }
        green_spa_list_response = bx24.get_all('crm.item.list', green_spa_list_params)
        if post:
            firstname = post.get("firstname")
            lastname = post.get("lastname")
            email = post.get("email")
            phone = post.get("phone")
            feedback = post.get("feedback")
            roleselect = post.get("roleselect")
            query = post.get("query")
            job_query_source = post.get("job_query_source")
            login_from = post.get("login_from")
            fullname = firstname+' '+lastname 
            green_existing_deal_id = None
            # Green SPA
            for lst in green_spa_list_response:
                existing_email = lst['ufCrm90_1691570347']                 
                deal_id = lst['id']
                if email == existing_email:              # to check already existing green spa email id and to given the email id are same
                    green_existing_deal_id = deal_id     # if same in the sense that deal id alrady existing                              
                    break 
            # Job Query
            if green_existing_deal_id:
                job_query_params = {
                    "entityTypeId": 172,
                    "fields": {
                        "categoryId": 302,
                        "stageId": "DT172_302:NEW",
                        "ufCrm22_1691577281": green_existing_deal_id,
                        "ufCrm22_1691567989": feedback,
                        "ufCrm22_1691568090": roleselect,
                        "ufCrm22_1691568150": query,
                        "ufCrm22_1691822664": job_query_source
                    }
                }
                Job_Query_Response = bx24.get_all('crm.item.add', job_query_params)
                if Job_Query_Response:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Sent Success - Email Existing In Green SPA"
                else:
                    json_data['Code'] = "002"
                    json_data['Message'] = "Failed - Email Existing In Green SPA"
            else:
                green_spa_params = {
                    "entityTypeId": 176,
                    "fields": {
                        "categoryId": 306,
                        "stageId": "DT176_306:NEW",
                        "ufCrm90_1692860376718": firstname,
                        "ufCrm90_1692860387673": lastname,
                        "ufCrm90_1691570292": fullname,
                        "ufCrm90_1691570347": email,
                        "ufCrm90_1692691641": phone,
                        "ufCrm90_1692158190": login_from
                    }
                }
                green_spa_item_add_response = bx24.get_all('crm.item.add', green_spa_params)
                jobquery_add_params = {
                    "entityTypeId": 172,
                    "fields": {
                        "categoryId": 302,
                        "stageId": "DT172_302:NEW",
                        "ufCrm22_1691577281": green_spa_item_add_response['item']['id'],
                        "ufCrm22_1691567989": feedback,
                        "ufCrm22_1691568090": roleselect,
                        "ufCrm22_1691568150": query,
                        "ufCrm22_1691822664": job_query_source
                    }
                }
                jobquery_add_response = bx24.get_all('crm.item.add', jobquery_add_params)
                if green_spa_item_add_response and jobquery_add_response:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Add Success - New Item Add In Green SPA and Job Query"
                else:
                    json_data['Code'] = "002"
                    json_data['Message'] = "Failed - New Item Add"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)

    return HttpResponse(json.dumps(json_data))

# -------- Reach Us Functionality ---------
@csrf_exempt
def submit_reach_us_form(request):
    print("=========== Reach US ==========")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        is_whatsapp_number = None
        if post:
            firstname = post.get("firstname")
            lastname = post.get("lastname")
            email = post.get("email")
            phone = post.get("phone")
            message = post.get("message")
            lead_type = post.get("lead_type")
            login_from = post.get("login_from")
            whatsapp_number = post.get("is_whatsapp_number")
            if whatsapp_number == "true":
                is_whatsapp_number = "1816"
            if whatsapp_number == "false":
                is_whatsapp_number = "1818"
            username = firstname+ ' ' +lastname
            list_params = {
            "entityTypeId": 176,
            "filter": {
                "categoryId": 306,
                "stageId": "DT176_306:NEW"
            },
            "select": ["ufCrm90_1691570347", "id"]
            }
            green_website_response = bx24.get_all('crm.item.list', list_params)
            green_existing_deal_id = None
            # Green Website
            for lst in green_website_response:
                existing_email = lst['ufCrm90_1691570347']
                deal_id = lst['id']
                
                if email == existing_email:
                    green_existing_deal_id = deal_id
                    break 
            if green_existing_deal_id:
                print("============= Existing ============")
                leads_item_add_params = {                           # Reach Us Existing and New Item Add in Lead
                    "fields": {
                        "UF_CRM_1692159209": green_existing_deal_id,
                        "UF_CRM_1692159284": message,
                        "UF_CRM_1692168036294": lead_type,
                        "PARENT_ID_176": green_existing_deal_id
                    }
                }
                leads_item_add_params_reponse = bx24.get_all('crm.lead.add', leads_item_add_params)
                if leads_item_add_params_reponse:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Reach - US Existing Item Added In Leads"
                else:
                    json_data['Code'] = "002"
                    json_data['Message'] = "Failed - Existing Item Add In Leads"
            else:
                print("=========== New ============")
                # Green Website
                green_spa_params = {
                    "entityTypeId": 176,
                    "fields": {
                        "categoryId": 306,
                        "stageId": "DT172_306:NEW",
                        "ufCrm90_1692860376718": firstname,
                        "ufCrm90_1692860387673": lastname,
                        "ufCrm90_1691570292"   : username,
                        "ufCrm90_1691570347"   : email,
                        "ufCrm90_1692691641"   : phone,
                        "ufCrm90_1692158190"   : login_from,
                        "ufCrm90_1692860124"   : is_whatsapp_number
                    }
                }
                green_spa_item_add_response = bx24.get_all('crm.item.add', green_spa_params)
                # Lead reach us
                reachus_lead_add_params = {
                    "fields": {
                        "UF_CRM_1692159209": green_spa_item_add_response['item']['id'],
                        "UF_CRM_1692159284": message,
                        "UF_CRM_1692168036294": lead_type,
                        "PARENT_ID_176": green_spa_item_add_response['item']['id']
                    }
                }
                reachus_lead_add_items_response = bx24.get_all('crm.lead.add', reachus_lead_add_params)
                if green_spa_item_add_response and reachus_lead_add_items_response:
                    json_data['Code'] = "001"
                    json_data['Message'] = "Reach - US New Item Added In Leads and Green SPA"
                else:
                    json_data['Code'] = "002"
                    json_data['Message'] = "Failed - To Add Items In Leads and Green SPA"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# -------- login user -----------
@csrf_exempt
def userlogin(request):
    print("=========== Login ==========")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        Green_spa_List = {
            "entityTypeId": 176,
            "filter": {
                "categoryId": 306
            }
        }
        Green_Website_UsersList = bx24.get_all('crm.item.list', Green_spa_List)
        Talent_Acquisition_Item_List = {
            "entityTypeId": 172,
            "filter": {
                "categoryId": 176
            }
        }
        Talent_Acquisition_list_Response = bx24.get_all('crm.item.list', Talent_Acquisition_Item_List)
        provided_username = post.get("username")
        provided_password = str(post.get("password"))
        print("--- provided_password --- ", provided_password, type(provided_password))
        login_successful = False
        deal_id = None
        position_id = None
        talent_acqusition_user = False
        # Job_Query_item = False
        for userlst in Green_Website_UsersList:
            user_email = userlst.get('ufCrm90_1691570347')
            phone_number = str(userlst.get('ufCrm90_1692691641'))
            print("--- green website phone number ---- ", phone_number, type(phone_number))
            if provided_username == user_email and provided_password == phone_number:
                login_successful = True
                break
        # Talent Acquisition
        if login_successful:
            for item in Talent_Acquisition_list_Response:
                item_user_email = item['ufCrm22_1684210133']
                item_phone_number = item['ufCrm22_1691403443433']
                deal_id = item['id']
                position_id = item['ufCrm22_1684931413']
                user_email_id = item['ufCrm22_1684210133']
                # print("======= email ======", user_email)
                print("======= item_phone_number ======", item_phone_number)
                if provided_username == item_user_email and provided_password == item_phone_number:
                    talent_acqusition_user = True
                    break
        if talent_acqusition_user:
            json_data['Code'] = "001"
            json_data['Message'] = "Login Success"
            json_data['UserDetails'] = {
                'deal_id': deal_id,
                'position_id': position_id,
                'user_email_id': user_email_id,
            }
        else:
            json_data['Code'] = "002"
            json_data['Message'] = "Login Failed"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# ------- After Login User Get Details --------
@csrf_exempt
def get_login_user_details(request):
    print("========= After Login User Get Details ==========")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 146
        }
        univeral_jobposition_list = bx24.get_all('lists.element.get', universal_list)
        if post:
            user_email_id = post.get('user_email_id'),
            deal_id = post.get('deal_id')
            params = {
                "entityTypeId": 172,
                "filter": {"categoryId": 176, "ufCrm22_1684210133": user_email_id},
                "select": ["ufCrm22_1684931413", "ufCrm22_1684210215", "ufCrm22_1684210224", "ufCrm22_1684210133"]
            }
            user_position_list_hcm = bx24.get_all('crm.item.list', params)
            print("User Email ID ------", user_position_list_hcm)
            positions = []  # List to store position details
            for position_list in user_position_list_hcm:
                position_id = int(position_list['ufCrm22_1684931413'])
                user_firstname = position_list['ufCrm22_1684210215']
                user_lastname = position_list['ufCrm22_1684210224']
                user_email_id = position_list['ufCrm22_1684210133']
                for uni in univeral_jobposition_list:
                    list_id = int(uni['ID'])
                    if list_id == position_id:
                        position_dict = uni['PROPERTY_1054']
                        position = next(iter(position_dict.values()))
                        print("------ POSITION -----", position)
                        positions.append({
                            "position_name": position,
                            "position_id": position_id
                        })
            print("POSSSS----", positions)
            if positions:
                json_data['Code'] = "001"
                json_data['Message'] = "Success"
                json_data['firstname'] = user_firstname
                json_data['lastname'] = user_lastname
                json_data['user_email'] = user_email_id
                json_data['UserDetails'] = positions
                json_data['deal_id'] = deal_id
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Position not found"
        else:
            json_data['Code'] = "003"
            json_data['Message'] = "Invalid request"
    except Exception as e:
        json_data['Code'] = "004"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# -------- Dashboard --------
@csrf_exempt
def dashboard_user_get_details(request):
    print("============= Dashboard ===============")
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

        if post:
            position_id = int(post.get('position_id'))
            user_email_id = post.get('email_id')
            deal_id = post.get('deal_id')
            print(position_id)
        params = {
            "entityTypeId": 172,
            "filter": {
                "categoryId": 176
            }
        }
        talent_acqusion_spa_list = bx24.get_all('crm.item.list', params)
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 146
        }
        univeral_jobcategory_list = bx24.get_all('lists.element.get', universal_list)
        description_deal_id = None
        gender = None
        for item_list in talent_acqusion_spa_list:
            item_user_email = item_list['ufCrm22_1684210133']
            item_position_id = int(item_list['ufCrm22_1684931413'])
            if user_email_id == item_user_email and position_id == item_position_id:
                firstname = item_list['ufCrm22_1684210215']
                lastname = item_list['ufCrm22_1684210224']
                phone = item_list['ufCrm22_1691403443433']
                email = item_list['ufCrm22_1684210133']
                location = item_list['ufCrm22_1684209550']
                stageId = item_list['stageId']
                gender_id = int(item_list['ufCrm22_1684843117'])

                if gender_id == 8488:
                    gender = "Male"
                elif gender_id == 8486:
                    gender = "Female"
                elif gender_id == 8490:
                    gender = "Others"
                
                # Description Code
                for uni in univeral_jobcategory_list:
                   list_id = int(uni['ID'])
                   if position_id == list_id:
                       position_dict = uni['PROPERTY_1054']
                       position = next(iter(position_dict.values()))
                       list_deal_id_dict = uni["PROPERTY_1032"]
                       list_deal_id = next(iter(list_deal_id_dict.values()))
                       description_deal_id = int(list_deal_id)
                       # Description Get In Workfore
                       workforce_params_list = {"entityTypeId":"172",
                                       "filter":{"ID":description_deal_id}}
                       workforce_item_list_response = bx24.get_all('crm.item.list', workforce_params_list)
                       for workforce in workforce_item_list_response:
                           description = workforce['ufCrm22_1684394291']
        if talent_acqusion_spa_list:
            json_data['Code'] = "001"
            json_data['Message'] = "Success"
            json_data['UserDetails'] = {
                "firstname": firstname,
                "lastname": lastname,
                "phone": phone,
                "email": email,
                "location": location,
                "gender": gender,
                "stageId": stageId,
                "position_id": position_id,
                "description": description
            }
        else:
            json_data['Code'] = "002"
            json_data['Message'] = "Failed"

    except Exception as e:
        json_data['Code'] = "004"
        json_data['Message'] = "Error occurred: " + str(e)

    return HttpResponse(json.dumps(json_data))

# -------- Country DropDown ---------
class CountryDropdownList(APIView):
    def get(self, request, format=None):
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        # Univeral Job Category List
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 152
        }
        country_list = bx24.get_all('lists.element.get', universal_list)
        response_data = []
        for lst in country_list:
            country_id = lst['ID']
            country_name = lst['NAME']
            country_data = {    
                "country_name": country_name,
                "country_id": country_id
            }
            response_data.append(country_data)
        return HttpResponse(json.dumps(response_data))
    
# --------- News Letter ---------
@csrf_exempt
def subscribe_news_letter(request):
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            news_letter_email = post.get("news_letter_email")         
            get_newsletter_params = {"entityTypeId": 176,"filter":{"categoryId":312}}
            existing_email_response = bx24.get_all('crm.item.list', get_newsletter_params)
            green_existing_deal_id = None
            # Green Website list items
            for lst in existing_email_response:
                existing_email = lst['ufCrm90_1693819429']
                news_letter_deal_id = lst['id']
                if news_letter_email == existing_email:                   
                    green_existing_deal_id = news_letter_deal_id                    
                    break 
            if green_existing_deal_id:
                json_data['Code'] = "002"
                json_data['Message'] = "Subscribe Already"
            else:
                news_letter_subcribe_params = {"entityTypeId":176,
                 "fields": {
                     "categoryId":312,
                     "ufCrm90_1693819429": news_letter_email
                }}
                news_letter_subcribe_params_reponse = bx24.get_all('crm.item.add', news_letter_subcribe_params)
                if news_letter_subcribe_params_reponse:
                    json_data['Code'] = "001"
                    json_data['Message'] = "News Letter Added"
                else:
                    json_data['Code'] = "003"
                    json_data['Message'] = "Failed"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

def Get_Access_Token():
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    secret = "ce35717972b25a49f6e97480bb115a84"
    username = "re-engineer03@green.com.pg"
    password = "Green@12345*"
    orgId = 195002
# try:
    passhash = hashlib.sha256(password.encode()).hexdigest()
    conn = http.client.HTTPSConnection(url)
    if orgId:
        print(f" ??? Using organization ID: {orgId}")
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash, "orgId": orgId})
    else:
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash})
    headers = {"Content-Type": "application/json"}
    endpoint = f"/account/v1.0/token?appId="+appid+"&language=en&="
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    data = json.loads(res.decode('utf-8'))
    print("?? Token received successfully")
    print(data["access_token"])
    return data["access_token"]
# except Exception as error:
    # print(f"{time_stamp()}: ?? Unable to fetch token: {str(error)}")
    # return None


@csrf_exempt
def SolarMan_HistoryList(request):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"startTime":"2023-10-01","endTime":"2023-10-18","stationId": 3560357,"timeType":3})
    endpoint = "//station/v1.0/history?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    print("RESPONSE-----------------------------",res)
    data = json.loads(res.decode('utf-8'))

@csrf_exempt
def SolarMan_DeviceList(request):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"stationId": 3560357})
    endpoint = "//station/v1.0/device?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    print("RESPONSE-----------------------------",res)
    data = json.loads(res.decode('utf-8'))

class CMSEventLoad(APIView):
    def get(self, request, format=None):
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        # Get the current date
        filter_current_date = datetime.now()
        print(" -- FF -- ", filter_current_date)
        formated_current_date = filter_current_date.strftime("%Y-%m-%d %H:%M:%S")
        print(" -- FF -- ", formated_current_date)
        cms_params = {
            "entityTypeId": 176,
            "filter": {
                "stageId": "DT176_356:CLIENT",
                "categoryId": 356,
                ">=ufCrm90_1704182671": formated_current_date
            }
        }
        cms_event_data = bx24.get_all('crm.item.list', cms_params)
        print(cms_event_data)
        if cms_event_data:
            media_url_data = cms_event_data[0]['ufCrm90_1704190772']
            cms_data = {"media_url": media_url_data}
            return HttpResponse(json.dumps(cms_data))
        else:
            return HttpResponse("No matching records found.")

@csrf_exempt
def ecommerce_subscribe_news_letter(request):
    json_data = {}
    try:
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        news_letter_source_from = "3466"
        news_letter_email = request.GET.get('newsletter_email')
        get_newsletter_params = {"entityTypeId": 176,"filter":{"categoryId":312, "ufCrm90_1710144083":news_letter_source_from}}
        existing_email_response = bx24.get_all('crm.item.list', get_newsletter_params)
        green_existing_deal_id = None
        # Green Website list items
        for lst in existing_email_response:
            existing_email = lst['ufCrm90_1693819429']
            news_letter_deal_id = lst['id']
            if news_letter_email == existing_email:                
                green_existing_deal_id = news_letter_deal_id                    
                break
        if green_existing_deal_id:
            json_data['Code'] = "GD_002"
            json_data['Message'] = "Already Subscribed"
        else:
            news_letter_subcribe_params = {"entityTypeId":176,
             "fields": {
                 "categoryId":312,
                 "ufCrm90_1710144083": news_letter_source_from,
                 "ufCrm90_1693819429": news_letter_email
                }
            }
            news_letter_subcribe_params_reponse = bx24.get_all('crm.item.add', news_letter_subcribe_params)
            if news_letter_subcribe_params_reponse:
                json_data['Code'] = "GD_001"
                json_data['Message'] = "News Letter Subscribed"
            else:
                json_data['Code'] = "GD_003"
                json_data['Message'] = "News Letter Subscription Failed"
    except Exception as e:
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

