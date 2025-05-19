const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// USSD endpoint
app.post('/ussd', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';
    const userResponse = text.split('*');

    if (text === '') {
        response = `CON Welcome to Innocent Services
1. Check Balance
2. Buy Airtime`;
    } else if (text === '1') {
        response = `END Your balance is KES 1200`;
    } else if (text === '2') {
        response = `CON Enter amount to buy airtime`;
    } else if (userResponse[0] === '2' && userResponse[1]) {
        const amount = userResponse[1];
        response = `END You have successfully bought KES ${amount} airtime`;
    } else {
        response = `END Invalid option`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`USSD app running on port ${PORT}`);
});
