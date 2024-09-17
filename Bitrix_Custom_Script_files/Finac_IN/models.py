from django.db import models

# Create your models here.
class Finac_IN_Expense_Approval(models.Model):
    approval_id = models.IntegerField(null=True)
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    voucher_type = models.TextField(null=True)
    finally_paid_amount = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    voucher_date = models.TextField(null=True)
    selected_vendor = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    stage = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    project = models.TextField(null=True)
    tax_invoice = models.TextField(null=True)
    check_by = models.TextField(null=True)
    approver = models.TextField(null=True)
    authorizer = models.TextField(null=True)
    paid_for = models.TextField(null=True)
    payment_no = models.TextField(null=True)
    amount_in_words = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    currency_id = models.TextField(null=True)
    part_percentage = models.TextField(null=True)
    estimated_cost = models.TextField(null=True)

    class Meta:
        db_table = 'finac_in_expense_approval'

class Finac_IN_Expense_Review(models.Model):
    review_id = models.IntegerField(null=True)
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    voucher_type = models.TextField(null=True)
    finally_paid_amount = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    voucher_date = models.TextField(null=True)
    selected_vendor = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    stage = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    project = models.TextField(null=True)
    tax_invoice = models.TextField(null=True)
    check_by = models.TextField(null=True)
    approver = models.TextField(null=True)
    authorizer = models.TextField(null=True)
    paid_for = models.TextField(null=True)
    payment_no = models.TextField(null=True)
    amount_in_words = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    currency_id = models.TextField(null=True)
    part_percentage = models.TextField(null=True)
    estimated_cost = models.TextField(null=True)

    class Meta:
        db_table = 'finac_in_expense_review'

