import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from django.contrib.auth.models import User
from voting.models import Election, Candidate

def run():
    print("Seeding database...")
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin')
        print("Created admin user.")
    else:
        print("Admin user exists.")
        
    if not Election.objects.exists():
        election = Election.objects.create(
            name='Presidential Election 2026',
            description='Select the next President of the Universe.'
        )
        Candidate.objects.create(name='Alice', description='Party A', election=election)
        Candidate.objects.create(name='Bob', description='Party B', election=election)
        print("Created election and candidates.")
    else:
        print("Elections exist.")

if __name__ == '__main__':
    run()
