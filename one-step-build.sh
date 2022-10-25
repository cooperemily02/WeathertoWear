cd my-app
npm install --force
npm run build
rm -rf ../backend/build
mv ./build ../backend
cd ..
cd  backend
python -m venv venv || python3 -m venv venv
. venv/Scripts/activate || . venv/bin/activate
pip install -r requirements.txt
python init_db.py
cd ..
