const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


mongoose.connect('mongodb+srv://dawid:123@cluster0.azzlocs.mongodb.net/?retryWrites=true&w=majority', {
dbName: 'restProducts',  
useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() =>{
    console.log("Mongodb connected...")
  });

app.all('/test', (req, res) => {
    console.log(req.query);
})

const Route = require('./Routes/Route')
app.use('/products', Route);

app.use((req, res, next) => {1

  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})



app.listen(3000, () => {
    console.log("3000");
})



