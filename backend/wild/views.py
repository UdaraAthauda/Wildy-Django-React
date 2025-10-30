from rest_framework.views import APIView
from rest_framework import generics, filters, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Snake
from .serializers import SnakeDetailSerializer
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(
    method='get',
    operation_description='Retrieve details',
    responses={200: 'successful'}
)
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def snake_info_list(request):
    snakes = Snake.objects.all()
    data = []
    
    for snake in snakes:
        data.append({
            'id': snake.id,
            'name': snake.name,
            'scientific_name': snake.scientific_name,
            'common_names': snake.common_names,
            'venom_type': snake.venom_type,
            'images': [
                {'id': img.id, 'image': img.image.url if img.image else None}
                for img in snake.images.all()
            ]
        })
        
    return Response(data, status=status.HTTP_200_OK)

    
class SnakeListView(generics.ListAPIView):
    queryset = Snake.objects.all()
    serializer_class = SnakeDetailSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'scientific_name', 'common_names', 'venom_type', 'family']
    
    
    
class SnakeDetailView(generics.RetrieveAPIView):
    queryset = Snake.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = SnakeDetailSerializer
