from logging import exception
import logging
from unittest import result
from django.conf import settings
from django.db import connection,connections
from django.views.generic.base import TemplateView
import json
from django.http import HttpResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
# from gsolve_web_app import config
import base64
import os
from django.core.files.storage import FileSystemStorage
from xhtml2pdf import pisa 
import jinja2
import psycopg2
from psycopg2.extras import Json, DictCursor
from fast_bitrix24 import Bitrix
from datetime import datetime
import requests
from weasyprint import HTML
import pdfkit
from django.conf import settings


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


class VisaCandidate(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        return super(VisaCandidate, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request
        print("userrrr",active_user)
        if active_user:
            template_name = 'addnewemp.html'
            pass
        else:
            template_name = 'login.html'
        return [template_name]

    def get(self, request, *args, **kwargs):
        context = super(VisaCandidate, self).get_context_data(**kwargs)
        cur = connection.cursor() 

        # choose gender
        cur.execute("""select ri.id,reference_item as gender from reference_item ri left join reference_item_category ric on ri.reference_category_id=ric.id
           where ric.reference_category_code = 'GENDR' and ri.is_active""")
        dropdown_gender = dictfetchall(cur) 
        print("gennnn", dropdown_gender) 
        if dropdown_gender:
            dropdown_gender = dropdown_gender
        else:
            dropdown_gender = [] 
        
        #country 
        cur.execute("""select id,country_name AS country from country""")
        country_of_birth = dictfetchall(cur) 
        if country_of_birth:
            country_of_birth = country_of_birth
        else:
            country_of_birth = []  

        # marital status  
        cur.execute("""select ri.id,reference_item as marital_status from reference_item ri left join reference_item_category ric on ri.reference_category_id=ric.id
           where ric.reference_category_code = 'MARST' and ri.is_active""")
        marital_status = dictfetchall(cur) 
        print("marital status", marital_status)
        if marital_status:
            marital_status = marital_status
        else:
            marital_status = []

        context['dropdown_gender'] = dropdown_gender
        context['country_of_birth'] = country_of_birth
        context['marital_status'] = marital_status

        return self.render_to_response(context)

class VisaProcess(TemplateView):

    def dispatch(self, request, *args, **kwargs):
        return super(VisaProcess, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request
        print("USEEEE00",active_user)
        if active_user:
            template_name = 'visaprocess.html'
        else:
            template_name = 'login.html'
        return [template_name]
    
    def get(self, request, *args, **kwargs):
        context = super(VisaProcess, self).get_context_data(**kwargs)
        cur = connection.cursor() 
        # choose gender
        cur.execute("""select ri.id,reference_item as gender from reference_item ri left join reference_item_category ric on ri.reference_category_id=ric.id
           where ric.reference_category_code = 'GENDR' and ri.is_active""")
        dropdown_gender_visa_p = dictfetchall(cur) 
        print("gennnn", dropdown_gender_visa_p) 
        if dropdown_gender_visa_p:
            dropdown_gender_visa_p = dropdown_gender_visa_p
        else:
            dropdown_gender_visa_p = [] 
        context['dropdown_gender_visa_p'] = dropdown_gender_visa_p
        return self.render_to_response(context)



# Add employee
def addemployeeform(request):
    json_data = {}
    cr = connection.cursor()
    try:
        post = request.POST
        if post:        
            full_name = post.get("full_name")
            family_name = post.get("family_name")
            designation = post.get("designation")
            visa_gender = post.get("gender")
            date_of_birth = post.get("date_of_birth")
            country_of_birth = post.get("country_of_birth")
            application_date = post.get("application_date")
            phone_number = post.get("phone_number")
            location = post.get("location")
            citizenship = post.get("citizenship")
            nationality = post.get("nationality")
            address = post.get("address")
            marital_status = post.get("marital_status")
            passport_no = post.get("passport_no")
            expiry_date = post.get("expiry_date")
            occupation = post.get("occupation")
            passport_issue_date = post.get("passport_issue_date")
            passport_issue_place = post.get("passport_issue_place")
            passport_issue_authority = post.get("passport_issue_authority")
            emp_id = post.get("emp_id")

            print("dataaaa", post)

            try:
                if emp_id:
                    print("emp_idddd", emp_id)
    
                    cr.execute("""update employee_info set full_name=%s,family_name=%s,designation=%s, gender_id=%s, date_of_birth=%s, country_id=%s,
                    application_date=%s, phone_number=%s,location=%s, citizenship=%s,nationality=%s,address=%s,marital_status_id=%s,passport_no=%s,expiry_date=%s,
                    occupation=%s,passport_issue_date=%s,passport_issue_place=%s,passport_issue_authority=%s where id = %s returning id""",
                    (full_name, family_name,designation, visa_gender, date_of_birth, country_of_birth,application_date, phone_number, location,citizenship,nationality, 
                    address, marital_status, passport_no, expiry_date, occupation, passport_issue_date, passport_issue_place, passport_issue_authority, emp_id))
                    status_create = dictfetchall(cr)
    
                    if status_create:
                        json_data['msg'] = 'Updated Successfully'
                        json_data['status'] = 2
                    else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0
                else:
                    cr.execute("""INSERT INTO employee_info(full_name,family_name,designation, gender_id, date_of_birth, country_id,application_date, phone_number, 
                    location, citizenship,nationality,address,marital_status_id,passport_no,expiry_date,occupation,passport_issue_date,passport_issue_place,
                    passport_issue_authority,is_active, created_date, modified_date) 
                    VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,True,now(),now()) returning id""",
                    (full_name, family_name,designation, visa_gender, date_of_birth, country_of_birth,application_date, phone_number, location,citizenship,
                    nationality, address, marital_status, passport_no, expiry_date, occupation, passport_issue_date, passport_issue_place, passport_issue_authority))
                    result = dictfetchall(cr)[0]
                    print("created success id", result)

                    if result:
                        json_data['msg'] = 'Created Successfully'
                        json_data['status'] = 1
                    else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0
    
            except Exception as e:
                print(e)
        else:
            json_data['msg'] = 'No Data'
            json_data['status'] = 0
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))


def empInfoGetAll(request):
    json_data={}
    # try:
    if request:
        if request.method == 'GET':
            
            cr = connection.cursor()
            cr.execute("""select emp.id as emp_id,full_name,family_name,to_char(date_of_birth,'DD-MM-YYYY') as date_of_birth,rf.reference_item as gender,location,to_char(application_date,'DD-MM-YYYY') as application_date,to_char(date_of_birth,'DD-MM-YYYY') as date_of_birth,designation, 
       phone_number,citizenship,nationality,address,passport_no,to_char(expiry_date,'DD-MM-YYYY') as expiry_date,occupation,to_char(passport_issue_date,'DD-MM-YYYY') as passport_issue_date,
       passport_issue_place,passport_issue_authority,rff.reference_item as marital_status,con.country_name from employee_info emp 
       left join reference_item rf on emp.gender_id = rf.id and emp.is_active
       left join reference_item rff on emp.marital_status_id = rff.id and emp.is_active
       left join country con on emp.country_id = con.id and emp.is_active""")

        #     cr.execute("""select id as emp_id, to_char(arrival_date,'DD-MM-YYYY') as arrival_date, to_char(date,'DD-MM-YYYY') as date, corona_case_country_visit,
        # corona_case_country_visit_detail, symptoms_detail, future_travel_to_corona_country, symptoms from self_declaration_corona_virus""")

            employee_data = dictfetchall(cr)
            print("emppppp", employee_data)
            if employee_data:
                json_data['status'] = 1
                json_data['data'] = employee_data
            else:
                json_data['status'] = 0
                json_data['message'] = 'No Data Found'
        else:
            json_data['status'] = 0
            json_data['message'] = 'Error in Request'
        return HttpResponse(json.dumps(json_data))
    # except Exception as e:
        # json_data = e
        return HttpResponseServerError(json.dumps(json_data))


def employee_detail_getby_id(request):
    json_data = {}
    try:
        post = request.POST
        if post:
            id = request.POST.get('emp_id')
            print("employeeee click id ===== ", id)

        if id:
            cr = connection.cursor()
            cr.execute("""select emp.id as emp_id, full_name,family_name,to_char(date_of_birth,'DD-MM-YYYY') as date_of_birth,gender_id as gender,location, to_char(application_date,'DD-MM-YYYY') as application_date, to_char(date_of_birth,'DD-MM-YYYY') as date_of_birth,designation, 
            phone_number, citizenship,nationality,address,passport_no,to_char(expiry_date,'DD-MM-YYYY') as expiry_date,occupation,to_char(passport_issue_date,'DD-MM-YYYY') as passport_issue_date,
            passport_issue_place,passport_issue_authority,marital_status_id,country_id from employee_info emp where emp.id = {0}""".format(id))
            emp_detail_data = dictfetchall(cr)
            print("employee_info -------------", emp_detail_data)

            cr.execute("""select id as emp_id,family_illness_detail,family_illness_tb_detail,family_mental_illness_detail,required_medical_attention, 
            family_physical_disability_detail from medical_examination where employee_id = {0}""".format(id))
            medical_examination_data = dictfetchall(cr)
            print("medical_examination ---------", medical_examination_data)

            cr.execute("""select id as emp_id,to_char(arrival_date,'DD-MM-YYYY') as arrival_date, to_char(date,'DD-MM-YYYY') as date, corona_case_country_visit, 
            corona_case_country_visit_detail, symptoms, symptoms_detail, future_travel_to_corona_country from self_declaration_corona_virus where employee_id = {0}""".format(id))
            self_declaration = dictfetchall(cr)
            print("self_declaration_corona_virus -----------", self_declaration)

            cr.execute("""select id, visit_purpose,stay_duration,stay_duration_type,flight_name,departure_place, to_char(departure_date,'DD-MM-YYYY') as departure_date,arrival_place,
            to_char(arrival_date,'DD-MM-YYYY') as arrival_date,employment_purpose ,stay_fund,previous_family_name,previous_given_name,
            to_char(previous_given_dob,'DD-MM-YYYY') as previous_given_dob,previous_gender_id,previous_marital_status_id,other_passport_country_id,
            other_passport_no,to_char(other_passport_expiry_date,'DD-MM-YYYY') as other_passport_expiry_date,organization_name,agent,address,town,province,
            postcode,org_country_id,business_telephone,fascsimile,visited_png_before,to_char(last_visit_date,'DD-MM-YYYY') as last_visit_date,last_visit_purpose,
            last_visit_duration,last_visit_stay_address,criminal_offence_convicted,criminal_offence_detail,criminal_offence_refused,entry_refused_detail,mental_issue,
            mental_issue_detail,res_addr_street,res_addr_town,res_addr_province,res_addr_postcode,res_addr_country_id,res_addr_home_tel,res_addr_mobile_tel,res_addr_email,
            res_addre_email_communication,png_street,png_town,png_provice,png_postal_address,png_home_tel,png_mobile_tel,emergency_family_name,
            emergency_given_name,emergency_relationship,emergency_address,emergency_town,emergency_province,emergency_postcode,emergency_country_id,
            emergency_home_tel,emergency_mobile_tel,to_char(emergency_date,'DD-MM-YYYY') as emergency_date from entry_permit_application
            where employee_id={0}""".format(id))
            entrywork_permit_data = dictfetchall(cr)
            print("entrywork_permit_data===============", entrywork_permit_data)

            cr.execute("""select application_checklist,general_work_permit,volunteer_work_permit,
            shortterm_work_permit,longterm_work_permit,workpermit_term,employer, employer_address,telephone,fax,email,
            industrial_division,industrial_subdivision,png_employees_employed,non_citizen_employed,
            job_title,occupation,job_code,company_position_code,primary_work_location,other_location_travel,
            other_location_travel_detail,reserved_occupation_position,advertised_position,advertised_detail, 
            dependent_accompany,dependent_accompany_count,png_current_workpermit_holder,workpermit_number,training_institution_1,
            to_char(from_duration_1,'DD-MM-YYYY') as from_duration_1,to_char(to_duration_1,'DD-MM-YYYY') as to_duration_1,field_study_1,
            training_institution_2,to_char(from_duration_2,'DD-MM-YYYY') as from_duration_2,to_char(to_duration_2,'DD-MM-YYYY') as to_duration_2,
            field_study_2,employer_location_1,industry_1,to_char(employment_from_duration_1,'DD-MM-YYYY') as employment_from_duration_1,
            to_char(employment_to_duration_1,'DD-MM-YYYY') as employment_to_duration_1,occupation_1,employer_location_2,industry_2,
            to_char(employment_from_duration_2,'DD-MM-YYYY') as employment_from_duration_2,to_char(employment_to_duration_2,'DD-MM-YYYY') as employment_to_duration_2,
            occupation_2,origin_country_id,origin_city,english_speaking_country,passed_english_proficiency,english_proficiency_institution, to_char(test_undertaken,'DD-MM-YYYY') as test_undertaken,
            results,alternative_proof,take_home_salary,non_salary_allowance, total_salary_package from work_permit_application
            where employee_id={0}""".format(id))
            work_permit_data = dictfetchall(cr)
            print("work_permit_data===============", work_permit_data)
            
            if emp_detail_data or medical_examination_data or self_declaration or entrywork_permit_data or work_permit_data: 
                json_data['emp_detail_data'] = emp_detail_data
                json_data['medical_examination_data'] = medical_examination_data
                json_data['self_declaration'] = self_declaration
                json_data['entrywork_permit_data'] = entrywork_permit_data
                json_data['work_permit_data'] = work_permit_data
                json_data['status'] = 1

            else:
                json_data['msg'] = 'No Data'
                json_data['status'] = 0
                
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))
    
