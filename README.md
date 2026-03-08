🌾 Farm Marketplace

A full-stack web application that connects farmers directly with buyers.
Farmers can list fresh products and buyers can browse, add to cart, and place orders.

This project demonstrates role-based authentication, modern UI, and secure backend APIs built using React, Node.js, and MySQL.

⸻

🚀 Features

🔐 Authentication
	•	JWT Authentication
	•	Google OAuth Login
	•	Role-Based Access Control (Buyer / Farmer)

👨‍🌾 Farmer Features
	•	Add new products
	•	Manage existing products
	•	View orders from buyers
	•	Farmer dashboard

🛒 Buyer Features
	•	Browse marketplace products
	•	Add products to cart
	•	Place orders
	•	View order history

📦 Other Features
	•	Image upload with Cloudinary
	•	Modern responsive UI using TailwindCSS
	•	Secure backend APIs with middleware protection

⸻

🧰 Tech Stack

Frontend
	•	React
	•	Tailwind CSS
	•	Axios
	•	React Router

Backend
	•	Node.js
	•	Express.js
	•	MySQL
	•	JWT Authentication
	•	Cloudinary (Image Hosting)

⸻

📂 Project Structure

farm-marketplace
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md

⸻

⚙️ Installation

1️⃣ Clone Repository

git clone https://github.com/USERNAME/farm-marketplace.git

cd farm-marketplace

⸻

2️⃣ Backend Setup

cd backend

npm install

npm run dev

Backend runs on:

http://localhost:8000

⸻

3️⃣ Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

⸻

🔑 Environment Variables

Create a .env file inside backend

JWT_SECRET=your_secret_key

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret

⸻

Create a .env file inside frontend

VITE_API_URL=http://localhost:8000

VITE_GOOGLE_CLIENT_ID=your_google_client_id

⸻

📸 Screenshots

<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 14 21 AM" src="https://github.com/user-attachments/assets/6a918278-2fbe-46e5-90e2-488fde226115" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 14 16 AM" src="https://github.com/user-attachments/assets/3851d93b-83c4-47df-8536-33edef387c52" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 14 06 AM" src="https://github.com/user-attachments/assets/248d293f-0fc7-4c1e-a8e0-6d8a0801f015" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 13 57 AM" src="https://github.com/user-attachments/assets/7ff61edf-f520-4e46-9685-e01046a78be6" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 13 21 AM" src="https://github.com/user-attachments/assets/b3ae1f5b-3897-4f61-b988-0c3575b98541" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 13 14 AM" src="https://github.com/user-attachments/assets/806b477b-769e-4e21-b920-581dc701426f" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 13 09 AM" src="https://github.com/user-attachments/assets/8112d90a-ccad-495f-9e20-bf90b825aecf" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 13 05 AM" src="https://github.com/user-attachments/assets/47bfced0-15cf-4f3a-a7f7-1478d766373b" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 12 59 AM" src="https://github.com/user-attachments/assets/ee67c3a6-7454-4c71-871d-0547ba25918c" />
<img width="1470" height="956" alt="Screenshot 2026-03-09 at 2 12 52 AM" src="https://github.com/user-attachments/assets/a95d179c-6023-48c7-923a-8b3831b4d0d0" />

👨‍💻 Author

Nilaksh

Engineering Student | Full Stack Developer
:::
