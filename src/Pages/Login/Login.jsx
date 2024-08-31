import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"; // Import Yup
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Input from "../../Components/Input/Input";
import { mainUrl } from "../../helpers/constants/env-varaibles";
import "./Login.css";

export default function Login() {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // تعریف اسکیما validation با استفاده از Yup
  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
    email: Yup.string().required("Email is required").email("Invalid email address"),
  });

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // form validation with yup
      await validationSchema.validate(inputValues, { abortEarly: false });
      setErrors({});
      const formData = {
        password: inputValues.password,
        email: inputValues.email,
      };
      const response = await fetch(`${mainUrl}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      const token = data.access;
      Cookies.set("authToken", token, { expires: 7 }); // اعتبار کوکی ۷ روزه
      Swal.fire({
        icon: "success",
        title: "Login was successful",
        text: "Please click on the button below to be directed to the Dashboard",
        confirmButtonText: "Go To Dashboard",
      }).then((result) => {
        navigate("/dashboard");
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        // ذخیره خطاهای اعتبارسنجی در استیت
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        if (error.message === "400") {
          Swal.fire({
            icon: "error",
            title: "There Is Some Error",
            text: "Your Email Or Password Is Incorrect.",
          }).then((result) => {
            setInputValues({});
            setErrors({});
          });
        } else if (error.message === "Failed to fetch") {
          Swal.fire({
            icon: "error",
            title: "Network Error",
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
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <figure className="login-logo-wrapper">
        <img srcSet="images/Logo.svg" className="login-logo-img" alt="" />
      </figure>
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-form__header">Login to your account</h2>
        <Input label="Email" name="email" value={inputValues.email || ""} onInputChange={handleInputChange} placeholder="balamia@gmail.com" type="email" error={errors.email} />
        <Input label="Password" name="password" value={inputValues.password || ""} onInputChange={handleInputChange} placeholder="Enter your password" type="password" error={errors.password} />
        <Input value="Login" type="submit" disabled={loading}></Input>
        {loading && <div className="loader"></div>}
        <p className="login-form__register">
          Not Registered?
          <Link to={"/register"}> Register!</Link>
        </p>
      </form>
     
    </>
  );
}
