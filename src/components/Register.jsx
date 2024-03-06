import { useState, useEffect } from "react";
import { openDB } from 'idb';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/10557897/pexels-photo-10557897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 center");
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 15px;
`;
const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }
`;
const Loader = () => <div>Loading...</div>;

const Register = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
      if (navigator.onLine) {
        submitStoredFormData();
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    handleOnlineStatus();

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      // Email validation check
      setEmailValid(validateEmail(value));
    }
  };

  const validateEmail = (email) => {
    const re =
      // Regular expression for basic email validation
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (online) {
      if (emailValid) {
        fetch("https://api-zarektroinks-1.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Clear form data after successful signup
            window.alert("Signup successful! You can now log in.");
            setFormData({
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              mobileNumber: "",
              password: "",
            });
          })
          .catch((error) => console.error("Error:", error))
          .finally(() => {
            setLoading(false); // Set loading to false after form submission completes
          });
      } else {
        console.log("Invalid email address.");
      }
    } else {
      console.log("Offline mode: Saving data to IndexedDB.");
  
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
        await store.put(formData);
        await tx.done;
        console.log('Data stored in IndexedDB.');
      } catch (error) {
        console.error('Error storing data in IndexedDB:', error);
      }
    }
  };
  
  const submitStoredFormData = async () => {
    console.log("Submitting stored form data...");
    try {
      const db = await openDB('registration', 1);
      const objectStoreNames = db.objectStoreNames;
      if (!objectStoreNames.contains('formData')) {
        console.log("Object store 'formData' not found.");
        return;
      }
  
      const tx = db.transaction('formData', 'readonly');
      const store = tx.objectStore('formData');
      const storedData = await store.getAll();
      await tx.done;
  
      if (storedData && storedData.length > 0) {
        storedData.forEach(async (data) => {
          const response = await fetch("https://api-zarektroinks-1.onrender.com/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.json();
          console.log("Data posted successfully:", responseData);
        });
        console.log('All stored data submitted.');
        await clearStoredFormData();
      }
    } catch (error) {
      console.error("Error submitting stored form data:", error);
    }
  };
  
  const clearStoredFormData = async () => {
    console.log("Clearing stored form data...");
    try {
      const db = await openDB('registration', 1);
      const tx = db.transaction('formData', 'readwrite');
      const store = tx.objectStore('formData');
      await store.clear();
      await tx.done;
      console.log("Stored form data cleared.");
    } catch (error) {
      console.error("Error clearing stored form data:", error);
    }
  };


 
  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value !== "") && emailValid
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        {online ? (
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
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
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
              style={{ border: emailValid ? "1px solid black" : "1px solid red" }}
            />
           
            <Input
              type="tel"
              name="mobileNumber"
              placeholder="Phone Number"
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
            <Agreement>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              incidunt. Distinctio quisquam quia neque non doloremque sit in
              quis esse nulla iure, reiciendis dolore incidunt accusantium quas
              ipsa qui iusto.
            </Agreement>
            <Button type="submit" disabled={!isFormValid()}>
              Signup
            </Button>
            {!emailValid && (
              <p style={{ color: "red", marginLeft:"10px" }}>Please enter a valid email address.</p>
            )}
             {loading && <Loader />}
          </Form>
        ) : (
          <p>Offline mode: Please check your internet connection.</p>
        )}
      </Wrapper>
    </Container>
  );
};

export default Register;
