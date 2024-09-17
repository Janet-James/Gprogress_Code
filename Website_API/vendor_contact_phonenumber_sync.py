# vendor_phonenumber_sync.py
from fast_bitrix24 import Bitrix
import phonenumbers
from phonenumbers import geocoder, timezone
from django.http import JsonResponse
from .utils import parse_phone_number

def update_vendor_contact_phonenumber(request, vendor_contact_listId):
    try:
        bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
        params = {
            "IBLOCK_TYPE_ID": 'lists',
            "IBLOCK_ID": 84,
            "FILTER": {'ID': vendor_contact_listId}
        }
        vn_contact_data = bx24.get_all('lists.element.get', params)
        print(vn_contact_data)
        vcon_list_id = int(vn_contact_data[0]['ID'])
        vcon_name = vn_contact_data[0]['NAME']
        if "PROPERTY_580" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_580"]:
            email = ''
        else:
            email_dict = vn_contact_data[0]["PROPERTY_580"]
            email = next(iter(email_dict.values()))
        if "PROPERTY_582" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_582"]:
            salutation = ''
        else:
            salutation_dict = vn_contact_data[0]["PROPERTY_582"]
            salutation = next(iter(salutation_dict.values()))
        if "PROPERTY_584" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_584"]:
            last_name = ''
        else:
            last_name_dict = vn_contact_data[0]["PROPERTY_584"]
            last_name = next(iter(last_name_dict.values()))
        if "PROPERTY_590" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_590"]:
            address = ''
        else:
            address_dict = vn_contact_data[0]["PROPERTY_590"]
            address = next(iter(address_dict.values()))
        if "PROPERTY_594" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_594"]:
            company = ''
        else:
            company_dict = vn_contact_data[0]["PROPERTY_594"]
            company = next(iter(company_dict.values()))
        if "PROPERTY_628" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_628"]:
            contact = ''
        else:
            contact_dict = vn_contact_data[0]["PROPERTY_628"]
            contact = next(iter(contact_dict.values()))
        if "PROPERTY_630" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_630"]:
            first_name = ''
        else:
            first_name_dict = vn_contact_data[0]["PROPERTY_630"]
            first_name = next(iter(first_name_dict.values()))
        if "PROPERTY_578" not in vn_contact_data[0] or not vn_contact_data[0]["PROPERTY_578"]:
            phone = ''
        else:
            phone_dict = vn_contact_data[0]["PROPERTY_578"]
            phone = next(iter(phone_dict.values()))
        phone_number = phone
        print(phone_number)
        result = parse_phone_number(phone_number)
        print(result)
        if 'error' in result:
            pass
        else:
            co_phone_number = result.get('country_code')
            print(" ---co_phone_number---- ", co_phone_number)
            update_vn_contact = {
                "IBLOCK_TYPE_ID": 'lists',
                "IBLOCK_ID": 84,
                "ELEMENT_ID": vcon_list_id,
                'FIELDS': {
                    'NAME': vcon_name,
                    'PROPERTY_578': {
                         'Phone':phone,
                    },
                    'PROPERTY_580': {
                         'E-Mail':email,
                    },
                    'PROPERTY_582': {
                         'Salutation':salutation,
                    },
                    'PROPERTY_584': {
                         'Last Name':last_name,
                    },
                    'PROPERTY_590': {
                         'Address':address,
                    },
                    'PROPERTY_594': {
                         'Company':company,
                    },
                    'PROPERTY_628': {
                         'Contact Id':contact,
                    },
                    'PROPERTY_630': {
                         'First Name':first_name,
                    },
                    'PROPERTY_1174': {
                         'Telephone':co_phone_number,
                    }
                }
            }
            vendor_contact_update = bx24.call('lists.element.update', update_vn_contact)
            print(f" Id - {vcon_list_id} Update Success.")
        return JsonResponse({"status": "success"})
    except Exception as e:
        print(f"An error occurred: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)