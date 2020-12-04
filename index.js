import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

dotenv.config();
const app = express();



app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended: true}));
app.use(cors());



const COLLECTION_URL=`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.hxlwa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

app.use('/posts', postRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(COLLECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})

.then(()=> app.listen(PORT, ()=> console.log(`The server run on port  :  ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);



