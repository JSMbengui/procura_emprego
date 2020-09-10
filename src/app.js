const express = require('express');
const origen = require('./app/middlewares/origen');
const cors = require('cors');

require('dotenv').config({
    path: process.env.NODEENV === 'test' ? '.env.test' : '.env'
})

class App {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.use(cors());
        this.express.use(express.static('./src/public'));
        this.express.use(express.json());
        this.express.use(origen.acceptedOrgin);
    }
    routes() {
        this.express.use(require('./routes'));
    }
}

module.exports = new App().express;