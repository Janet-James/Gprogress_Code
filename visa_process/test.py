from fast_bitrix24 import Bitrix
import requests
from PyPDF2 import PdfReader, PdfWriter
import io

bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
params = {"entityTypeId": 128, "filter": {"id": 166}}
response = bx24.get_all('crm.item.list', params)
print(response)

for i in response:
    file_1_url =i['ufCrm38_1701148670']['urlMachine']
    file_2_url = i['ufCrm38_1701148690']['urlMachine']
    file_3_url = i['ufCrm38_1701148703']['urlMachine']
    
def download_pdf(url):
    response = requests.get(url)
    return response.content

def merge_pdfs(pdf_contents, output_path):
    pdf_writer = PdfWriter()

    for pdf_content in pdf_contents:
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        pdf_writer.add_page(pdf_reader.pages[0])

    with open(output_path, 'wb') as output_file:
        pdf_writer.write(output_file)

# Example usage:
# Replace 'url1', 'url2', etc., with your actual PDF URLs
pdf_urls = [file_1_url, file_2_url, file_3_url]

# Replace 'output_merged.pdf' with the desired output file path
output_file = '/home/next/Downloads/merged_output.pdf'

# Download PDFs
pdf_contents = [download_pdf(url) for url in pdf_urls]

# Merge and save as a single PDF
merge_pdfs(pdf_contents, output_file)