def employee_info_getby_id(request):
    json_data = {}
    try:
        post = request.POST
        if post:
            id = request.POST.get('emp_id')
            # print(id)

        if id:
            cr = connection.cursor()
            cr.execute("""select emp.id as emp_id, full_name, designation, rf.reference_item as gender, to_char(application_date,'DD-MM-YYYY') as application_date, to_char(date_of_birth,'DD-MM-YYYY') as date_of_birth, 
            phone_number, location from employee_info emp left join reference_item rf on emp.gender_id = rf.id where emp.id = {0}""".format(id))
            emp_info_data = dictfetchall(cr)

            cr.execute("""select employee_id as emp_id, remarks::jsonb from visa_document_remark where employee_id = {0} and is_active""".format(id))
            document_remark = dictfetchall(cr) 

            cr.execute("""select employee_id as emp_id, file_name,file_format,document_reference_name as file_source, reason from visa_image where document_type = 'Step1' and employee_id = {0} and document_reference_name!='step1_passport_copy'""".format(id))
            visa_images_step1 = dictfetchall(cr)
            
            cr.execute("""select employee_id as emp_id, file_name,file_format,document_reference_name as file_source, reason from visa_image where document_type = 'Step1' and employee_id = {0} and document_reference_name='step1_passport_copy'""".format(id))
            visa_images_step1_photocopy = dictfetchall(cr) 

            cr.execute("""select employee_id as emp_id, file_name,file_format,document_reference_name as file_source from visa_image where document_type = 'Step2' and employee_id = {0}""".format(id))
            visa_images_step2 = dictfetchall(cr)
            
             
            cr.execute("""select employee_id as emp_id, file_name,file_format,document_reference_name as file_source, reason from visa_image where document_type = 'Step3' and employee_id = {0}""".format(id))
            visa_images_step3 = dictfetchall(cr) 

            cr.execute("""select employee_id as emp_id, file_name,file_format,document_reference_name as file_source from visa_image where document_type = 'Step4' and employee_id = {0}""".format(id))
            visa_images_step4 = dictfetchall(cr)

            
            
            if emp_info_data:   
                json_data['emp_info_data'] = emp_info_data
                json_data['status'] = 1
                if document_remark:
                    json_data['document_remark'] = document_remark   
                else:
                    json_data['document_remark'] = []  
                if visa_images_step1:
                    json_data['visa_images_step1'] = visa_images_step1   
                else:
                    json_data['visa_images_step1'] = 0  
                if visa_images_step1_photocopy:
                    json_data['visa_images_step1_photocopy'] = visa_images_step1_photocopy   
                else:
                    json_data['visa_images_step1_photocopy'] = 0
                if visa_images_step2:
                    json_data['visa_images_step2'] = visa_images_step2 
                else:
                    json_data['visa_images_step2'] = 0
                if visa_images_step3:
                    json_data['visa_images_step3'] = visa_images_step3
                else:
                    json_data['visa_images_step3'] = 0
                if visa_images_step4:
                    json_data['visa_images_step4'] = visa_images_step4
                else:
                    json_data['visa_images_step4'] = 0
                
            else:
                json_data['msg'] = 'No Data'
                json_data['status'] = 0
                
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))


def delete_emp_info(request):
    json_data = {}
    try:
        post = request.POST
        if post:
            emp_id = post.get("emp_id")
            print("dsssssssssssssss", emp_id)
        if emp_id:
            print("ggggggggggggnnnnn", emp_id)
            try:
                cr = connection.cursor()

                cr.execute("""delete from entry_permit_application where employee_id={0} returning id""".format(emp_id))
                entry_permit_application = dictfetchall(cr)

                cr.execute("""delete from work_permit_application where employee_id={0} returning id""".format(emp_id))
                work_permit_application = dictfetchall(cr)

                cr.execute("""delete from medical_examination where employee_id={0} returning id""".format(emp_id))
                medical_examination = dictfetchall(cr)

                cr.execute("""delete from self_declaration_corona_virus where employee_id={0} returning id""".format(emp_id))
                self_declaration = dictfetchall(cr)

                cr.execute("""delete from employee_info where id={0} returning id""".format(emp_id))
                employee_info_delete = dictfetchall(cr)

                if employee_info_delete and self_declaration and medical_examination and entry_permit_application and work_permit_application:
                    # logging.info("General Info Deleted Successfully")

                    json_data['status'] = 1
                    json_data['message'] = 'Deleted Sucessfully'
                else:
                    json_data['status'] = 2
                    json_data['message'] = 'Deletion Failed'
            except Exception as e:
                    print("ERRRRRRRR", e)
        else:
                json_data['msg'] = 'No Data'
                json_data['status'] = 0
    except Exception as e:
        # logging.exception(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))


#####------------------------------------------------------Visa Document Attched--------------------------------------------------------############

