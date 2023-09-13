const express=require("express");
const  mongoose = require("mongoose");
const ToDoModel=require('./models/todoModel');
const cors=require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('./models/User');

const salt=bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

const app=express();
app.use(cors());    
app.use(express.json());

// app.use(cors({credentials:true,origin:'http://127.0.0.1:5173'}));
// mongodb+srv://<username>:<password>@cluster0.zqgwnbu.mongodb.net/
mongoose.connect('mongodb+srv://geoff234:q0ar5cpfIgwaehIX@cluster0.zqgwnbu.mongodb.net/')

app.use((req, res, next) => {
    const corsWhitelist = [
        'https://task-app-hazel-pi.vercel.app/',
        'http://127.0.0.1:5173',
        
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
});

app.get('/', (req, res)=>{

    res.json('success')
})

app.get('/get', (req, res)=>{

    ToDoModel.find()
    .then(result=>res.json(result))
})

app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    
    const UserDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.json(UserDoc);
})

app.post('/login',async(req, res)=>{
    
    const {username,password} = req.body;
    const userDoc=await User.findOne({username});

    const passOK=bcrypt.compareSync(password,userDoc.password);
    // res.json(passOK);

    if(passOK){
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
            if (err) throw err;
            res.cookie('token', token).json({
              id:userDoc._id,
              username,
            });
          });
    }
    else {
        res.status(400).json("wrong credentials");
      }

}
);

app.post('/add',(req, res)=>{
    const task=req.body.task;
    console.log("task",task);
    ToDoModel.create({
        name:task
    }).then(result=>res.json(result))
})

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);

    ToDoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch();
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    console.log(id);

    ToDoModel.deleteOne({ _id: id })
    .then(result=>res.json(result));
    
    
    
})

app.listen(4000,()=>{
    console.log('listening on port 4000');
});