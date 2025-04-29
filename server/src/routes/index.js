import express from 'express';
const router = express.Router();

router.get('/app-name', (req, res) => {
  res.send({ name: 'QuietAlpha' });
});

export default router;
