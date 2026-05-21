# FoodieExpress 🍔🍕🍰

FoodieExpress is a modern, high-performance, full-stack food delivery web application built using **React.js** for the frontend, **Python Flask** for the backend REST API, and **MongoDB Atlas / Local** for database storage. 

The website boasts a premium visual aesthetic similar to Swiggy and Zomato, featuring glassmorphism elements, animated cards, full responsiveness (mobile-first), dark mode support, and seamless interactive components.

---

## 🚀 Key Features

*   **User Authentication**: JWT token authentication, bcrypt password hashing, login/signup form validations, route guarding.
*   **Home Page**: Stunning hero header, dynamic food category selection, popular restaurants cards, signature food item grid.
*   **Food Menu Page**: Responsive food grid, keyword search matching, category chips filter, sorting by price and rating.
*   **Cart State Management**: Add, remove, and update quantities, tax and free-delivery calculators, persisted cart data.
*   **Order System**: Instant checkouts, delivery address inputs, order history listing, live status progress bar tracker.
*   **Admin Control Panel**: Add new dishes (modal form), delete foods, list all client orders, update live order status (Pending, Preparing, Out for Delivery, Delivered).
*   **DevOps Pipelines**: Multi-stage Docker files, docker-compose orchestrations, Kubernetes manifests, and a declarative Jenkinsfile.

---

## 🛠️ Technology Stack

*   **Frontend**: React.js, React Router DOM, Tailwind CSS (v4), Axios, React Icons, React Hot Toast.
*   **Backend**: Python Flask, Flask-CORS, PyMongo, Flask-JWT-Extended, bcrypt, python-dotenv.
*   **Database**: MongoDB Atlas / Local MongoDB.
*   **DevOps**: Docker, Docker Compose, Kubernetes, Jenkins CI/CD.

---

## 📂 Project Structure

```text
FoodieExpress/
├── backend/
│   ├── config/
│   │   ├── __init__.py
│   │   └── db.py              # MongoDB Connection
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User helper and hashing
│   │   ├── food.py            # Food formatter
│   │   └── order.py           # Order formatter
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py            # Auth routes Blueprints
│   │   ├── food.py            # Food items Blueprints
│   │   └── order.py           # Orders placing & management
│   ├── .env.example
│   ├── .env                   # Local configuration
│   ├── app.py                 # Flask server main
│   ├── requirements.txt       # Python libraries
│   ├── seed.py                # Database seeding script
│   └── Dockerfile             # Backend docker image
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, FoodCard, etc.
│   │   ├── context/           # Auth, Cart, Theme Context API
│   │   ├── pages/             # Home, Menu, Cart, Orders, Admin, etc.
│   │   ├── utils/             # api.js (Axios instance)
│   │   ├── App.jsx            # Routing and Providers wrapper
│   │   ├── main.jsx           # React app renderer
│   │   └── index.css          # Tailwind imports & custom animations
│   ├── nginx.conf             # Nginx reverse proxy
│   ├── vite.config.js         # Vite configuration
│   ├── .env
│   ├── .env.example
│   └── Dockerfile             # Multi-stage frontend docker image
│
├── kubernetes/                # Kubernetes manifests
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── mongodb.yaml           # Database deployment & service
│   ├── backend.yaml           # Flask deployment & service
│   └── frontend.yaml          # Nginx deployment & LoadBalancer service
│
├── docker-compose.yml         # Full local Docker stack
├── Jenkinsfile                # Declarative CI/CD pipeline
├── .gitignore
└── README.md
```

---

## 💻 Local Development Setup

### Prerequisites

*   Node.js (v18+)
*   Python (3.8+)
*   MongoDB running locally on `mongodb://localhost:27017` (or MongoDB Atlas connection string)

### 1. Backend Server Setup

Navigate into the backend folder, configure virtual environment, install dependencies, and seed data:

```bash
# Navigate to backend
cd backend

# Create & activate virtual environment
python -m venv venv
# On Windows command prompt:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install required libraries
pip install -r requirements.txt

# Run the database seeder (Seeds users and 15+ dishes)
python seed.py

# Start the Flask development server (runs on http://localhost:5000)
python app.py
```

*Note: Demo Accounts inserted by `seed.py`:*
*   **Customer User**: `user@foodieexpress.com` / Password: `user123`
*   **Admin User**: `admin@foodieexpress.com` / Password: `admin123`

### 2. Frontend React Setup

Open a new terminal window:

```bash
# Navigate to frontend
cd frontend

# Install Node modules
npm install

# Start Vite server (runs on http://localhost:3000)
npm run dev
```

---

## 🐳 Docker Deployment

To launch the entire application stack (MongoDB, Python Backend API, React Frontend) in containers:

```bash
# At the root directory (where docker-compose.yml is located)
docker-compose up --build
```

Access the frontend app at `http://localhost:3000` and the API backend at `http://localhost:5000`.

---

## ☸️ Kubernetes Manifests

Apply the resources to your Kubernetes cluster (e.g. Minikube):

```bash
# Apply Configs and Secrets first
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secret.yaml

# Apply Services & Deployments
kubectl apply -f kubernetes/mongodb.yaml
kubectl apply -f kubernetes/backend.yaml
kubectl apply -f kubernetes/frontend.yaml

# Monitor rollout status
kubectl rollout status deployment/foodieexpress-backend
kubectl rollout status deployment/foodieexpress-frontend
```

---

## 📋 API Route Reference

| Method | Endpoint | Description | Auth Required | Admin Only |
| :--- | :--- | :--- | :---: | :---: |
| `POST` | `/api/auth/signup` | Create user profile and generate token | No | No |
| `POST` | `/api/auth/login` | Validate user credentials and generate token | No | No |
| `GET` | `/api/auth/profile` | Retrieve profile of authenticated user | Yes | No |
| `GET` | `/api/foods` | Fetch list of dishes (Search/Category query support)| No | No |
| `GET` | `/api/foods/<id>` | Fetch specific dish details | No | No |
| `POST` | `/api/foods` | Add new food dish | Yes | Yes |
| `DELETE`| `/api/foods/<id>` | Delete dish from menu | Yes | Yes |
| `POST` | `/api/orders` | Place new checkout order | Yes | No |
| `GET` | `/api/orders` | Retrieve order history for current customer | Yes | No |
| `GET` | `/api/orders/all` | Fetch all orders in system | Yes | Yes |
| `PUT` | `/api/orders/<id>/status`| Update status of order | Yes | Yes |

---

## 📜 License

This project is licensed under the MIT License. Feel free to use and modify it!
