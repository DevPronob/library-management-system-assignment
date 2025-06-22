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

### Environment Variables
```bash
DB_URL=mongodb+srv://pnob9439:aIf1iURTDfSKbJxb@assignment-3.1zjuptl.mongodb.net/?retryWrites=true&w=majority&appName=assignment-3
PORT=5000
```

> then add this on package.json for start the application

```bash
 "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
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
