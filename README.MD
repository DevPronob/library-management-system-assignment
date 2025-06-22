# Library Management System

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB + Mongoose**

---


## 🚀 Features

-  Add, update, retrieve, and delete books  
-  Borrow books with availability checks  
-  Schema validation using Mongoose  
-  Aggregation pipeline for borrowing book  
-  Filtering, sorting, and limit  on book queries  
-  Use Mongoose instancestatic methods 


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


