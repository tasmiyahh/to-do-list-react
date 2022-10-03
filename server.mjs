import express from "express"
import cors from "cors"
import mongoose from "mongoose";
const port = process.env.PORT || 5000

const app = express();

app.use(express.json())
app.use(cors())

const userSchema = new mongoose.Schema({
    text : {type : String , required :true}
})

const userModel = mongoose.model('todo' , userSchema)



app.post('/', (req, res) => {
    userModel.create({
        text : req.body.text
    },
        (err, result) => {
            if (!err) {
                console.log("data saved: ", result);
                res.status(201).send(
                    { message: "todo is created" ,
                      todo : req.body

            });
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "internal server error" });
            }
        });
})


    app.get("/users", async (req, res) => {

        try {
            let allUser = await userModel.find({}).exec();
            res.send(allUser);
    
        } catch (error) {
            res.status(500).send({ message: "error getting users" });
        }
    })


  

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })








  let dbURI = 'mongodb+srv://tasmiyah:web@cluster0.cj82tmo.mongodb.net/todolist?retryWrites=true&w=majority'
  mongoose.connect(dbURI);
  
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////


