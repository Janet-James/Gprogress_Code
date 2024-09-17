from django.urls import path
from . import views 


urlpatterns = [
    
    path('service_desk/homepage/', views.Service_Desk_Template_Load.as_view()),
    path('service_desk/dashboard/', views.service_desk_dashboard, name="service_desk_dashboard"),
    path('service_desk/helptopic/', views.help_topic_details, name="service_desk_help"),
    path('service_desk/company_based_details/', views.company_based_details_get, name="company_based_details_get"),
    path('service_desk/total_count_month_based/', views.total_ticket_count_monthbased, name="company_based_details_get"),

]