from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager

class User(AbstractUser):
    username = None
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=150)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Sweet(models.Model):
    image = models.ImageField(upload_to='uploads/sweets', null=True, blank=True)
    name = models.CharField(max_length=150, null=False, blank=False)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=50, default='all')
    ratings = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    feature = models.BooleanField(default=False)

    def __str__(self):
        return self.name