@csrf_exempt
def VisadocuCreateUpdate(request):
    json_data = {}
    # print("jsonnnnn", json_data)
    cr = connection.cursor()
    try:
        post = request.POST
        if post:
            file_data = json.loads(post.get("file_data"))
            photocopy_file_data =json.loads(post.get("photocopy_file_data"))
            emp_id = post.get("emp_id")
            pc_file_data_reason = post.get("pc_file_data_reason")
            file_path=settings.MEDIA_ROOT+"visa_processing/"

            # print("emppp_id", emp_id)

            if emp_id:
                try:
                    if photocopy_file_data:
                        cr.execute("""delete from visa_image where employee_id = {0} and document_reference_name = 'step1_passport_copy' """.format(emp_id,))
                        for i in range(len(photocopy_file_data)):
                            pc_file_source=str(photocopy_file_data[i]['file_source'])
                            pc_extension = str(photocopy_file_data[i]['format'])
                            pc_file_name = str(photocopy_file_data[i]['file_source'])+"_"+str(emp_id)+"_"+str(i)+'.'+str(pc_extension)
                            print(pc_file_name)
                            with open(file_path+pc_file_name, "wb") as fh:
                                fh.write(base64.b64decode(photocopy_file_data[i]['img_str']))
                            cr.execute("""INSERT INTO visa_image(employee_id, document_reference_name, document_type, file_name, file_path, 
                                file_format, reason, is_active, created_date, modified_date)
                                VALUES (%s, %s, 'Step1', %s, %s, %s, %s, True, now(), now()) returning id""",
                                (emp_id, pc_file_source, pc_file_name, file_path, pc_extension, pc_file_data_reason))
                            pc_image_id = cr.fetchone()
                            print("CCCCCCCCCCCCC"),pc_image_id
                            if pc_image_id:
                                logging.info("Visa Created Successfully")
                                json_data['msg'] = 'Created Successfully'
                                json_data['status'] = 1


                    for i in range(len(file_data)):
                        img_data = str(file_data[i])
                        file_source = str(file_data[i]['file_source'])
                        extension = str(file_data[i]['format'])
                        reasons = str(file_data[i]['reason'])
                        file_name = str(file_data[i]['file_source'])+"_"+str(emp_id)+'.'+str(file_data[i]['format'])
                        with open(file_path+file_name, "wb") as fh:
                            fh.write(base64.b64decode(file_data[i]['img_str']))
                        cr.execute("""select id from visa_image where document_reference_name = '{0}' and employee_id = {1} and document_reference_name != 'step1_passport_copy'""".format(file_source,emp_id,))
                        existing_file=cr.fetchone()
                        print("yyyyyyyyyyy",existing_file)
                        if existing_file:
                           
                            cr.execute("""delete from visa_image where  employee_id={0} and  document_reference_name != 'step1_passport_copy' and document_type='Step1' and id not in ({1})""".format(emp_id,existing_file[0]))
                            # cr.execute("""delete from visa_image where  employee_id not in ({1})""".format(emp_id,existing_file[0]))

                            cr.execute("""update visa_image set document_reference_name = %s, file_name = %s, file_format = %s, reason = %s
                            where id = %s returning id""",
                            (file_source,file_name,extension, reasons, existing_file[0]))
                            update_data = dictfetchall(cr)
                            print("updateeeeeeee", update_data)
                            if update_data:
                                logging.info("visa process Updated Successfully")
                                json_data['msg'] = 'Updated Successfully'
                                json_data['status'] = 2
                            else:
                                json_data['msg'] = 'data load failed'
                                json_data['status'] = 0
                        else:
                            cr.execute("""INSERT INTO visa_image(employee_id, document_reference_name, document_type, file_name, file_path, 
                            file_format, reason, is_active, created_date, modified_date)
                            VALUES (%s, %s, 'Step1', %s, %s, %s, %s, True, now(), now()) returning id""",
                            (emp_id, file_source, file_name, file_path, extension, reasons))
                            image_id = cr.fetchone()
                            if image_id:
                                logging.info("Visa Created Successfully")
                                json_data['msg'] = 'Created Successfully'
                                json_data['status'] = 1
                            else:
                                json_data['msg'] = 'data load failed'
                                json_data['status'] = 0
                except Exception as e:
                    print(e)
    except Exception as e:
        logging.exception(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def WorkPermitUpload(request):
    json_data = {}
    # print("jsonnnnn", json_data)
    cr = connection.cursor()
    post = request.POST
    if post:
        file_data = json.loads(post.get("file_data"))
        emp_id = post.get("emp_id")
        print()
        img_data = str(file_data[0])
        step_no=post.get("step_no")
        file_source = str(file_data[0]['file_source'])
        extension = str(file_data[0]['format'])
        file_name = str(file_data[0]['file_source'])+"_"+str(emp_id)+'.'+str(file_data[0]['format'])
        file_path=settings.MEDIA_ROOT+"visa_processing/"
        with open(file_path+file_name, "wb") as fh:
            fh.write(base64.b64decode(file_data[0]['img_str']))
        cr.execute("""select id from visa_image where file_name = '{0}' and employee_id = {1} and document_type = '{2}' """.format(file_name,emp_id,step_no))
        existing_file=cr.fetchone()
        if existing_file:
                cr.execute("""update visa_image set document_reference_name = %s, file_name = %s, file_format = %s
                where id = %s returning id""",
                (file_source,file_name,extension,existing_file[0]))
                update_data = dictfetchall(cr)
                if update_data:
                        logging.info("Work Permit Uploaded")
                        json_data['msg'] = 'Updated Successfully'
                        json_data['file_name']=file_name
                        json_data['status'] = 2
                else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0
        else:
                cr.execute("""INSERT INTO visa_image(employee_id, document_reference_name, document_type, file_name, file_path, 
                            file_format, is_active, created_date, modified_date)
                            VALUES (%s, %s, %s, %s, %s, %s, True, now(), now()) returning id""",
                            (emp_id, file_source,step_no, file_name, file_path, extension))
                image_id = cr.fetchone()
                if image_id:
                        logging.info("Visa Created Successfully")
                        json_data['msg'] = 'Created Successfully'
                        json_data['file_name']=file_name
                        json_data['status'] = 1
                else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def IndiaVisaCreateUpdate(request):
    json_data = {}
    # print("jsonnnnn", json_data)
    cr = connection.cursor()
    try:
        post = request.POST
        if post:
            file_data = json.loads(post.get("file_data"))
            emp_id = post.get("emp_id")
            if emp_id:
                try:
                    print("piccccccc", len(file_data))
                    for i in range(len(file_data)):
                        img_data = str(file_data[i])
                        file_source = str(file_data[i]['file_source'])
                        extension = str(file_data[i]['format'])
                        reasons = str(file_data[i]['reason'])
                        file_name = str(file_data[i]['file_source'])+"_"+str(emp_id)+'.'+str(file_data[i]['format'])
                        file_path=settings.MEDIA_ROOT+"visa_processing/"
                        with open(file_path+file_name, "wb") as fh:
                            fh.write(base64.b64decode(file_data[i]['img_str']))
                        cr.execute("""select id from visa_image where file_name = '{0}' and employee_id = {1}""".format(file_name,emp_id))
                        existing_file=cr.fetchone()
                        if existing_file:
                            cr.execute("""update visa_image set document_reference_name = %s, file_name = %s, file_format = %s, reason = %s
                            where id = %s returning id""",
                            (file_source,file_name,extension, reasons, existing_file[0]))
                            update_data = dictfetchall(cr)
                            print("updateeeeeeee", update_data)
                            if update_data:
                                logging.info("visa process Updated Successfully")
                                json_data['msg'] = 'Updated Successfully'
                                json_data['status'] = 2
                            else:
                                json_data['msg'] = 'data load failed'
                                json_data['status'] = 0
                        else:
                            cr.execute("""INSERT INTO visa_image(employee_id, document_reference_name, document_type, file_name, file_path, 
                            file_format, reason, is_active, created_date, modified_date)
                            VALUES (%s, %s, 'Step3', %s, %s, %s, %s, True, now(), now()) returning id""",
                            (emp_id, file_source, file_name, file_path, extension, reasons))
                            image_id = cr.fetchone()
                            if image_id:
                                logging.info("Visa Created Successfully")
                                json_data['msg'] = 'Created Successfully'
                                json_data['status'] = 1
                            else:
                                json_data['msg'] = 'data load failed'
                                json_data['status'] = 0
                except exception as e:
                    print(e)
    except Exception as e:
        logging.exception(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def EmployeeDocumentGenerate(request):
    json_data = {}
    print("jsonnnnn", json_data)
    cr = connection.cursor()
    if cr:
        post = request.POST
        if post:
            emp_id = post.get("emp_id")
            document_type = post.get("document_type")
            templateLoader = jinja2.FileSystemLoader(searchpath=settings.APPLICATION_PATH+"visa_process/templates")
            templateEnv = jinja2.Environment(loader=templateLoader)
            if document_type == "self_declaration":
                cr.execute("""select emp.full_name,to_char(emp.date_of_birth,'DD-Mon-YYYY') as dob,emp.nationality,emp.passport_no, 
			to_char(sd.arrival_date,'DD-Mon-YYYY') as arrival_date,sd.corona_case_country_visit,sd.corona_case_country_visit_detail,
			sd.symptoms::jsonb as symptoms,sd.symptoms_detail,sd.future_travel_to_corona_country from employee_info emp inner join 
			self_declaration_corona_virus sd on emp.id=sd.employee_id where emp.id={0}""".format(emp_id))
                data_set=dictfetchall(cr)
                if data_set:
                    print(data_set[0]['symptoms'])
                    data_set[0]['symptoms']=json.loads(data_set[0]['symptoms'])
                TEMPLATE_FILE = "GL_Self_Declaration_Corona_Virus_Form_Template.htm"
            elif document_type == "work_permit":
                cr.execute("""select string_to_array(application_checklist,',') as application_checklist,general_work_permit,volunteer_work_permit,
            shortterm_work_permit,longterm_work_permit,workpermit_term,employer, employer_address,telephone,fax,email,
            industrial_division,industrial_subdivision,png_employees_employed,non_citizen_employed,
            job_title,wp.occupation,job_code,company_position_code,primary_work_location,other_location_travel,
            other_location_travel_detail,reserved_occupation_position,advertised_position,string_to_array(advertised_detail,',') as advertised_detail, 
			ei.family_name as surname,ei.full_name as given_name,to_char(date_of_birth,'DD') as  dob_date,to_char(date_of_birth,'Mon') as  dob_month,to_char(date_of_birth,'YYYY') as  dob_year,
			ri.reference_item as gender,ei.passport_no,ei.nationality,dependent_accompany,dependent_accompany_count,
			png_current_workpermit_holder,string_to_array(to_char(workpermit_number, '9,9,9,9,9,9,9,9'),',') as workpermit_number,
			training_institution_1,to_char(from_duration_1,'DD-MM-YYYY') as from_duration_1,to_char(to_duration_1,'DD-MM-YYYY') as to_duration_1,field_study_1,
            training_institution_2,to_char(from_duration_2,'DD-MM-YYYY') as from_duration_2,to_char(to_duration_2,'DD-MM-YYYY') as to_duration_2,
            field_study_2,employer_location_1,industry_1,to_char(employment_from_duration_1,'DD-MM-YYYY') as employment_from_duration_1,
            to_char(employment_to_duration_1,'DD-MM-YYYY') as employment_to_duration_1,occupation_1,employer_location_2,industry_2,
            to_char(employment_from_duration_2,'DD-MM-YYYY') as employment_from_duration_2,to_char(employment_to_duration_2,'DD-MM-YYYY') as employment_to_duration_2,
            occupation_2,con.country_name as origin_country_name,origin_city,english_speaking_country,passed_english_proficiency,english_proficiency_institution, to_char(test_undertaken,'DD-MM-YYYY') as test_undertaken,
            results,alternative_proof,take_home_salary,non_salary_allowance, total_salary_package from work_permit_application wp
            left join country con on wp.origin_country_id=con.id
			left join employee_info ei on wp.employee_id=ei.id
			left join reference_item ri on ei.gender_id=ri.id
			where employee_id={0} """.format(emp_id))
                data_set=dictfetchall(cr)
                TEMPLATE_FILE = "GL_New_Work_Permit_Application_form_Template.htm"
            elif document_type == "medical_examination":
                cr.execute("""select UPPER(ei.full_name) as full_name,ei.address,to_char(date_of_birth,'DD-Mon-YYYY') as date_of_birth, 	ei.passport_no,me.family_illness_detail,me.family_illness_tb_detail,me.family_mental_illness_detail,me.required_medical_attention, 
            me.family_physical_disability_detail from medical_examination me left join employee_info ei
			on me.employee_id=ei.id where me.employee_id= {0}""".format(emp_id))
                data_set=dictfetchall(cr)
                TEMPLATE_FILE = "GL_Visa_Medical_Examiantion_Form_Template.htm"
            elif document_type == "entry_permit":
                cr.execute("""select ei.full_name as given_name,ei.family_name,to_char(ei.date_of_birth,'DD-Mon-YYYY') as date_of_birth,ri.reference_item as gender,
			ri2.reference_item as marital_status,con.country_name,ei.nationality,passport_no,to_char(ei.expiry_date,'DD-Mon-YYYY') as expiry_date,ei.occupation,
			to_char(ei.passport_issue_date,'DD-Mon-YYYY') as passport_issue_date,ei.passport_issue_place,ei.passport_issue_authority,
			visit_purpose,stay_duration,stay_duration_type,flight_name,departure_place, to_char(departure_date,'DD-Mon-YYYY') as departure_date,arrival_place,
            to_char(arrival_date,'DD-Mon-YYYY') as arrival_date,string_to_array(employment_purpose,',') as employment_purpose ,string_to_array(stay_fund,',') as stay_fund,previous_family_name,previous_given_name,
            to_char(previous_given_dob,'DD-Mon-YYYY') as previous_given_dob,ri3.reference_item as previous_gender,ri4.reference_item as previous_marital_status,con1.country_name as other_passport_country,
            other_passport_no,to_char(other_passport_expiry_date,'DD-Mon-YYYY') as other_passport_expiry_date,organization_name,agent,ep.address,town,province,
            postcode,con2.country_name as org_country,business_telephone,fascsimile,visited_png_before,to_char(last_visit_date,'DD-Mon-YYYY') as last_visit_date,last_visit_purpose,
            last_visit_duration,last_visit_stay_address,criminal_offence_convicted,criminal_offence_detail,criminal_offence_refused,entry_refused_detail,mental_issue,
            mental_issue_detail,res_addr_street,res_addr_town,res_addr_province,res_addr_postcode,con3.country_name as res_addr_country,res_addr_home_tel,res_addr_mobile_tel,res_addr_email,
            res_addre_email_communication,png_street,png_town,png_provice,png_postal_address,png_home_tel,png_mobile_tel,emergency_family_name,
            emergency_given_name,emergency_relationship,emergency_address,emergency_town,emergency_province,emergency_postcode,con4.country_name as emergency_country,
            emergency_home_tel,emergency_mobile_tel,to_char(emergency_date,'DD') as declaration_date,to_char(emergency_date,'MM') as declaration_month,to_char(emergency_date,'YYYY') as declaration_year from entry_permit_application ep
			left join employee_info ei on ep.employee_id = ei.id 
			left join reference_item ri on ei.gender_id=ri.id
			left join reference_item ri2 on ei.marital_status_id=ri2.id 
			left join reference_item ri3 on ep.previous_gender_id=ri3.id
			left join reference_item ri4 on ep.previous_marital_status_id=ri4.id
			left join country con on ei.country_id=con.id		
			left join country con1 on ep.other_passport_country_id=con1.id		
			left join country con2 on ep.org_country_id=con2.id		
			left join country con3 on ep.res_addr_country_id=con3.id		
			left join country con4 on ep.emergency_country_id=con4.id		
			where employee_id= {0} """.format(emp_id))
                data_set=dictfetchall(cr)
                TEMPLATE_FILE = "GL_Application_for_entry_permit_form_Template.htm"
            else:
                cr.execute("""select family_name,full_name,citizenship,to_char(date_of_birth,'DD-Mon-YYYY') as dob,passport_no 
                from employee_info where is_active and id={0} """.format(emp_id))
                data_set=dictfetchall(cr)
                print(data_set[0])
                TEMPLATE_FILE = "GL_Radiological_Report_Form_Template.htm"
            data_dict={}
            if data_set:
                data_dict['data']=data_set[0]
                
            print(data_dict)   
            template = templateEnv.get_template(TEMPLATE_FILE)
            #body = '{"data":{"invoice_id":"invoice_id","to_branch":"to_branch"}}'
            #body=json.loads(body)
            if data_dict:
                sourceHtml = template.render(json_data=data_dict["data"])
                # open output file for writing (truncated binary)
                file_name=str(document_type)+str(emp_id)+'.pdf'
                resultFile = open(settings.MEDIA_ROOT+'Visa_Employee_Document/'+file_name, "w+b")
                # convert HTML to PDF
                pisaStatus = pisa.CreatePDF(
                        src=sourceHtml,            # the HTML to convert
                        dest=resultFile)           # file handle to receive result
                # close output file
                resultFile.close()
                print(resultFile)
                json_data['file_name']=file_name
                json_data['status'] = "NTE_01"
            else:
                json_data['status'] = "NO_DATA"
    # except Exception as e:
        # logging.exception(e)
        # print(e)
        # json_data['msg'] = 'Failure'
        # json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def BitrixEmployeeVisaDocumentGenerate(request, id, doc_type):
    json_data = {}
    templateLoader = jinja2.FileSystemLoader(searchpath=settings.APPLICATION_PATH+"visa_process/templates")
    templateEnv = jinja2.Environment(loader=templateLoader)
    api_endpoint = 'https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/'
    bx24 = Bitrix(api_endpoint)
    upload_url = api_endpoint + 'crm.documentgenerator.document.upload'
    data_dict={}
    print("IDDDDDDDDDDDDDDDDDDDDDD",id,type(id))
    TEMPLATE_FILE=""
    if doc_type=="self_declaration":
        params = {
            "entityTypeId": 160,
            "filter":{"=id":id},
            "select": ["id", "title","ufCrm114_1700726247","ufCrm114_1700726264","ufCrm114_1700726475","ufCrm114_1700726411","ufCrm114_1700729036","ufCrm114_1700729099","ufCrm114_1700729566","ufCrm114_1700730082","ufCrm114_1700729588","ufCrm114_1700729603"],
        }
        self_declaration = bx24.get_all('crm.item.list', params)
        print("--- self_declaration --- ",self_declaration)
        data_set = [
        {
            'full_name': item['ufCrm114_1700726247'],
            'dob': datetime.fromisoformat(item['ufCrm114_1700726264']) if item['ufCrm114_1700726264'] else None,
            'nationality': item['ufCrm114_1700726475'],
            'passport_no': item['ufCrm114_1700726411'],
            'arrival_date':  datetime.fromisoformat(item['ufCrm114_1700729036']) if item['ufCrm114_1700729036'] else " ",
            'corona_case_country_visit': item['ufCrm114_1700729099'],
            'corona_case_country_visit_detail': item['ufCrm114_1700729566'],
            'symptoms_detail': item['ufCrm114_1700729588'],
            'future_travel_to_corona_country': item['ufCrm114_1700729603'],
            'symptoms': item['ufCrm114_1700730082']
        }
        for item in self_declaration
        ]
        
        if data_set:
            data_dict['data']=data_set[0]
        print("--- data_dict ---",data_dict)
        TEMPLATE_FILE = "Bitrix_GL_Self_Declaration_Corona_Virus_Form_Template.htm"
        DOCUMENT_TITLE= "Self_Declaration_"+str(id)+".pdf"
    elif doc_type=="work_permit":
        params = {
        "entityTypeId": 160,            
        "filter":{"=id":id},
        "select": ["id", "title", "ufCrm114_1700733750","ufCrm114_1700731014","ufCrm114_1700731085","ufCrm114_1700731109",
            "ufCrm114_1700731139","ufCrm114_1700736942","ufCrm114_1700731214","ufCrm114_1700731232","ufCrm114_1700731250",
            "ufCrm114_1700737031","ufCrm114_1700731325","ufCrm114_1700731350","ufCrm114_1700731363","ufCrm114_1700731379",
            "ufCrm114_1700731417","ufCrm114_1700731433","ufCrm114_1700731446","ufCrm114_1700731459","ufCrm114_1700731481",
            "ufCrm114_1700731499","ufCrm114_1700731525","ufCrm114_1700731595","ufCrm114_1700731628","ufCrm114_1700731698",
            "ufCrm114_1700726354","ufCrm114_1700726247","ufCrm114_1700726264","ufCrm114_1700726527","ufCrm114_1700726411",
            "ufCrm114_1700731664","ufCrm114_1700731715","ufCrm114_1700731844","ufCrm114_1700731942","ufCrm114_1700732015",
            "ufCrm114_1700732044","ufCrm114_1700732355","ufCrm114_1700732383","ufCrm114_1700732030","ufCrm114_1700732107",
            "ufCrm114_1700732329","ufCrm114_1700732401","ufCrm114_1700732449","ufCrm114_1700732491","ufCrm114_1700732585",
            "ufCrm114_1700732641","ufCrm114_1700732665","ufCrm114_1700732475","ufCrm114_1700732503","ufCrm114_1700732612",
            "ufCrm114_1700732629","ufCrm114_1700732686","ufCrm114_1700732708","ufCrm114_1700732742","ufCrm114_1700731813",
            "ufCrm114_1700731837","ufCrm114_1700731883","ufCrm114_1700731934","ufCrm114_1700731954","ufCrm114_1700731978",
            "ufCrm114_1700732006","ufCrm114_1700732045","ufCrm114_1700732060","ufCrm114_1700731268","ufCrm114_1700726475"]}
        work_permit_application = bx24.get_all('crm.item.list', params)
        print("---- work_permit_application ---- ",work_permit_application)
        data_set = [
        {
            'application_checklist': item['ufCrm114_1700733750'],
            'general_work_permit': item['ufCrm114_1700731014'],
            'volunteer_work_permit': item['ufCrm114_1700731085'],
            'shortterm_work_permit': item['ufCrm114_1700731109'],
            'longterm_work_permit': item['ufCrm114_1700731139'],
            'workpermit_term': item['ufCrm114_1700736942'],
            'employer': item['ufCrm114_1700731214'],
            'employer_address': item['ufCrm114_1700731232'],
            'telephone': item['ufCrm114_1700731250'],
            'fax': item['ufCrm114_1700731268'],
            'email': item['ufCrm114_1700737031'],
            'industrial_division': item['ufCrm114_1700731325'],
            'industrial_subdivision': item['ufCrm114_1700731350'],
            'png_employees_employed': item['ufCrm114_1700731363'],
            'non_citizen_employed': item['ufCrm114_1700731379'],
            'job_title': item['ufCrm114_1700731417'],
            'occupation': item['ufCrm114_1700731433'],
            'job_code': item['ufCrm114_1700731446'],
            'company_position_code': item['ufCrm114_1700731459'],
            'primary_work_location': item['ufCrm114_1700731481'],
            'other_location_travel': item['ufCrm114_1700731499'],
            'other_location_travel_detail': item['ufCrm114_1700731525'],
            'reserved_occupation_position': item['ufCrm114_1700731595'],
            'advertised_position': item['ufCrm114_1700731628'],
            'advertised_detail': item['ufCrm114_1700731698'],
            'surname': item['ufCrm114_1700726354'],
            'given_name': item['ufCrm114_1700726247'],
            'dob_date': datetime.fromisoformat(item['ufCrm114_1700726264']) if item['ufCrm114_1700726264'] else None,
            'gender': item['ufCrm114_1700726527'],
            'passport_no': item['ufCrm114_1700726411'],
            'nationality': item['ufCrm114_1700726475'],
            'dependent_accompany': item['ufCrm114_1700731664'],
            'dependent_accompany_count': item['ufCrm114_1700731715'],
            'png_current_workpermit_holder': item['ufCrm114_1700731844'],
            'workpermit_number': [int(digit) for digit in str(item['ufCrm114_1700731942'])] if item['ufCrm114_1700731942'] is not None else None,
            'workpermit_number_validation': True if item['ufCrm114_1700731942'] is not None else False,
            'training_institution_1': item['ufCrm114_1700732015'],
            'from_duration_1': datetime.fromisoformat(item['ufCrm114_1700732044']) if item['ufCrm114_1700732044'] else None,
            'to_duration_1': datetime.fromisoformat(item['ufCrm114_1700732355']) if item['ufCrm114_1700732355'] else None,
            'field_study_1': item['ufCrm114_1700732383'],
            'training_institution_2': item['ufCrm114_1700732030'],
            'from_duration_2': datetime.fromisoformat(item['ufCrm114_1700732107']) if item['ufCrm114_1700732107'] else None,
            'to_duration_2': datetime.fromisoformat(item['ufCrm114_1700732329']) if item['ufCrm114_1700732329'] else None,
            'field_study_2': item['ufCrm114_1700732401'],
            'employer_location_1': item['ufCrm114_1700732449'],
            'industry_1': item['ufCrm114_1700732491'],
            'employment_from_duration_1': datetime.fromisoformat(item['ufCrm114_1700732585']) if item['ufCrm114_1700732355'] else None,
            'employment_to_duration_1': datetime.fromisoformat(item['ufCrm114_1700732641']) if item['ufCrm114_1700732355'] else None,
            'occupation_1': item['ufCrm114_1700732665'],
            'employer_location_2': item['ufCrm114_1700732475'],
            'industry_2': item['ufCrm114_1700732503'],
            'employment_from_duration_2': datetime.fromisoformat(item['ufCrm114_1700732612']) if item['ufCrm114_1700732355'] else None,
            'employment_to_duration_2': datetime.fromisoformat(item['ufCrm114_1700732629']) if item['ufCrm114_1700732355'] else None,
            'occupation_2': item['ufCrm114_1700732686'],
            'origin_country_name': item['ufCrm114_1700732708'],
            'origin_city': item['ufCrm114_1700732742'],
            'english_speaking_country': item['ufCrm114_1700731813'],
            'passed_english_proficiency': item['ufCrm114_1700731837'],
            'english_proficiency_institution': item['ufCrm114_1700731883'],
            'test_undertaken': datetime.fromisoformat(item['ufCrm114_1700731934']) if item['ufCrm114_1700731934'] else None,
            'results': item['ufCrm114_1700731954'], # -- File Field
            'alternative_proof': item['ufCrm114_1700731978'],
            'take_home_salary': item['ufCrm114_1700732006'] if item['ufCrm114_1700732006'] else '',
            'non_salary_allowance': item['ufCrm114_1700732045'] if item['ufCrm114_1700732045'] else '',
            'total_salary_package': item['ufCrm114_1700732060'] if item['ufCrm114_1700732060'] else '',
        }
        for item in work_permit_application]
        if data_set:
            data_dict['data']=data_set[0]
        print(data_dict)
        TEMPLATE_FILE = "Bitrix_GL_New_Work_Permit_Application_form_Template.htm"
        DOCUMENT_TITLE= "Work_Permit"+str(id)+".pdf"
    elif doc_type=="entry_permit":
        # company_list
        country_params = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 152
        }
        country_list_response = bx24.get_all('lists.element.get', country_params)
        country_dict = {}
        for country in country_list_response:
            country_id = country['ID']
            country_name = country['NAME']
            country_dict[country_id] = country_name
            
        #Marital status    
        marital_status_params = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 154
        }
        marital_status_list_response = bx24.get_all('lists.element.get', marital_status_params)
        marital_status_dict = {}
        for marital_status in marital_status_list_response:
            marital_status_id = marital_status['ID']
            marital_status_name = marital_status['NAME']
            marital_status_dict[marital_status_id] = marital_status_name
        
        #Gender    
        gender_params = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 150
        }
        gender_list_response = bx24.get_all('lists.element.get', gender_params)
        gender_dict = {}
        for gender in gender_list_response:
            gender_id = gender['ID']
            gender_name = gender['NAME']
            gender_dict[gender_id] = gender_name
            
        params = {
        "entityTypeId": 160,
        "filter":{"=id":id},
        "select": ["id", "title", "ufCrm114_1700726247","ufCrm114_1700726354","ufCrm114_1700726264","ufCrm114_1700726527","ufCrm114_1700726298","ufCrm114_1700726371","ufCrm114_1700726475","ufCrm114_1700726411",
            "ufCrm114_1700726488","ufCrm114_1700726590","ufCrm114_1700726333","ufCrm114_1700726425","ufCrm114_1700726514","ufCrm114_1700726611","ufCrm114_1703061887","ufCrm114_1703061900","ufCrm114_1700726741","ufCrm114_1700726755",
            "ufCrm114_1700726769","ufCrm114_1700726788","ufCrm114_1700726803",'ufCrm114_1700726822',"ufCrm114_1700726903","ufCrm114_1700737418","ufCrm114_1700737434","ufCrm114_1700737451","ufCrm114_1700737472",
            "ufCrm114_1700737513","ufCrm114_1700727048","ufCrm114_1700727071","ufCrm114_1700727088","ufCrm114_1700727111","ufCrm114_1700727127","ufCrm114_1700727142","ufCrm114_1700727177","ufCrm114_1700727193",
            "ufCrm114_1700727208","ufCrm114_1700727256","ufCrm114_1700727289","ufCrm114_1700728127","ufCrm114_1700728166","ufCrm114_1700728241","ufCrm114_1700728261","ufCrm114_1700728282","ufCrm114_1700728295",
            "ufCrm114_1700728318","ufCrm114_1700728348","ufCrm114_1700728371","ufCrm114_1700728404","ufCrm114_1700728430","ufCrm114_1700728452","ufCrm114_1700728479","ufCrm114_1700728679","ufCrm114_1700728724",
            "ufCrm114_1700728745",'ufCrm114_1700728759',"ufCrm114_1700728822","ufCrm114_1700728851","ufCrm114_1700728874","ufCrm114_1700728886","ufCrm114_1700728970","ufCrm114_1700728989","ufCrm114_1700729002","ufCrm114_1700729018",
            "ufCrm114_1700729032","ufCrm114_1700729047","ufCrm114_1700729196","ufCrm114_1700729208","ufCrm114_1700729220","ufCrm114_1700729236","ufCrm114_1700729250","ufCrm114_1700729263","ufCrm114_1700729273",
            "ufCrm114_1700729287","ufCrm114_1700729315",'ufCrm114_1700729353',"ufCrm114_1700729375"]}
        entry_permit_application = bx24.get_all('crm.item.list', params)
        print("---- entry_permit_application ---- ",entry_permit_application)
        print(" ++++++ +++++ ", entry_permit_application[0]['ufCrm114_1700726264'])
        country_of_birth_str = str(entry_permit_application[0]['ufCrm114_1700726371'])
        country_of_birth = country_dict[country_of_birth_str]
        country_of_issue_str = str(entry_permit_application[0]['ufCrm114_1700727048'])
        country_of_issue = country_dict[country_of_issue_str]
        org_country_str = str(entry_permit_application[0]['ufCrm114_1700727256'])
        org_country = country_dict[org_country_str]
        residential_country_str = str(entry_permit_application[0]['ufCrm114_1700728759'])
        residential_country = country_dict[residential_country_str]
        emergency_country_str = str(entry_permit_application[0]['ufCrm114_1700729287'])
        emergency_country = country_dict[emergency_country_str]
        marital_status_str = str(entry_permit_application[0]['ufCrm114_1700726298'])
        marital_status = marital_status_dict[marital_status_str]
        prev_marital_status_str = str(entry_permit_application[0]['ufCrm114_1700737513'])
        prev_marital_status = marital_status_dict[prev_marital_status_str]
        gender_str = str(entry_permit_application[0]['ufCrm114_1700726527'])
        gender_name_id = gender_dict[gender_str]
        prev_gender_str = str(entry_permit_application[0]['ufCrm114_1700737472'])
        previous_gender = gender_dict[prev_gender_str]
        print("ooooooooooooooooooooooooooo",previous_gender)
        
        print("GEENNDERUUUUU ---- ", gender_name_id)
        print("STRR ---- ",gender_str)
        print("DDDIIIIIICCCCTTT ----", gender_dict)
        
        data_set = [
        {
            'given_name': item.get('ufCrm114_1700726247', ''),
            'family_name': item.get('ufCrm114_1700726354', ''),
            'date_of_birth': datetime.fromisoformat(item['ufCrm114_1700726264']) if item.get('ufCrm114_1700726264') else None,
            'gender_name_id': gender_name_id,
            'marital_status': marital_status,
            'country_name': country_of_birth,
            'nationality': item.get('ufCrm114_1700726475', ''),
            'passport_no': item.get('ufCrm114_1700726411', ''),
            'expiry_date': datetime.fromisoformat(item['ufCrm114_1700726488']) if item.get('ufCrm114_1700726488') else None,
            'occupation': item.get('ufCrm114_1700726590', ''),
            'passport_issue_date': datetime.fromisoformat(item['ufCrm114_1700726333']) if item.get('ufCrm114_1700726333') else None,
            'passport_issue_place': item.get('ufCrm114_1700726425', ''),
            'passport_issue_authority': item.get('ufCrm114_1700726514', ''),
            'visit_purpose': str(item.get('ufCrm114_1700726611', '')),
            'stay_duration': item.get('ufCrm114_1703061887', ''),
            'stay_duration_type': str(item.get('ufCrm114_1703061900', '')),
            'flight_name': item.get('ufCrm114_1700726741', ''),
            'departure_place': item.get('ufCrm114_1700726755', ''),
            'departure_date': datetime.fromisoformat(item['ufCrm114_1700726769']) if item.get('ufCrm114_1700726769') else None,
            'arrival_place': item.get('ufCrm114_1700726788', ''),
            'arrival_date': datetime.fromisoformat(item['ufCrm114_1700726803']) if item.get('ufCrm114_1700726803') else None,
            'employment_purpose': str(item.get('ufCrm114_1700726822', '')),
            'stay_fund': str(item.get('ufCrm114_1700726903', '')),
            'previous_family_name': item.get('ufCrm114_1700737418', ''),
            'previous_given_name': item.get('ufCrm114_1700737434', ''),
            'previous_given_dob': item.get('ufCrm114_1700737451', ''),
            'previous_gender': previous_gender,
            'previous_marital_status': prev_marital_status,
            'other_passport_country': country_of_issue,
            'other_passport_no': item.get('ufCrm114_1700727071', ''),
            'other_passport_expiry_date': datetime.fromisoformat(item['ufCrm114_1700727088']) if item.get('ufCrm114_1700727088') else None,
            'organization_name': item.get('ufCrm114_1700727111', ''),
            'agent': item.get('ufCrm114_1700727127', ''),
            'address': item.get('ufCrm114_1700727142', ''),
            'town': item.get('ufCrm114_1700727177', ''),
            'province': item.get('ufCrm114_1700727193', ''),
            'postcode': item.get('ufCrm114_1700727208', ''),
            'org_country': org_country,
            'business_telephone': item.get('ufCrm114_1700727289', ''),    
            'fascsimile': item.get('ufCrm114_1700728127', ''),
            'visited_png_before': item.get('ufCrm114_1700728166', ''),
            'last_visit_date': datetime.fromisoformat(item['ufCrm114_1700728241']) if item.get('ufCrm114_1700728241') else None,
            'last_visit_purpose': item.get('ufCrm114_1700728261', ''),
            'last_visit_duration': item.get('ufCrm114_1700728282', ''),
            'last_visit_stay_address': item.get('ufCrm114_1700728295', ''),
            'criminal_offence_convicted': item.get('ufCrm114_1700728318', ''),
            'criminal_offence_detail': item.get('ufCrm114_1700728348', ''),
            'criminal_offence_refused': item.get('ufCrm114_1700728371', ''),
            'entry_refused_detail': item.get('ufCrm114_1700728404', ''),
            'mental_issue': item.get('ufCrm114_1700728430', ''),
            'mental_issue_detail': item.get('ufCrm114_1700728452', ''),
            'res_addr_street': item.get('ufCrm114_1700728479', ''),
            'res_addr_town': item.get('ufCrm114_1700728679', ''),
            'res_addr_province': item.get('ufCrm114_1700728724', ''),
            'res_addr_postcode': item.get('ufCrm114_1700728745', ''),
            'res_addr_country': residential_country,
            'res_addr_home_tel': item.get('ufCrm114_1700728822', ''),
            'res_addr_mobile_tel': item.get('ufCrm114_1700728851', ''),
            'res_addr_email': item.get('ufCrm114_1700728874', ''),
            'email_notification': item.get('ufCrm114_1700728886', ''),
            'png_street': item.get('ufCrm114_1700728970', ''),
            'png_town': item.get('ufCrm114_1700728989', ''),
            'png_provice': item.get('ufCrm114_1700729002', ''),
            'png_postal_address': item.get('ufCrm114_1700729018', ''),
            'png_home_tel': item.get('ufCrm114_1700729032', ''),
            'png_mobile_tel': item.get('ufCrm114_1700729047', ''),
            'emergency_family_name': item.get('ufCrm114_1700729196', ''),
            'emergency_given_name': item.get('ufCrm114_1700729208', ''),
            'emergency_relationship': item.get('ufCrm114_1700729220', ''),
            'emergency_address': item.get('ufCrm114_1700729236', ''),
            'emergency_town': item.get('ufCrm114_1700729250', ''),
            'emergency_province': item.get('ufCrm114_1700729263', ''),
            'emergency_postcode': item.get('ufCrm114_1700729273', ''),
            'emergency_country': emergency_country,
            'emergency_home_tel': item.get('ufCrm114_1700729315', ''),
            'emergency_mobile_tel': item.get('ufCrm114_1700729353', ''),
            'declaration_date': datetime.fromisoformat(item['ufCrm114_1700729375']) if item.get('ufCrm114_1700729375') else None,
        }

        for item in entry_permit_application]
        if data_set:
            data_dict['data']=data_set[0]
        print(data_dict)
        TEMPLATE_FILE = "Bitrix_GL_Application_for_entry_permit_form_Template.htm"
        DOCUMENT_TITLE= "Entry_Permit"+str(id)+".pdf"
    elif doc_type=="medical_examination":
        params = {
            "entityTypeId": 160,
            "filter":{"=id":id},
            "select": ["id", "title","ufCrm114_1700728882","ufCrm114_1700728932","ufCrm114_1700728905","ufCrm114_1700728943","ufCrm114_1700728917"],
        }
        medical_examination = bx24.get_all('crm.item.list', params)
        print("MMMMMMMMMM",medical_examination)
        data_set = [
        {
            'family_illness_detail': item['ufCrm114_1700728882'],
            'family_illness_tb_detail': item['ufCrm114_1700728932'],
            'family_mental_illness_detail': item['ufCrm114_1700728905'],
            'required_medical_attention': item['ufCrm114_1700728943'],
            'family_physical_disability_detail': item['ufCrm114_1700728917'],
        }
        for item in medical_examination
        ]
        
        if data_set:
            data_dict['data']=data_set[0]
        print(data_dict)
        TEMPLATE_FILE = "Bitrix_GL_Visa_Medical_Examination_Form_Template.htm"
        DOCUMENT_TITLE= "Medical_Examination_"+str(id)+".pdf"
        
    elif doc_type=="work_resident":
        params = {
            "entityTypeId": 160,
            "filter":{"=id":id},
            "select": ["id", "title","ufCrm114_1703062431","ufCrm114_1703062441","ufCrm114_1703062486","ufCrm114_1703062534",
            "ufCrm114_1703062578","ufCrm114_1703063333","ufCrm114_1703063349","ufCrm114_1703063464","ufCrm114_1703063492",
            "ufCrm114_1703064245","ufCrm114_1703064336" ],
        }
        work_resident = bx24.get_all('crm.item.list', params)
        print("work resident",work_resident)
        data_set = [
        {
            'name_of_employer': item['ufCrm114_1703062431'],
            'date_work_resident': datetime.fromisoformat(item['ufCrm114_1703062441']) if item['ufCrm114_1703062441'] else None,
            'name_of_applicant_surname': item['ufCrm114_1703062486'],
            'name_of_applicant_given_name': item['ufCrm114_1703062534'],
            'contact_person_telephone': item['ufCrm114_1703062578'],
            'contact_person_office_phone': item['ufCrm114_1703063333'],
            'contact_person_mobile': item['ufCrm114_1703063349'],
            'applicant_email': item['ufCrm114_1703063464'],
            'fax': item['ufCrm114_1703063492'],
            'email_communication': item['ufCrm114_1703064245'],
            'work_resident_checklist': item['ufCrm114_1703064336'],
            
            
        }
        for item in work_resident
        ]
        
        if data_set:
            data_dict['data']=data_set[0]
        print(data_dict)
        TEMPLATE_FILE = "Bitrix_GL_Work_Resident_Application_form_Template.htm"
        DOCUMENT_TITLE= "Work_Resident"+str(id)+".pdf"
        
    

    template = templateEnv.get_template(TEMPLATE_FILE)
            #body = '{"data":{"invoice_id":"invoice_id","to_branch":"to_branch"}}'
            #body=json.loads(body)
    if data_dict:
                sourceHtml = template.render(json_data=data_dict["data"])
                # open output file for writing (truncated binary)
                result_file_path = os.path.join(settings.MEDIA_ROOT, 'Visa_Employee_Document', DOCUMENT_TITLE)
                
                options_common = {'enable-local-file-access': True}
                options_work_permit = {
                    'page-size': 'Letter',
                    'margin-top': '0in',
                    'margin-right': '0in',
                    'margin-bottom': '0in',
                    'margin-left': '0in',
                }

                if doc_type=="work_permit":
                    options = {**options_common, **options_work_permit}
                else:
                    options = options_common

                pdfkit.from_string(sourceHtml, result_file_path, options=options)
                # resultFile = open(settings.MEDIA_ROOT+'Visa_Employee_Document/'+DOCUMENT_TITLE, "w+b")
                # convert HTML to PDF
                # print("SOURCE_______",sourceHtml,type(sourceHtml))
                # print("RESULT_________",resultFile,type(resultFile.name))
                # pisaStatus = pisa.CreatePDF(
                #         src=sourceHtml,            # the HTML to convert
                #         dest=resultFile)           # file handle to receive result
                # pdfkit.from_string(sourceHtml, resultFile)
                
                # close output file
                # HTML(string=sourceHtml).write_pdf(resultFile)

                # result_file_path.close()
                # print(resultFile)
    document_path=settings.MEDIA_ROOT+'Visa_Employee_Document/'+DOCUMENT_TITLE
    with open(document_path, 'rb') as file:
        document_data = file.read()
    document_base64 = base64.b64encode(document_data).decode('utf-8')
    payload = {
        'fields': {
            'fileContent': document_base64,
            'entityTypeId': 160,
            'entityId': id,
            'title': DOCUMENT_TITLE,
            'number': id,
            'region': 'india'
        }
    }
    response = requests.post(upload_url, json=payload)
    if response.status_code == 200:
        document_data = response.json()
        if 'result' in document_data and 'id' in document_data['result']:
            document_id = document_data['result']['id']
            print(document_id)
        else:
            print('Document Uploded')
                  

