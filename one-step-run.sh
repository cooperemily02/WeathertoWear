cd backend
if [ -f "./venv/Scripts/activate" ]
then
    . venv/Scripts/activate
else
    . venv/bin/activate
fi
export FLASK_APP=api.py && flask run

