import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import 'dotenv/config'

import routerProducts from './routes/productsRoutes.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev')); 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routerProducts);
    
app.get('/', (req, res) => { 
    res.send('Hello, Wo,,,,,,,,,,,,rld!')
}) 

app.post('/', (req, res)=>{
    const data = req.body;
    res.send(`products are recieved`)
});
 

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
  })    