@csrf_exempt
def EmployeeDocumentRemarks(request):
    json_data = {}
    print("jsonnnnn", json_data)
    cr = connection.cursor()
    try:
        post = request.POST
        if post:
            emp_id = post.get("emp_id")
            remarks = json.loads(post.get("remarks"))
            cr.execute("""select id from visa_document_remark where employee_id={0} """.format(emp_id))
            remarks_id=dictfetchall(cr)
            if remarks_id:
                cr.execute("""UPDATE visa_document_remark SET employee_id={0},remarks={1} where id={2} returning id""".format
                            (emp_id, Json(remarks), remarks_id[0]['id'],))
                update_id = cr.fetchone()
                if update_id:
                    logging.info("Employee Document Remarks Updated")
                    json_data['msg'] = 'Remarks Updated'
                    json_data['status'] = 'NTE_02'
                else:
                    json_data['msg'] = 'Data Not Loaded'
                    json_data['status'] = 'ERROR'
            else:
                cr.execute("""INSERT into visa_document_remark(employee_id,remarks,is_active) VALUES ({0},{1},true)returning id""".format
                            (emp_id, Json(remarks),))
                insert_id = cr.fetchone()
                if insert_id:
                    logging.info("Employee Document Remarks Inserted")
                    json_data['msg'] = 'Remarks Inserted'
                    json_data['status'] = 'NTE_01'
                else:
                    json_data['msg'] = 'Data Not Loaded'
                    json_data['status'] = 'ERROR'
    except Exception as e:
        logging.exception(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 'ERROR'
    return HttpResponse(json.dumps(json_data))

# medical_examiantion_form
@csrf_exempt
def medical_examiantion_form(request):
    json_data = {}
    cr = connection.cursor()
    try:
        post = request.POST
        if post:        
            family_illness_detail = post.get("family_illness_detail")
            family_illness_tb_detail = post.get("family_illness_tb_detail")
            family_mental_illness_detail = post.get("family_mental_illness_detail")
            required_medical_attention = post.get("required_medical_attention")
            family_physical_disability_detail = post.get("family_physical_disability_detail")
            
            emp_id = post.get("emp_id")

            cr.execute("""select id from medical_examination where employee_id = {0}""".format(emp_id))
            medical_id = cr.fetchone()
            print("update medical_id ======", medical_id)

            if emp_id and medical_id:
                print("enter a query")
                cr.execute("""UPDATE medical_examination set family_illness_detail= %s,family_illness_tb_detail= %s,family_mental_illness_detail = %s,
                required_medical_attention = %s,family_physical_disability_detail = %s where employee_id = %s returning id""",
                (family_illness_detail, family_illness_tb_detail, family_mental_illness_detail,required_medical_attention,family_physical_disability_detail, emp_id))
                status_create = dictfetchall(cr)

                if status_create:
                        json_data['msg'] = 'Updated Successfully'
                        json_data['status'] = 2
                else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0

            else:           
                cr.execute("""INSERT INTO medical_examination(employee_id,family_illness_detail,family_illness_tb_detail,family_mental_illness_detail,
                required_medical_attention,family_physical_disability_detail,is_active, created_date, modified_date) 
                VALUES(%s,%s,%s,%s,%s,%s,True,now(),now()) returning id""",
                (emp_id, family_illness_detail, family_illness_tb_detail, family_mental_illness_detail,required_medical_attention,family_physical_disability_detail))
                result = dictfetchall(cr)
                print("medical examiantion form_id ===========", result)
                if result:
                    json_data['msg'] = 'Created Successfully'
                    json_data['status'] = 1
                else:
                    json_data['msg'] = 'data load failed'
                    json_data['status'] = 0
    
        else:
            json_data['msg'] = 'No Data'
            json_data['status'] = 0
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))



