import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup
import Swal from "sweetalert2";
import Input from "../../Components/Input/Input";
import "./Register.css";

export default function Register() {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const englishRegex = /^[A-Za-z0-9]+$/;
  const validationSchema = Yup.object({
    username: Yup.string().matches(englishRegex, "Only English letters").required("Username is required").min(3, "Username must be at least 3 characters long"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
    rPassword: Yup.string()
      .required("Repeat Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
    phone: Yup.string()
      .required("Mobile Number is required")
      .matches(/^[0-9]{10,11}$/, "Invalid mobile number"),
    dName: Yup.string().matches(englishRegex, "Only English letters").required("Display Name is required"),
  });

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(inputValues, { abortEarly: false });
      setErrors({});

      const formData = {
        username: inputValues.username,
        password: inputValues.password,
        email: inputValues.email,
        mobile_number: inputValues.phone,
        display_name: inputValues.dName,
      };

      const response = await fetch("https://django-7v4p0n.chbk.run/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "registration was successful",
        text: "Please click on the button below to be directed to the login page",
        confirmButtonText: "Go To Login Page",
      }).then((result) => {
        navigate("/login");
      });
      // Redirect to the login page after successful registration
    } catch (error) {
      if (error.name === "ValidationError") {
        // ذخیره خطاها در استیت
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        if (error.message === "Failed to fetch") {
          Swal.fire({
            icon: "error",
            title: "There Is Some Error",
            text: "Please Check Your Internet Connection.",
          }).then((result) => {
            setInputValues({});
            setErrors({});
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "There Is Some Error",
            text: "Please Contact To Support.",
          }).then((result) => {
            setInputValues({});
            setErrors({});
          });
        }
      }
    }
  };

  return (
    <>
      <figure className="login-logo-wrapper">
        <img srcSet="images/Logo.svg" className="login-logo-img" alt="" />
      </figure>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form__header">Sign Up your account</h2>
        <Input
          label="Username"
          name="username"
          value={inputValues.username || ""}
          onInputChange={handleInputChange}
          placeholder="jeff"
          type="text"
          error={errors.username} // نمایش خطا برای هر فیلد
        />
        <Input label="Password" name="password" value={inputValues.password || ""} onInputChange={handleInputChange} placeholder="Enter your password" type="password" error={errors.password} />
        <Input
          label="Repeat Password"
          name="rPassword"
          value={inputValues.rPassword || ""}
          onInputChange={handleInputChange}
          placeholder="Enter your password"
          type="password"
          error={errors.rPassword}
        />
        <Input label="Email" name="email" value={inputValues.email || ""} onInputChange={handleInputChange} placeholder="balamia@gmail.com" type="email" error={errors.email} />
        <Input label="Mobile Number" name="phone" value={inputValues.phone || ""} onInputChange={handleInputChange} placeholder="09383013300" type="text" error={errors.phone} />
        <Input label="Display Name" name="dName" value={inputValues.dName || ""} onInputChange={handleInputChange} placeholder="amin" type="text" error={errors.dName} />
        <Input value="Sign Up" type="submit" />
        <p className="login-form__register">
          Registered?
          <Link to={"/login"}> Login!</Link>
        </p>
      </form>
    </>
  );
}
