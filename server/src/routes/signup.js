import express from 'express';
import { registerCustomer } from '../utils/espocrm.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress) {
      return res.status(400).send({
        error: 'Missing required fields',
      });
    }

    // Register customer in EspoCRM
    const customer = await registerCustomer({
      firstName,
      lastName,
      emailAddress,
    });

    res.status(201).send({
      message: 'Customer registered successfully',
      customer,
    });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).send({
      error: 'Failed to register customer',
    });
  }
});

export default router;
