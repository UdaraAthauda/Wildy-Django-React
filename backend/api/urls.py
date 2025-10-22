from django.urls import path, include
from .views import GoogleLogin

urlpatterns = [
    path('auth/google/', GoogleLogin.as_view(), name="google_login"),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]