# self decleartion form
def self_declaration_form(request):
    json_data = {}
    # con = connections['default']
    # con.ensure_connection()
    # cr = con.connection.cursor(cursor_factory=DictCursor)
    cr = connection.cursor()
    post = request.POST
    if post:        
        arrival_date = post.get("arrival_date")
        date = post.get("date")
        country_visit = post.get("country_visit")
        country_visit_detail = post.get("country_visit_detail")
        symptoms = json.loads(post.get("symptoms"))
        symptoms_details = post.get("symptoms_details") 
        travelling = post.get("travelling")
        emp_id = post.get("emp_id")
        print("self decleartion on click get iddd =====", emp_id)
        print(post)
        
        if country_visit == "false":
            country_visit_detail = None
        if symptoms == "false":
            symptoms_details = None

        cr.execute("""select id from self_declaration_corona_virus where employee_id = {0}""".format(emp_id))
        self_declaration_id = cr.fetchone()
        print("update self declaration id ==========", self_declaration_id)
        
        if self_declaration_id and emp_id:   
            print("updateee query")
            cr.execute("""update self_declaration_corona_virus set arrival_date = '{0}', date = '{1}', corona_case_country_visit= '{2}', corona_case_country_visit_detail= '{3}',
            symptoms_detail = '{4}', future_travel_to_corona_country = {5}, symptoms = {6} where employee_id = {7} returning id""".format
            (arrival_date,date,country_visit,country_visit_detail, symptoms_details, travelling, Json(symptoms), emp_id))
            update_self_id = dictfetchall(cr)            
            if update_self_id:
                json_data['msg'] = 'Updated Successfully'
                json_data['status'] = 2
            else:
                json_data['msg'] = 'data load failed'
                json_data['status'] = 0
        else:            
            cr.execute("""INSERT INTO self_declaration_corona_virus(employee_id,arrival_date,date,corona_case_country_visit,corona_case_country_visit_detail,
            symptoms_detail,future_travel_to_corona_country,symptoms,is_active, created_date, modified_date) 
            VALUES({0},'{1}','{2}',{3},'{4}','{5}',{6},{7},True,now(),now()) returning id""".format
            (emp_id,arrival_date,date,country_visit,country_visit_detail, symptoms_details, travelling, Json(symptoms)))
            form_data = dictfetchall(cr)
            print("crate self_declaration iddd ========", form_data)
            if form_data:
                json_data['msg'] = 'Created Successfully'
                json_data['status'] = 1
            else:
                json_data['msg'] = 'data load failed'
                json_data['status'] = 0
    else:
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))


