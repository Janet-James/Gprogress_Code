# vendor_phonenumber_sync.py
from fast_bitrix24 import Bitrix
import phonenumbers
from phonenumbers import geocoder, timezone
from django.http import JsonResponse
from .utils import parse_phone_number

def update_vendor_phonenumber(request, vendor_listId):
    try:
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        params = {
            "IBLOCK_TYPE_ID": 'lists',
            "IBLOCK_ID": 80,
            "FILTER": {'ID': vendor_listId}
        }
        vn_data = bx24.get_all('lists.element.get', params)
        vn_listId = int(vn_data[0]['ID'])
        vn_name = vn_data[0]['NAME']
        if "PROPERTY_564" not in vn_data[0] or not vn_data[0]["PROPERTY_564"]:
            email = ''
        else:
            email_dict = vn_data[0]["PROPERTY_564"]
            email = next(iter(email_dict.values()))
        if "PROPERTY_566" not in vn_data[0] or not vn_data[0]["PROPERTY_566"]:
            website = ''
        else:
            website_dict = vn_data[0]["PROPERTY_566"]
            website = next(iter(website_dict.values()))
        if "PROPERTY_568" not in vn_data[0] or not vn_data[0]["PROPERTY_568"]:
            code = ''
        else:
            code_dict = vn_data[0]["PROPERTY_568"]
            code = next(iter(code_dict.values()))
        if "PROPERTY_570" not in vn_data[0] or not vn_data[0]["PROPERTY_570"]:
            address = ''
        else:
            address_dict = vn_data[0]["PROPERTY_570"]
            address = next(iter(address_dict.values()))
        if "PROPERTY_770" not in vn_data[0] or not vn_data[0]["PROPERTY_770"]:
            vendor_id = ''
        else:
            vendor_id_dict = vn_data[0]["PROPERTY_770"]
            vendor_id = next(iter(vendor_id_dict.values()))
        if "PROPERTY_772" not in vn_data[0] or not vn_data[0]["PROPERTY_772"]:
            acc_number = ''
        else:
            acc_number_dict = vn_data[0]["PROPERTY_772"]
            acc_number = next(iter(acc_number_dict.values()))
        if "PROPERTY_774" not in vn_data[0] or not vn_data[0]["PROPERTY_774"]:
            bank_and_branch = ''
        else:
            bank_and_branch_dict = vn_data[0]["PROPERTY_774"]
            bank_and_branch = next(iter(bank_and_branch_dict.values()))
        if "PROPERTY_844" not in vn_data[0] or not vn_data[0]["PROPERTY_844"]:
            bank_name = ''
        else:
            bank_name_dict = vn_data[0]["PROPERTY_844"]
            bank_name = next(iter(bank_name_dict.values()))
        if "PROPERTY_846" not in vn_data[0] or not vn_data[0]["PROPERTY_846"]:
            bank_address = ''
        else:
            bank_address_dict = vn_data[0]["PROPERTY_846"]
            bank_address = next(iter(bank_address_dict.values()))
        if "PROPERTY_848" not in vn_data[0] or not vn_data[0]["PROPERTY_848"]:
            swift_code = ''
        else:
            swift_code_dict = vn_data[0]["PROPERTY_848"]
            swift_code = next(iter(swift_code_dict.values()))
        if "PROPERTY_1126" not in vn_data[0] or not vn_data[0]["PROPERTY_1126"]:
            beneficiary_name = ''
        else:
            beneficiary_name_dict = vn_data[0]["PROPERTY_1126"]
            beneficiary_name = next(iter(beneficiary_name_dict.values()))
        if "PROPERTY_1128" not in vn_data[0] or not vn_data[0]["PROPERTY_1128"]:
            bank_city = ''
        else:
            bank_city_dict = vn_data[0]["PROPERTY_1128"]
            bank_city = next(iter(bank_city_dict.values()))
        if "PROPERTY_1130" not in vn_data[0] or not vn_data[0]["PROPERTY_1130"]:
            bank_country = ''
        else:
            bank_country_dict = vn_data[0]["PROPERTY_1130"]
            bank_country = next(iter(bank_country_dict.values()))
        if "PROPERTY_1132" not in vn_data[0] or not vn_data[0]["PROPERTY_1132"]:
            bsb_no = ''
        else:
            bsb_no_dict = vn_data[0]["PROPERTY_1132"]
            bsb_no = next(iter(bsb_no_dict.values()))
        if "PROPERTY_1134" not in vn_data[0] or not vn_data[0]["PROPERTY_1134"]:
            bic_code = ''
        else:
            bic_code_dict = vn_data[0]["PROPERTY_1134"]
            bic_code = next(iter(bic_code_dict.values()))
        if "PROPERTY_576" not in vn_data[0] or not vn_data[0]["PROPERTY_576"]:
            phone = ''
        else:
            phone_dict = vn_data[0]["PROPERTY_576"]
            phone = next(iter(phone_dict.values()))
        phone_number = phone
        result = parse_phone_number(phone_number)
        if 'error' in result:
            pass
        else:
            vn_phone_number = result.get('country_code')
            print(" ------- ", vn_phone_number)
            update = {
            "IBLOCK_TYPE_ID": 'lists',
            "IBLOCK_ID": 80,
            "ELEMENT_ID": vn_listId,
            'FIELDS': {
                'NAME': vn_name,
                'PROPERTY_564': {
                     'E-Mail':email
                },
                'PROPERTY_566': {
                     'Website':website
                },
                'PROPERTY_568': {
                     'code':code
                },
                'PROPERTY_570': {
                     'Address':address
                },
                'PROPERTY_770': {
                     'Vendor ID':vendor_id
                },
                'PROPERTY_772': {
                     'Account No':acc_number
                },
                'PROPERTY_774': {
                     'Bank & Branch':bank_and_branch
                },
                'PROPERTY_844': {
                     'Bank Name':bank_name
                },
                'PROPERTY_846': {
                     'Bank Address':bank_address
                },
                'PROPERTY_848': {
                     'Swift Code':swift_code
                },
                'PROPERTY_1126': {
                     'Beneficiary Name':beneficiary_name
                },
                'PROPERTY_1128': {
                     'Bank City':bank_city
                },
                'PROPERTY_1130': {
                     'Bank Country':bank_country
                },
                'PROPERTY_1132': {
                     'BSB No':bsb_no
                },
                'PROPERTY_1134': {
                     'BIC Code':bic_code
                },
                'PROPERTY_576': {
                     'Phone':phone
                },
                'PROPERTY_572': {
                     'Telephone':vn_phone_number
                }
                }
            }
            vendor_list_update = bx24.call('lists.element.update', update)
            print(f" Id - {vn_listId} Update Success.")
        return JsonResponse({"status": "success"})

    except Exception as e:
        print(f"An error occurred: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)