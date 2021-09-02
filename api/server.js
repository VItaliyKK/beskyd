const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// ↓ implement custom environment variables
require('dotenv').config();

const port = process.env.PORT || 3500;

app.use(cors());

// ↓ implement 'bodyParser' for parsing body of request
app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

const routes = require('./routes/routes');
routes(app);

app.listen(port, () => console.log(`App listen on port ${port}`))