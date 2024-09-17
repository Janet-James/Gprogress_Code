from django.urls import path
from Task_Dashboard import individual_dashboard
from . import views 


urlpatterns = [
        # path('task/dashboard/', views.Task_Template_Load.as_view()),
    path('task_management/homepage/', views.task_management_Template_Load.as_view()),
    path('task_management/overall_task/',views.overall_task,name= "overall_task_data"),
    path('task_management/all_user_data/',views.all_user_data,name= "all_user_data"),
    path('task_management/task_report/',views.task_report,name= "task_report"),
    path('task_management/project_estimate/',views.project_estimate,name= "project_estimate"),
    path('task_management/task_report_filter/',views.task_report_filter,name= "task_report_filter"),
    path('task_management/current_week_chart/',views.current_week_chart,name= "current_week_chart"),
    path('task_management/resource_management_dept_filter/',views.resource_management_dept_filter,name= "resource_management_dept_filter"),
    path('task_management/resource_management_user_filter/',views.resource_management_user_filter,name= "resource_management_user_filter"),
    path('task_management/resource_management_team/',views.resource_management_team,name= "resource_management_team"),
    path('task_management/resource_management_project/',views.resource_management_project,name= "resource_management_project"),


   path('individual_task_dashboard/individual_templete_load/',individual_dashboard.from_overalldashboard,name ="individual_templete_load"),
   path('individual_task_dashboard/', individual_dashboard.individual_task_dashboard_Template_Load.as_view(), name="individual_task_dashboard"),
   path('individual_task_dashboard/get_task_completion_rate/',individual_dashboard.get_task_completion_rate, name= "get_task_completion_rate"),
   path('individual_dashboard/upcoming_task/',individual_dashboard.upcoming_task,name ="upcoming_task"),
   path('individual_dashboard/previous_task/',individual_dashboard.previous_date_range_data,name ="previous_date_range_data"),
   path('individual_dashboard/yearly_task_graph/',individual_dashboard.yearly_task_graph,name ="yearly_task_graph"),
   path('individual_dashboard/task_by_assignees/',individual_dashboard.get_task_by_assignees,name ="get_task_by_assignees"),
   path('individual_dashboard/get_weeks_in_month/',individual_dashboard.get_weeks_in_month,name ="get_weeks_in_month"),
 
]




