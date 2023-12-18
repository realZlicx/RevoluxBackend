import { databaseModule } from "../database/index.js";

export default async (req, res) => {
  const database = databaseModule.getDatabase();
  //insert random user into the the users collection
  const users = database.collection("users");
  console.log(
    await users.insertOne({
      name: "John Doe",
      email: "test@test.co",
      password: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  );

  const retrievedUsers = await users.find({name:"Jane Doe"}).toArray();

  res.send(retrievedUsers);
};
