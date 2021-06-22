# Web Servers & Services (231370-21s1)

ยินดีต้อนรับสู่หลักสูตรการพัฒนาเว็บที่ดีที่สุดที่ BEC :D  
โปรดปฏิบัติตามคำแนะนำด้านล่างเพื่อตั้งค่าพีซีของคุณ

# 🚨 คำเตือน

**หากคุณเห็นข้อความแสดงข้อผิดพลาดสีแดง ให้หยุด!** คุณต้องอ่านข้อความแสดงข้อผิดพลาดและแก้ไขปัญหาก่อนดำเนินการต่อ ขั้นตอนต่อไปนี้**จะไม่ทำงาน**หากคำสั่งก่อนหน้านี้ล้มเหลว

# 💻 ติดตั้งแอพ

กรุณาดาวน์โหลดและติดตั้ง:

- [NodeJS](https://nodejs.org/en/download/current/) - "Current" version
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [GitHub Desktop](https://desktop.github.com/)
- [VueJS Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) - for Chrome/Edge

# 🧘 ติดตั้งเครื่องมือ CLI

## 1. เปิดใช้งานสคริปต์ (Windows เท่านั้น)

- เปิด `PowerShell` เป็น administrator
- พิมพ์คำสั่งต่อไปนี้:
  ```sh
  Set-ExecutionPolicy RemoteSigned
  ```
- พิมพ์ "y" เพื่ออนุมัติ
- ปิด PowerShell

## 2. เปิดใช้งาน VSCode CLI (MacOS เท่านั้น)

- เปิด VSCode
- กด `Cmd+Shift+P`
- พิมพ์ "PATH"
- เลือก: `Shell command: Install 'code' command in PATH`
- ปิด VSCode

## 3. ติดตั้งส่วนขยาย VSCode

- เปิด VSCode อีกครั้ง (คุณต้องปิดจริงๆ!)
- กด `Ctrl+J` เพื่อแสดง terminal
- ตรวจสอบให้แน่ใจว่าคุณใช้ `cmd` ไม่ใช่ `powershell`
- ดำเนินการคำสั่งนี้  
  ...นี่คือบรรทัดเดียวทั้งหมด! (กรุณาคัดลอก/วาง ห้ามพิมพ์)
  ```sh
  code --force --install-extension rohit-gohri.format-code-action && code --force --install-extension dbaeumer.vscode-eslint && code --force --install-extension esbenp.prettier-vscode && code --force --install-extension stylelint.vscode-stylelint && code --force --install-extension octref.vetur && code --force --install-extension TabNine.tabnine-vscode && code --force --install-extension MS-vsliveshare.vsliveshare && code --force --install-extension humao.rest-client && code --force --install-extension yzhang.markdown-all-in-one
  ```

## 4. ติดตั้งเครื่องมือ CLI สำหรับนักพัฒนาเว็บ

- ยังอยู่ใน VSCode terminal... รันคำสั่งนี้:
  ```sh
  npm i -g firebase-tools typescript yarn
  ```
- และ...
  ```sh
  yarn config set ignore-engines true
  ```

# ✅ ตรวจสอบว่าทุกอย่างใช้งานได้

- เรียกใช้คำสั่งต่อไปนี้และระวังข้อผิดพลาด
  ```sh
  node -v && npm -v && yarn -v && tsc -v && firebase -V && code -v
  ```
