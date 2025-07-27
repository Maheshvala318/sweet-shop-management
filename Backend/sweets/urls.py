from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView,
    LoginView,
    ChangePasswordView,
    ForgotPasswordView,
    SweetView
)

router = DefaultRouter()
router.register(r'sweets', SweetView)

urlpatterns = [
    path('', include(router.urls)),  # handles /sweets/
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
]
