const express = require('express');


const app = express();

app.get('/', (req, res) => res.send('API running...'));

//define port as env variable or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

