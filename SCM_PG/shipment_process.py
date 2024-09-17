from fast_bitrix24 import Bitrix
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
import json
from bitrix24 import *
from django.views.decorators.csrf import csrf_exempt
import random
import requests
import base64
from django.shortcuts import render
from django.template.loader import get_template
from django.template import Context
from django.conf import settings
import os
from xhtml2pdf import pisa
from PyPDF2 import PdfFileMerger,PdfMerger
import weasyprint
import qrcode
import jinja2
from docx import Document
from docx2pdf import convert
from jinja2 import Environment, FileSystemLoader, BaseLoader
import http.client
import barcode
from barcode.writer import ImageWriter
import pdfkit
from tabulate import tabulate
import re
from pdf417gen import encode, render_image, render_svg
from datetime import datetime, date




def get_po_name(po_id, data_needed, entity_type_id):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    params = {
        "entityTypeId": entity_type_id,
        "filter": {"=id": po_id},
        "select": ["title", "createdTime"],
    }
    po_detail_list = bx24.get_all('crm.item.list', params)
    if po_detail_list:
        po_detail = po_detail_list[0]
        po_created_date_format = datetime.fromisoformat(po_detail['createdTime'])
        po_created_date = po_created_date_format.strftime('%d-%b-%Y')
        if data_needed == "TITLE":
            return po_detail['title']
        else:
            return po_created_date

def get_company_detail(company_id,data_needed):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    params = {
            "filter":{"ID":company_id},
            "select":["TITLE","PHONE","LOGO","ADDRESS","UF_CRM_1688728202620","UF_CRM_1672723185627", "UF_CRM_1703766784","UF_CRM_1685599032220","UF_CRM_1703847047"]
        }
    company_detail = bx24.get_all('crm.company.list', params)
    # print("company detaillllllllllllllll",company_detail)
    if company_detail:
        if data_needed == 'TITLE':
            return company_detail[0]['TITLE']
        elif data_needed == 'ADDRESS':
            return company_detail[0]['UF_CRM_1688728202620']
        elif data_needed == 'GST':
            return company_detail[0]['UF_CRM_1672723185627']
        elif data_needed == 'COMP_ADDRESS':
            return company_detail[0]['UF_CRM_1703766784']
        elif data_needed == 'COMP_LOGO':
            return company_detail[0]['UF_CRM_1685599032220']
        elif data_needed == 'COMP_STAMP':
            return company_detail[0]['UF_CRM_1703847047']
        else:
            return company_detail[0]['PHONE'][0]['VALUE']

