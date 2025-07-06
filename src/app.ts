import express, { Application, Request, Response } from 'express'
import { booksouter } from './app/controllers/book.controller'
import { BorrowBookRouter } from './app/controllers/borrow.controller'
import errorHandler from './middleware/errorHandler'
import cors from 'cors'
const app:Application = express()
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://library-frontend-devpronobs-projects.vercel.app',
    'https://library-frontend-black.vercel.app'
  ],
  credentials: true
}));

app.use(express.json())
app.use('/api/books',booksouter)
app.use('/api/borrow',BorrowBookRouter)  

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});




export default app;