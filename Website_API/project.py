from fast_bitrix24 import Bitrix
from rest_framework.views import APIView
import http.client
from django.http import HttpResponse
import json
from bitrix24 import *
from django.views.decorators.csrf import csrf_exempt
from fast_bitrix24 import Bitrix
from datetime import datetime, timezone,timedelta
import time
import datetime
from django.http import JsonResponse
import hashlib
from dateutil import parser
import requests
import re
import pytz
import random

def time_stamp():
    """
    Return current time in YYYY-MM-DD hh:mm:ss
    :return:
    """
    return time.strftime("%Y-%m-%d %H:%M:%S")

def Get_Access_Token():
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    secret = "ce35717972b25a49f6e97480bb115a84"
    username = "re-engineer03@green.com.pg"
    password = "Green@12345*"
    orgId = 195002
# try:
    passhash = hashlib.sha256(password.encode()).hexdigest()
    conn = http.client.HTTPSConnection(url)
    if orgId:
        print(f"{time_stamp()}: ???  Using organization ID: {orgId}")
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash, "orgId": orgId})
    else:
        payload = json.dumps({"appSecret": secret, "email": username, "password": passhash})   
    headers = {"Content-Type": "application/json"}
    endpoint = f"/account/v1.0/token?appId="+appid+"&language=en&="
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    data = json.loads(res.decode('utf-8'))   
    print(f"{time_stamp()}: ?? Token received successfully")
    print(data["access_token"])
    return data["access_token"]
# except Exception as error:
    # print(f"{time_stamp()}: ?? Unable to fetch token: {str(error)}")
    # return None

def SolarMan_PlantInfo(stationId,access_token):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    conn = http.client.HTTPSConnection(url)
    # access_token = Get_Access_Token()
    print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"stationId": stationId})
    endpoint = "//station/v1.0/base?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    data = json.loads(res.decode('utf-8'))
    plant_timezone = data['region']['timezone']
    return plant_timezone
    
def SolarMan_HistoryList(plant_timezone,plantId,filter_type,from_date,to_date,generation_parameter,consumption_parameter):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    stationId = plantId
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    # print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"startTime":from_date,"endTime":to_date,"stationId": 3560357,"timeType":filter_type})
    endpoint = "//station/v1.0/history?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    # print(res)
    data = json.loads(res.decode('utf-8'))
    print(data)
    stationData=data['stationDataItems']
    print(stationData)
    generation_hours_list=[]
    consumption_hours_list=[]
    for i in stationData:
        generation_hours={}
        consumption_hours={}
        if filter_type==1:
            timezone_data = pytz.timezone(plant_timezone)
            timestamp = i['dateTime']
            datetime_obj = datetime.datetime.fromtimestamp(timestamp, timezone_data)
            formatted_date_time = datetime_obj.strftime("%Y-%m-%d %H:%M:%S")
            metric_date=(datetime_obj).isoformat()
            generation_metric=round(i[generation_parameter]/1000, 2)
            consumption_metric=round(i[consumption_parameter]/1000, 2)
        elif filter_type==2:
            print(i['year'],i['month'],i['day'])
            date = datetime.datetime(year=i['year'], month=i['month'], day=i['day'])
            formatted_date_time = date.strftime("%Y-%m-%d")
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        else:
            print(i['year'],i['month'])
            date = datetime.datetime(year=i['year'], month=i['month'], day=1)
            formatted_date_time = date.strftime('%Y-%m-%d %H:%M:%S')
            metric_date=formatted_date_time
            generation_metric=i[generation_parameter]
            consumption_metric=i[consumption_parameter]
        generation_hours['x']=metric_date
        generation_hours['y']=generation_metric
        generation_hours_list.append(generation_hours)
        consumption_hours['x']=metric_date
        consumption_hours['y']=consumption_metric
        consumption_hours_list.append(consumption_hours)
        # print("Formatted Date and Time:", formatted_date_time)
    # print(generation_hours_list,consumption_hours_list)
    return generation_hours_list,consumption_hours_list

@csrf_exempt
def SolarMan_DeviceList(request):
    url = "globalapi.solarmanpv.com"
    appid = "2023050914561532"
    conn = http.client.HTTPSConnection(url)
    access_token = Get_Access_Token()
    # print("++++++++++ACCESS TOKEN+++++++++",access_token)
    headers = {"Content-Type": "application/json", "Authorization": "bearer " + access_token}
    payload = json.dumps({"stationId": 3560357})
    endpoint = "//station/v1.0/device?language=en"
    conn.request("POST", endpoint, payload, headers)
    res = conn.getresponse().read()
    # print("RESPONSE-----------------------------",res)
    
    data = json.loads(res.decode('utf-8'))

