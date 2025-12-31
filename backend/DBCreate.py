import MySQLdb
import environ
import os
from pathlib import Path

# 1. Setup Environment
env = environ.Env()
# Read the .env file if it exists
BASE_DIR = Path(__file__).resolve().parent
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

print("Attempting to connect to MySQL...")

# 2. Get Credentials from .env
# Make sure these match what is in your .env file
db_user = env('DB_USER', default='root')
db_password = env('DB_PASSWORD', default='')
db_host = env('DB_HOST', default='localhost')
db_port = int(env('DB_PORT', default=3306))
target_db_name = env('DB_NAME', default='gocode_db')

try:
    # 3. Connect to MySQL Server (Not the specific DB yet)
    db = MySQLdb.connect(
        host=db_host,
        user=db_user,
        passwd=db_password,
        port=db_port
    )
    cursor = db.cursor()

    # 4. Drop the old database (WARNING: DATA LOSS)
    print(f"⚠️  WARNING: Deleting database '{target_db_name}' if it exists...")
    cursor.execute(f"DROP DATABASE IF EXISTS {target_db_name};")
    print(f"Database '{target_db_name}' deleted.")

    # 5. Create the new database
    print(f"Creating fresh database '{target_db_name}'...")
    cursor.execute(f"CREATE DATABASE {target_db_name} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    print("✅ SUCCESS: Database reset successfully!")
    
except MySQLdb.OperationalError as e:
    if e.args[0] == 1045:
        print("\n❌ ERROR: Access Denied. Please check your DB_USER and DB_PASSWORD in the .env file.")
    elif e.args[0] == 2003:
        print("\n❌ ERROR: Could not connect to MySQL server. Is MySQL running?")
    else:
        print(f"\n❌ ERROR: {e}")

finally:
    if 'db' in locals():
        db.close()