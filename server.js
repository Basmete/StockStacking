const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');


// Импорт модели
const Employee = require("./models/employee");

const app = express();

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(cors())

// Получить всех работников
app.get("/employees", (req, res) => {
  console.log(req.url)
  Employee.find({}).then((employees) => {
    res.json(employees);
  });
});

// Удалить работника
app.delete("/employees", async(req, res) => {
  console.log(req.body)
  await Employee.findByIdAndDelete(req.body.id).exec(async (err, data) => {
    res.status(200).send(data)
    console.log(data)
  })
  
})

app.post("/employees/edit", async (req, res) => {
  console.log(req.body.data)

  const kek = await Employee.findOneAndUpdate({_id: req.body.data.id}, {$set: req.body.data}, {new: true}).exec()
  res.status(200).send(kek)
  console.log(kek)
})

// Создать нового работягу
app.post("/employees", async (req, res) => {
  console.log('Тело запроса', req.body)
  const employee = new Employee({
    firstName: req.body.data.firstName,  
    lastName: req.body.data.lastName, 
    birth: req.body.data.birth, 
    age: req.body.data.age, 
    vacancy: req.body.data.vacancy,  
    remote:req.body.data.remote, 
    url: req.body.data.url, 
    city: req.body.data.city, 
    street: req.body.data.street, 
    home: req.body.data.home, 
    room: req.body.data.room, 
    address: req.body.data.address, 
  });

  await employee
    .save()
    .then(() => {
      res.status(200).send(employee)
    })
    .catch(e => console.log(e))

});

// Подключение к базе данных и запуск сервера
async function start() {
  try {
    const url =
      "mongodb+srv://basmete:9GK30lu6HzvnA2aL@cluster0-vdhct.mongodb.net/Employees";
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(3333, () => {
      console.log("Server is running on port 3333");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
