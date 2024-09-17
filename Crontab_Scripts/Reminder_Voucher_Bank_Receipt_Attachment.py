from bitrix24 import *
import psycopg2
import smtplib
import json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import requests
from fast_bitrix24 import Bitrix
from datetime import datetime, timezone

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')

# --- Company List ---
company_params = {
    "select": ['ID', "TITLE"]
}
company_list_response = bx24.get_all('crm.company.list', company_params)
company_dict = {comp['ID']: comp['TITLE'] for comp in company_list_response}

# Financial Year
finacial_year_params = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 166
}
finacial_year_response = bx24.get_all('lists.element.get', finacial_year_params)
finacial_year_dict = {fn_year_list['ID']: fn_year_list['NAME'] for fn_year_list in finacial_year_response}

uni_list_authorizer_params = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 188,
    "filter": {"ID": 24880}
}
receipient_list = bx24.get_all('lists.element.get', uni_list_authorizer_params)
print(" -- RECEPIENT LIST -- ", receipient_list)

# CC Persons List Taken
cc_persons_email_id_list = []
for uni_list in receipient_list:
    uni_list_cc_persons = uni_list.get("PROPERTY_1164", {})
    for cc_persons_id in uni_list_cc_persons.values():
        cc_person_user_id = int(cc_persons_id)
        cc_users_list = bx24.get_all('user.get', {"ID": cc_person_user_id})
        cc_persons_email_id = cc_users_list[0].get('EMAIL', '')
        if cc_persons_email_id:
            cc_persons_email_id_list.append(cc_persons_email_id)

count = 1
table_html2 = ''

