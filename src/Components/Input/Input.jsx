import React,{useState  } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeSlash, DocumentUpload } from "iconsax-react";

import "./Input.css";

const Input = React.forwardRef((props, ref) => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleFocusInput = () => {
    setIsInputActive(true);
  };

  const handleBlurInput = () => {
    setIsInputActive(false);
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  if (props.type === "submit") {
    return (
      <>
        <label htmlFor="" className="input__label">
          {props.label}
        </label>
        <div>
          <input type={props.type} value={props.value} className="input__submit" name="" id="" />
        </div>
      </>
    );
  } else if (props.type === "password") {
    return (
      <div className="mb-4">
        <label htmlFor="" className="input__label d-flex justify-content-between">
          {props.label}
          {props.forgot ? (
            <Link to={"/"} className="input__label-forgot">
              Forgot?
            </Link>
          ) : (
            ""
          )}
        </label>
        <div className={`input ${isInputActive ? "active" : ""}`} style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder={props.placeholder}
            className={`input__inp ${props.error ? "input-error" : ""}`}
            name={props.name}
            id={props.name}
            value={props.value}
            onChange={(e) => props.onInputChange(e.target.name, e.target.value)}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />
          <span onClick={togglePasswordVisibility} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>
            {showPass ? <EyeSlash className="input__icon" /> : <Eye className="input__icon" />}
          </span>
        </div>
        {props.error && <div className="input-error-message">{props.error}</div>}
      </div>
    );
  } else if (props.type === "file") {
    return (
      <>
      {/* {console.log(props.isFileUploaded)} */}
        <label htmlFor="uploadFile" className={`input-file__label ${props.isFileUploaded ?"uploaded":""} d-flex justify-content-between align-items-center`}>
          <span>{props.label}</span>
          <DocumentUpload color={props.isFileUploaded ? "#007DFC" : "#98A2B3"} />
        </label>
        <div className="input-file">
          <input type={props.type} ref={ref} placeholder={props.placeholder} className="input-file__inp" name="file" id="uploadFile" accept=".csv,.xlsx" onChange={(e) => props.onInputChange(e)} />
        </div>
      </>
    );
  }else {
    return (
      <div className="mb-4">
        <label htmlFor="" className="input__label">
          {props.label}
        </label>
        <div className={`input ${isInputActive ? "active" : ""}`}>
          <input
            type={props.type}
            placeholder={props.placeholder}
            className={`input__inp ${props.error ? "input-error" : ""}`}
            name={props.name}
            id={props.name}
            value={props.value}
            onChange={(e) => props.onInputChange(e.target.name, e.target.value)}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />
        </div>
        {props.error && <div className="input-error-message">{props.error}</div>}
      </div>
    );
  }
})


export default Input;