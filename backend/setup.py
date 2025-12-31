import os
import sys
import subprocess
import shutil
import time

# --- CONFIGURATION ---
REQUIRED_PACKAGES = [
    "django",
    "djangorestframework",
    "django-cors-headers",
    "mysqlclient",
    "Pillow",  # Crucial for ImageField
    "django-environ",
    "djangorestframework-simplejwt"
]

# Colors for terminal output
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

def print_step(message):
    print(f"\n{GREEN}========================================{RESET}")
    print(f"{GREEN}>>> {message}{RESET}")
    print(f"{GREEN}========================================{RESET}")

def run_command(command, ignore_errors=False):
    """Runs a shell command."""
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError:
        if not ignore_errors:
            print(f"{RED}Error running command: {command}{RESET}")
            sys.exit(1)
        else:
            print(f"{YELLOW}Warning: Command failed but continuing... ({command}){RESET}")

def install_dependencies():
    print_step("Installing Dependencies...")
    # Upgrade pip first
    run_command(f"{sys.executable} -m pip install --upgrade pip")
    # Install packages
    packages_str = " ".join(REQUIRED_PACKAGES)
    run_command(f"{sys.executable} -m pip install {packages_str}")

def clean_migrations():
    print_step("Cleaning Old Migrations...")
    # List of apps to clean
    apps = ['course', 'users']
    
    for app in apps:
        migration_path = os.path.join(os.getcwd(), app, 'migrations')
        if os.path.exists(migration_path):
            for filename in os.listdir(migration_path):
                if filename != "__init__.py" and filename.endswith(".py"):
                    file_path = os.path.join(migration_path, filename)
                    print(f"Removing: {file_path}")
                    os.remove(file_path)
                    
            # Also remove __pycache__
            cache_path = os.path.join(migration_path, '__pycache__')
            if os.path.exists(cache_path):
                shutil.rmtree(cache_path)

def reset_database():
    print_step("Resetting Database...")
    print(f"{YELLOW}NOTE: This assumes your 'gocode_db' exists in MySQL.{RESET}")
    
    # 1. Flush existing data (clears conflicts)
    # We use --no-input to skip confirmation
    run_command(f"{sys.executable} manage.py flush --no-input", ignore_errors=True)

def make_migrations():
    print_step("Creating New Migrations...")
    run_command(f"{sys.executable} manage.py makemigrations users course")
    run_command(f"{sys.executable} manage.py migrate")

def create_superuser():
    print_step("Creating Superuser (admin / password)...")
    
    # Python script to run inside Django shell to create user safely
    script = """
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'password')
    print('Superuser "admin" created.')
else:
    print('Superuser "admin" already exists.')
    """
    
    # Run the inline script
    subprocess.run([sys.executable, "manage.py", "shell", "-c", script])

def run_server():
    print_step("Starting Server...")
    print(f"{YELLOW}Backend running at: http://127.0.0.1:8000/{RESET}")
    print(f"{YELLOW}Admin Panel: http://127.0.0.1:8000/admin/{RESET}")
    print(f"{YELLOW}Login: admin / password{RESET}")
    run_command(f"{sys.executable} manage.py runserver")

def main():
    if not os.path.exists("manage.py"):
        print(f"{RED}Error: manage.py not found. Please run this script inside the 'backend' folder.{RESET}")
        return

    # 1. Install Pip Packages
    install_dependencies()

    # 2. Ask user for mode
    print(f"\n{YELLOW}Select Mode:{RESET}")
    print("1. Fresh Start (Fixes 'Data Truncated', deletes migrations, resets DB)")
    print("2. Just Run (Start server only)")
    choice = input("Enter 1 or 2: ").strip()

    if choice == '1':
        clean_migrations()
        reset_database()
        make_migrations()
        create_superuser()
    
    # 3. Always run server at the end
    run_server()

if __name__ == "__main__":
    main()
