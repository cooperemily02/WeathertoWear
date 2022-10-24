cd my-app
npm install --force
npm run build
mv ./build ../backend
cd ..
cd  backend
python -m venv venv
. venv/Scripts/activate || . venv/bin/activate
pip install -r requirements.txt
cd ..
