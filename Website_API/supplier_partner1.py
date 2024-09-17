from fast_bitrix24 import Bitrix
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
import json
from bitrix24 import *
from django.views.decorators.csrf import csrf_exempt
import time

# ----- Product DropDown List -----
class ProductDropdownList(APIView):
    def get(self, request, format=None):
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 192
        }
        product_list = bx24.get_all('lists.element.get', universal_list)
        product_list_data = []
        for lst in product_list:
            product_list_id = lst['ID']
            product_name = lst['NAME']
            product_dict = {    
                "product_list_id": product_list_id,
                "product_name": product_name
            }
            product_list_data.append(product_dict)
        return HttpResponse(json.dumps(product_list_data))

# ----- Organization DropDown List -----
class OrganisationDropdownList(APIView):
    def get(self, request, format=None):
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        universal_list = {
            "IBLOCK_TYPE_ID": "lists",
            "IBLOCK_ID": 194
        }
        organisation_list = bx24.get_all('lists.element.get', universal_list)
        organisation_list_data = []
        for lst in organisation_list:
            organisation_list_id = lst['ID']
            organisation_name = lst['NAME']
            organisation_dict= {    
                "organisation_list_id": organisation_list_id,
                "organisation_name": organisation_name
            }
            organisation_list_data.append(organisation_dict)
        return HttpResponse(json.dumps(organisation_list_data))

