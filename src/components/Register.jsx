import React, { useState, useEffect } from "react";
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

const Register = () => {
  const [online, setOnline] = useState(navigator.onLine);
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
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
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
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (online) {
      if (emailValid) {
        fetch("http://localhost:5000/api/auth/register", {
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
            setFormData({
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              mobileNumber: "",
              password: "",
            });
          })
          .catch((error) => console.error("Error:", error));
      } else {
        console.log("Invalid email address.");
      }
    } else {
      console.log("Offline mode: Cannot submit form.");
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
          </Form>
        ) : (
          <p>Offline mode: Please check your internet connection.</p>
        )}
      </Wrapper>
      
    </Container>
  );
};

export default Register;
