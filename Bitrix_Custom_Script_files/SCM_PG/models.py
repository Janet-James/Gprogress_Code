from django.db import models

# Create your models here.
class SCM_PG_Expense_Approval(models.Model):
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    contract_name = models.TextField(null=True)
    project_code = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    delivery_address = models.TextField(null=True)
    po_aprroval = models.TextField(null=True)
    po_authorizer = models.TextField(null=True)
    new_po_deal_no = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    old_po_deal_no = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    check_by = models.TextField(null=True)
    sourceid = models.TextField(null=True)
    procurement_type = models.TextField(null=True)
    ordered_by = models.TextField(null=True)
    proposal_no = models.TextField(null=True)
    purchase_mode = models.TextField(null=True)
    supplier = models.TextField(null=True)
    approved_by = models.TextField(null=True)
    authorized_by = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    approval_id = models.IntegerField(null=True)
    currency_id = models.TextField(null=True)

    class Meta:
        db_table = 'scm_pg_expense_approval'

class SCM_PG_Expense_Review(models.Model):
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    contract_name = models.TextField(null=True)
    project_code = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    delivery_address = models.TextField(null=True)
    po_aprroval = models.TextField(null=True)
    po_authorizer = models.TextField(null=True)
    new_po_deal_no = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    old_po_deal_no = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    check_by = models.TextField(null=True)
    sourceid = models.TextField(null=True)
    procurement_type = models.TextField(null=True)
    ordered_by = models.TextField(null=True)
    proposal_no = models.TextField(null=True)
    purchase_mode = models.TextField(null=True)
    supplier = models.TextField(null=True)
    approved_by = models.TextField(null=True)
    authorized_by = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    review_id = models.IntegerField(null=True)
    currncy_id = models.TextField(null=True)

    class Meta:
        db_table = 'scm_pg_expense_review'
