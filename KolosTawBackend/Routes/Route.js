const express = require('express');
const router = express.Router();

const Product = require('../Models/Product.model');

const User = require('../Models/User.model');

let loggedIn =false;

router.post('/register', async (req, res, next) =>{

    try{
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        let login = req.body.login;
        let password = req.body.password;
        
        if(login != null && login != "" && password != null && password != ""){
            const checkLogin =  await User.find({login: login}, {});

            if(checkLogin.length === 0){
                const user = new User(req.body);
                const result = await user.save();
                console.log(result);
            }else{
                console.log("login already exist");
            }
        }
        
        /*
        const user = new User(req.body);
        const result = await product.save();
        */

    }catch(error){
        console.log(error.message);
    }

});

router.post('/login', async (req, res, next) =>{

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(res);
    try{
        
        let login = req.body.login;
        let password = req.body.password;

        const checkLogin =  await User.find({login: login}, {});

        if (checkLogin[0].login === login && checkLogin[0].password === password){
            loggedIn = true;
            res.send("You are logged in");
        }

    }catch(error){
        console.log(error.message);
    }

});

router.get('/logout', async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    try{
            loggedIn = false;
            res.send("You are logged out");
    }catch(error){
        console.log(error.message);
    }

});


router.get('/', async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(res);
    try{
        if(loggedIn){
            const results = await Product.find({}, {__v: 0});
            //const results = await Product.find({}, {price: 1});
            //const results = await Product.find({}, {});
            //const results = await Product.find({}, {price: 1, name: 1, _id: 0});
            //const results = await Product.find({price: 333}, {});

            res.send(results);
        }
    }catch(error) {
        console.log(error.message);
    }

});

router.post('/', async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{

        const product = new Product(req.body);
        const result = await product.save();
        

    }catch(error){
        console.log(error.message);
    }

});

router.get('/:id', async (req, res, next) =>{
    const id = req.params.id;
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try{
        const result = await Product.findById(id);
        //const result = await Product.findOne({_id: id});
        //const result = await Product.find({_id: id}, {});
        
        res.send(result);
    }catch(error){
        console.log(error.message);
    }

});

router.patch('/:id', async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    try{
        const id = req.params.id;
        const updates = req.body;

        const options = {new: true};

        const result = await Product.findByIdAndUpdate(id,
            updates, options);
        //const result = await Product.findOne({_id: id});
        //const result = await Product.find({_id: id}, {});
        
        res.send(result);
    }catch(error){
        console.log(error.message);
    }

});

router.delete('/:id', async (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    const id = req.params.id;
    try{
        const result = await Product.findByIdAndDelete(id);
        res.send(result);
    }catch(error){
        console.log(error.message);
    }
});


module.exports = router;



