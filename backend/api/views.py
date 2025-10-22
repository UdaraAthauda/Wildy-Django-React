from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model

User = get_user_model()


class GoogleLogin(APIView):
    
    def post(self, request):
        token = request.data.get('token')
        
        if not token:
            return Response({"error": "Token is required"}, status=400)
        
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), None)
            email = idinfo['email']
            name = idinfo.get('name', '')
            
            user, created = User.objects.get_or_create(email=email, defaults={'username': email, 'first_name': name})
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user':{
                    'id': user.id,
                    'email': user.email,
                }
            })
            
        except ValueError as e:
            return Response({"error": str(e)}, status=400)