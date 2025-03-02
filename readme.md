# 🌟 **Hospital Management System** 🌟

Welcome to the **Hospital Management System** backend! This is a full-fledged system that lets admins manage hospitals, users, authentication, and more. It offers a RESTful API for handling different tasks in the hospital management domain.

## 📂 **Project Structure**

Here's the beautiful structure of your project! 🔥

```plaintext
.
├── 🗄️ db
│   └── connectDb.js
├── 📂 logs
│   ├── app.log
│   └── error.log
├── 📝 nodemon.json
├── 📦 package.json
├── 📄 pnpm-lock.yaml
├── 🚀 server.js
└── 📂 src
    ├── ⚙️ handlers
    │   ├── admin.handler.js
    │   └── hospital.handler.js
    ├── 🔧 helpers
    │   ├── appError.js
    │   ├── appLogger.js
    │   ├── appResponse.js
    │   ├── clodinary.js
    │   ├── errorLogger.js
    │   └── jwt.js
    ├── 🛠️ middlewares
    │   ├── auth.mid.js
    │   └── storage.mid.js
    ├── 📑 models
    │   ├── admin.model.js
    │   └── hospital.model.js
    ├── 🛤️ routes
    │   ├── admin.route.js
    │   ├── auth.route.js
    │   └── hospital.route.js
    └── 🧰 services
        └── admin.service.js
```

### 🗂️ **Explanation**:
- **🗄️ db**: This folder handles database connections.
- **📂 logs**: Stores logs such as `app.log` and `error.log` for debugging.
- **📝 nodemon.json**: Configuration for `nodemon` to restart the server on changes.
- **📦 package.json**: Contains dependencies and scripts for Node.js.
- **📄 pnpm-lock.yaml**: Lock file for managing dependencies with `pnpm`.
- **🚀 server.js**: Main entry point of the app.
- **📂 src**: Contains all core logic such as handlers, helpers, models, middlewares, routes, and services.

---

## 🌍 **API Documentation**

For a complete API reference, you can check out the **Postman Collection** 📚.

**Postman Collection Link**: [Hospital Management System Collection](https://github.com/Rishiyaduwanshi/hospitalHubBackend/collection/HospitalManagementSystem.postman_collection.json)

### 🏥 **Hospital Endpoints**

Here are the main API endpoints for interacting with the system:

#### 🧑‍💼 **Admin Endpoints**

1. **Signup Admin**
   - **Method**: POST
   - **URL**: `/admin/signup`
   - **Body** (JSON):
     ```json
     {
       "name": "Abhinav Prakash",
       "email": "abhinav@gmail.com",
       "username": "Abhinav",
       "password": "12345678"
     }
     ```

2. **Signin Admin**
   - **Method**: POST
   - **URL**: `/admin/signin`
   - **Body** (JSON):
     ```json
     {
       "usernameOrEmail": "Abhinav",
       "password": "12345678"
     }
     ```

3. **Signout Admin**
   - **Method**: POST
   - **URL**: `/admin/signout`

#### 🏨 **Hospital Endpoints**

1. **Fetch Hospitals by Filter**
   - **Method**: GET
   - **URL**: `/hospitals/filter?city=New Delhi&speciality=kidney`
   - **Query Parameters**:
     - `city`: New Delhi
     - `speciality`: kidney

2. **Get Hospital by ID**
   - **Method**: GET
   - **URL**: `/hospitals/{hospital_id}`

3. **Create Hospital**
   - **Method**: POST
   - **URL**: `/hospitals`
   - **Body** (Form-data):
     - `name`: AIIMS
     - `city`: New Delhi
     - `address`: Near Anand Bihar Terminal
     - `speciality`: Kidney, Brain
     - `images`: Upload hospital images

4. **Update Hospital**
   - **Method**: PATCH
   - **URL**: `/hospitals/{hospital_id}`
   - **Body** (JSON):
     ```json
     {
       "name": "Abra Ka Dabra Hospital"
     }
     ```

5. **Delete Hospital**
   - **Method**: DELETE
   - **URL**: `/hospitals/{hospital_id}`

#### 🔐 **Authentication Endpoints**

1. **Check Auth Status**
   - **Method**: GET
   - **URL**: `/auth/status`

---

## 🖥️ **Running the Application**

### 🔧 **Prerquisites**:
Make sure you have the following installed on your system:
- **Node.js** (v14 or above)
- **pnpm** (recommended package manager)

### 🚀 **Installation**

Clone the repository:

```bash
git clone https://github.com/your-repository-url
cd hospital-management-system
```

Install dependencies:

```bash
pnpm install
```

### 🏃‍♂️ **Running the Server**

To run the development server:

```bash
pnpm run dev
```

This will start the server at `http://localhost:2622`.

### 📜 **Logs**

Logs are available in the `logs` folder. These logs will help in debugging:
- **app.log**: Contains general application logs.
- **error.log**: Contains error-specific logs.

### 🔌 **Database Connection**

Database configuration can be found in `db/connectDb.js`. Ensure the database is correctly set up and running.

---

## 📦 **API Documentation**

   - [Hospital Management System Postman Documentation](https://documenter.getpostman.com/view/33766937/2sAYdimoaG)

---

### 💡 **Contributions** 

I welcome contributions! Feel free to fork the repo and make pull requests. Just make sure to follow the coding standards and write tests where applicable.