@csrf_exempt
def solarProjectMetrics(request):
    print("============= Solar Metrix DayBasis =============")
    json_data = {}
    try:
        post = request.POST
        if post:
            browser_date = post.get("date")
            print(browser_date)
            timezone_offset = post.get("timezoneOffset")
            browserTimezone=post.get("browserTimezone")
            # bx24 = Bitrix('https://greenltd.bitrix24.com/rest/120/i7jh2267ia7wzxtb/')
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            params = {
                "entityTypeId": 177,
                "select": ["id", "title", "ufCrm100_1694243456358", "ufCrm100_1694243641441", "ufCrm100_1696398618030","ufCrm100_1694243678567", "ufCrm100_1694244101473", "ufCrm100_1694853869","ufCrm100_1697701213648","ufCrm100_1697701244248","ufCrm100_1697699343842"]
            }
            project_data = bx24.get_all('crm.item.list', params)
            print(project_data)
            browser_datetime = datetime.datetime.fromisoformat(browser_date[:-1])  # Remove 'Z' and parse
            desired_timezone = pytz.timezone(browserTimezone)
            browser_datetime = browser_datetime.astimezone(desired_timezone)
            hours_in_desired_timezone = browser_datetime.hour
            start_of_day_utc = browser_datetime.replace(hour=0, minute=0, second=0, microsecond=0)
            current_day_utc = browser_datetime.replace(hour=hours_in_desired_timezone, minute=0, second=0, microsecond=0)
            passed_hours_list = [hour for hour in range(0, int(hours_in_desired_timezone) + 1)]
            total_kwh_production_hourly_basis_list = []
            combined_project_image_url = None
            for item in project_data:
                date_str = item.get('ufCrm100_1694243456358')
                site_name = item.get('title')
                no_of_systems = item.get('ufCrm100_1694243641441')
                project_subtitle = item.get('ufCrm100_1696398618030')
                deal_id = item.get('id')
                is_it_combined_project = item.get('ufCrm100_1696925348342')
                if is_it_combined_project == 1948:
                    combined_project_image_url = item.get('ufCrm100_1694853869')
                if date_str:
                    date = parser.parse(date_str)
                    days_difference = (browser_datetime - date).days
                    item['no_of_days'] = days_difference
                    item['capacity_in_kwh'] = round(float(item.get('ufCrm100_1694243678567')) / 1000, 2)
                    item['total_generation_todate_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')) * days_difference, 2)
                    item['total_generation_daily_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')), 2)
                    item['total_generation_weekly_in_kwh'] = round(7 * float(item.get('total_generation_daily_in_kwh')), 2)
                    item['total_generation_monthly_in_kwh'] = round(30 * float(item.get('total_generation_daily_in_kwh')), 2)
                    item['carbon_emission_saved_todate'] = round((0.9 * float(item.get('total_generation_todate_in_kwh'))) / 1000, 2)
                    item['consumption']= round(float((item.get('total_generation_todate_in_kwh'))-(item.get('capacity_in_kwh') *int(days_difference))),3)
                    item['total_electricity'] = int((item.get('consumption')-(days_difference*item['capacity_in_kwh']))/item.get('consumption') * 100)
                    item['coals_saved']=round((float(item.get('carbon_emission_saved_todate')/2.4))*1000,2)
                    item['tree_planted']=round(float(item.get('carbon_emission_saved_todate')*46),2)
                    if item['total_electricity'] < 0:
                        # Change negative value to positive
                        item['total_electricity'] = abs(item['total_electricity'])
                    
                    if item['total_electricity'] > 100:
                        # Limit value to be within the range of 0 to 100
                        item['total_electricity'] = 100
                    generation_hours_list=[]
                    consumption_hours_list=[]
                    min_value = 0.1
                    max_value = 0.3
                    if item.get('ufCrm100_1697699343842')==2528:
                        plant_timezone=item.get('ufCrm100_1697701213648')
                        plant_id=item.get('ufCrm100_1697701244248')
                        current_date_string=start_of_day_utc.strftime("%Y-%m-%d")
                        generation_hours_list, consumption_hours_list =SolarMan_HistoryList(plant_timezone,plant_id,1,current_date_string,current_date_string,'generationPower','usePower')
                    else:
                        for hours in passed_hours_list:
                            generation_hours={}
                            consumption_hours={}
                            value= random.uniform(min_value, max_value)
                            generation_hours['x']=(browser_datetime.replace(hour=hours, minute=0, second=0, microsecond=0)).isoformat()
                            generation_hours['y']=round(item['total_generation_daily_in_kwh']  * value, 2)
                            generation_hours_list.append(generation_hours)
                            # consumption_hours['x']=(browser_datetime.replace(hour=hours, minute=0, second=0, microsecond=0)).isoformat()
                            # consumption_hours['y']=round((item['consumption']/days_difference) * value, 2)
                            # consumption_hours_list.append(consumption_hours)
                    slice_date = date_str[:10]
                    minimum_date = start_of_day_utc.isoformat()
                    maximum_date = current_day_utc.isoformat()
                    total_project_production = {"project_name": site_name, 
                                                "project_date": slice_date,
                                                "consumption_data_hour_based": consumption_hours_list,
                                                "generation_data_hour_based": generation_hours_list,
                                                "no_of_systems": no_of_systems, 
                                                "no_of_days":item['no_of_days'], 
                                                "capacity_in_kwh": item['capacity_in_kwh'],
                                                "total_generation_todate": item['total_generation_todate_in_kwh'],
                                                "carbon_emission_saved_today": item['carbon_emission_saved_todate'],
                                                "total_generation_weekly": item['total_generation_weekly_in_kwh'],
                                                #  "total_generation_monthly": item['total_generation_weekly_in_kwh'],
                                                "project_image_url":item['ufCrm100_1694853869'],
                                                "electricity_saved":item['total_electricity'],
                                                "coals_saved":item['coals_saved'],
                                                "tree_planted":item['tree_planted'],
                                                "minimum_date": minimum_date,
                                                "maximum_date": maximum_date,
                                                "total_generation_daily": item['total_generation_daily_in_kwh'],
                                                "total_consumption_todate": item['consumption'],
                                                "deal_id": deal_id,
                                                "project_subtitle": project_subtitle,
                                                "combined_project_image_url": combined_project_image_url}
                    total_kwh_production_hourly_basis_list.append(total_project_production)
            json_data['total_project_list_data'] = total_kwh_production_hourly_basis_list
    except Exception as e:
        print(str(e))
    return HttpResponse(json.dumps(json_data))

