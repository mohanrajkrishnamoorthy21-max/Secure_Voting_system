from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, ElectionViewSet, VoteViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'elections', ElectionViewSet, basename='election')
router.register(r'votes', VoteViewSet, basename='vote')

urlpatterns = [
    path('', include(router.urls)),
]
