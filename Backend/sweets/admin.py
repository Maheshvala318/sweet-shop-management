from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Sweet

# Unregister the default User model if it's already registered
# (This is only needed if you've previously registered the default User model)
# admin.site.unregister(User)

class CustomUserAdmin(UserAdmin):
    # The fields to be used in displaying the User model
    list_display = ('email', 'name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('email', 'name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)

class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'feature')
    list_filter = ('category', 'feature')
    search_fields = ('name', 'description')
    prepopulated_fields = {}

# Register your models here
admin.site.register(User, CustomUserAdmin)
admin.site.register(Sweet, SweetAdmin)