# def medical_examiantion_form_get_all(request):
#     json_data={}
#     try:
#         if request.method == 'GET':
#             cr = connection.cursor()
#             cr.execute("""select id as emp_id,family_illness_detail,family_illness_tb_detail,family_mental_illness_detail,required_medical_attention, 
#        family_physical_disability_detail from medical_examination""")

#             medical_examiantion = dictfetchall(cr)
#             if medical_examiantion:
#                 json_data['status'] = 1
#                 json_data['data'] = medical_examiantion
#             else:
#                 json_data['status'] = 0
#                 json_data['message'] = 'No Data Found'
#         else:
#             json_data['status'] = 0
#             json_data['message'] = 'Error in Request'
#         return HttpResponse(json.dumps(json_data))
#     except Exception as e:
#         json_data = e
#         return HttpResponseServerError(json.dumps(json_data))


# def medical_examiantion_get_by_id(request):
#     json_data = {}
#     try:
#         post = request.POST
#         if post:
#             id = request.POST.get('emp_id')

#         if id:
#             cr = connection.cursor()
#             cr.execute("""select id as emp_id,family_illness_detail,family_illness_tb_detail,family_mental_illness_detail,required_medical_attention, 
#             family_physical_disability_detail from medical_examination where id = {0}""".format(id))
#             medical_examination_data = dictfetchall(cr)
            
