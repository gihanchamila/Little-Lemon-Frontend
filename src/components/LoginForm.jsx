import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Asterisk } from "lucide-react";
import Button from "./Button/Button";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const { login, error } = useAuth();


  return (
    <section className="gridLayout">
      <div className="lg:col-start-5 lg:col-span-4 sm:col-span-4">
        <h2 className="text-2xl mb-6 font-semibold text-center">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setLoginError("");
            const success = await login(values.email, values.password);
            if (!success) {
              setLoginError("Invalid email or password");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-6 w-full ">
              <div className="flex flex-col text-primary-1 text-sm font-karla font-extrabold  space-x-2  relative">
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
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col text-primary-1 text-sm font-karla font-extrabold  space-x-2  relativerelative">
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
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {loginError && (
                <p className="text-red-700 font-bold text-center mt-2">{loginError}</p>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
