# Web Servers & Services (231370-21s1)

Welcome to the best Web Development course at BEC :D  
Please follow the instructions below to setup your PC.

# 🚨 Warning

**If you see red error text, stop!** You must read error messages & solve any problems before continuing. The following steps **will not work** if previous commands failed.

# 💻 Install Apps

Please download & install:

- [NodeJS](https://nodejs.org/en/download/current/) - "Current" version
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [GitHub Desktop](https://desktop.github.com/)
- [VueJS Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) - for Chrome/Edge

# 🧘 Install CLI Tools

## 1. Enable Scripts (Windows only)

- Open `PowerShell` as an administrator
- Type the following command:
  ```sh
  Set-ExecutionPolicy RemoteSigned
  ```
- Type "y" to approve
- Close PowerShell

## 2. Enable VSCode CLI (MacOS only)

- Open VSCode.
- Press `Cmd+Shift+P`
- Type "PATH"
- Select: `Shell command: Install 'code' command in PATH`
- Close VSCode

## 3. Install VSCode Extensions

- Re-open VSCode (you really must close it!)
- Press `Ctrl+J` to show the terminal
- Make sure that you are using `cmd`, not `powershell`
- Execute this command  
  ...this is all one-line! (please copy/paste; don't type it)
  ```sh
  code --force --install-extension rohit-gohri.format-code-action && code --force --install-extension dbaeumer.vscode-eslint && code --force --install-extension esbenp.prettier-vscode && code --force --install-extension stylelint.vscode-stylelint && code --force --install-extension octref.vetur && code --force --install-extension TabNine.tabnine-vscode && code --force --install-extension MS-vsliveshare.vsliveshare && code --force --install-extension humao.rest-client && code --force --install-extension yzhang.markdown-all-in-one
  ```

## 4. Install Web Developer CLI Tools

- Still in VSCode terminal... execute this command:
  ```sh
  npm i -g firebase-tools typescript yarn
  ```
- And...
  ```sh
  yarn config set ignore-engines true
  ```

# ✅ Check everything is working

- Run the following command & watch out for errors
  ```sh
  node -v && npm -v && yarn -v && tsc -v && firebase -V && code -v
  ```
