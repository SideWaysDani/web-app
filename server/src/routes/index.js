const express = require('express');
const router = express.Router();

router.get('/app-name', (req, res) => {
    res.send('QuietAlpha');
});

module.exports = router;