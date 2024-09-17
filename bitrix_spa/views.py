from django.views.generic.base import TemplateView
from django.db import connection
import json
from django.http import HttpResponse, HttpResponseServerError 
from django.views.decorators.csrf import csrf_exempt
from bitrix24 import *
from fast_bitrix24 import Bitrix
import json
from django.http import HttpResponse, JsonResponse
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from django.template.loader import get_template 
from django.template.response import TemplateResponse
from datetime import datetime
import base64
import io
from django.core.files.uploadedfile import SimpleUploadedFile
from datetime import datetime, timedelta, timezone

# Create your views here.

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
        print("USEEEERRR",active_user)
        if active_user:
            template_name = 'spa_modules.html'
        else:
            pass
        return [template_name]

    def get(self, request, *args, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        cur = connection.cursor() 

        return self.render_to_response(context)


def get_spa_list_items(request):

    json_data={}

    try:
        if request.method == 'GET':
            cr = connection.cursor()
            cr.execute("""select id, name, entitytypeid from spa""")
            spa_list = dictfetchall(cr)

            if spa_list:
                json_data['status'] = 1
                json_data['data'] = spa_list
            else:
                json_data['status'] = 0
                json_data['message'] = 'No Data Found'
        else:
            json_data['status'] = 0
            json_data['message'] = 'Error in Request'

        return HttpResponse(json.dumps(json_data))
    
    except Exception as e:
        json_data = e
        return HttpResponseServerError(json.dumps(json_data))
    
@csrf_exempt
def get_filter_pipeline(request):

    json_data = {}
    try:
        post = request.POST
        if post:
            entity_id = request.POST.get('entitytypeid')
            print("entitytype id: ", entity_id)

        if entity_id:
            cr = connection.cursor()
            cr.execute("""select id, name from finac_pg_pipeline where entitytypeid = {0}""".format(entity_id))
            filter_pipeline = dictfetchall(cr)

            if filter_pipeline:
                json_data['status'] = 1
                json_data['data'] = filter_pipeline
            else:
                json_data['status'] = 0
                json_data['message'] = 'No Data Found'
        else:
            json_data['status'] = 0
            json_data['message'] = 'Error in Request'

        return HttpResponse(json.dumps(json_data))
    
    except Exception as e:
        json_data = e

        return HttpResponseServerError(json.dumps(json_data))
    

@csrf_exempt
def add_finac_pg_items(request):
    json_data = {}
    cr = connection.cursor()

    try:
    
        bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')

        finac_pg = bx24.callMethod('crm.item.list',
                    entityTypeId=144,
                    filter={'STAGE_ID': 'DT144_12:PREPARATION'})

        cr = connection.cursor()

        for item in finac_pg['items']:
            print("loooooopppppp")
            item_id = item["id"]
            name = item['title']
            your_company_details = item["mycompanyId"]
            voucher_type = item["ufCrm8_1678853355978"]
            company_bank = item["ufCrm8_1678867135821"]
            finally_paid_amount = item["opportunity"]
            amount_in_words = item["ufCrm8_1678695088"]
            financial_year = item["ufCrm8_1681113992011"]
            voucher_date = item["ufCrm8_1678872933579"]
            selected_vendor = item["ufCrm8_1678690203"]
            contract_no = item["ufCrm8_1678690010"]
            must_be_paid = item["ufCrm8_1678689476919"]
            budget_code = item["ufCrm8_1681803703"]
            project = item["ufCrm8_1678689879"]
            tax_invoice = item["ufCrm8_1678689792"]
            check_by = item["ufCrm8_1678694732"]
            approver = item["ufCrm8_1678694991"]
            authorizer = item["ufCrm8_1678694948"]
            paid_for = item["ufCrm8_1678690729"]
            payment_no = item["ufCrm8_1678690151"]
            payment_type = item["ufCrm8_1678690062"]
            vendor_bank = item["ufCrm8_1678694908"]
            entityTypeId = item["entityTypeId"]
            currency_id = item["currencyId"]

            if "ufCrm8_1678690708" not in item or not item["ufCrm8_1678690708"]:
                part_percentage = ''
            else:
                part_percentage = item["ufCrm8_1678690708"]

            if "ufCrm8_1679471165395" not in item or not item["ufCrm8_1679471165395"]:
                estimated_cost = ''
            else:
                estimated_cost = item["ufCrm8_1679471165395"]

            # select query
            cr.execute("SELECT id FROM finac_pg_expense_approval WHERE id = %s", (item_id,))
            existing_id = cr.fetchone()

            if existing_id:
                # Update existing record
                cr.execute("""UPDATE finac_pg_expense_approval SET name = %s,your_company_details = %s,voucher_type = %s,company_bank = %s, finally_paid_amount = %s,amount_in_words = %s,
                financial_year = %s, voucher_date = %s,selected_vendor = %s, po_contract_no = %s, must_be_paid = %s,budget_code = %s,project = %s,tax_invoice = %s,check_by = %s,
                approver = %s,authorizer = %s,paid_for = %s,payment_no = %s,payment_type = %s,vendor_bank = %s, currency_id = %s, part_percentage = %s, estimated_cost = %s WHERE id = %s""",
                (name, your_company_details, voucher_type, company_bank, finally_paid_amount, amount_in_words, financial_year, voucher_date, selected_vendor, contract_no, must_be_paid, 
                budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,payment_type,vendor_bank,currency_id,part_percentage,estimated_cost,item_id))

                update_result = dictfetchall(cr)[0]

                if update_result:
                    print("updated success")
                    json_data['msg'] = "Data Updated Succesfully"
                else:
                    print("No Updates")

            else:
                cr.execute("""INSERT INTO finac_pg_expense_approval(id,name,your_company_details,voucher_type,company_bank, finally_paid_amount,amount_in_words, financial_year, voucher_date,selected_vendor, po_contract_no,
                must_be_paid,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,payment_type,vendor_bank, entitytypeid, currency_id, part_percentage, estimated_cost)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
                (item_id,name, your_company_details, voucher_type, company_bank, finally_paid_amount, amount_in_words, financial_year, voucher_date, selected_vendor, contract_no, must_be_paid, 
                budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,payment_type,vendor_bank,entityTypeId,currency_id,part_percentage,estimated_cost))

                finac_pg_inserted = dictfetchall(cr)[0]

                if finac_pg_inserted:
                    print("created success")
                    json_data['msg'] = "Data Created Succesfully"
    
    except:
        print("errorrrrrr")                

    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def add_finac_in_items(request):
    print("hitttt")
    json_data = {}
    cr = connection.cursor()

    try:

        bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')

        bitrix = bx24.callMethod('crm.item.list',
                    entityTypeId=163,
                    filter={'STAGE_ID': 'DT163_116:CLIENT'})

        cr = connection.cursor()

        for item in bitrix['items']:

            item_id = item['id']
            name = item['title']
            your_company_details = item['companyId']
            voucher_type = item['ufCrm40_1678958112148']
            finally_paid_amount = item['opportunity']
            financial_year = item['ufCrm40_1681103293165']
            voucher_date = item['ufCrm40_1678950209058']
            selected_vendor = item['ufCrm40_1678433789']
            po_contract_no = item['ufCrm40_1678434078']
            stage = item['stageId']
            budget_code = item['ufCrm40_1678433726']
            project = item['ufCrm40_1678433690']
            tax_invoice = item['ufCrm40_1678434353674']
            check_by = item['ufCrm40_1678435899']
            approver = item['ufCrm40_1678435944']
            authorizer = item['ufCrm40_1678436017']
            paid_for = item['ufCrm40_1678433626']
            payment_no = item['ufCrm40_1678434205']
            amount_in_words = item['ufCrm40_1678435486337']
            entitytypeid = item['entityTypeId']
            currency_id = item['currencyId']
            part_percentage = item['ufCrm40_1678434322897']
            estimated_cost = item['ufCrm40_1678962641574']

            # select query
            cr.execute("SELECT id FROM finac_in_expense_approval WHERE id = %s", (item_id,))
            existing_id = cr.fetchone()

            if existing_id:
                print("update")
                cr.execute("""UPDATE finac_in_expense_approval SET name = %s,your_company_details = %s,voucher_type = %s,finally_paid_amount = %s,financial_year = %s,voucher_date = %s,
                selected_vendor = %s, po_contract_no = %s, stage = %s,budget_code = %s,project = %s,tax_invoice = %s,check_by = %s,approver = %s,authorizer = %s,paid_for = %s,payment_no = %s,
                amount_in_words = %s,entitytypeid = %s,currency_id = %s,part_percentage = %s,estimated_cost = %s WHERE id = %s""",
                (name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor,po_contract_no,
                stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,
                part_percentage,estimated_cost,item_id))

                update_result = dictfetchall(cr)[0]

                if update_result:
                    json_data['msg'] = "Data Updated Succesfully"

            else:
                print("insert")
                cr.execute("""INSERT INTO finac_in_expense_approval(id,name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor, po_contract_no,
                stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,part_percentage,estimated_cost)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
                (item_id,name,your_company_details,voucher_type,finally_paid_amount,financial_year,voucher_date,selected_vendor,po_contract_no,
                stage,budget_code,project,tax_invoice,check_by,approver,authorizer,paid_for,payment_no,amount_in_words,entitytypeid,currency_id,
                part_percentage,estimated_cost))

                finac_in_inserted = dictfetchall(cr)[0]

                if finac_in_inserted:
                    json_data['msg'] = "Data Created Succesfully"

    except Exception as e:
        print("Error:", e)                

    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def add_scm_pg_items(request):
    json_data = {}
    cr = connection.cursor()

    try:
    
        bx24 = Bitrix24('https://greenltd.bitrix24.com/rest/60/yl1b02umrcjvl0we/')
        bitrix = bx24.callMethod('crm.item.list',
                             entityTypeId=136,
                             filter={'STAGE_ID': 'DT136_10:UC_JTOLMO'})

        cr = connection.cursor()

        for item in bitrix['items']:
            item_id = item["id"]
            name = item['title']
            your_company_details = item["mycompanyId"]
            contract_name = item["ufCrm6_1673415884618"]
            project_code = item["ufCrm6_1676088867814"]    
            budget_code = item["ufCrm6_1676090546844"]       
            delivery_address = item["ufCrm6_1675420569"]       
            po_aprroval = item["ufCrm6_1675422188514"]      
            po_authorizer = item["ufCrm6_1675943400"]      
            new_po_deal_no = item["ufCrm6_1676008287365"]
            old_po_deal_no = item["ufCrm6_1678097393558"]
            financial_year = item["ufCrm6_1681114473003"]
            check_by = item["ufCrm6_1674208135"]
            sourceid = item["sourceId"]
            procurement_type = item["ufCrm6_1673424319476"]
            ordered_by = item["ufCrm6_1673416191"]
            proposal_no = item["ufCrm6_1673416311567"]
            purchase_mode = item["ufCrm6_1673493749155"]
            supplier = item["ufCrm6_1673521877"]
            approved_by = item["ufCrm6_1673953593"]
            authorized_by = item["ufCrm6_1673416311567"]
            entitytypeid = item["entityTypeId"]
            currency_id = item["currencyId"]

            # select query
            cr.execute("SELECT id FROM scm_pg_expense_approval WHERE id = %s", (item_id,))
            existing_id = cr.fetchone()

            if existing_id:

                cr.execute("""UPDATE scm_pg_expense_approval SET name = %s,your_company_details = %s,contract_name = %s,project_code = %s, budget_code = %s,
                delivery_address = %s,po_aprroval = %s, po_authorizer = %s,new_po_deal_no = %s, old_po_deal_no = %s, financial_year = %s,check_by = %s,
                sourceid = %s,procurement_type = %s,ordered_by = %s,proposal_no = %s,purchase_mode = %s,supplier = %s,approved_by = %s,authorized_by = %s,entitytypeid = %s, 
                currency_id = %s WHERE id = %s""",
                (name, your_company_details, contract_name, project_code, budget_code, delivery_address, po_aprroval, po_authorizer, 
                new_po_deal_no, old_po_deal_no, financial_year,check_by,sourceid,procurement_type,ordered_by,proposal_no,
                purchase_mode,supplier,approved_by,authorized_by,entitytypeid,currency_id,item_id))

                update_result = dictfetchall(cr)[0]

                if update_result:
                    json_data['msg'] = "Data Updated Succesfully"

            else:
                cr.execute("""INSERT INTO scm_pg_expense_approval(id,name,your_company_details,contract_name,project_code, budget_code, delivery_address, po_aprroval,
                po_authorizer, new_po_deal_no,old_po_deal_no,financial_year,check_by,sourceid,procurement_type,ordered_by,
                proposal_no,purchase_mode,supplier,approved_by, authorized_by,entitytypeid, currency_id)
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) returning id""",
                (item_id,name, your_company_details, contract_name, project_code, budget_code, delivery_address, po_aprroval, po_authorizer, 
                new_po_deal_no, old_po_deal_no, financial_year,check_by,sourceid,procurement_type,ordered_by,proposal_no,
                purchase_mode,supplier,approved_by,authorized_by,entitytypeid,currency_id))

                scm_pg_inserted = dictfetchall(cr)[0]

                if scm_pg_inserted:
                    json_data['msg'] = "Data Created Succesfully"
        
    except Exception as e:
        print("Error:", e)

    return HttpResponse(json.dumps(json_data))

class PaymentReceipt_IndexView(APIView):
    def get(self, request, entityTypeId, deal_id,format=None):
        if request.method == "GET":
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            # Finac PG Receivables 
            params = {
                "entityTypeId": entityTypeId,
                "filter":{"id": deal_id}        
            }
            payment_item_response = bx24.get_all('crm.item.list', params)
            print(payment_item_response)
            # company_list
            company_params = {
                "select": ["ID","TITLE"]
            }

            company_list_response = bx24.get_all('crm.company.list', company_params)
            company_dict = {}
            for comp in company_list_response:
                comp_id = comp['ID']
                comp_name = comp['TITLE']
                company_dict[comp_id] = comp_name
            # contact_list
            contact_params = {
                "select": ["ID","NAME","LAST_NAME"]
            }
            # contact_list_response = bx24.get_all('crm.contact.list', contact_params)
            # contact_dict = {}
            # for contact in contact_list_response:
            #     contact_person_id = contact['ID']
            #     contact_person_name = contact['NAME']
            #     contact_last_name = contact['LAST_NAME']
            #     full_name = ''
            #     if contact_person_name:
            #         full_name += contact_person_name
            #     if contact_last_name:
            #         if full_name:
            #             full_name += ' '
            #         full_name += contact_last_name
            #     contact_dict[contact_person_id] = full_name
            # mycompany = payment_item_response[0]['mycompanyId'],
            # mycompany_id = str(mycompany[0])
            # mycompany_name = company_dict[mycompany_id]
            # customer_contact_id = str(payment_item_response[0]['contactId'])
            # contact_person_name = contact_dict[customer_contact_id]
            customer_company_id = str(payment_item_response[0]['companyId'])
            customer_company_name = company_dict[customer_company_id]
            amount = str(payment_item_response[0]['opportunity'])
            currency_id = payment_item_response[0]['currencyId']
            total_amount = amount+' '+currency_id
            invoice_date_str = payment_item_response[0]['ufCrm8_1698898213']
            invice_input_date = datetime.fromisoformat(invoice_date_str)
            invoice_date = invice_input_date.strftime("%d-%b-%Y")
            my_company_logo = payment_item_response[0]['ufCrm8_1698919474']
            stageId = payment_item_response[0]['stageId']
            invoice_dict = {
                'invoice_number' : payment_item_response[0]['title'],
                # 'company_name' : mycompany_name,
                # 'customer_contact' : contact_person_name,
                'customer_company' : customer_company_name,
                'amount' : total_amount,
                'invoice_date' : invoice_date,
                'for_details' : payment_item_response[0]['ufCrm8_1698898113'],
                'company_logo': my_company_logo,
                'stage_id': stageId
            }
            response = invoice_dict
            if request.GET.get('format') == 'json':
                return JsonResponse(response)

            template = get_template('upload_payment_receipt.html')
            context = {'response_data': response}
            return TemplateResponse(request, template, context)

@csrf_exempt
def payment_receipt_file_upload(request):
    print("PPPPPPP")
    json_data = {}
    try:
        if request.method == 'POST':
            entityTypeId = request.POST.get("entityTypeId")
            deal_id = request.POST.get("deal_id")
            payment_receipt_file = request.POST.get("payment_receipt_file")
            current_datetime = datetime.now(timezone.utc)
            desired_timezone = timezone(timedelta(hours=3))
            current_datetime_with_timezone = current_datetime.astimezone(desired_timezone)
            bank_receipt_upload_date = current_datetime_with_timezone.strftime('%Y-%m-%dT%H:%M:%S%z')

            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
            params = {
                "entityTypeId": entityTypeId,
                "id": deal_id,
                "fields": {
                    "stageId": "DT144_142:UC_YCCLRQ",
                    "ufCrm8_1699262636417": bank_receipt_upload_date,
                    "ufCrm8_1680162808539": payment_receipt_file,
                    "ufCrm8_1699262932178": 3150
                }
            }
            update_response = bx24.get_all('crm.item.update', params)
            if update_response:
                json_data['Code'] = "001"
                json_data['Message'] = "Upload Success"
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Failed to Upload"

    except Exception as e:
        print(e)
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)

    return HttpResponse(json.dumps(json_data))
