# WeathertoWear
CS320 Project

# Windows Setup (Mostly Overlap with Mac, just skip git bash and use default terminal "zsh", and other stuff idk for now)

## Essentials
- Install VSCode https://code.visualstudio.com/
- Install Git & Git Bash https://git-scm.com/downloads
- Clone Project:
  - Open VSCode
  - Clone Git Repository...
  - Paste ```https://github.com/cooperemily02/WeathertoWear.git```
  
## Backend stuff
- In VSCode (*Inside the project* now), open terminal (`CTRL+SHIFT+P`, search for "toggle terminal") (or just ``` CTRL+` ```)
- Change the terminal to `Git Bash` 
- Select `git bash`, *see [picture](vscode-list-terminals-place.png)*
- To install the requirements:
```
cd backend
python -m venv venv # This installs a special python container, seperate from the one on the rest of your pc
python . venv/Scripts/activate # This uses the special python we just installed (For mac: `venv/bin/activate`)
pip install -r requirements.txt
```
- To make VSCode use the right python:
  - On the left side-bar, click Extensions, search &  install `Python`
  - Command Palette `CTRL+SHIFT+P`
  - Type `Python: Select Interpreter`
  - Put `.\backend\venv\Scripts\python.exe` *It should auto-complete, `Enter path...` Then `Find` and pick the right one with your mouse*

- Done! if you want 

- (Note: There are obviously many ways to set it up, but this is a recommended & simple way)
