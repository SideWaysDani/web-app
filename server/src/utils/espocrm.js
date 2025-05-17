import 'dotenv/config';
import fetch from 'node-fetch';
import logger from './logger.js';

const ESPO_CONFIG = {
  baseUrl: process.env.ESPO_BASE_URL,
  username: process.env.ESPO_USERNAME,
  password: process.env.ESPO_PASSWORD,
};

// Validate required environment variables
const validateConfig = () => {
  const required = ['ESPO_BASE_URL', 'ESPO_USERNAME', 'ESPO_PASSWORD'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

/**
 * Check if a contact with the given email already exists in EspoCRM
 * @param {string} email
 * @returns {Promise<Object|null>} - Existing contact or null
 */
const findCustomerByEmail = async (email) => {
  try {
    logger.debug(`Checking if customer exists with email: ${email}`);
    const credentials = Buffer.from(`${ESPO_CONFIG.username}:${ESPO_CONFIG.password}`).toString(
      'base64'
    );
    const url = `${ESPO_CONFIG.baseUrl}/api/v1/Contact?where[0][type]=equals&where[0][field]=emailAddress&where[0][value]=${encodeURIComponent(email)}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`EspoCRM API error while searching: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.total > 0 && result.list && result.list.length > 0) {
      logger.debug(`Customer found with email: ${email}`);
      return result.list[0];
    }
    logger.debug(`No existing customer found with email: ${email}`);
    return null;
  } catch (error) {
    logger.error(`Error searching for customer ${email}: ${error.message}`);
    throw error;
  }
};

/**
 * Register a new customer in EspoCRM
 * @param {Object} customer - Customer details
 * @param {string} customer.firstName - Customer's first name
 * @param {string} customer.lastName - Customer's last name
 * @param {string} customer.emailAddress - Customer's email address
 * @returns {Promise<Object>} - Created or existing customer record
 */
export const registerCustomer = async (customer) => {
  try {
    validateConfig();

    // First check if customer exists
    const existingCustomer = await findCustomerByEmail(customer.emailAddress);
    if (existingCustomer) {
      logger.info(`Customer already exists with email: ${customer.emailAddress}`);
      return {
        success: true,
        message: 'Customer already registered',
        customer: existingCustomer,
        isExisting: true,
      };
    }

    logger.info(`Attempting to register new customer: ${customer.emailAddress}`);
    const credentials = Buffer.from(`${ESPO_CONFIG.username}:${ESPO_CONFIG.password}`).toString(
      'base64'
    );

    const response = await fetch(`${ESPO_CONFIG.baseUrl}/api/v1/Contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(customer),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `EspoCRM API error: ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ''}`
      );
    }

    const result = await response.json();
    logger.info(`Successfully registered new customer: ${customer.emailAddress}`);
    return {
      success: true,
      message: 'Customer registered successfully',
      customer: result,
      isExisting: false,
    };
  } catch (error) {
    logger.error(`Failed to register customer ${customer.emailAddress}: ${error.message}`);
    throw error;
  }
};

export default {
  registerCustomer,
};
