# Quick Start (*For testing only*. If you are developing, use the [dev setup](#development-setup))
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

# Development Setup 

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
<summary>Initial Setup (first-time and when new packages are added)</summary>

- **Windows: Use Git Bash** 
  - Either open the `Git Bash` program, or follow below in VSCode
  - In VSCode (*Inside the project* now), open terminal (`CTRL+SHIFT+P`, search for "toggle terminal") (or just ``` CTRL+` ```)
  - Select `git bash`, *see [picture](vscode-list-terminals-place.png)*
  - 
# Windows & Mac backend setup:
```
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
```
# Windows & Mac frontend setup:
- Make sure `node` is installed. ([windows](https://nodejs.org/en/download/), [Mac](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x))

```
cd my-app/
npm install --force
```
</details>

<details>
<summary>Running code</summary>

- You will want **multiple shells** to run both frontend/backend.
- Both will auto-reload whenever a change is saved
- Backend server:
```
./run-dev-backend.sh
```
- Frontend server:
```
./run-dev-frontend.sh
```
- Other python files
```
# activate the venv
if [ -f "./venv/Scripts/activate" ]
then
    . venv/Scripts/activate
else
    . venv/bin/activate
fi

#run
python OTHER-FILE
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
