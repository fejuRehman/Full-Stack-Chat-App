const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDb.js');
const router = require('./routes/index.js');
const cookiesParser = require('cookie-parser');
const {app,server} =require('./socket/index.js')

require('dotenv').config();

// const app = express();

// Middleware
app.use(cors({
    origin: "https://feju-chat-app.netlify.app",
   
    credentials: true
}));

app.use(express.json());
app.use(cookiesParser()); 

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.send("root route");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server connected at " + PORT);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
});