#             if medical_examination_data:   
#                 json_data['medical_examination_data'] = medical_examination_data
#                 json_data['status'] = 1
#             else:
#                 json_data['msg'] = 'No Data'
#                 json_data['status'] = 0
                
#     except Exception as e:
#         print(e)
#         json_data['msg'] = 'Failure'
#         json_data['status'] = 0
#     return HttpResponse(json.dumps(json_data))


# enter permit

@csrf_exempt
def entrypermit_form(request):
    json_data = {}
    print("yyyyyyyyyy",json_data)
    cr = connection.cursor()
    try:
        post = request.POST

        if post:        
            PurposePng = post.get("PurposePng")
            stayPng =post.get("stayPng")
            stayPngtype=post.get("stayPngtype")
            Name_of_Vessel =post.get("Name_of_Vessel")
            Place_Departure_to_png =post.get("Place_Departure_to_png")
            Date_Departure_to_png =post.get("Date_Departure_to_png")
            Place_Arrival_in_png =post.get("Place_Arrival_in_png")
            Date_arrival_in_png =post.get("Date_arrival_in_png")
            purposeemployment =post.get("purposeemployment")
            fundstaypng =post.get("fundstaypng")
            Family_Name =post.get("previous_FamilyName")
            Given_Names =post.get("Given_Names")
            Date_of_Birth =post.get("previous_Date_of_Birth")
            sex =post.get("sex")
            Marital_Status =post.get("Marital_Status")
            country_of_issue =post.get("country_of_issue")
            Passport_Number =post.get("Passport_Number")
            Passport_Expiry_Date =post.get("Passport_Expiry_Date")
            Organisational_Name =post.get("Organisational_Name")
            Agent =post.get("Agent")
            Contact_Address_Number_and_Street =post.get("Contact_Address_Number_and_Street")
            Town =post.get("Town")
            State_Province =post.get("State_Province")
            Postcode =post.get("Postcode")
            organisational_country =post.get("organisational_country")
            Business_Telephone =post.get("Business_Telephone")
            Facsimile =post.get("Facsimile")
            preVstPng =post.get("preVstPng")
            pngvisitDate =post.get("pngvisitDate")
            Purpose_of_visit =post.get("Purpose_of_visit")
            duration_of_visit =post.get("duration_of_visit")
            adress_during_stay =post.get("adress_during_stay")
            criminal =post.get("criminal")
            nature_of_offence =post.get("nature_of_offence")
            refused =post.get("refused")
            details =post.get("details")
            health =post.get("health")
            healthdetails =post.get("healthdetails")
            Number_and_Street =post.get("Number_and_Street")
            resi_Town =post.get("resi_Town")
            State =post.get("State")
            resi_Postcode =post.get("resi_Postcode")
            residental_country =post.get("residental_country")
            Home_Telephone =post.get("Home_Telephone")
            Mobile_Telephone =post.get("Mobile_Telephone")
            Home_Telephone =post.get("Home_Telephone")
            email_address =post.get("email_address")
            emailVe =post.get("emailVe")
            png_Number_and_Street =post.get("png_Number_and_Street")
            Town_Village =post.get("Town_Village")
            Province =post.get("Province")
            Postal_Address =post.get("Postal_Address")
            png_Home_Telephone =post.get("png_Home_Telephone")
            png_Mobile_Telephone =post.get("png_Mobile_Telephone")
            em_Family_Name =post.get("em_Family_Name")
            em_Given_Names =post.get("em_Given_Names")
            Relationship_to_Applicant =post.get("Relationship_to_Applicant")
            em_Contact_Address_Number_and_Street_organization =post.get("em_Contact_Address_Number_and_Street_organization")
            Suburb_Town =post.get("em_Suburb_Town")
            emergency_province=post.get("em_State_Province")
            Postcode =post.get("Postcode")
            em_country =post.get("em_country")
            em_Home_Telephone =post.get("em_Home_Telephone")
            em_Mobile_Telephone =post.get("em_Mobile_Telephone")
            emergencontactDate =post.get("emergencontactDate")
            emp_id = post.get("emp_id")


            if preVstPng == "false":
                pngvisitDate,Purpose_of_visit,duration_of_visit,adress_during_stay = None, None, None, None
            if criminal == "false":
                nature_of_offence = None
            if refused == "false":
                details = None
            if health == "false":
                healthdetails = None
        
            print("iiii",stayPng)

            cr.execute("""select id from entry_permit_application where employee_id = {0}""".format(emp_id))
            entrypermit_id = cr.fetchone()
            
            print("update idddd", entrypermit_id)
            print("entrypermit_form_data ################", post)  

            if emp_id and entrypermit_id:
                cr.execute("""UPDATE entry_permit_application set visit_purpose=%s,stay_duration=%s,stay_duration_type=%s,flight_name=%s,departure_place=%s,departure_date=%s,arrival_place=%s,arrival_date=%s,employment_purpose=%s,stay_fund=%s,
                previous_family_name=%s,previous_given_name=%s,previous_given_dob=%s,previous_gender_id=%s,previous_marital_status_id=%s,other_passport_country_id=%s,other_passport_no=%s,other_passport_expiry_date=%s,organization_name=%s,agent=%s,
                address=%s,town=%s,province=%s,postcode=%s,org_country_id=%s,business_telephone=%s,fascsimile=%s,visited_png_before=%s,last_visit_date=%s,last_visit_purpose=%s,
                last_visit_duration=%s,last_visit_stay_address=%s,criminal_offence_convicted=%s,criminal_offence_detail=%s,criminal_offence_refused=%s,entry_refused_detail=%s,mental_issue=%s,mental_issue_detail=%s,res_addr_street=%s,res_addr_town=%s,
                res_addr_province=%s,res_addr_postcode=%s,res_addr_country_id=%s,res_addr_home_tel=%s,res_addr_mobile_tel=%s,res_addr_email=%s,res_addre_email_communication=%s,png_street=%s,png_town=%s,png_provice=%s,
                png_postal_address=%s,png_home_tel=%s,png_mobile_tel=%s,emergency_family_name=%s,emergency_given_name=%s,emergency_relationship=%s,emergency_address=%s,emergency_town=%s,emergency_province=%s,emergency_postcode=%s,
                emergency_country_id=%s,emergency_home_tel=%s,emergency_mobile_tel=%s,emergency_date=%s where employee_id = %s returning id""",
                (str(PurposePng), stayPng,str(stayPngtype),str(Name_of_Vessel),str(Place_Departure_to_png),Date_Departure_to_png,str(Place_Arrival_in_png),Date_arrival_in_png,str(purposeemployment),str(fundstaypng),
                str(Family_Name),str(Given_Names),Date_of_Birth,sex,Marital_Status,country_of_issue,str(Passport_Number),Passport_Expiry_Date,str(Organisational_Name),str(Agent),
                str(Contact_Address_Number_and_Street),str(Town),str(State_Province),Postcode,organisational_country,str(Business_Telephone),str(Facsimile),preVstPng,pngvisitDate,str(Purpose_of_visit),
                str(duration_of_visit),str(adress_during_stay),criminal,str(nature_of_offence),refused,str(details),health,str(healthdetails),str(Number_and_Street),str(resi_Town),
                str(State),str(resi_Postcode),residental_country,str(Mobile_Telephone),str(Home_Telephone),str(email_address),emailVe,str(png_Number_and_Street),str(Town_Village),str(Province),
                str(Postal_Address),str(png_Home_Telephone),str(png_Mobile_Telephone),str(em_Family_Name),str(em_Given_Names),str(Relationship_to_Applicant),str(em_Contact_Address_Number_and_Street_organization),str(Suburb_Town),str(emergency_province),str(Postcode),em_country,
                str(em_Home_Telephone),str(em_Mobile_Telephone),emergencontactDate,emp_id))
                status_create = dictfetchall(cr)

                if status_create:
                        json_data['msg'] = 'Updated Successfully'
                        json_data['status'] = 2
                else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0
            else:    
               
                cr.execute("""INSERT INTO entry_permit_application(visit_purpose,stay_duration,stay_duration_type,flight_name,departure_place,departure_date,arrival_place,arrival_date,employment_purpose,stay_fund,
                previous_family_name,previous_given_name,previous_given_dob,previous_gender_id,previous_marital_status_id,other_passport_country_id,other_passport_no,other_passport_expiry_date,organization_name,agent,
                address,town,province,postcode,org_country_id,business_telephone,fascsimile,visited_png_before,last_visit_date,last_visit_purpose,
                last_visit_duration,last_visit_stay_address,criminal_offence_convicted,criminal_offence_detail,criminal_offence_refused,entry_refused_detail,mental_issue,mental_issue_detail,res_addr_street,res_addr_town,
                res_addr_province,res_addr_postcode,res_addr_country_id,res_addr_home_tel,res_addr_mobile_tel,res_addr_email,res_addre_email_communication,png_street,png_town,png_provice,
                png_postal_address,png_home_tel,png_mobile_tel,emergency_family_name,emergency_given_name,emergency_relationship,emergency_address,emergency_town,emergency_province,emergency_postcode,
                emergency_country_id,emergency_home_tel,emergency_mobile_tel,emergency_date,employee_id,is_active, created_date, modified_date) 
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                %s,%s,%s,%s,%s,True,now(),now()) returning id""",        
                (PurposePng, stayPng,stayPngtype,Name_of_Vessel,Place_Departure_to_png,Date_Departure_to_png,Place_Arrival_in_png,Date_arrival_in_png,purposeemployment,fundstaypng,
                Family_Name,Given_Names,Date_of_Birth,sex,Marital_Status,country_of_issue,Passport_Number,Passport_Expiry_Date,Organisational_Name,Agent,
                str(Contact_Address_Number_and_Street),Town,State_Province,Postcode,organisational_country,Business_Telephone,Facsimile,preVstPng,pngvisitDate,Purpose_of_visit,
                duration_of_visit,str(adress_during_stay),criminal,str(nature_of_offence),refused,str(details),health,healthdetails,Number_and_Street,resi_Town,
                State,resi_Postcode,residental_country,Mobile_Telephone,Home_Telephone,email_address,emailVe,png_Number_and_Street,Town_Village,Province,
                str(Postal_Address),png_Home_Telephone,png_Mobile_Telephone,em_Family_Name,em_Given_Names,Relationship_to_Applicant,em_Contact_Address_Number_and_Street_organization,Suburb_Town,emergency_province,Postcode,em_country,
                em_Home_Telephone,em_Mobile_Telephone,emergencontactDate,emp_id))
                result = dictfetchall(cr)

                print("form_id", result)
                if result:
                    json_data['msg'] = 'Created Successfully'
                    json_data['status'] = 1
                else:
                    json_data['msg'] = 'data load failed'
                    json_data['status'] = 0
            
        else:
            json_data['msg'] = 'No Data'
            json_data['status'] = 0
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))

