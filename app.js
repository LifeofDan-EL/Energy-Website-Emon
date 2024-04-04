require('dotenv').config();
const express = require('express');
const { fetchdata } = require("./public/api"); // Corrected import

const path = require('path');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
    try {
        const data = await fetchdata(); // Corrected function call
        console.log(data);

        res.render("index", { 
            ...data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
