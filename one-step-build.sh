cd my-app
npm install --force
npm run build
rm -rf ../backend/build
mv ./build ../backend
cd ..
cd  backend

if [ -x "$(command -v python3)" ]
then
  python3 -m venv venv
else
  python -m venv venv
fi

if [ -f "./venv/Scripts/activate" ]
then
  . venv/Scripts/activate
else
  . venv/bin/activate
fi

pip install -r requirements.txt
python init_db.py
cd ..
