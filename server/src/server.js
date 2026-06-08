import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

dotenv.config();
const port = process.env.PORT || 3000;
connectDB();

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookMyVenue backend is running"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});