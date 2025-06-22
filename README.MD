# Library Management System

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**

---

## 🛠️ Setup Instructions


```bash
git clone https://github.com/DevPronob/library-management-system-assignment
cd library-management-system-assignment
```

### 2. Install Dependencies

```bash
npm install
```


> then add this on package.json for start the application

```bash
 "dev": "ts-node-dev --respawn --transpile-only src/server.ts",v
```


## 🔗 API Endpoints

### Book Routes

| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| POST   | /api/books         | Create a new book           |
| GET    | /api/books         | Get all books (with filter) |
| GET    | /api/books/:id     | Get a book by ID            |
| PUT    | /api/books/:id     | Update a book               |
| DELETE | /api/books/:id     | Delete a book               |

### Borrow Routes

| Method | Endpoint      | Description                            |
|--------|---------------|----------------------------------------|
| POST   | /api/borrow   | Borrow a book                          |
| GET    | /api/borrow   | Get borrow summary (aggregation)       |