def get_shipment_detail(shipment_id,scm_type):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    if scm_type=="SCM-IN":
        params = {
                "entityTypeId": 183,
                "filter":{"=id":shipment_id},
                "select": ["id", "title","mycompanyId","ufCrm36_1679049933894","ufCrm36_1679049952869","ufCrm36_1679050090659","ufCrm36_1679050108649","ufCrm36_1679050132377","ufCrm36_1679050154536","ufCrm36_1679052108695","ufCrm36_1679052264808","ufCrm36_1679053927","ufCrm36_1679054086507","ufCrm36_1679120097182","ufCrm36_1679120113074","ufCrm36_1679120139658","ufCrm36_1679126989155","ufCrm36_1679127010037","ufCrm36_1679290191", "currencyId"],
            }
        shipment_detail = bx24.get_all('crm.item.list', params)
        data_set = [
            {
                'id':item['id'],
                'title': item['title'],
                'shipment_from_name': get_company_detail(item['mycompanyId'],"TITLE"),
                'shipment_from_address': get_company_detail(item['mycompanyId'],"COMP_ADDRESS"),
                'shipment_from_phone': get_company_detail(item['mycompanyId'],"PHONE"),
                'gst_no':get_company_detail(item['mycompanyId'],"GST"),
                'company_address':get_company_detail(item['mycompanyId'],"COMP_ADDRESS"),
                'pre_carrier_by': item['ufCrm36_1679049933894'],
                'place_of_receipt_by_pre_carrier': item['ufCrm36_1679049952869'],
                'place_of_export': item['ufCrm36_1679050090659'],
                'freight': item['ufCrm36_1679050108649'],
                'place_of_delivery': item['ufCrm36_1679050132377'],
                'country_of_origin': item['ufCrm36_1679050154536'],
                'amount_in_words': item['ufCrm36_1679052108695'],
                'invoice_no': item['ufCrm36_1679052264808'],
                'terms_conditions': item['ufCrm36_1679053927'],
                'iec': item['ufCrm36_1679054086507'],
                'consignee_name': item['ufCrm36_1679120097182'],
                'consignee_address': item['ufCrm36_1679120113074'],
                'consignee_phone': item['ufCrm36_1679120139658'],
                'lut_no': item['ufCrm36_1679126989155'],
                'po_id':item['ufCrm36_1679290191'],
                'period_of_lut':item['ufCrm36_1679127010037'],
                'currency_name': item['currencyId'],
                'po_name': get_po_name(item['ufCrm36_1679290191'], "TITLE",183) if item['ufCrm36_1679290191'] is not None else None,
                'po_created_date': get_po_name(item['ufCrm36_1679290191'],"CREATED_DATE",183) if item['ufCrm36_1679290191'] is not None else None
            }
            for item in shipment_detail
            ]
    else:
        params = {
            "entityTypeId": 136,
            "filter":{"=id":shipment_id},
            "select": ["id", "title","mycompanyId","ufCrm6_1703847607","ufCrm6_1703847774","ufCrm6_1700719810","ufCrm6_1703847923","ufCrm6_1703848436","ufCrm6_1703848542","ufCrm6_1703930652","ufCrm6_1703848696","ufCrm6_1701757050","ufCrm6_1703848825","ufCrm6_1703848878","ufCrm6_1703848918","ufCrm6_1703848957","ufCrm6_1703849001","ufCrm6_1703849051","ufCrm6_1703849099", "currencyId","ufCrm6_1703930860"],
        }
        shipment_detail = bx24.get_all('crm.item.list', params)
        data_set = [
            {
                'id':item['id'],
                'title': item['title'],
                'shipment_from_name': get_company_detail(item['mycompanyId'],"TITLE"),
                'shipment_from_address': get_company_detail(item['mycompanyId'],"ADDRESS"),
                'shipment_from_phone': get_company_detail(item['mycompanyId'],"PHONE"),
                'gst_no':get_company_detail(item['mycompanyId'],"GST"),
                'company_address':get_company_detail(item['mycompanyId'],"COMP_ADDRESS"),
                'pre_carrier_by': item['ufCrm6_1703847607'],
                'place_of_receipt_by_pre_carrier': item['ufCrm6_1703847774'],
                'place_of_export': item['ufCrm6_1700719810'],
                'freight': item['ufCrm6_1703847923'],
                'place_of_delivery': item['ufCrm6_1703848436'],
                'country_of_origin': item['ufCrm6_1703848542'],
                'amount_in_words': item['ufCrm6_1703930652'],
                'invoice_no': item['ufCrm6_1703848696'],
                'terms_conditions': item['ufCrm6_1701757050'],
                'iec': item['ufCrm6_1703848825'],
                'consignee_name': item['ufCrm6_1703848878'],
                'consignee_address': item['ufCrm6_1703848918'],
                'consignee_phone': item['ufCrm6_1703848957'],
                'lut_no': item['ufCrm6_1703849001'],
                'po_id':item['ufCrm6_1703849051'],
                'period_of_lut':item['ufCrm6_1703849099'],
                'currency_name': item['currencyId'],
                'po_name': get_po_name(item['ufCrm6_1703930860'], "TITLE",136) if item['ufCrm6_1703930860'] is not None else None,
                'po_created_date': get_po_name(item['ufCrm6_1703930860'],"CREATED_DATE",136) if item['ufCrm6_1703930860'] is not None else None
            }
            for item in shipment_detail
            ]
    return data_set

