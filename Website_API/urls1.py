from django.urls import path
from . import views
from . import project, supplier_partner, vendor_phonenumber_sync, vendor_contact_phonenumber_sync, client_partner


urlpatterns = [
    path('get/jobcategory_list/', views.JobCategoryListView.as_view(), name="get_jobcategory"),
    path('submit/jobapplication/', views.submit_job_application, name="jobapplication"),
    path('get/jobquery_dropdown_list/', views.JobQueryDropdownList.as_view(), name="jobquerydropdownlist"),
    path('submit/jobquery/', views.submit_jobquery_form, name="jobquery"),
    path('submit/reach_us/', views.submit_reach_us_form, name="reach_us"),
    path('login/user/', views.userlogin, name="userlogin"),
    path('login/user/get_details/', views.get_login_user_details, name="user_details_api"),
    path('dashboard/user/get_details/', views.dashboard_user_get_details, name="dashboard_user_get_details"),
    path('get/country_dropdown_list/', views.CountryDropdownList.as_view(), name="countrydropdownlist"),
    path('submit/news_letter/', views.subscribe_news_letter, name="news_letter"),
    path('solarproject_metrics/', project.solarProjectMetrics, name="project_metrics"),
    path('month_and_year_basis_solarmetrics_calc/', project.month_and_year_basis_solarmetrics_calc, name="month_and_year_basis_solarmetrics_calc"),
    path('product_dropdown_list/', supplier_partner.ProductDropdownList.as_view(), name="productdropdownlist"),
    path('submit/supplier_partner/', supplier_partner.submit_supplier_partner, name="supplier_partner"),
    path('organsation_dropdown_list/', supplier_partner.OrganisationDropdownList.as_view(), name="organisationdropdownlist"),
    path('add/product_list/', supplier_partner.add_product_list, name="add_product_list"),
    path('vendor_phonenumber_sync/<str:vendor_listId>/', vendor_phonenumber_sync.update_vendor_phonenumber, name="vendor_phonenumber_sync"),
    path('vendor_contact_phonenumber_sync/<str:vendor_contact_listId>/', vendor_contact_phonenumber_sync.update_vendor_contact_phonenumber, name="vendor_contact_phonenumber_sync"),
    path('cms/event_generator/', views.CMSEventLoad.as_view(), name="cms_event_load"),
    path('clientpartner_email_verification/', client_partner.email_verification, name="clientpartner_email_verification"),
    path('customer/chat_history/', client_partner.customerChatHistory, name="chat_history"),
    path('customer/chat_box/', client_partner.customer_chat_box, name="customer_box"),
    path('client/message/reply/<str:entityTypeId>/<str:client_id>/<str:company_id>/', client_partner.Client_Message_Reply.as_view(), name="message_reply"),
    path('crm_team/chat_box/', client_partner.crm_chat_box, name="crm_team_chat_box"),
    path('submit/client_partner/service_call_log/', client_partner.submit_service_call_log, name="service_call_log"),
    path('submit/client_partner/service_request/', client_partner.submit_service_request, name="service_request"),
    # CLIENT HISTORY
    path('client_partner/service_call/history/', client_partner.serviceCallLog_History, name="serviceCallLog_History"),
    path('client_partner/service_request/history/', client_partner.serviceCallRequest_History, name="serviceCallRequest_History"),
    # CHART HISTORY
    path('calculate/client_partner/customer_score/', client_partner.Get_customer_satisfaction_score, name="Get_customer_satisfaction_score"),
    path('calculate/client_partner/average_response_time/', client_partner.Get_Average_Response_Time, name="Get_Average_Response_Time"),
    path("accounts_and_statement_cal/", client_partner.accounts_and_statement_cal, name="accounts_and_statement_cal"),
    path('clientPartner_finacial_calc/', client_partner.clientPartnerFinacialCalc, name="clientPartner_Finacial_Calc"),
    path('clientPartner_payback/', client_partner.calculate_payback, name="clientPartner_payback"),
    path('clientPartner_calculate_roi/', client_partner.calculate_roi, name="calculate_roi"),
    path('calculate/internal_rate_of_return/', client_partner.internal_rate_of_return, name="internal_rate_of_return"),
    path('calculate/calculate_lcoe/', client_partner.calculate_lcoe, name="lcoe"),
    path('environmental_saving/calculation/', client_partner.environmental_saving, name="environmental_saving"),
    path('solarhistorylist/', client_partner.SolarMan_PlantData, name="solar_plant_data"),
    path('clientpartner_site_monitering/', client_partner.month_and_year_basis_solarmetrics_calc, name="environmental_saving"),
    # DATA BASE INTEGRATION
    path('client_partner_database_insertion/', client_partner.client_partner_database_insertion, name="client_partner_database_insertion"),
    path('client_partner_user_activity/', client_partner.client_partner_user_activity, name="client_partner_user_activity"),
    # PROJECT MONITORING
    path('client_partner_project_monitoring/', client_partner.project_monitoring_control, name="project_monitoring_control"),
    # Client Partner Registration
 #   path('client_partner_registration/', client_partner.client_partner_registration, name="client_partner_registration"),
    path('client_partner_resetpassword/', client_partner.client_partner_resetpassword, name="client_partner_resetpassword"),
    path('client_partner_forgotpassword/', client_partner.client_partner_forgotpassword, name="client_partner_forgotpassword"),
    path('client_partner_oldpasswordcheck/', client_partner.client_partner_oldpasswordcheck, name="client_partner_oldpasswordcheck"),
    path('client_partner_invitation/<str:solar_id>/<str:company_id>/',client_partner.client_partner_invitation.as_view(), name="client_partner_invitation"),
]
        
