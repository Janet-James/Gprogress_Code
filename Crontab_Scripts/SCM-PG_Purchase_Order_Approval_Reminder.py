import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fast_bitrix24 import Bitrix
from datetime import datetime, timezone
import pytz

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
universal_list = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 188,
    "ELEMENT_ID": 14488
}
mail_recipient_response = bx24.get_all('lists.element.get', universal_list)
full_name = None
table_html2 = ''
count = 1
total_pending_reviews = 0
# Current Date and Time
current_date = datetime.today()
todays_date = current_date.strftime("%d %b %Y")
current_datetime = datetime.now(pytz.utc)
desired_timezone = pytz.timezone('Asia/Dubai')
current_datetime_in_desired_timezone = current_datetime.astimezone(desired_timezone)
# Financial Year
finacial_year_params = {
    "IBLOCK_TYPE_ID": "lists",
    "IBLOCK_ID": 166
}
finacial_year_response = bx24.get_all('lists.element.get', finacial_year_params)
finacial_year_dict = {}
for fn_year_list in finacial_year_response:
    fn_id = fn_year_list['ID']
    fn_name = fn_year_list['NAME']
    finacial_year_dict[fn_id] = fn_name
# company_list
company_params = {
    "select": ['ID',"TITLE"]
}
company_list_response = bx24.get_all('crm.company.list', company_params)
company_dict = {}
for comp in company_list_response:
    comp_id = comp['ID']
    comp_name = comp['TITLE']
    company_dict[comp_id] = comp_name
# Main Loop Starting Here
cc_persons_email_id_list = []
for uni_list in mail_recipient_response:
    uni_list_recipient_persons = uni_list["PROPERTY_1162"]
    uni_list_cc_persons = uni_list["PROPERTY_1164"]
    for cc_persons_id in uni_list_cc_persons.values():
        cc_person_user_id = int(cc_persons_id)
        cc_users_list = bx24.get_all('user.get',{"ID": cc_person_user_id})
        cc_persons_email_id = cc_users_list[0]['EMAIL']
        cc_persons_email_id_list.append(cc_persons_email_id)
    for persons_id in uni_list_recipient_persons.values():
        recipient_user_id = int(persons_id)
        users_list = bx24.get_all('user.get',{"ID": recipient_user_id})
        po_created_user_email = users_list[0]['EMAIL']
        first_name = users_list[0]['NAME']
        last_name = users_list[0]['LAST_NAME']
        if 'PERSONAL_PHOTO' in users_list[0]:
            user_profile = users_list[0]['PERSONAL_PHOTO']
        else:
            user_profile = ''
        if 'UF_USR_1683028889607' in users_list[0]:
            salutation = users_list[0]['UF_USR_1683028889607']
        else:
            salutation = ''
        full_name = first_name+' '+last_name
        params = {
         "entityTypeId": 136,
         "filter":{"createdBy":recipient_user_id, "stageId":"DT136_10:UC_SI2VVK", "categoryId":10}
        }
        scm_pg_response = bx24.get_all('crm.item.list', params)
        if not scm_pg_response:
            print(f"No PO's are Created by {first_name+' '+last_name}")
        else:
            for scm_pg_item in scm_pg_response:
                item_id = scm_pg_item.get('id')
                po_title = scm_pg_item.get('title')
                my_company_id = str(scm_pg_item.get('mycompanyId'))
                supplier = scm_pg_item.get('ufCrm6_1673521877')
                amount = scm_pg_item.get('opportunity')
                currencyid = scm_pg_item.get('currencyId')
                finacial_year = str(scm_pg_item.get('ufCrm6_1686809123'))
                created_date_str = scm_pg_item.get("createdTime")
                created_date = datetime.strptime(created_date_str, "%Y-%m-%dT%H:%M:%S%z")
                created_date = created_date.replace(tzinfo=timezone.utc)
                item_created_date = created_date.isoformat()
                item_created_date = datetime.fromisoformat(item_created_date)
                item_created_date = item_created_date.strftime("%d-%b-%Y")
                # Calculate the PO Created Days difference
                po_created_dt_object = datetime.fromisoformat(created_date_str)
                po_created_date_difference = current_datetime_in_desired_timezone - po_created_dt_object
                po_created_passed_days = po_created_date_difference.days
                total_pending_reviews += 1
                finacial_year_name = finacial_year_dict[finacial_year]
                mycompany_name = company_dict[my_company_id]
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
                <td>{finacial_year_name}</td>
                <td>{po_created_passed_days} Days</td>
                <td style="color: #008F2F;"><a href="https://greenltd.bitrix24.com/crm/type/136/details/{item_id}/"><span>View PO</span></a></td>
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
            <p style="font-family: sans-serif; font-size: 14px; margin-top: 20px;margin-bottom: 20px;">Some of your <a href="https://greenltd.bitrix24.com/crm/type/136/kanban/category/10/">Purchase Orders</a> are still in the "Review" state. Please ensure that you contact the respective approver to progress the PO to the next stage.</p>
            <table style="width:100%; border-radius: 25px;" cellpadding="15" cellspacing="0">
            <tr style="background-color: #000; color: #fff; text-align: left;">
            <th style="border-top-left-radius: 10px;">No.</th>
            <th>PO No</th>
            <th>Company</th>
            <th>Supplier</th>
            <th>Amount</th>
            <th>Created Date</th>
            <th>Finacial Year</th>
            <th>Overdue Days</th>
            <th style="border-top-right-radius: 10px;">Link</th>
            </tr>
            """
            mail_content = table_html1+table_html2
            mail_content += '</div></div></body></table>'
            mail_content += """<p style="margin-bottom:5px;margin-top: 30px;">Thanks,</p>
                            <p style="font-weight: bolder;margin-top: 10px;">GREEN Limited</p>"""
            print(po_created_user_email)
            print(total_pending_reviews)
            sender_email = 'digitaladmin@green.com.pg'
            sender_password = 'WinGREEN2024*'
            to_address = po_created_user_email
            new_cc_persons_list = [cc_list for cc_list in cc_persons_email_id_list if cc_list != po_created_user_email]
            cc_address = new_cc_persons_list
            subject = salutation+full_name+' - Your Purchase Orders - Waiting for Approval('+todays_date+')'
            message = MIMEMultipart()
            message['From'] = "GREEN SCM-PG"
            message['To'] = to_address
            message['Cc'] = ",".join(cc_address)
            message['Subject'] = subject
            # Send the email
            try:
                body = MIMEText(mail_content, 'html')
                message.attach(body)
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()
                server.login(sender_email, sender_password)
                text = message.as_string()
                recepient = [to_address]+cc_address
                server.send_message(message)
                server.quit()
                print("Email sent successfully!")
                count = 1
                total_pending_reviews = 0
                table_html2 = ''
                table_html1 = ''
                mail_content = ''
            except Exception as e:
                print("Email could not be sent. Error:", str(e))