try:
    for receipient in receipient_list:
        receipient_property = receipient.get('PROPERTY_1162', {})
        for resp_id in receipient_property.values():
            receipient_id = int(resp_id)
            users_list = bx24.get_all('user.get', {"ID": receipient_id})
            user = users_list[0]
            receipient_email_id = user.get('EMAIL', '')
            first_name = user.get('NAME', '')
            last_name = user.get('LAST_NAME', '')
            full_name = first_name + ' ' + last_name
            user_profile = user.get('PERSONAL_PHOTO', '')
            salutation = user.get('UF_USR_1683028889607', '')

            finac_pg_voucher_params = {
                "entityTypeId": 144,
                "filter": {
                    "assignedById": receipient_id,
                    "stageId": ["DT144_12:UC_1S9SAU", "DT144_12:UC_I9G6OW", "DT144_12:UC_4H7UTF"],
                    "categoryId": 12
                }
            }
            vouchers_list = bx24.get_all('crm.item.list', finac_pg_voucher_params)
            if not vouchers_list:
                print(f"No PO's are Authorized by {first_name + ' ' + last_name}")
            else:
                for voucher in vouchers_list:
                    item_id = voucher.get('id')
                    attach_bank_receipt = voucher.get("ufCrm8_1680162808539")
                    if attach_bank_receipt:
                        print(" -- Already Have the Bank Receipt -- ", item_id)
                    else:
                        if voucher.get("stageId") == "DT144_12:UC_I9G6OW":
                            print("-- BANK RECEIPT STAGE -- ")
                        elif voucher.get("stageId") == "DT144_12:UC_4H7UTF":
                            print("-- PAYMENT NOTIFICATION STAGE -- ")
                        else:
                            print("-- BANK PAYMENT PROCESS STAGE -- ")
                        po_title = voucher.get('title')
                        my_company_id = str(voucher.get('mycompanyId'))
                        supplier = voucher.get('ufCrm8_1678690203')
                        amount = voucher.get('opportunity')
                        currencyid = voucher.get('currencyId')
                        finacial_year = str(voucher.get('ufCrm8_1686813568'))

                        created_date_str = voucher.get("createdTime")
                        try:
                            created_date = datetime.strptime(created_date_str, "%Y-%m-%dT%H:%M:%S%z")
                        except ValueError:
                            created_date = datetime.now(timezone.utc)

                        created_date = created_date.replace(tzinfo=timezone.utc)
                        item_created_date = created_date.strftime("%d-%b-%Y")

                        paid_date_str = voucher.get('ufCrm8_1679473545330')
                        if paid_date_str:
                            try:
                                paid_date = datetime.strptime(paid_date_str, "%Y-%m-%dT%H:%M:%S%z")
                            except ValueError:
                                paid_date = datetime.now(timezone.utc)
                            item_paid_date = paid_date.strftime("%d-%b-%Y")
                        else:
                            item_paid_date = " - "

                        finacial_year_name = finacial_year_dict.get(finacial_year, '')
                        mycompany_name = company_dict.get(my_company_id, '')

                        # Universal Vendor list
                        supplier_list = {
                            "IBLOCK_TYPE_ID": "lists",
                            "IBLOCK_ID": 80,
                            "FILTER": {"ID": supplier}
                        }
                        supplier_list_response = bx24.get_all('lists.element.get', supplier_list)
                        supplier_name = supplier_list_response[0]['NAME']

                        table_html2 += f"""
                        <tr style="background-color: #fff;">
                        <td>{count}</td>
                        <td>{po_title}</td>
                        <td>{mycompany_name}</td>
                        <td>{supplier_name}</td>
                        <td>{amount} {currencyid}</td>
                        <td>{item_created_date}</td>
                        <td>{item_paid_date}</td>
                        <td>{finacial_year_name}</td>
                        <td style="color: #008F2F;"><a href="https://greenltd.bitrix24.com/crm/type/144/details/{item_id}/"><span>Attach</span></a></td>
                        </tr>"""
                        count += 1

                # Email content
                table_html1 = f"""<body style="font-family: sans-serif;">
                <div style="background-color: #008f301c; width: 100%;padding: 25px">
                <div style="background-color:#F1F1F1; max-width:1000px; margin-left:auto; margin-right: auto; border-radius:15px;padding: 25px;">
                <table>
                <tr>
                <td>
                <img src="{user_profile}" width="65" style="margin-right: 15px;"/>
                </td>
                <td id="person_name">
                <h4 style="color: #008F2F; font-family: sans-serif; margin-bottom: 0; margin-top: 10px;">Good Evening</h4>
                <h4 style="font-weight: bolder; font-family: sans-serif; margin-top: 5px;">{salutation}{full_name}</h4>
                </td>
                </tr>
                </table>
                <p style="font-family: sans-serif; font-size: 14px; margin-top: 20px;margin-bottom: 20px;">Please ensure the bank receipt is attached to the respective <a href="https://greenltd.bitrix24.com/crm/type/144/kanban/category/12/">voucher(s)</a> at earliest.</p>
                <table style="width:100%; border-radius: 25px;" cellpadding="15" cellspacing="0">
                <tr style="background-color: #000; color: #fff; text-align: left;">
                <th style="border-top-left-radius: 10px;">No.</th>
                <th>Voucher No</th>
                <th>Company</th>
                <th>Supplier</th>
                <th>Amount</th>
                <th>Created Date</th>
                <th>Paid Date</th>
                <th>Finacial Year</th>
                <th style="border-top-right-radius: 10px;">Link</th>
                </tr>
                """
                mail_content = table_html1 + table_html2
                mail_content += '</table></div></div></body>'
                mail_content += """<p style="margin-bottom:5px;margin-top: 30px;">Thanks,</p>
                                <p style="font-weight: bolder;margin-top: 10px;">GREEN Limited</p>"""
                    
                print(" -- Receipient Name -- ", full_name)
                # --- Current Date ---
                current_date = datetime.now()
                current_date = current_date.strftime('%d-%b-%Y')

                sender_email = 'digitaladmin@green.com.pg'
                sender_password = 'WinGREEN2024*'
                # to_address = "vijith.vijayan@nexttechnosolutions.co.in"
                # new_cc_persons_list =  ["janet.james@nexttechnosolutions.co.in"]
                to_address = receipient_email_id
                new_cc_persons_list =  [cc_list for cc_list in cc_persons_email_id_list if cc_list != receipient_email_id]
                subject = salutation + full_name + ' - Reminder to Attach Bank Receipt'+" ("+current_date+")"
                message = MIMEMultipart()
                message['From'] = "GREEN Finance and Accounts"
                message['To'] = to_address
                message['Cc'] = ",".join(new_cc_persons_list)
                message['Subject'] = subject
                    
                # Send the email
                try:
                    body = MIMEText(mail_content, 'html')
                    message.attach(body)
                    server = smtplib.SMTP('smtp.gmail.com', 587)
                    server.starttls()
                    server.login(sender_email, sender_password)
                    text = message.as_string()
                    recipients = [to_address] + new_cc_persons_list
                    server.sendmail(sender_email, recipients, text)
                    server.quit()
                    print("--- Email sent successfully! --- ")
                    count = 1
                    table_html2 = ''
                except Exception as e:
                    print("--- Email could not be sent. Error --- ", str(e))

except Exception as e:
    print(e)
