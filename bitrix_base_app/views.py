import base64
from logging import exception
from pipes import Template
from pydoc import locate
from bitrix_base_app import config
import json
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError 
from django.shortcuts import redirect, render
from django.db import connection
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib import auth
from django.contrib.auth import authenticate, login,logout as django_logout
from django.views.generic.base import TemplateView
from rest_framework.decorators import api_view
from .models import *
import os
from django.core.files.storage import FileSystemStorage



def dictfetchall(cursor):
    "Returns all rows from a cursor as a dictionary."
    """
            Returns all rows from a cursor as a dictionary
            @param cursor:cursor object
            @return: dictionary contains the details fetch from the cursor object
            @rtype: dictionary
    """
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
    ]


def home(request):
    return render(request, 'gsolve_login.html')

def logout(request):
    '''
    logout process
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse. This response redirect the URL to login page
    @author: Alagesan Boobalan
    '''
    #uam_sessions_sync(request,lib.strUAMLink, lib.strEEMAppName, lib.strEEMAppClient, lib.strLogoutFunctionality,request.session.session_key,request.META.get('HTTP_X_FORWARDED_FOR'))
    django_logout(request)
    request.session.clear()
    request.session.flush()
    return HttpResponseRedirect('/')

def checkusername(request):
        json_data = {}
        print('jjjjjjjsonn', json_data)
        try:
            cr = connection.cursor()
            if request.POST:
                username = request.POST.get("username")
            else:
                body = json.loads(request.body)
                username = body["username"]
            if username:
                cr.execute("SELECT id FROM auth_user WHERE username=%s",(username,))
                username_details = dictfetchall(cr)
                if username_details and username_details[0]['id']:
                    json_data['status'] = "NTE-01"
                    json_data['message'] = "Username correct"
                    json_data['user_id'] = username_details[0]['id']
                else:
                    json_data['status'] = "NTE-02"
                    json_data['message'] = "Please Enter Valid User Name"
            else:
                json_data['status'] = "NTE-02"
                json_data['message'] = "Username Not present"
        except Exception as e:
            json_data['status'] = "NTE-02"
            json_data['message'] = "Error in Fields"
        return HttpResponse(json.dumps(json_data))


def login(request):

    # template_name = config.login_template_name
     
    # def get(self, request, *args, **kwargs):
    #     if 'ntoday_user_id' in request.session:
    #         #uam_sessions_sync(request,lib.strUAMLink, lib.strEEMAppName, lib.strEEMAppClient, lib.strLoginFunctionality,request.session.session_key,request.META.get('HTTP_X_FORWARDED_FOR'))
    #         return HttpResponseRedirect(config.login_redirect)
    #     else:
    #         cr = connection.cursor()
    #         cr.execute("SELECT id, username, employee_image, last_login FROM auth_user WHERE last_login IS NOT NULL ORDER BY last_login DESC LIMIT 10")
    #         last_login_user_details = dictfetchall(cr)
    #         return render(request, self.template_name, {'last_login': last_login_user_details})
    
    # def post(self, request, *args, **kwargs):

        
        tempt_dict = {}
        if config.uid in request.session:
            tempt_dict[config.status_key] = config.success_status
        else:
            try:
                cr = connection.cursor()
                if request.POST:
                    data = request.POST.get(config.datas)
                    datas = json.loads(data)
                else:
                    body = json.loads(request.body)
                    datas = body["datas"]
                if datas:
                    uname = datas[config.username]
                    pword = datas[config.password]
                    user = authenticate(username=uname, password=pword)  #authenticate function
                    # login(request, user)
                    print("userrrr",datas)
                    if user:
                        auth.login(request, user)
                        request.session['user_id'] = request.user.id
                        cr.execute("select id, username from auth_user where id=%s",(user.id,))
                        result = dictfetchall(cr)

                        tempt_dict['details'] = result
                        tempt_dict[config.status_key] = config.success_status
                    else:
                        tempt_dict[config.status_key] = config.failure_status                   
                return HttpResponse(json.dumps(tempt_dict))
            except:
                tempt_dict[config.status_key] = config.failure_status
                return HttpResponse(json.dumps(tempt_dict)) 


class GSolveDashboard(TemplateView):
    ''' 
    To Dashboard Pages View Site loaded. And also check the user authentication
    @param request: Request Object
    @type request : Object
    @return:   HttpResponse or Redirect the another URL
    @author: Janet
    '''
    def dispatch(self, request, *args, **kwargs):
        return super(GSolveDashboard, self).dispatch(request, *args, **kwargs)
    
    def get_template_names(self):
        active_user = self.request.user.id
        print("USEEEE00",active_user)
        if active_user:
            template_name = 'gsolve_dashboard.html'
        else:
            template_name = 'gsolve_login.html'
        return [template_name]


