from django.db import models
from django.contrib.auth.models import User

class VoterProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='voter_profile')
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    timezone = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"

class Election(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

class Candidate(models.Model):
    election = models.ForeignKey(Election, on_delete=models.CASCADE, related_name='candidates')
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name

class Vote(models.Model):
    voter = models.ForeignKey(User, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='votes')
    election = models.ForeignKey(Election, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('voter', 'election')

    def __str__(self):
        return f"{self.voter.username} voted for {self.candidate.name} in {self.election.name}"
