from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated 
from rest_framework.viewsets import ModelViewSet
from .models import Blog
from .serializers import BlogSerializer

class PublishedBlogs(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        blogs = Blog.objects.filter(status='published').order_by('-created_at')
        serializer = BlogSerializer(blogs, many=True)
        
        return Response(serializer.data, status=200)
    

class BlogViewSet(ModelViewSet):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        if user.is_authenticated:
            return Blog.objects.filter(author=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)