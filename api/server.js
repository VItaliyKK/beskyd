require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.PORT || 3500


app.use(bodyParser.urlencoded({
	extended:true
}))
app.use(bodyParser.json())

const routes = require('./routes/routes')
routes(app)

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
})