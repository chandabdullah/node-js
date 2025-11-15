# NextLevel Boilerplate Setup

This guide walks you through setting up a robust, production-ready Node.js backend using Express, MongoDB, and best practices for security, logging, validation, and development.

## 1. Create Project Directory

```bash
mkdir new-project && cd new-project
```

## 2. Initialize npm Project

```bash
npm init -y
```

## 3. Enable ES Modules

Edit `package.json` and add:

```json
"type": "module"
```

Or use `jq` (if installed):

```bash
jq '. + {type:"module"}' package.json > tmp && mv tmp package.json
```

> This enables native ES6 import/export syntax.

---

## 4. Install Core Dependencies

### Runtime & Database
```bash
npm install express mongoose dotenv
```

### Security & Middleware
```bash
npm install helmet cors express-rate-limit compression cookie-parser
```

### Authentication & Security Helpers
```bash
npm install bcryptjs jsonwebtoken
```

### Validation & Utilities
```bash
npm install joi
```

### Logging
```bash
npm install pino pino-pretty
```

---

## 5. Install Development Tools

```bash
npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier nodemon jest supertest
```

---

## 6. Optional (Recommended for Scalability)

### Caching & Background Jobs
```bash
npm install ioredis bullmq
```

> Use Redis for caching (via `ioredis`) and job queues (via `bullmq`).


---
# Project Structure

```
nextlevel-boilerplate/
├── src/
│   ├── config/
│   │   ├── database.js 
│   │   └── index.js    
│   ├── startup/
│   │   └── init.js     
│   ├── app.js          
│   ├── index.js        
│   ├── routes/
│   │   └── index.js    
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── models/
│   │   └── user.model.js
│   ├── services/
│   │   └── auth.service.js
│   │   └── user.service.js
│   │   └── email.service.js
│   │   └── otp.service.js
│   │   └── upload.service.js
│   │   └── cache.service.js
│   │   └── pagination.service.js
│   │   └── notification.service.js
│   │   └── search.service.js
│   │   └── webhook.service.js
│   ├── middleware/
│   │   ├── validate.middleware.js
│   │   └── auth.middleware.js
│   ├── utils/
│   │   └── asyncHandler.util.js
│   │   └── date.util.js
│   │   └── file.util.js
│   │   └── jwt.util.js
│   │   └── password.util.js
│   │   └── random.util.js
│   │   └── response.util.js
│   │   └── string.util.js
│   └── docs/           
│
├── tests/
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

