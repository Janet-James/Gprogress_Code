from django.shortcuts import render
from django.http import HttpResponse
from bitrix24 import *
from django.db import connection,connections
import xml.etree.ElementTree as ET
import os 
import base64
from cryptography.hazmat.primitives import serialization, hashes, padding
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import jwt
import json
import secrets

standard_json_request_payload={
    "RequestSignatureEncryptedValue": "",
    "SymmetricKeyEncryptedValue": "",
    "Scope": "",
    "TransactionId": "",
    "OAuthTokenValue": "",
    "Id-token-jwt": ""
    }

# Create your views here.

def XML_Request_Formation():

    # create the root element
    root = ET.Element("faxml")
    root.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
    root.set("xsi:noNamespaceSchemaLocation", "CO_NEF.xsd")

    # create the header element and its child elements
    header = ET.SubElement(root, "header")
    ET.SubElement(header, "batchnum").text = "20213221112000124"
    ET.SubElement(header, "batchnumext").text = "100001"
    ET.SubElement(header, "codcurr").text = "INR"
    ET.SubElement(header, "codstatus").text = "0"
    ET.SubElement(header, "datpost").text = "2021-11-18"
    ET.SubElement(header, "extsysname").text = "COAPI"
    ET.SubElement(header, "groupid").text = "SHREE"
    ET.SubElement(header, "idcust").text = "474407"
    ET.SubElement(header, "idtxn").text = "CO_NEF"
    ET.SubElement(header, "iduser").text = "SHREE2"
    ET.SubElement(header, "reqdatetime").text = "2020-11-23T06:00:07"
    ET.SubElement(header, "txtstatus").text = "ACCEPTED"

    # create the summary element and its child elements
    summary = ET.SubElement(root, "summary")
    ET.SubElement(summary, "orgcountpmt").text = "1"
    ET.SubElement(summary, "orgsumpmt").text = "223"

    # create the paymentlist element and its child elements
    paymentlist = ET.SubElement(root, "paymentlist")
    payment = ET.SubElement(paymentlist, "payment")
    ET.SubElement(payment, "stanext").text = "1"
    ET.SubElement(payment, "paymentrefno").text = "LSN3191700000001"
    ET.SubElement(payment, "CustId").text = "474407"
    ET.SubElement(payment, "Amount").text = "223"
    ET.SubElement(payment, "RemitterName").text = "HDFC Bank Ltd"
    ET.SubElement(payment, "RemitterAccount").text = "00600390000942"
    ET.SubElement(payment, "RemitterAccountType").text = "10"
    ET.SubElement(payment, "Remitter_Address_1").text = "HDFC Bank Ltd. Retail Assets"
    ET.SubElement(payment, "Remitter_Address_2").text = "Chandivali"
    ET.SubElement(payment, "Remitter_Address_3").text = "Mumbai - 400072"
    ET.SubElement(payment, "Remitter_Address_4").text = ""
    ET.SubElement(payment, "BeneIFSCCODE").text = "PUNB0753800"
    ET.SubElement(payment, "BeneAccountType").text = "11"
    ET.SubElement(payment, "BeneAccountNumber").text = "1234567890"
    ET.SubElement(payment, "BeneName").text = "4272001002014063"
    ET.SubElement(payment, "BeneAddress_1").text = ""
    ET.SubElement(payment, "BeneAddress_2").text = ""
    ET.SubElement(payment, "BeneAddress_3").text = ""
    ET.SubElement(payment, "BeneAddress_4").text = ""
    ET.SubElement(payment, "RemitInformation_1").text = "114094874"
    ET.SubElement(payment, "RemitInformation_2").text = ""
    ET.SubElement(payment, "RemitInformation_3").text = ""
    ET.SubElement(payment, "RemitInformation_4").text = ""
    ET.SubElement(payment, "RemitInformation_5").text = ""
    ET.SubElement(payment, "RemitInformation_6").text = ""
    ET.SubElement(payment, "ContactDetailsID").text = ""
    ET.SubElement(payment, "ContactDetailsDETAIL").text = ""
    ET.SubElement(payment, "codcurr").text = "INR"
    ET.SubElement(payment, "refstan").text = "1"
    ET.SubElement(payment, "forcedebit").text = "N"
    ET.SubElement(payment, "txndesc").text = "51957494-C-AMIT KUMAR"
    ET.SubElement(payment, "beneid").text = ""
    ET.SubElement(payment, "emailid").text = "a@abc.com,b@abc.com"
    ET.SubElement(payment, "advice1").text = "Payment for month of March"
    ET.SubElement(payment, "advice2").text = "Amount transferred to the account"
    ET.SubElement(payment, "advice3").text = "You may check the salary statement"
    ET.SubElement(payment, "advice4").text = ""
    ET.SubElement(payment, "advice5").text = ""
    ET.SubElement(payment, "advice6").text = ""
    ET.SubElement(payment, "advice7").text = ""
    ET.SubElement(payment, "advice8").text = ""
    ET.SubElement(payment, "advice9").text = ""
    ET.SubElement(payment, "advice10").text = ""
    ET.SubElement(payment, "addnlfield1").text = "This is additional field"
    ET.SubElement(payment, "addnlfield2").text = ""
    ET.SubElement(payment, "addnlfield3").text = ""
    ET.SubElement(payment, "addnlfield4").text = ""
    ET.SubElement(payment, "addnlfield5").text = ""

    xml_string = ET.tostring(root, encoding='UTF-8')
    print(xml_string.decode())
    return xml_string.decode()

