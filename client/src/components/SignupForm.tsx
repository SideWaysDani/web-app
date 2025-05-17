import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { config } from '../config/env';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .matches(/^[A-Za-z\s-]+$/, 'First name can only contain letters, spaces, and hyphens')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .matches(/^[A-Za-z\s-]+$/, 'Last name can only contain letters, spaces, and hyphens')
    .required('Last name is required'),
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email address is required')
});

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState('');

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
      color: 'white',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '2rem',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h2>
        {serverError && (
          <div style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>
            {serverError}
          </div>
        )}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            emailAddress: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setServerError('');
              await axios.post(`${config.API_URL}/signup`, values);
              navigate('/signup/thank-you');
            } catch (err: any) {
              setServerError(err.response?.data?.error || 'Failed to submit. Please try again.');
              console.error('Signup error:', err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div style={{ marginBottom: '1rem' }}>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: `1px solid ${touched.firstName && errors.firstName ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    outline: 'none',
                  }}
                />
                <ErrorMessage name="firstName">
                  {msg => (
                    <div style={{
                      color: '#ff6b6b',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      paddingLeft: '0.25rem'
                    }}>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: `1px solid ${touched.lastName && errors.lastName ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    outline: 'none',
                  }}
                />
                <ErrorMessage name="lastName">
                  {msg => (
                    <div style={{
                      color: '#ff6b6b',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      paddingLeft: '0.25rem'
                    }}>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <Field
                  type="email"
                  name="emailAddress"
                  placeholder="Email Address"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: `1px solid ${touched.emailAddress && errors.emailAddress ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'}`,
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    outline: 'none',
                  }}
                />
                <ErrorMessage name="emailAddress">
                  {msg => (
                    <div style={{
                      color: '#ff6b6b',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                      paddingLeft: '0.25rem'
                    }}>
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#4a9eff',
                  color: 'white',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default SignupForm;