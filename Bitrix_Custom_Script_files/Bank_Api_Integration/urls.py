from django.urls import path

from . import views

urlpatterns = [
    path("XML_Request_Formation/", views.XML_Request_Formation, name="XML_Request_Formation"),
]