def GetShipmentMainData(item_id,scm_type):
    bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
    api_endpoint = 'greenltd.bitrix24.com'
    url_path = '/rest/120/i7jh2267ia7wzxtb/crm.item.productrow.list'
    if scm_type=="SCM-IN":
        payload = {"filter": {"=ownerType": "Tb7", "=ownerId": item_id}}
    else:
        payload = {"filter": {"=ownerType": "T88", "=ownerId": item_id}}
    json_payload = json.dumps(payload)
    conn = http.client.HTTPSConnection(api_endpoint)
    headers = {
        'Content-Type': 'application/json',
    }
    row_data = []
    conn.request('POST', url_path, body=json_payload, headers=headers)
    response = conn.getresponse()
    if response.status == 200:
        product_row_data = json.loads(response.read().decode('utf-8'))
        if product_row_data:
            product_item = product_row_data['result']['productRows']
            for prdt_id in product_item:
                product_id = int(prdt_id['productId']) - 2
                params = {"id": product_id}
                product_response = bx24.call('crm.product.get', params)
                property_800_value = product_response.get('PROPERTY_800', None)
                product_uni_id = property_800_value.get('value', None) if property_800_value else None                    
                if product_uni_id is not None:
                    uni_params = {
                        'IBLOCK_TYPE_ID': 'lists',
                        'IBLOCK_ID': '118',
                        'ELEMENT_ID': product_uni_id
                    }
                    uni_list_response = bx24.call('lists.element.get', uni_params)
                    product_hsn_code = uni_list_response.get('NAME', '')
                else:
                    product_hsn_code = ''
                row_data.append({
                    'no': len(row_data) + 1,
                    'product_id': product_id,
                    'product_name': prdt_id['productName'],
                    'quantity': str(prdt_id['quantity']) + ' ' + prdt_id['measureName'],
                    'hsn_code': product_hsn_code,
                    'box_no': '',
                })
    shipment_detail = get_shipment_detail(item_id,scm_type)
    return row_data,shipment_detail   

@csrf_exempt
def ShipmentProductDetailRetrieval(request): 
    post = request.POST
    json_data = {}
    item_id = post.get("shipment_item_id")   
    scm_type = post.get("shipment_scm_type")
    row_data,data_set= GetShipmentMainData(item_id,scm_type) 
    # print(" ======== row_data ======== ", row_data)
    # print(" ======== data_set ======== ", data_set)
    json_data['status'] = 'Shipment Item Retrieved'  
    json_data['product_row_data'] = row_data
    json_data['shipment_data'] = data_set[0]
    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def ShipmentPackingLabelGeneration(request):
    post = request.POST
    json_data = {}
    packing_data = json.loads(post.get("packing_data"))
    item_id = post.get("shipment_item_id")  
    scm_type = post.get("shipment_scm_type")
    box_item_data = json.loads(post.get("box_item_data"))
    product_list = generate_qr_bar_code(box_item_data,item_id,scm_type)
    row_data,shipment_data= GetShipmentMainData(item_id,scm_type)    
    template_loader = jinja2.FileSystemLoader(searchpath=settings.APPLICATION_PATH+"SCM_PG/templates")
    template_env = jinja2.Environment(loader=template_loader)
    consolidated_file_title='Consolidated_Package_Labels_'+scm_type+'_'+str(item_id)+'.pdf'
    output_pdf_path = os.path.join(settings.MEDIA_ROOT, 'Shipment_Process', consolidated_file_title)   
    pdf_pages = []
    for i, data_item in enumerate(product_list, start=1):
        data_item={**product_list[data_item]['box_detail'], **shipment_data[0]}
        data_dict = {'data': data_item}
        TEMPLATE_FILE = "PackageLabelTemplate.html"
        DOCUMENT_TITLE = f"Package_Label_{scm_type}_{str(item_id)}_{i}.pdf"
        template = template_env.get_template(TEMPLATE_FILE)
        source_html = template.render(json_data=data_dict["data"])
        result_file_path = os.path.join(settings.MEDIA_ROOT, 'Shipment_Process', DOCUMENT_TITLE)
        pdfkit.from_string(source_html, result_file_path, options={'orientation': 'Landscape','enable-local-file-access': ""})
        # weasyprint.HTML(string=source_html).write_pdf(result_file_path)
        pdf_pages.append(result_file_path)
    # Combine all generated PDFs into a single PDF
    pdf_merger = PdfMerger()
    for pdf_page in pdf_pages:
        pdf_merger.append(pdf_page)
    # Write the combined PDF to the output file
    pdf_merger.write(output_pdf_path)
    pdf_merger.close()
    json_data = {"file_url":settings.APPLICATION_URL+'media/Shipment_Process/'+consolidated_file_title,"file_name":consolidated_file_title}
    # Return the generated PDF file as a response
    # with open(output_pdf_path, 'rb') as pdf_file:
        # response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        # response['Content-Disposition'] = f'attachment; filename="{os.path.basename(output_pdf_path)}"'
    return HttpResponse(json.dumps(json_data))


