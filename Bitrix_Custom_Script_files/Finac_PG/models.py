from django.db import models

# Create your models here.
class Finac_PG_Expense_Approval(models.Model):
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    voucher_type = models.TextField(null=True)
    company_bank = models.TextField(null=True)
    finally_paid_amount = models.TextField(null=True)
    amount_in_words = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    voucher_date = models.TextField(null=True)
    selected_vendor = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    must_be_paid = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    project = models.TextField(null=True)
    tax_invoice = models.TextField(null=True)
    check_by = models.TextField(null=True)
    approver = models.TextField(null=True)
    authorizer = models.TextField(null=True)
    paid_for = models.TextField(null=True)
    payment_no = models.TextField(null=True)
    payment_type = models.TextField(null=True)
    vendor_bank = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    approve_id = models.IntegerField(null=True)
    currency_id = models.TextField(null=True)
    part_percentage = models.TextField(null=True)
    estimated_cost = models.TextField(null=True)

    class Meta:
        db_table = 'finac_pg_expense_approval'

class Finac_PG_Expense_Review(models.Model):
    name = models.TextField(null=True)
    your_company_details = models.TextField(null=True)
    voucher_type = models.TextField(null=True)
    company_bank = models.TextField(null=True)
    finally_paid_amount = models.TextField(null=True)
    amount_in_words = models.TextField(null=True)
    financial_year = models.TextField(null=True)
    voucher_date = models.TextField(null=True)
    selected_vendor = models.TextField(null=True)
    po_contract_no = models.TextField(null=True)
    must_be_paid = models.TextField(null=True)
    budget_code = models.TextField(null=True)
    project = models.TextField(null=True)
    tax_invoice = models.TextField(null=True)
    check_by = models.TextField(null=True)
    approver = models.TextField(null=True)
    authorizer = models.TextField(null=True)
    paid_for = models.TextField(null=True)
    payment_no = models.TextField(null=True)
    payment_type = models.TextField(null=True)
    vendor_bank = models.TextField(null=True)
    entitytypeid = models.IntegerField(null=True)
    review_id = models.IntegerField(null=True)
    currency_id = models.TextField(null=True)
    part_percentage = models.TextField(null=True)
    estimated_cost = models.TextField(null=True)

    class Meta:
        db_table = 'finac_pg_expense_review'