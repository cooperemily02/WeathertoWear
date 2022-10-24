cd backend
if [ -f "./venv/Scripts/activate" ]
then
    . venv/Scripts/activate
else
    . venv/bin/activate
fi
python api.py