@csrf_exempt
def ShipmentPackingListGeneration(request):
    post = request.POST
    json_data = {}
    packing_data = json.loads(post.get("packing_data"))
    item_id = post.get("shipment_item_id")    
    scm_type = post.get("shipment_scm_type")
    box_item_data = json.loads(post.get("box_item_data"))
    # print("PPPPPPPPPPPPPPPPPPPP",box_item_data)
    row_data,shipment_data= GetShipmentMainData(item_id,scm_type)   
    # print(" ############## shipment_data ############### ", shipment_data)
    # product_list = generate_qr_bar_code(box_item_data,item_id) 
    global_s_no_counter = 1
    for box_name, box_data in box_item_data.items():
        for item in box_data["item_detail"]:
            item["s_no"] = global_s_no_counter
            global_s_no_counter += 1
    # print(" ++++++++++++++++++++++++ ", box_item_data)
    template_loader = jinja2.FileSystemLoader(searchpath=settings.APPLICATION_PATH+"SCM_PG/templates")
    template_env = jinja2.Environment(loader=template_loader)
    consolidated_file_title='Packing_List_'+scm_type+'_'+str(item_id)+'.pdf'
    output_pdf_path = os.path.join(settings.MEDIA_ROOT, 'Shipment_Process', consolidated_file_title)   
    pdf_pages = []
    # for i, data_item in enumerate(box_item_data, start=1):
    #     data_item={**box_item_data[data_item]['box_detail'], **shipment_data[0]}
    #     print("yyyyyyyyyyyyyyyyyyyyyyyyyyy",data_item)
    #     data_dict = {'data': data_item}
    #     print("))))))))))))))))))))))))",data_dict['data'])
    #     TEMPLATE_FILE = "PackingListTemplate.html"
    #     DOCUMENT_TITLE = f"Packing_List_{str(item_id)}_{i}.pdf"
    #     template = template_env.get_template(TEMPLATE_FILE)
    #     source_html = template.render(json_data=data_dict['data'])
    #     result_file_path = os.path.join(settings.MEDIA_ROOT, 'Shipment_Process', DOCUMENT_TITLE)
    #     pdfkit.from_string(source_html, result_file_path, options={'orientation': 'Landscape'})
    #     # weasyprint.HTML(string=source_html).write_pdf(result_file_path)
    #     pdf_pages.append(result_file_path)
    # Combine all generated PDFs into a single PDF
    TEMPLATE_FILE = "PackingListTemplate.html"
    DOCUMENT_TITLE = f"Packing_List_{scm_type}_{str(item_id)}.pdf"
    template = template_env.get_template(TEMPLATE_FILE)
    data_dict = {'data': box_item_data, 'shipment_detail': shipment_data}
    source_html = template.render(data_dict)
    result_file_path = os.path.join(settings.MEDIA_ROOT, 'Shipment_Process', DOCUMENT_TITLE)
    pdfkit.from_string(source_html, result_file_path)
    # weasyprint.HTML(string=source_html).write_pdf(result_file_path)
    pdf_pages.append(result_file_path)
    pdf_merger = PdfMerger()
    for pdf_page in pdf_pages:
        pdf_merger.append(pdf_page)
    # Write the combined PDF to the output file
    pdf_merger.write(output_pdf_path)
    pdf_merger.close()
    json_data = {"file_url":settings.APPLICATION_URL+'media/Shipment_Process/'+consolidated_file_title,"file_name":consolidated_file_title}
    # Return the generated PDF file as a response
    # with open(output_pdf_path, 'rb') as pdf_file:
        # response = HttpResponse(pdf_file.read(), content_type='application/pdf')
        # response['Content-Disposition'] = f'attachment; filename="{os.path.basename(output_pdf_path)}"'
    return HttpResponse(json.dumps(json_data))



