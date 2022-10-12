# WeathertoWear
CS320 Project

# Windows Setup (Mac mostly overlaps, skip git bash)

<details>
<summary>Essentials</summary>

- Install VSCode https://code.visualstudio.com/
- Install Git & Git Bash https://git-scm.com/downloads
- Clone Project:
  - Open VSCode
  - Clone Git Repository...
  - Paste ```https://github.com/cooperemily02/WeathertoWear.git```
- (*Recommended but can be done whenever*, skip zsh part): [starship prompt for git bash](https://github.com/Kyza/linux-like-windows-terminal)
</details>

<details>
<summary>Setup Backend</summary>

- In VSCode (*Inside the project* now), open terminal (`CTRL+SHIFT+P`, search for "toggle terminal") (or just ``` CTRL+` ```)
- Change the terminal to `Git Bash` (or `Windows Terminal` if you set that up above) 
- Select `git bash`, *see [picture](vscode-list-terminals-place.png)*
- At the time of writing, backend code is not in main, so do this:
```
git branch -f backend-starter origin/backend-starter # bring a remote branch to your machine.
git checkout backend-starter # Now you have the starter backend code
```
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

- Done! if you want, make VSCode use `Git Bash` by default so you don't have to repeat that step (See [picture](vscode-list-terminals-place.png).
- (Note: There are obviously many ways to set it up, but this is a recommended & simple way)
</details>
<details>

<summary>Important Git stuff To start working</summary>

- To get a remote branch ```git branch -f SOME-BRANCH  origin/SOME-BRANCH```
- To create a new branch: (**Consider what to branch off of, i.e if you need the latest backend code you may first checkout something other than main, then make your own**)
```git checkout -b GOOD-BRANCH-NAME```
- The first time you try to ```git push``` a new branch, it will output something you need to copy/paste first. Then ```git push``` again 

</details>