# ------ Submit Supplier Partner -------
@csrf_exempt
def submit_supplier_partner(request):
    json_data = {}
    try:
        post = request.POST
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        if post:
            supplier_company_name = post.get("supplier_company_name")
            supplier_registerd_address = post.get("supplier_registerd_address")
            # supplier_correspondence_address = post.get("supplier_correspondence_address")
            supplier_factory_address = post.get("supplier_factory_address")
            supplier_year_established = post.get("supplier_year_established")
            supplier_law_country = post.get("supplier_law_country")
            supplier_date = post.get("supplier_date")
            supplier_place = post.get("supplier_place")
            supplier_organization = post.get("supplier_organization")
            supplier_company_email = post.get("supplier_company_email")
            supplier_website_link = post.get("supplier_website_link")
            supplier_telephone_no = post.get("supplier_telephone_no")
            supplier_mobile_no = post.get("supplier_mobile_no")
            whatsapp_checkbox = post.get("whatsapp_checkbox")
            if whatsapp_checkbox == "true":
                whatsapp_checkbox = "0"
            if whatsapp_checkbox == "false":
                whatsapp_checkbox = "1"
            brousher_file_upload = post.get("brousher_file_upload[]")
            product_selected = post.getlist('product_selected[]')
            additional_product_select = post.getlist('additional_product_select[]')

            partner_names_str = post.get("partner_name")
            if partner_names_str:
                partner_names_dict = json.loads(partner_names_str)
                partner_name = [item["value"] for item in partner_names_dict]
                partner_name = str(partner_name).strip("'\"")
            else:
                partner_name = ''

            chief_executive_name = post.get("chief_executive_name")
            chief_executive_email = post.get("chief_executive_email")
            chief_executive_phone = post.get("chief_executive_phone")
            manager_name = post.get("manager_name")
            manager_email = post.get("manager_email")
            manager_phone = post.get("manager_phone")
            contact_person_name = post.get("contact_person_name")
            contact_person_email = post.get("contact_person_email")
            contact_person_phone = post.get("contact_person_phone")

            annual_sales = post.get("annual_sales")
            currency_selector = post.get("currency_selector")
            factory_size = post.get("factory_size")
            no_of_employee = post.get("no_of_employee")
            no_of_offices = post.get("no_of_offices")
            factory_locations = post.get("factory_locations")
            no_of_plants = post.get("no_of_plants")
            business_type = post.get("business_type")
            no_of_warehouses = post.get("no_of_warehouses")
            warehouse_location_dict_str = post.get("warehouse_location")
            if warehouse_location_dict_str:
                warehouse_location_dict = json.loads(warehouse_location_dict_str)
                warehouse_location = [item["value"] for item in warehouse_location_dict]
                warehouse_location = str(warehouse_location).strip("'\"")
            else:
                warehouse_location = ''
            production_capacity = post.get("production_capacity")
            export_countries = post.getlist("export_countries[]")
            international_shipping_terms = post.get("international_shipping_terms")
            annual_report_upload = post.get("annual_report_upload[]")

            # Additional Fields
            zip_postalcode = post.get('zip_postalcode')
            company_city = post.get('company_city')
            state_and_province = post.get('state_and_province')
            linkedin_page_link = post.get('linkedin_page_link')
            company_country_code = post.get('company_country_code')
            broucher_warranty_details = post.get('broucher_warranty_details')
            if broucher_warranty_details == "true":
                broucher_warranty_details = "0"
            if broucher_warranty_details == "false":
                broucher_warranty_details = "1"
            financial_manager_name = post.get("financial_manager_name")
            financial_manager_email = post.get("financial_manager_email")
            financial_manager_phone = post.get("financial_manager_phone")
            production_capacity_basis = post.get("production_capacity_basis")
            already_supplied_meterial_in_png = post.get("already_supplied_meterial_in_png")
            if already_supplied_meterial_in_png == "true":
                already_supplied_meterial_in_png = "0"
            if already_supplied_meterial_in_png == "false":
                already_supplied_meterial_in_png = "1"
            supplied_equipment_checkbox = post.get("supplied_equipment_checkbox")
            if supplied_equipment_checkbox == "true":
                supplied_equipment_checkbox = "0"
            if supplied_equipment_checkbox == "false":
                supplied_equipment_checkbox = "1"
            ungm_no = post.get("ungm_no")
            known_about = post.get("known_about")
            comments = post.get("comments")

            bank_info_country_code = post.get("bank_info_country_code")
            bank_account_currency_code = post.get("bank_account_currency_code")
            intermediary_country_code = post.get("intermediary_country_code")
            other_payment_currency_code = post.get("other_payment_currency_code")

            name_of_the_bank = post.get("name_of_the_bank")
            branch_code_or_routing_no = post.get("branch_code_or_routing_no")
            bank_info_bank_address = post.get("bank_info_bank_address")
            bank_info_swift_code = post.get("bank_info_swift_code")
            bank_info_postal_code = post.get("bank_info_postal_code")
            bank_account_type = post.get("bank_account_type")
            iban_number = post.get("iban_number")
            intermediary_routing_code = post.get("intermediary_routing_code")
            intermediary_swift_code = post.get("intermediary_swift_code")
            any_other_details = post.get("any_other_details")
            company_registration_no = post.get("company_registration_no")
            cancellationFileUpload = post.get("cancellationFileUpload[]")
            bank_acc_number = post.get("bank_acc_number")
            tax_id = post.get("tax_id")
            bank_acc_holder_name = post.get("bank_acc_holder_name")

            business_country = post.get("business_country_code")
            business_zip_code = post.get("business_zip_code")
            business_city = post.get("business_city")
            business_state_and_province = post.get("business_state_province")

            print("supplied_equipment_checkbox : ", supplied_equipment_checkbox)
            print("already_supplied_meterial_in_png : ", already_supplied_meterial_in_png)
            print("whatsapp_checkbox : ", whatsapp_checkbox)
            print("broucher_warranty_details : ", broucher_warranty_details)

            
            export_countries_list = []
            supplier_law_country_id = None
            if export_countries:
                for c_code in export_countries:
                    country_dropdownlist ={                
                    "IBLOCK_TYPE_ID": "lists",
                    "IBLOCK_ID": 152,
                    "FILTER": {
                    "=PROPERTY_1122": c_code},
                     }
                    country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                    for c_id in country_list:
                        country_id = c_id['ID']
                        export_countries_list.append(country_id)
            else:
                pass

            if supplier_law_country:
                country_dropdownlist ={                
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 152,
                "FILTER": {
                "=PROPERTY_1122": supplier_law_country},
                 }
                country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                supplier_law_country_id = country_list[0]['ID']
            else:
                pass

            if company_country_code:
                country_dropdownlist ={                
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 152,
                "FILTER": {
                "=PROPERTY_1122": company_country_code},
                 }
                country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                company_country_code = country_list[0]['ID']
            else:
                pass

            if bank_info_country_code:
                country_dropdownlist ={                
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 152,
                "FILTER": {
                "=PROPERTY_1122": bank_info_country_code},
                 }
                country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                bank_info_country_code = country_list[0]['ID']
            else:
                pass

            if intermediary_country_code:
                country_dropdownlist ={                
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 152,
                "FILTER": {
                "=PROPERTY_1122": intermediary_country_code},
                 }
                country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                intermediary_country_code = country_list[0]['ID']
            else:
                pass

            if business_country:
                country_dropdownlist ={                
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 152,
                "FILTER": {
                "=PROPERTY_1122": business_country},
                 }
                country_list = bx24.get_all('lists.element.get', country_dropdownlist)
                business_country = country_list[0]['ID']
            else:
                pass
            
            supplier_partner_params = {"entityTypeId":136,
                 "fields": {
                     "categoryId":322,
                     "stageId": "DT136_322:NEW",
                     "ufCrm6_1699608745": supplier_company_name,
                     "ufCrm6_1699608764": supplier_registerd_address,
                     # "ufCrm6_1699608794": supplier_correspondence_address,
                     "ufCrm6_1699608819": supplier_factory_address,
                     "ufCrm6_1699608879": supplier_year_established,
                     "ufCrm6_1700722713": supplier_law_country_id,
                     "ufCrm6_1699959464": supplier_date,
                     "ufCrm6_1699609004": supplier_place,
                     "ufCrm6_1700108442": supplier_organization,                    
                     "ufCrm6_1699609243": supplier_company_email,                    
                     "ufCrm6_1699609261": supplier_website_link,
                     "ufCrm6_1699609282": supplier_telephone_no,
                     "ufCrm6_1699609308": supplier_mobile_no,
                     "ufCrm6_1699960249": whatsapp_checkbox,      

                     "ufCrm6_1699613889": partner_name,
                     "ufCrm6_1699613917": chief_executive_name,
                     "ufCrm6_1699613945": chief_executive_email,
                     "ufCrm6_1699613985": chief_executive_phone,
                     "ufCrm6_1699614020": manager_name,
                     "ufCrm6_1699614048": manager_email,
                     "ufCrm6_1699614066": manager_phone,
                     "ufCrm6_1699614090": contact_person_name,
                     "ufCrm6_1699614106": contact_person_email,
                     "ufCrm6_1699614122": contact_person_phone,

                     "ufCrm6_1700623933": annual_sales,
                     "ufCrm6_1700623969": currency_selector,
                     "ufCrm6_1699614217": factory_size,
                     "ufCrm6_1699614239": no_of_employee,
                     "ufCrm6_1699614263": no_of_offices,
                     "ufCrm6_1699614289": factory_locations,
                     "ufCrm6_1699614310": no_of_plants,
                     "ufCrm6_1699614442": business_type,
                     "ufCrm6_1699614549": no_of_warehouses,
                     "ufCrm6_1699614572": warehouse_location,
                     "ufCrm6_1699614593": production_capacity,
                     "ufCrm6_1700719810": export_countries_list,
                     "ufCrm6_1699614658": international_shipping_terms,
                     "ufCrm6_1700195022": brousher_file_upload,
                     "ufCrm6_1700195053": annual_report_upload,
                     "ufCrm6_1700103796": product_selected,
                     "ufCrm6_1700110084": additional_product_select,

                     # Additional Fields
                     "ufCrm6_1708666428": zip_postalcode,
                     "ufCrm6_1708666481": company_city,
                     "ufCrm6_1708666500": state_and_province,
                     "ufCrm6_1708933007": company_country_code,
                     "ufCrm6_1708666603": broucher_warranty_details,
                     "ufCrm6_1708666675": linkedin_page_link,

                     "ufCrm6_1708666703": financial_manager_name,
                     "ufCrm6_1708666727": financial_manager_email,
                     "ufCrm6_1708666760": financial_manager_phone,

                     "ufCrm6_1709014806": production_capacity_basis,

                     # Supplied Equipment 
                     "ufCrm6_1708668304": supplied_equipment_checkbox,
                     "ufCrm6_1708668691": ungm_no,
                     "ufCrm6_1709013929": known_about,
                     "ufCrm6_1708668746": comments,

                     # Banking Info
                     "ufCrm6_1708666888": bank_account_type,
                     "ufCrm6_1708666948": bank_acc_number,
                     "ufCrm6_1708667003": bank_acc_holder_name,
                     "ufCrm6_1708667036": iban_number,
                     "ufCrm6_1708667178": bank_account_currency_code,
                     "ufCrm6_1708667406": name_of_the_bank,
                     "ufCrm6_1708667447": branch_code_or_routing_no,
                     "ufCrm6_1708667482": bank_info_swift_code,
                     "ufCrm6_1708667514": bank_info_bank_address,
                     # "ufCrm6_1708667561": bank_information_city,
                     # "ufCrm6_1708667605": bank_information_state,
                     "ufCrm6_1708667660": bank_info_postal_code,
                     "ufCrm6_1708667679": bank_info_country_code,
                     # "ufCrm6_1708667769": intermediary_bank_name,
                     "ufCrm6_1708667823": intermediary_swift_code,
                     "ufCrm6_1708667863": intermediary_routing_code,
                     "ufCrm6_1708667912": any_other_details,
                     "ufCrm6_1708668015": company_registration_no,
                     "ufCrm6_1708668162": tax_id,
                     "ufCrm6_1708668206": cancellationFileUpload,
                     "ufCrm6_1708668304": other_payment_currency_code, 
                     "ufCrm6_1708937949": intermediary_country_code,

                     "ufCrm6_1709028214": business_country,
                     "ufCrm6_1709028280": business_zip_code,
                     "ufCrm6_1709028340": business_city,
                     "ufCrm6_1709028414": business_state_and_province,
                }}
            uploaded_reponse = bx24.get_all('crm.item.add', supplier_partner_params)
            if uploaded_reponse:
                json_data['Code'] = "001"
                json_data['Message'] = "Created Successfully"
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Faild to Sent"
    except Exception as e:
        print("Err -- ", e)
        json_data['Code'] = "003"
        json_data['Message'] = "Error occurred: " + str(e)
    return HttpResponse(json.dumps(json_data))