def generate_qr_bar_code(combined_boxes_data,item_id,scm_type):
    product_qr_list = []    
    product_barcode_list = []    

    for box_name, box_data in combined_boxes_data.items():   
        table_data = []

        box_detail = box_data['box_detail']
        item_details = box_data['item_detail']
        # print("BBBBBBBBBBBBBBBBBBBBBB",box_detail)
        # details_table = tabulate.tabulate([
        #     ["Gross Weight", box_detail['gross_weight']],
        #     ["Net Weight", box_detail['net_weight']],
        #     ["Length", box_detail['length']],
        #     ["Width", box_detail['width']],
        #     ["Height", box_detail['height']],
        # ], headers=["Attribute", "Value"])

        # details_str = f"Box No: {box_name.replace('Box ', '')}\n"
        # for product in box_data['item_detail']:
        #     details_str += f"{product+1}Product: {product['name']}, Quantity: {product['quantity']}\n"                                                          
        
        table_data.append({
        'Box': box_name.replace('Box ', ''),
        'Gross Weight': box_detail['gross_weight'],
        'Net Weight': box_detail['net_weight'],
        'Length': box_detail['length'],
        'Width': box_detail['width'],
        'Height': box_detail['height'],
        'Item Details': '\n'.join([f"{item['name']} ({item['quantity']})" for item in item_details])
        })

        # # Display the tabulated data
        # headers = table_data[0].keys()
        # print("HHHHHHHHHHHHHH",headers)
        # print("TTTTTTTTTTTTTT",table_data)
        # details_str = tabulate(table_data, headers, tablefmt='grid')
        # print(details_str)
        if table_data:
            headers = 'keys'
            details_str = tabulate(table_data, headers, tablefmt='rst')
            # print(details_str)
        else:
            print("No data to display.")

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )  
        qr.add_data(details_str)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        # Generate a unique filename for each QR code
        qr_name = f"box_{box_name.replace(' ', '_')}_qr_{scm_type}_{item_id}.png"
        qr_path = os.path.join(settings.MEDIA_ROOT, 'QR_Code', qr_name)   
        img.save(qr_path)
        box_detail['qr_code']=settings.MEDIA_URL+'QR_Code/'+qr_name
        product_qr_list.append(qr_name)
        # Display result
        # print(f"Generated QR Code for {box_name}: {qr_path}")

        #BAR CODE Generation
        barcode_type='PDF417'
        barcode_filename = f"box_{box_name.replace(' ', '_')}_bar_code__{scm_type}_{item_id}.png"
        barcode_data = encode(details_str, columns=12)
        barcode_path = os.path.join(settings.MEDIA_ROOT, 'Barcode', barcode_filename)
        # code = barcode.get(barcode_type, barcode_data, writer=ImageWriter())
        code = render_image(barcode_data)  # Pillow Image object

        code.save(barcode_path)
        box_detail['barcode'] = settings.MEDIA_URL + 'Barcode/' + barcode_filename
        product_barcode_list.append(barcode_filename)
        print("GGGGGGGGGGGGGGGGGGG",box_detail)

       # code.save(barcode_filename)
    # print(combined_boxes_data)
    return combined_boxes_data



@csrf_exempt
def ShipmentProcess(request,item_id,scm_type):
    json_data = {}
    context = {'id':item_id ,'scm_type':scm_type}
    return render(request, 'ShipmentPacking.html', context)

@csrf_exempt
def Supplier_ShipmentProcess(request,item_id):
    json_data = {}
    if request_type == "supplier":
        context = {'id': item_id}
        return render(request, 'SupplierShipmentPacking.html', context)
    else:
        return render(HttpResponse, 'Template Not Found')
