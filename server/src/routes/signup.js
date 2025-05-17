import express from 'express';
import { registerCustomer } from '../utils/espocrm.js';
import logger from '../utils/logger.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !emailAddress) {
      logger.warn(`Invalid signup attempt - Missing fields: ${JSON.stringify(req.body)}`);
      return res.status(400).send({
        error: 'Missing required fields',
      });
    }

    // Register customer in EspoCRM
    const result = await registerCustomer({
      firstName,
      lastName,
      emailAddress,
    });

    // Return appropriate response based on whether customer was new or existing
    res.status(result.isExisting ? 200 : 201).send({
      success: true,
      message: result.message,
      customer: result.customer,
    });
  } catch (error) {
    logger.error(`Signup failed for ${req.body.emailAddress}: ${error.message}`);
    res.status(500).send({
      error: 'Failed to register customer',
      message: error.message,
    });
  }
});

export default router;