# ----- Add Product Details -------
@csrf_exempt
def add_product_list(request):
    json_data = {}
    post = request.POST
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    try:
        if post:
            product_name = post.get('product_name')
            timestamp = str(int(time.time()))
            code = f"element_{product_name}_{timestamp}"
            additional_product_list = {
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 196,
                "ELEMENT_CODE": code,
                "FIELDS" : {
                    "NAME": product_name}
            }
            additional_product_id = bx24.get_all('lists.element.add', additional_product_list)
            filter_list_items = {
                "IBLOCK_TYPE_ID": "lists",
                "IBLOCK_ID": 196,
                "FILTER" : {
                    "ID": additional_product_id}
            }
            filter_product = bx24.get_all('lists.element.get', filter_list_items)
            if filter_product:
                json_data['Code'] = "001"
                json_data['Message'] = "Product Add Success"
                json_data['product_list'] = filter_product
            else:
                json_data['Code'] = "002"
                json_data['Message'] = "Faild to Add Product"
    except Exception as e:
        print(e)
    return HttpResponse(json.dumps(json_data))



# "ufCrm6_1708666428": zip_postalcode,
# "ufCrm6_1708666481: company_city,
# "ufCrm6_1708666500: state_province,
# "ufCrm6_1708666522: company_country,
# "ufCrm6_1708666603: does_your_brousher,
# "ufCrm6_1708666675: linkedin_page_link,
# "ufCrm6_1708666703: financial_manager_name,
# "ufCrm6_1708666727: financial_manager_email,
# "ufCrm6_1708666760: financial_manager_phone,
# "ufCrm6_1708666845: supplied_material_png,
# "ufCrm6_1708666888: account_type,
# "ufCrm6_1708666948: account_no,
# "ufCrm6_1708667003: holder_name,
# "ufCrm6_1708667036: IBAN,
# "ufCrm6_1708667178: account_currency,
# "ufCrm6_1708667406: name_of_the_bank,
# "ufCrm6_1708667447: routing_or_branch_no,
# "ufCrm6_1708667482: swift_code,
# "ufCrm6_1708667514: bank_address,
# "ufCrm6_1708667561: bank_information_city,
# "ufCrm6_1708667605: bank_information_state,
# "ufCrm6_1708667660: postal_code,
# "ufCrm6_1708667679: bank_info_country,
# "ufCrm6_1708667769: intermediary_bank_name,
# "ufCrm6_1708667823: intermediary_swift_code,
# "ufCrm6_1708667863: intermediary_routing_no,
# "ufCrm6_1708667912: any_other_details,
# "ufCrm6_1708668015: company_reg_no,
# "ufCrm6_1708668162: tax_id,
# "ufCrm6_1708668206: attached_cancellation,
# "ufCrm6_1708668304: preferred_payment_currency,
# "ufCrm6_1708668304: supplied_equipment,
# "ufCrm6_1708668691: UNGM_no,
# "ufCrm6_1708677339: know_about_green,
# "ufCrm6_1708668746: comments_feedback

