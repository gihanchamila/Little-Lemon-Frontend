import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Asterisk } from "lucide-react";
import Button from "./Button/Button";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { errorResponse } from "../utils/errorResponse";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
});

export default function SignUpForm() {
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate()

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const signupPayload = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      };

      const response = await axiosInstance.post("/auth/users/", signupPayload);
      const data = response.data;
      console.log("Signup successful:", data);
      navigate("/login");
    } catch (error) {
      console.log(error)
      errorResponse(error)
    }
  };

  return (
    <section className="gridLayout">
      <div className="lg:col-start-5 lg:col-span-4 sm:col-span-4">
        <h2 className="text-2xl mb-6 font-semibold text-center">Sign Up</h2>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSignUpError("");
            const success = await signUp(
              values.firstName,
              values.lastName,
              values.email,
              values.password
            );
            if (!success) {
              setSignUpError("Failed to sign up. Please try again.");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-6 w-full ">
              <div className="flex space-x-4">
                <div className="flex flex-col flex-1 text-primary-1 text-sm font-karla w-[125px] font-extrabold relative">
                  <label htmlFor="firstName" className="pb-2 font-semibold block">
                    First Name
                    <Asterisk size={12} color={"#fb2c36"} className="inline ml-1" />
                  </label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="border-2 border-primary-1 rounded-lg p-4 accent-primary-1 h-full"
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col flex-1 text-primary-1 text-sm font-karla w-[125px] font-extrabold relative">
                  <label htmlFor="lastName" className="pb-2 font-semibold block">
                    Last Name
                    <Asterisk size={12} color={"#fb2c36"} className="inline ml-1" />
                  </label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="border-2 border-primary-1 rounded-lg p-4 accent-primary-1 h-full"
                    placeholder="Doe"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col text-primary-1 text-sm font-karla font-extrabold space-x-2 relative">
                <label htmlFor="email" className="pb-2 font-semibold block">
                  Email
                  <Asterisk size={12} color={"#fb2c36"} className="inline ml-1" />
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="border-2 border-primary-1 rounded-lg p-4 accent-primary-1 h-full"
                  placeholder="you@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col text-primary-1 text-sm font-karla font-extrabold space-x-2 relative">
                <label htmlFor="password" className="pb-2 font-semibold block">
                  Password
                  <Asterisk size={12} color={"#fb2c36"} className="inline ml-1" />
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="border-2 border-primary-1 rounded-lg p-4 accent-primary-1 h-full"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {signUpError && (
                <p className="text-red-700 font-bold text-center mt-2">{signUpError}</p>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
