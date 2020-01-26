import express from 'express';
// Express related imports
// other node package imports

import models, { sequelize } from './models';
const app = express();

// additional Express stuff: middleware, routes, ...
console.log("HERE")
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log(`Example app listening on port 3000!`)
    });
}).catch(e => console.log(e));