import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import Comment from './models/comment'

const app = express();
const router = express.Router();

const API_PORT= process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
    res.json({ message: 'Hello world!'});
});

router.get('/comments', (req, res) => {
    Comment.find((err, comments)=>{
        if (err){
            return res.json({
                success: true,
                error: err
            });
        }
        return res.json({
            success: true,
            data: comments
        });
    });
})

router.post('/comments', (req,res)=>{
    const comment = new Comment();
    const {author,text}=req.body;
    if(!author || !text){
        return res.json({
            sucess:false,
            error: 'Author and comment required'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err =>{
        if (err) {
            return res.json({
                success:false,
                error:err
            });
        }
        return res.json({
            success: true
        });
    });
});

const dbConfig = require('./dbconfig');

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then(()=>{
    console.log('connected to db');
}).catch(err => {
    console.log('could not connect to db, exiting');
    process.exit();
});

app.use('/api', router);

app.listen(API_PORT,()=>console.log('ears open on 3001'));