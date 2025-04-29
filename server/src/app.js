const express = require('express');
const app = express();
const port = 3000;

app.get('/app-name', (req, res) => {
    res.send('QuietAlpha');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});