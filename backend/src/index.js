import connectDatabase from "../db/index.js";
import dontenv  from 'dotenv'
import { app } from '../src/app.js';

// Load environment variables
dontenv.config({ path: './environment/.env' });

connectDatabase()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch(error => {
    console.log("Mongo DB connection failed: ", error);
})