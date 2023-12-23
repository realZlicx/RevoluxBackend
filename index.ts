import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database';
import router from './router';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

// we need to start listening to the server after we connect to the database so we can make sure that the database is connected before we start listening to the server
const startListening = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    })
}

// we need to connect to the database before we start listening to the server
connectDatabase(startListening)


