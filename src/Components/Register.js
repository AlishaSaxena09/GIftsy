import { useState } from "react";
import { createAccount } from "../lib/mockServer";
import { validateEmail } from "../lib/utills";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");

  const updateFormData = (fieldName, value) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [fieldName]: value,
    }));
  };

  const validateErrors = () => {
    setErrors({});
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email Address";
    }
    if (formData.firstName.length < 2) {
      newErrors.firstName = "First Name should be minimum 2 characters";
    }
    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last Name should be minimum 2 characters";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password should be minimum 6 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    setErrors(newErrors);
    return false;
  };
  const handleSubmit = (e) => {
    setSuccessMessage("");
    e.preventDefault();
    if (validateErrors()) {
      const { firstName, lastName, email, password } = formData;
      const response = createAccount({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.success) {
        setSuccessMessage(response.message);
      } else {
        setErrors({ form: response.message });
      }
    }
  };
  return (
    <div className="w-full max-w-md m-auto py-8">
      <h1 className="text-2xl font-medium tracking-wide pb-2">Register</h1>
      <p className="text-sm text-gray-500">
        Please fill in the information below
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded px-6 pt-4 pb-8 mb-4"
      >
        <label className="block mb-4">
          <input
            className={`appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.firstName ? "border-red-500" : ""
            }`}
            id="r-firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
          ></input>
          {errors.firstName ? (
            <span className="text-red-500 font-bold">{errors.firstName}</span>
          ) : null}
        </label>
        <label className="block mb-4">
          <input
            className={`appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.lastName ? "border-red-500" : ""
            }`}
            id="r-lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
          ></input>
          {errors.lastName ? (
            <span className="text-red-500 font-bold">{errors.lastName}</span>
          ) : null}
        </label>
        <label className="block mb-4">
          <input
            className={`appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            id="r-email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
          ></input>
          {errors.email ? (
            <span className="text-red-500 font-bold">{errors.email}</span>
          ) : null}
        </label>
        <label className="block mb-6">
          <input
            className={`appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            id="r-password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
          ></input>
          {errors.password ? (
            <span className="text-red-500 font-bold">{errors.password}</span>
          ) : null}
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </label>
        {errors.form ? (
          <span className="text-red-500 font-bold">{errors.form}</span>
        ) : null}

        {successMessage ? (
          <span className="text-green-500 font-bold">{successMessage}</span>
        ) : null}
        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        <div>
          <input
            className="uppercase tracking-widest w-full bg-black hover:bg-stone-600 text-white font-medium py-3 px-4 focus:outline-none focus:shadow-outline"
            type="submit"
            value="Create My Acoount"
          ></input>
        </div>
      </form>
    </div>
  );
}
