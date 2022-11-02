cd backend
if [ -f "./venv/Scripts/activate" ]
then
    . venv/Scripts/activate
else
    . venv/bin/activate
fi
flask run api.py

