import 'dotenv/config.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import corsConfig from './config/cors.js';
import database from './config/database.js';
import user from './routes/auth.js';

(() => {
    const PORT = process.env.APP_PORT;
    const app = express();

    database();

    app.use(cors(corsConfig()));
    app.use(cookieParser());
    app.use(express.json());
    app.use(user);

    app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`));
})();
