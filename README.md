# Quick Start
- Clone & cd

```
git clone https://github.com/cooperemily02/WeathertoWear.git
cd WeathertoWear
```

- To build:

```
./one-step-build.sh
```

- To run (*after building*):

```
./one-step-run.sh
```

- Access the site at http://127.0.0.1:5000/

# Setup

<details>
<summary>Recommended basics (IDE + Terminal)</summary>

- Install VSCode https://code.visualstudio.com/
- (Windows) Install Git & Git Bash https://git-scm.com/downloads
- Clone Project:
  - Open VSCode
  - Clone Git Repository...
  - Paste ```https://github.com/cooperemily02/WeathertoWear.git```
</details>

<details>
<summary>(Optional) Prettier & useful Prompts:</summary>

- Windows: Starship for git bash (run in `Git Bash`)
  ```
    mkdir -p "$HOME/.local/bin"
    curl -sS https://starship.rs/install.sh | sh -s -- --bin-dir "$HOME/.local/bin"
    nano ~/.bashrc
    ```
    This will open a little editor, paste the following:
    ```
    PATH=$PATH:~/.local/bin
    eval "$(starship init bash)"
    ```
    To save this, press `CTRL+X`, `Y`, `ENTER` 
- Mac: Spaceship prompt (Note, to bring back the normal prompt later, delete the new line added in your ~/.zshrc)
```
brew install spaceship
echo "source $(brew --prefix)/opt/spaceship/spaceship.zsh" >>! ~/.zshrc
```
</details>
<details>
<summary>Setup Backend</summary>

- In VSCode (*Inside the project* now), open terminal (`CTRL+SHIFT+P`, search for "toggle terminal") (or just ``` CTRL+` ```)
- (Windows) Select `git bash`, *see [picture](vscode-list-terminals-place.png)*
- **important** Virtual Environment Setup:
- Windows:
```
cd backend
python -m venv venv
# (Windows) Activate the venv:
. venv/Scripts/activate
# (Both) Install reqs
pip install -r requirements.txt
```
- Mac:
```
cd backend
python -m venv venv
# (Mac/Linux) Activate the venv:
. venv/bin/activate
# (Both) Install reqs
pip install -r requirements.txt
```
- Now we have a virtual environment inside `backend/venv`, make sure your IDE uses it
- To make VSCode use it:
  - On the left side-bar, click Extensions, search &  install `Python`
  - Command Palette `CTRL+SHIFT+P`
  - Type `Python: Select Interpreter`
  - Put `.\backend\venv\Scripts\python.exe` (Windows) or `./backend/venv/bin/python` (Mac/Linux) *It should auto-complete, otherwise `Enter path...` Then `Find` and pick the right one with your mouse*
- **To start the backend server, run `api.py`**
  - (Make sure the IDE is setup to use the correct python, or that you activate the virtual env before typing `python api.py`)
- Done! if you want, make VSCode use `Git Bash` by default so you don't have to repeat that step (See [picture](vscode-list-terminals-place.png).
- (Note: There are obviously many ways to set it up, but this is a recommended & simple way)
</details>

<details>
<summary>Setup Frontend</summary>

- Make sure `node` is installed. ([windows](https://nodejs.org/en/download/), [Mac](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x))

```
cd my-app
npm install --force
npm start
```
</details>

<details>
<summary>Important Git stuff To start working</summary>
- Create a branch & associated pull request, so others can give feedback on your work.
- To collaborate on new branches others made: 

```
git fetch
git checkout THE-NEW-BRANCH
```

- To create a new branch: (**Consider what to branch off of, i.e if you need the latest backend code you may first checkout something other than main, then make your own**)
```git checkout -b GOOD-BRANCH-NAME```
- The first time you try to ```git push``` a new branch, it will output something you need to copy/paste first. Then ```git push``` again
- Avoid pushing directly to branches others work on, instead push to yours and create a pull request when you want others to review.

</details>