@csrf_exempt
def month_and_year_basis_solarmetrics_calc(request):
    print("============= Solar Metrix Monthly & Yearly Basis Calculation =============")
    json_data = {}
    # try:
    if request:
        post = request.POST
        if post:
            browser_date = post.get("date")
            browserTimezone=post.get("browserTimezone")
            deal_id = int(post.get("deal_id"))
            filterd_data = post.get("filterdData")
            print('--- filterd_data --- ', filterd_data)
            bx24 = Bitrix('https://greenltd.bitrix24.com/rest/42/30l8a6jk1mmvr1r9/')
            params = {
                "entityTypeId": 177,
                "select": ["id", "title", "ufCrm100_1694243456358", "ufCrm100_1694243641441", "ufCrm100_1694243678567", "ufCrm100_1694244101473", "ufCrm100_1694853869","ufCrm100_1697701213648","ufCrm100_1697701244248","ufCrm100_1697699343842"],
                "filter":{"id":deal_id}
            }
            project_data = bx24.get_all('crm.item.list', params)
            browser_datetime = datetime.datetime.fromisoformat(browser_date[:-1])
            desired_timezone = pytz.timezone(browserTimezone)
            browser_datetime = browser_datetime.astimezone(desired_timezone)
            start_of_month = browser_datetime.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            end_of_month = browser_datetime.replace(day=30, hour=0, minute=0, second=0, microsecond=0)
            total_kwh_production_hourly_basis_list = []
            for item in project_data:
                date_str = item.get('ufCrm100_1694243456358')
                item_id = int(item.get('id'))
                if deal_id == item_id:
                    if date_str:
                        date = parser.parse(date_str)
                        days_difference = (browser_datetime - date).days
                        item['no_of_days'] = days_difference
                        item['capacity_in_kwh'] = round(float(item.get('ufCrm100_1694243678567')) / 1000, 2)
                        item['total_generation_todate_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')) * days_difference, 2)
                        item['total_generation_daily_in_kwh'] = round(float(item.get('capacity_in_kwh')) * float(item.get('ufCrm100_1694244101473')), 2)
                        item['total_generation_weekly_in_kwh'] = round(7 * float(item.get('total_generation_daily_in_kwh')), 2)
                        item['total_generation_monthly_in_kwh'] = round(30 * float(item.get('total_generation_daily_in_kwh')), 2)
                        item['carbon_emission_saved_todate'] = round((0.9 * float(item.get('total_generation_todate_in_kwh'))) / 1000, 2)
                        item['consumption']= round(float((item.get('total_generation_todate_in_kwh'))-(item.get('capacity_in_kwh') *int(days_difference))),3) 
                        item['total_consumption_daily_in_kwh'] = item['consumption']/days_difference 
                        item['total_consumption_monthly_in_kwh'] = round(30 * float(item.get('total_consumption_daily_in_kwh')), 2)
                        monthly_total_generation = round(item['total_generation_daily_in_kwh']*30,2)
                        yearly_total_generation = round(item['total_generation_daily_in_kwh']*365,2)
                        current_datetime_without_tz = browser_datetime.replace(tzinfo=None)
                        start_of_year = datetime.datetime(current_datetime_without_tz.year, 1, 1)
                        months_passed = (current_datetime_without_tz.year - start_of_year.year) * 12 + (current_datetime_without_tz.month - start_of_year.month)
                        year_list = []
                        for month in range(1, months_passed + 1):
                            first_day_of_month = datetime.datetime(current_datetime_without_tz.year, month, 1)
                            year_list.append(first_day_of_month)
                        starting_of_the_year = browser_datetime.replace(month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
                        
                        days_passed_in_month = (browser_datetime - start_of_month).days + 1
                        month_list = [start_of_month + datetime.timedelta(days=day - 1) for day in range(1, days_passed_in_month + 1)]
                        generation_monthy_list = []
                        consumption_monthy_list = []
                        generation_yearly_list = []
                        consumption_yearly_list = []
                        min_value = 0.1
                        max_value = 0.3
                    if filterd_data == "month":
                        if item.get('ufCrm100_1697699343842')==2528:
                            plant_timezone=item.get('ufCrm100_1697701213648')
                            plant_id=item.get('ufCrm100_1697701244248')
                            start_month_string=start_of_month.strftime("%Y-%m-%d")
                            end_month_string=end_of_month.strftime("%Y-%m-%d")
                            print(start_month_string,end_month_string)
                            generation_monthy_list, consumption_monthy_list =SolarMan_HistoryList(plant_timezone,plant_id,2,start_month_string,end_month_string,'generationValue','useValue')
                            print(generation_monthy_list)
                        else:
                            for day in month_list:
                                value= random.uniform(min_value, max_value)
                                generation_monthy = {}
                                generation_monthly_cal = (item['total_generation_daily_in_kwh']) * value
                                generation_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                                generation_monthy['y'] = round(generation_monthly_cal, 2)
                                generation_monthy_list.append(generation_monthy)
                                # consumption_monthy = {}
                                # consumption_monthly_cal = item['total_consumption_daily_in_kwh'] * value
                                # consumption_monthy['x'] = day.strftime('%Y-%m-%d %H:%M:%S') + day.strftime('%z')
                                # consumption_monthy['y'] = round(consumption_monthly_cal, 2)
                                # consumption_monthy_list.append(consumption_monthy)
                    if filterd_data == "year":
                        if item.get('ufCrm100_1697699343842')==2528:
                            plant_timezone=item.get('ufCrm100_1697701213648')
                            plant_id=item.get('ufCrm100_1697701244248')
                            # start_date=start_of_month.strftime("%Y-%m-%d")
                            start_date = start_of_month.replace(month=1)
                            # Format the date as "YYYY-MM-dd"
                            start_month_string = start_date.strftime("%Y-%m")
                            end_month_string=end_of_month.strftime("%Y-%m")
                            print(start_month_string,end_month_string)
                            generation_yearly_list, consumption_yearly_list =SolarMan_HistoryList(plant_timezone,plant_id,3,start_month_string,end_month_string,'generationValue','useValue')
                            print(generation_monthy_list)
                        else:
                            for month_date in year_list:
                                value= random.uniform(min_value, max_value)
                                generation_yearly = {}
                                generation_yearly_cal = (item['total_generation_monthly_in_kwh']) * value
                                generation_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                                generation_yearly['y'] = round(generation_yearly_cal, 2)
                                generation_yearly_list.append(generation_yearly)
                                # consumption_yearly = {}
                                # consumption_yearly_cal = item['total_consumption_monthly_in_kwh'] * value
                                # consumption_yearly['x'] = month_date.strftime('%Y-%m-%d %H:%M:%S') + month_date.strftime('%z')
                                # consumption_yearly['y'] = round(consumption_yearly_cal, 2)
                                # consumption_yearly_list.append(consumption_yearly)
                                print(generation_yearly_list)
                    minimum_date = start_of_month.isoformat()
                    maximum_date = browser_datetime.isoformat()
                    year_minimum_date = starting_of_the_year.isoformat()
                    total_project_production = {"total_generation_monthly_in_kwh": monthly_total_generation,
                                                "total_generation_yearly_in_kwh": yearly_total_generation,
                                                "generation_monthy_list": generation_monthy_list,
                                                "consumption_monthy_list": consumption_monthy_list,
                                                "minimum_date": minimum_date,
                                                "maximum_date": maximum_date,
                                                "generation_yearly_list": generation_yearly_list,
                                                "consumption_yearly_list": consumption_yearly_list,
                                                "filterd_data":filterd_data,
                                                "year_minimum_date": year_minimum_date}
                    total_kwh_production_hourly_basis_list.append(total_project_production)
            json_data['monthly_solar_production_data'] = total_kwh_production_hourly_basis_list
    # except Exception as e:
        # print(str(e))
    return HttpResponse(json.dumps(json_data))
