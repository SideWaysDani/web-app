import 'dotenv/config';

// Ensure fetch is available in older Node.js versions
import fetch from 'node-fetch';

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
 * Register a new customer in EspoCRM
 * @param {Object} customer - Customer details
 * @param {string} customer.firstName - Customer's first name
 * @param {string} customer.lastName - Customer's last name
 * @param {string} customer.emailAddress - Customer's email address
 * @returns {Promise<Object>} - Created customer record
 */
export const registerCustomer = async (customer) => {
  try {
    validateConfig();

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

    return await response.json();
  } catch (error) {
    console.error('Failed to register customer:', error);
    throw error;
  }
};

export default {
  registerCustomer,
};
