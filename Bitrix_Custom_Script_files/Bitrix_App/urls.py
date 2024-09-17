from django.urls import path

from . import views

urlpatterns = [
    path("asyn_email/", views.asyn_email, name="asyn_email"),
    path('get/', views.get_asyn_mail, name='get_asyn_data')
]

