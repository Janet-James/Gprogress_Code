from django.urls import path
from . import views 


urlpatterns = [
    path('service_desk/client_verification_get/<str:entityTypeId>/<str:id>/',views.Get_Client_Verification.as_view(), name="client_verification_get"),
    path('service_desk/submit_client_verification/',views.Update_Client_Verification, name="Submit_client_verification"),
]