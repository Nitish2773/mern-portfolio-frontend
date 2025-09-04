npm uninstall tailwindcss
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p


npx create react-app client 
npm i react-router-dom

index.css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

npm init 
npm i express mongoose dotenv 
npm i nodemon 

npm i axios redux react-redux
npm i @reduxjs/toolkit
npm i antd 
- antd (Ant Design) for tabs and notifications for admin role

Tools:
Google Fonts 
Lottie Files 
taiwind css
Remix Icons
Json Formatter


⚡ Extra Installations Needed for Your Features

Since you want:

Admin login/dashboard → JWT + bcrypt for auth.

Loader animation → framer-motion or lottie-react.

Scroll-to-top button → Pure React, no lib needed.

Here’s the updated install list:

🔹 Backend
npm i express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer
npm i helmet morgan           # optional security/logging

🔹 Frontend
npm i react-router-dom axios framer-motion lottie-react react-icons

🔹 Dev Tools
npm install -D tailwindcss@3 postcss autoprefixer

npm i framer-motion react-icons classnames
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

npm install @headlessui/react react-type-animation
