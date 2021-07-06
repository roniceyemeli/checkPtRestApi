const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const User = require("./models/User");

const app = express();
app.use(express.json());
connectDB();


/// methode get - get all the users ///
app.get("/users/get", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  });

  /// methode post - we're ading new users to the database ///
app.post("/users/add", async (req, res) => {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });
    try {
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      res.send({ error: error.message });
    }
  });

  /// methode put - update an user by is id ///
  app.put("/users/update/:id", async (req, res) => {
    try {
      const editedUser = await User.findByIdAndUpdate(req.params.id, 
        {...req.body},
        {new:true}
      );
      res.send(editedUser);
    } catch (error) {
      res.send(error);
    }
  });

/// methode delete - remove an user by his id
app.delete("/users/delete/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.send({ msg: "user successfully deleted" });
    } catch (error) {
      res.send(error);
    }
  });




  const PORT = process.env.PORT || 5000;
  app.listen(PORT, (err) =>
    err ? console.error(err) : console.log(`server is running on port ${PORT}`)
  );
  