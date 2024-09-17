from django.db import models


class ClientPartnerLogs(models.Model):
    contact_id = models.IntegerField(null=True, blank=True)
    company_id = models.IntegerField(null=True, blank=True)
    contact_person_name = models.CharField(max_length=50,null=True, blank=True)
    contact_person_email = models.EmailField(max_length=150,null=True, blank=True)
    logged_in_status = models.BooleanField(null=True, blank=True)
    solar_project_id = models.IntegerField(null=True, blank=True)
    logged_in_time = models.DateTimeField(null=True, blank=True)
    logged_out_time = models.DateTimeField(null=True, blank=True)
    user_activity = models.TextField(null=True, blank=True)
    user_timezone = models.TextField(null=True, blank=True)
    user_geolocation = models.TextField(null=True, blank=True)
    country_code = models.CharField(max_length=30,null=True, blank=True)
    country_name = models.CharField(max_length=30,null=True, blank=True)
    class Meta:
        db_table = "client_partner_logs"

class LogDetails(models.Model):
    log_type = models.TextField(blank=True, null=True)
    log_date = models.DateTimeField(null=True, blank=True)
    log_user = models.ForeignKey(ClientPartnerLogs, on_delete = models.CASCADE)
    user_id = models.IntegerField(blank=True,null=True)
    class Meta:
        db_table = "individual_user_log"

class CpProjectTaskDetail(models.Model):
    # task_id = models.IntegerField(primary_key=True) # Setting task_id as primary key
    parent_id = models.IntegerField(null=True, blank=True)
    super_parent_id = models.IntegerField(null=True,blank=True)
    title = models.CharField(max_length=300 ,null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    priority = models.IntegerField(null=True, blank=True)
    status = models.IntegerField(null=True, blank=True)
    group_id = models.IntegerField(null=True, blank=True)
    stage_id = models.IntegerField(null=True, blank=True)
    created_by = models.IntegerField(null=True, blank=True)
    created_date = models.DateTimeField(null=True, blank=True)
    responsible_id = models.IntegerField(null=True, blank=True)
    closed_by = models.IntegerField(null=True, blank=True)
    closed_date = models.DateTimeField(null=True, blank=True)
    activity_date = models.DateTimeField(null=True, blank=True)
    date_start = models.DateTimeField(null=True, blank=True)
    deadline = models.DateTimeField(null=True, blank=True)
    start_date_plan = models.DateTimeField(null=True, blank=True)
    end_date_plan = models.DateTimeField(null=True, blank=True)
    comments_count = models.IntegerField(null=True, blank=True)
    service_comments_count = models.IntegerField(null=True, blank=True)
    new_comments_count = models.IntegerField(null=True, blank=True)
    time_estimate = models.IntegerField(null=True, blank=True)
    time_spend_in_logs = models.IntegerField(null=True, blank=True)
    match_work_time = models.CharField(max_length=10,null=True, blank=True)
    subordinate = models.CharField(max_length=10,null=True, blank=True)
    duration_plan = models.IntegerField(null=True, blank=True)
    duration_type = models.CharField(max_length=20,null=True, blank=True)
    planned_duration = models.IntegerField(null=True, blank=True)
    actual_duration = models.IntegerField(null=True, blank=True)
    delay_days = models.IntegerField(null=True, blank=True)
    total_delay = models.IntegerField(null=True, blank=True)
    solar_project_id = models.IntegerField(null=True, blank=True)
    solar_project_phase_id = models.IntegerField(null=True, blank=True)
    solar_project_phase_title = models.CharField(max_length=30,null=True, blank=True)
    last_synched = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "cp_project_task_detail"



class CpProjectMonitoringMetrics(models.Model):
    # project_id = models.IntegerField(null = True,blank = True)
    project_name = models.CharField(max_length = 300,null=True,blank = True)
    start_date = models.DateTimeField(null =True,blank = True)
    end_date = models.DateTimeField(null=True,blank = True)
    total_days_of_project = models.IntegerField(null=True,blank = True)
    elapsed_days = models.IntegerField(null=True,blank=True)
    remaining_days = models.IntegerField(null=True,blank=True)
    delay_days = models.IntegerField(null = True,blank = True)
    engineering_phase1_mindate = models.DateTimeField(null = True,blank = True)
    engineering_phase1_maxdate = models.DateTimeField(null= True,blank = True)
    procurement_phase2_mindate = models.DateTimeField(null= True,blank = True)
    procurement_phase2_maxdate = models.DateTimeField(null= True,blank = True)
    construction_phase3_mindate = models.DateTimeField(null= True,blank = True)
    construction_phase3_maxdate = models.DateTimeField(null= True,blank = True)
    engineering_phase1_completion = models.IntegerField(null = True,blank = True)
    procurement_phase2_completion = models.IntegerField(null = True,blank = True)
    construction_phase3_completion = models.IntegerField(null = True,blank = True)
    overall_progress = models.IntegerField(null = True,blank =True)
    planned_man_power = models.IntegerField(null=True,blank=True)
    actual_man_power = models.IntegerField(null=True,blank=True)
    engineering_phase1_total_task_count = models.IntegerField(null=True,blank=True)
    procurement_phase2_total_task_count = models.IntegerField(null=True,blank=True)
    construction_phase3_total_task_count = models.IntegerField(null=True,blank=True)
    forecast_end_date = models.DateTimeField(null =True,blank = True)
    lost_time_injury = models.IntegerField(null = True,blank = True)

    class Meta:
        db_table = "cp_project_monitoring_metrics"


class CpMonthlyWiseProjectDate(models.Model):
    project_id = models.IntegerField(null = True,blank = True)
    month = models.IntegerField(null=True,blank = True)
    year = models.IntegerField(null=True,blank = True)
    phase1_planned_completion_count = models.IntegerField(null=True,blank = True)
    phase1_actual_completion_count = models.IntegerField(null=True,blank = True)
    phase2_planned_completion_count = models.IntegerField(null=True,blank=True)
    phase2_actual_completion_count = models.IntegerField(null=True,blank=True)
    phase3_planned_completion_count = models.IntegerField(null = True,blank = True)
    phase3_actual_completion_count = models.IntegerField(null=True,blank = True)
    
    class Meta:
        db_table = "cp_monthly_wise_project_data"