def RequestSignatureEncryptedValue():
    payload=XML_Request_Formation()

###################Steps for creating digital signature in JSON Web Signature (JWS) format--------------   

    # Define the JWS protected header parameters
    header = {
    "alg": "RS256", # The signing algorithm
    "typ": "JWT"    # The type of the payload (e.g., "JWT")
    }

    # Serialize the header dictionary to a JSON string
    header_json = json.dumps(header)

    # Encode the JSON string to a Base64Url string using UTF-8 encoding
    encoded_header = base64.urlsafe_b64encode(header_json.encode('utf-8')).rstrip(b'=').decode('utf-8')

    print("Encoded JWS protected header:", encoded_header)


    # Example private key in PEM format
    private_key_pem = b"""-----BEGIN PRIVATE KEY-----
    [Your private key goes here]
    -----END PRIVATE KEY-----"""

    # Convert the private key to a RSAPrivateKey object
    private_key = serialization.load_pem_private_key(
        private_key_pem,
        password=None
    )

    # Encode the JWS protected header and payload to a JSON string
    jws_payload = jwt.encode(payload, None, algorithm='none')
    encoded_header, encoded_payload, _ = jws_payload.split('.')

    # Concatenate the encoded header and payload with a period separator
    jws_data = encoded_header + '.' + encoded_payload

    # Create a SHA-256 hash of the JWS data
    jws_hash = hashes.Hash(hashes.SHA256())
    jws_hash.update(jws_data.encode('utf-8'))
    digest = jws_hash.finalize()

    # Sign the SHA-256 hash using the private key and RSA SHA-256 algorithm
    signature = private_key.sign(
        digest,
        padding.PKCS1v15(),
        hashes.SHA256()
    )

    # Encode the signature in Base64Url format
    encoded_signature = jwt.utils.base64url_encode(signature)

    # Form the final JWS token by concatenating the encoded header, payload, and signature with a period separator
    jws_token = jws_data + '.' + encoded_signature

    print("JWS token:", jws_token)

#######################Steps for encrypting the digital signature value obtained

    # Generate a random 32-byte string
    random_string = secrets.token_bytes(32)

    print("Random bytes (in bytes):", random_string)

    # Convert the base64 encoded digital signature to bytes
    signature = base64.b64decode(encoded_signature)

    # Create a Cipher object using the AES algorithm with the key and PKCS5 padding
    cipher = Cipher(algorithms.AES(random_string), modes.ECB())

    # Encrypt the signature using the Cipher object
    encryptor = cipher.encryptor()
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_signature = padder.update(signature) + padder.finalize()
    encrypted_signature = encryptor.update(padded_signature) + encryptor.finalize()

    # Encode the encrypted signature in Base64
    encrypted_signature_b64 = base64.b64encode(encrypted_signature).decode('utf-8')

    # Print the encrypted signature
    print("Encrypted signature:", encrypted_signature_b64)

    # Load RequestSignatureEncryptedValue data in payload dict 
    standard_json_request_payload['RequestSignatureEncryptedValue']=encrypted_signature_b64

    SymmetricKeyEncryptedValue(random_string)

def SymmetricKeyEncryptedValue(random_string):
    # Encode the random string in base64
    base64_encoded_string = base64.b64encode(random_string).decode('utf-8')

    print(base64_encoded_string)

    # Load HDFC Bank's SSL certificate in PEM format
    with open('hdfc_public_key.pem', 'rb') as cert_file:
        hdfc_ssl_cert = cert_file.read()

    # Extract the public key from the SSL certificate
    hdfc_public_key = serialization.load_pem_public_key(
        hdfc_ssl_cert,
        backend=default_backend()
    )

    # Encrypt the value using RSA/ECB/PKCS1Padding and HDFC Bank's public key
    encrypted_value = hdfc_public_key.encrypt(
        base64_encoded_string,
        padding.PKCS1v15()
    )

    # Load SymmetricKeyEncryptedValue data in payload dict 
    standard_json_request_payload['SymmetricKeyEncryptedValue']=encrypted_value

    # Encode the encrypted value in base64 for transmission
    encoded_encrypted_value = base64.b64encode(encrypted_value).decode('utf-8')

    print(encoded_encrypted_value)

    

def HDFC_API_Process(request):
    XML_Request_Formation()

    


