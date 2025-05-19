const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse application/x-www-form-urlencoded and JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// USSD route
app.post('/ussd', (req, res) => {
    // Handle undefined body
    if (!req.body) {
        return res.status(400).send('Missing request body');
    }

    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    // USSD Menu logic
    if (text === '') {
        response = `CON What would you like to check?
1. My account
2. My phone number`;
    } else if (text === '1') {
        response = `CON Choose account information you want to view:
1. Account number`;
    } else if (text === '2') {
        response = `END Your phone number is ${phoneNumber}`;
    } else if (text === '1*1') {
        const accountNumber = 'ACC100101';
        response = `END Your account number is ${accountNumber}`;
    } else {
        response = `END Invalid input`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

// Optional: GET route to verify server is running
app.get('/', (req, res) => {
    res.send('USSD App is Running!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ USSD app is running on http://localhost:${PORT}`);
});
