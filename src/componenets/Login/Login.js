import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../helpers/ajaxCall";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string().required("Password is required"),
  });

  const fetchData = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response?.status === 200) {
        const result = response?.data;
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({
            accessToken: result?.access,
            refreshToken: result?.refresh,
            userId: result?.userId,
          })
        );
        toast.success("Login Successful");
        if (result?.is_member) {
          navigate("/dashboard");
        } else {
          navigate("/becomemember");
        }
      } else if (response.status === 400) {
        if (response.data.error === "Invalid credentials") {
          toast.error(response.data.error);
        } else {
          toast.error(
            "Email not verified. Please verify your email to log in."
          );
        }
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const loginCredentials = {
      username: values.username,
      password: values.password,
    };

    fetchData("accounts/login/", loginCredentials);
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cornflower-light via-cornflower to-cornflower-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div>
          <h1 className="text-4xl font-bold text-center text-cornflower">
            गौशाला
          </h1>
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-800">
            Gaushala Management System
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cornflower focus:border-cornflower"
                placeholder="Enter your username"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cornflower focus:border-cornflower"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !formik.isValid}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors duration-200"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
