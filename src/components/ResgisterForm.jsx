import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  /* Your form styles here */
`;

const Input = styled.input`
  /* Your input styles here */
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        submitStoredFormData();
      }
    };

    window.addEventListener('online', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const storeFormDataInDB = async (data) => {
    try {
      const db = await openDB('registration', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('formData')) {
            db.createObjectStore('formData', { keyPath: 'email' });
          }
        },
      });

      const tx = db.transaction('formData', 'readwrite');
      const store = tx.objectStore('formData');
      await store.put(data);
      await tx.done;
      console.log('Data stored in IndexedDB.');
    } catch (error) {
      console.error('Error storing data in IndexedDB:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    if (navigator.onLine) {
      // Implement form submission logic when online
      console.log('Form submitted:', formData);
    } else {
        console.log('Offline mode: Saving data to IndexedDB.');
        storeFormDataInDB(formData);
    }
  };

  const submitStoredFormData = async () => {
    console.log('Submitting stored form data...');
    // Implement submitting stored form data logic
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile number"
          value={formData.mobileNumber}
          onChange={handleInputChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
