import { databaseModule } from "../database/index.js";

export default async (req, res) => {
  const database = databaseModule.getDatabase();
  //insert random user into the the users collection
  const { username, password } = req.body;
  const users = database.collection("users");

  // check if the username is in the database already
  const retrievedUsers = await users.find({ username: username }).toArray();

  if (retrievedUsers.length > 0) {
    res.status(400).send("Username already exists");
  } else {
    const result = await users.insertOne({
      username: username,
      password: password,
    });
    res.status(201).send(result);
  }
};
