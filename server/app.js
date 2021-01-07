//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
/* const bodyParser = require('body-parser');*/
const app = express();
const Student = require('./models/students');

//DB connections
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log("Database Is Connected");
});
mongoose.connection.on('error', () => {
    console.log('Error Occured');
});

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    Student.find()
        .exec()
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.post('/students', (req, res) => {
    console.log("hi i am post request");

    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place,
    })
    student.save()
        .then((data) => {
            return res.json({
                msg: "Succesfully Submited",
                status: 200
            })
        })
        .catch((err) => {
            console.log("error", err);
            res.json({
                msg: "Error occures",

            })
        })
});

app.delete('/student/:id', (req, res) => {
    const id = req.params.id;
    Student.remove({ _id: id }, (err, done) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error occured');
        }
        else {
            res.status(200).json({ msg: "Successfully Deleted" })
        }
    })
});

app.put('/student/:id', (req, res) => {
    const id = req.params.id
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const place = req.body.place;
    Student.update({ _id: id }, { $set: { firstname: firstname, lastname: lastname, place: place } })
    .then(data=>{
        console.log(data);
        res.status(200).json({msg:'Successfully Updated'})
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:'Error occured'});
    })

});


//Server
app.listen(5000, () => {
    console.log('Server was connected on port 5000');
});