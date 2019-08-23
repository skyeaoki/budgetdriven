from django.db import models

# Models:
# Spending Categories (category, spent)
# Purchases (date, category, description, price)
# Budget (amount)


class Budget(models.Model):
    amount: models.DecimalField(..., max_digits=10, decimal_places=2)

class Purchases:
    date: models.DateField()
    category: models.CharField(max_length=30, unique=True)
    description: models.CharField(max_length=45)
    price: models.DecimalField(..., max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)