const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=de5667c5&app_key=8cef77a5982edfe07967b4ef3e7c1bed&results_per_page=50&sort_by=salary`);
        res.render('index', { jobs: response.data.results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/home', async (req, res) => {
    try {
        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=de5667c5&app_key=8cef77a5982edfe07967b4ef3e7c1bed&results_per_page=50&sort_by=salary`);
        res.render('index', { jobs: response.data.results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/search', async (req, res) => {
    try {
        const { jobTitle, location } = req.query;

        if (!jobTitle || !location) {
            return res.render('search', { error: 'Please enter both job title and location.' });
        }

        const response = await axios.get(`https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=de5667c5&app_key=8cef77a5982edfe07967b4ef3e7c1bed&results_per_page=100&sort_by=salary&what=${jobTitle}&where=${location}`);
        const jobs = response.data.results;

        res.render('search', { 
            jobs: jobs,
            data2: {jobTitle, location}
         });
    } catch (error) {
        console.error(error);

        // Check if headers have already been sent before sending an error response
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
        }
    }
});
app.listen(3000, () => {
    console.log("Server is ON: http://localhost:3000");
});
