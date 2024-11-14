import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContextProvider';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const value=useContext(AppContext)
  const navigate=useNavigate()
  const initialValues = {
    email: '',
    password: ''
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("Form Data on Submit:", values); // Log data before submission
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      fetch("http://127.0.0.1:5000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(res=>{
        if(res.ok){return res.json().then(data=>{
          localStorage.setItem("access_Token",data.access_token)
          localStorage.setItem("refresh_Token",data.refresh_token)
          localStorage.setItem("userId",data.user.id)
          value.setUserId(data.user.id)
          if(data.user.role==="Client"){
            navigate('/client/product-listings')
          }
          else if (data.user.role==="Admin"){
            navigate('/admin/add-product')
          }
        })}
        else{return res.json().then(data=>toast.error(data.msg))}
      })

      setLoading(false);
      setSubmitting(false);
    } catch (err) {
      console.error("Error during registration:", err); // Log any errors during registration
      setLoading(false);
      setError('Registration failed. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {error && <div className="bg-red-200 text-red-600 p-2 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-200 text-green-600 p-2 rounded mb-4">{successMessage}</div>}

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-full py-3 px-4 bg-gray-900 text-white font-bold rounded-md ${loading || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              {loading || isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
