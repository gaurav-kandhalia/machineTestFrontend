# Machine Test Project

This is a **full-stack admin management application** that allows the admin to manage agents, upload files, and distribute items to agents.  

The frontend is built with **React.js**, and the backend uses **Node.js**, **Express**, and **MongoDB**.

---

## 🔗 Live Links

- **Frontend:** [https://machine-test-frontend-two.vercel.app/](https://machine-test-frontend-two.vercel.app/)  
- **Backend:** [https://machinetest-hsbk.onrender.com](https://machinetest-hsbk.onrender.com)

## 🔗 GitHub Repositories

- **Frontend:** [https://github.com/gaurav-kandhalia/machineTestFrontend](https://github.com/gaurav-kandhalia/machineTestFrontend)  
- **Backend:** [https://github.com/gaurav-kandhalia/MachineTest](https://github.com/gaurav-kandhalia/MachineTest)  
- **Profile:** [https://github.com/gaurav-kandhalia](https://github.com/gaurav-kandhalia)

---

## 📦 Features

### Admin Panel
- Login with email and password
- Add and manage agents
- Upload files (CSV, XLSX, XLS)
- Distribute items to agents
- View distributed items with pagination
- Responsive UI for desktop and mobile

### File Upload
- Drag and drop or browse files
- File size limit: 5 MB
- Allowed formats: `.csv`, `.xlsx`, `.xls`
- Backend validates uploaded files

### Agent Management
- Add new agents with name, phone number (with country code), and notes
- Password hashing using bcrypt

### Distributed Items
- Fetch list of items assigned to agents
- Pagination support
- Displays agent details along with each item

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Zod (validation)
- **Authentication:** Cookie-based auth, JWT
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚡ Project Structure

frontend/
├── src/
│ ├── components/ # Reusable components (Login, Dashboard, Input, Button)
│ ├── pages/ # Pages (AddAgent, GetDistributedItems, UploadFile)
│ ├── services/ # Axios API calls (authApi.js, adminApi.js)
│ ├── contexts/ # React Context (Auth, FilePath)
│ └── App.jsx # Routes setup



---

## 🚀 How to Run Locally

### Frontend
```bash
cd frontend
cd machineTest
npm install
npm start

Backend

cd backend
npm install
npm run dev



Set environment variables in .env for backend:

PORT=5000
MONGO_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5911
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=Admin@123

📄 Notes

All API requests require authentication via cookies.

Validation is applied both on frontend and backend for fast feedback and secure data.

Pagination is supported for the distributed items list.

✨ Author

Gaurav Kandhalia
GitHub Profile


If you want, I can also create a **compact, professional GitHub README** version with badges, live demo buttons, and sections highlighted for better presentation.  

Do you want me to do that?

