from unicodedata import name
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('GSolve/AddEmp/', views.VisaCandidate.as_view(), name="AddEmp"),
    path('GSolve/visaprocessing/', views.VisaProcess.as_view(), name="visaprocessing"),
    path('GSolve/addemployeeform/', views.addemployeeform, name="addemployeeform"),
    path('GSolve/employeeInfoGetall/', views.empInfoGetAll, name="empInfoGetAll"),
    path('GSolve/employee_info_getby_id/', views.employee_info_getby_id, name="employee_info_getby_id"),
    # addemployee onclick get getails
    path('GSolve/employee_detail_getby_id/', views.employee_detail_getby_id, name="employee_info_getby_id"),
    path('GSolve/delete_emp_info/', views.delete_emp_info, name="delete_emp_info"),
    path('GSolve/visa_doc_info/', views.VisadocuCreateUpdate, name="visa_doc_info"),
    path('GSolve/Work_Permit_Upload/', views.WorkPermitUpload, name="Work_Permit_Upload"),
    path('GSolve/india_visa_process/', views.IndiaVisaCreateUpdate, name="india_visa_info"),

    #Documents
    path('GSolve/employee_documents/', views.EmployeeDocumentGenerate, name="employee_documents"),
    path('GProgress/employee_visa_doc_generate/<int:id>/<str:doc_type>/', views.BitrixEmployeeVisaDocumentGenerate, name="bitrix_employee_visa_document"),
    path('GSolve/employee_documents_remarks/', views.EmployeeDocumentRemarks, name="employee_documents_remarks"),

    # Medical Examiantion Form
    # insert
    path('GSolve/medical_examiantion_form/', views.medical_examiantion_form, name="medical_examiantion_form"),
    path('GSolve/self_declaration_form/', views.self_declaration_form, name="self_declaration_form"),
    path('GSolve/application_entrypermit_form/', views.entrypermit_form, name="application_entrypermit_form"),
    path('GSolve/work_permit_form/', views.WorkPermitFormCreateUPdate, name="work_permit_form"),
]

