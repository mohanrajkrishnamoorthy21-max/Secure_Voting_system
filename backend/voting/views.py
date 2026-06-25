from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Election, Candidate, Vote
from .serializers import ElectionSerializer, CandidateSerializer, VoteSerializer, UserSerializer
from django.db import IntegrityError

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        city = request.data.get('city', '')
        state = request.data.get('state', '')
        timezone = request.data.get('timezone', '')
        
        if not username or not password:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            from .models import VoterProfile
            VoterProfile.objects.create(user=user, city=city, state=state, timezone=timezone)
            return Response({'success': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        if user:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def update_profile(self, request):
        user_id = request.data.get('user_id')
        city = request.data.get('city')
        state = request.data.get('state')
        timezone = request.data.get('timezone')
        
        try:
            user = User.objects.get(id=user_id)
            profile = user.voter_profile
            
            if city is not None:
                profile.city = city
            if state is not None:
                profile.state = state
            if timezone is not None:
                profile.timezone = timezone
                
            profile.save()
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class ElectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer
    permission_classes = [permissions.AllowAny] # List should be available to everyone or just users

    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        election = self.get_object()
        candidates = election.candidates.all()
        results = []
        for candidate in candidates:
            results.append({
                'id': candidate.id,
                'name': candidate.name,
                'votes': candidate.votes.count()
            })
        return Response(results)

class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    # simplified permission for demo, using AllowAny and trusting user id in request data
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        voter_id = request.data.get('voter')
        election_id = request.data.get('election')
        candidate_id = request.data.get('candidate')
        
        if not all([voter_id, election_id, candidate_id]):
            return Response({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Prevent double voting
        if Vote.objects.filter(voter_id=voter_id, election_id=election_id).exists():
            return Response({'error': 'You have already voted in this election.'}, status=status.HTTP_400_BAD_REQUEST)
            
        return super().create(request, *args, **kwargs)
