from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Election, Candidate, Vote, VoterProfile

class VoterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoterProfile
        fields = ['city', 'state', 'timezone']

class UserSerializer(serializers.ModelSerializer):
    profile = VoterProfileSerializer(source='voter_profile', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'name', 'description', 'election']

class ElectionSerializer(serializers.ModelSerializer):
    candidates = CandidateSerializer(many=True, read_only=True)

    class Meta:
        model = Election
        fields = ['id', 'name', 'description', 'is_active', 'start_time', 'end_time', 'candidates']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'voter', 'candidate', 'election']