# work permit
@csrf_exempt
def WorkPermitFormCreateUPdate(request):
    json_data = {}
    cr = connection.cursor()
    try:
        post = request.POST
        if post: 
            application_checklist = post.get("application_checklist")
            work = post.get("work")
            volunteer = post.get("volunteer")
            shortTerm = post.get("shortTerm")
            longTerm = post.get("longTerm")
            Term = post.get("Term")
            employee_name = post.get("employee_name")
            employer_address = post.get("employer_address")
            telephone = post.get("telephone")
            fax = post.get("fax")
            email = post.get("email")
            division = post.get("division")
            sub_division = post.get("sub_division")
            png_employee = post.get("png_employee")
            non_png_employee = post.get("non_png_employee")
            job_title = post.get("job_title")
            occupation1 = post.get("occupation1")
            job_code = post.get("job_code")
            position_code = post.get("position_code")
            work_location = post.get("work_location")
            loca = post.get("loca")
            location_details = post.get("location_details")
            reserved = post.get("reserved")
            advertised = post.get("advertised")
            ad = post.get("ad")
            dependent_accompanied = post.get("dependent_accompanied")
            dependent_accompany_count = post.get("dependent_accompany_count")
            work_permit_holder = post.get("work_permit_holder")
            permit_no = post.get("permit_no")
            training_institution1 = post.get("training_institution1")
            from_duration1 = post.get("from_duration1")
            to_duration1 = post.get("to_duration1")
            qualification1 = post.get("qualification1")
            training_institution2 = post.get("training_institution2")
            from_duration2 = post.get("from_duration2")
            to_duration2 = post.get("to_duration2")
            qualification2 = post.get("qualification2")
            emp_location1 = post.get("emp_location1")
            industry1 = post.get("industry1")
            from_duration3 = post.get("from_duration3")
            to_duration3 = post.get("to_duration3")
            occupation2 = post.get("occupation2")
            emp_location2 = post.get("emp_location2")
            industry2 = post.get("industry2")
            from_duration4 = post.get("from_duration4")
            to_duration4 = post.get("to_duration4")
            occupation3 = post.get("occupation3")
            origin_country = post.get("origin_country")
            city = post.get("city")
            english_speaking = post.get("english_speaking")
            language_proficiency = post.get("language_proficiency")
            edu_institute = post.get("edu_institute")
            test_date = post.get("test_date")
            result = post.get("result")
            alternative_proof = post.get("alternative_proof")
            salary = post.get("salary")
            non_salary = post.get("non_salary")
            total_salary = post.get("total_salary")
            emp_id = post.get("emp_id")

            if loca == "false":
                details = None
            if dependent_accompanied == 'false':
                dependent_accompany_count = None
            if work_permit_holder == 'false':
                permit_no = None
            if english_speaking == 'true':
                language_proficiency, edu_institute, test_date, result, alternative_proof = False,None,None,None,None
            if language_proficiency == 'false':
                edu_institute, test_date, result = None,None,None
            if language_proficiency == 'true':
                alternative_proof = None

            print("emp_iddddd", emp_id)


            cr.execute("""select id from work_permit_application where employee_id={0} """.format(emp_id))
            work_permit_id=cr.fetchone()
            print("ffffff",work_permit_id)

            if emp_id and work_permit_id:
                print("updateeeeeeeeeeeeeee")
                cr.execute("""update work_permit_application set application_checklist=%s,general_work_permit=%s,volunteer_work_permit=%s,
                shortterm_work_permit=%s,longterm_work_permit=%s,workpermit_term=%s,employer=%s, employer_address=%s,telephone=%s,fax=%s,email=%s,
                industrial_division=%s,industrial_subdivision=%s,png_employees_employed=%s,non_citizen_employed=%s,
                job_title=%s,occupation=%s,job_code=%s,company_position_code=%s,primary_work_location=%s,other_location_travel=%s,
                other_location_travel_detail=%s,reserved_occupation_position=%s,advertised_position=%s,advertised_detail=%s, 
                dependent_accompany=%s,dependent_accompany_count=%s,png_current_workpermit_holder=%s,workpermit_number=%s,training_institution_1=%s,
                from_duration_1=%s, to_duration_1=%s,field_study_1=%s,training_institution_2=%s,from_duration_2=%s,to_duration_2=%s,
                field_study_2=%s,employer_location_1=%s,industry_1=%s,employment_from_duration_1=%s,employment_to_duration_1=%s,
                occupation_1=%s,employer_location_2=%s,industry_2=%s,employment_from_duration_2=%s,employment_to_duration_2=%s,occupation_2=%s,origin_country_id=%s,
                origin_city=%s,english_speaking_country=%s,passed_english_proficiency=%s,english_proficiency_institution=%s, test_undertaken=%s,
                results=%s,alternative_proof=%s,take_home_salary=%s,non_salary_allowance=%s, total_salary_package=%s where employee_id=%s returning id""",
                (application_checklist, work, volunteer,shortTerm, longTerm,str(Term),str(employee_name),str(employer_address),str(telephone),str(fax),str(email),
                str(division),str(sub_division),png_employee,non_png_employee,str(job_title),str(occupation1),str(job_code),str(position_code),str(work_location),
                loca,location_details,reserved,advertised,ad,dependent_accompanied,dependent_accompany_count,work_permit_holder,permit_no,str(training_institution1),
                from_duration1,to_duration1,str(qualification1),str(training_institution2),from_duration2,to_duration2,qualification2,str(emp_location1),str(industry1),
                from_duration3,to_duration3,str(occupation2),str(emp_location2),str(industry2),from_duration4,to_duration4,str(occupation3),origin_country,str(city),
                english_speaking,language_proficiency,str(edu_institute),test_date,str(result),str(alternative_proof),salary,non_salary,total_salary,emp_id))
                update_work_permit=dictfetchall(cr)
                print("updated",update_work_permit)
                if update_work_permit:
                    logging.info("Work permit Updated Successfully")
                    json_data['msg'] = 'Updated Successfully'
                    json_data['status'] = 2
                else:
                    json_data['msg'] = 'data load failed'
                    json_data['status'] = 0
              

            else:  

                try:
                    print("insertttttttttttttttttttttttttttttt")
                    cr.execute("""INSERT INTO work_permit_application(employee_id,application_checklist,general_work_permit,volunteer_work_permit,
                    shortterm_work_permit,longterm_work_permit,workpermit_term,employer, employer_address,telephone,fax,email,
                    industrial_division,industrial_subdivision,png_employees_employed,non_citizen_employed,
                    job_title,occupation,job_code,company_position_code,primary_work_location,other_location_travel,
                    other_location_travel_detail,reserved_occupation_position,advertised_position,advertised_detail, 
                    dependent_accompany,dependent_accompany_count,png_current_workpermit_holder,workpermit_number,training_institution_1,
                    from_duration_1, to_duration_1,field_study_1,training_institution_2,from_duration_2,to_duration_2,
                    field_study_2,employer_location_1,industry_1,employment_from_duration_1,employment_to_duration_1,
                    occupation_1,employer_location_2,industry_2,employment_from_duration_2,employment_to_duration_2,occupation_2,origin_country_id,
                    origin_city,english_speaking_country,passed_english_proficiency,english_proficiency_institution, test_undertaken,
                    results,alternative_proof,take_home_salary,non_salary_allowance, total_salary_package,is_active,created_date,modified_date) 
                    VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,
                    %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,True,now(),now()) returning id""",
                    (emp_id,application_checklist, work, volunteer,shortTerm, longTerm,str(Term),str(employee_name),str(employer_address),str(telephone),str(fax),str(email),str(division),str(sub_division),
                    png_employee,non_png_employee,str(job_title),str(occupation1),str(job_code),str(position_code),str(work_location),loca,location_details,reserved,advertised,ad,
                    dependent_accompanied,dependent_accompany_count,work_permit_holder,permit_no,str(training_institution1),from_duration1,to_duration1,str(qualification1),str(training_institution2),from_duration2,
                    to_duration2,qualification2,str(emp_location1),str(industry1),from_duration3,to_duration3,str(occupation2),str(emp_location2),str(industry2),from_duration4,to_duration4,
                    str(occupation3),origin_country,str(city),english_speaking,language_proficiency,str(edu_institute),test_date,str(result),str(alternative_proof),salary,non_salary,total_salary))
                    work_permit= dictfetchall(cr)
                    if work_permit:
                        json_data['msg'] = 'Created Successfully'
                        json_data['status'] = 1
                    else:
                        json_data['msg'] = 'data load failed'
                        json_data['status'] = 0

                except Exception as e:
                    print(e)
        else:
            json_data['msg'] = 'No Data'
            json_data['status'] = 0
    except Exception as e:
        print(e)
        json_data['msg'] = 'Failure'
        json_data['status'] = 0
    return HttpResponse(json.dumps(json_data))
