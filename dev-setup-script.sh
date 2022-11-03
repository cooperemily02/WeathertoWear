cd backend
# Create the venv
if [ -x "$(command -v python3)" ]
then
  python3 -m venv venv
else
  python -m venv venv
fi

# Activate the venv:
if [ -f "./venv/Scripts/activate" ]
then
  . venv/Scripts/activate
else
  . venv/bin/activate
fi

# Install reqs
pip install -r requirements.txt

# Creates database tables
python init_db.py

cd ..
cd my-app/
npm install --force
cd ..
