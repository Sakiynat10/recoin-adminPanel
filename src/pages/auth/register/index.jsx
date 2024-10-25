
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./style.scss";
import request from "../../../server/request";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const RegisterPage = () => {

  const [loading , setLoading] = useState(false)
   
  const login = async (values) => {
    try{
      setLoading(true)
      const {data: {token}} = await request.post("/auth/login" , values)
      console.log(token);
      toast.success("Successfully logged in!");

    }finally{
      setLoading(false)
      toast.error("Failed to log in. Please check your credentials.");
    }
    setLoading(true)
    console.log(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <h1>Register</h1>
      <Form
        className="login-form"
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={login}
        onFinishFailed={onFinishFailed}
        autoComplete="f"
      >
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input placeholder="helloworld@gmail.com" width={"100%"} />
        </Form.Item>

        <Form.Item
          className="login-input"
          label="Password"
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="*******" />
        </Form.Item>

        <Form.Item
          className="login-input"
          label="FirstName"
          name="firstName"
          rules={[
            {
              message: "Please input your FirstName!",
            },
          ]}
        >
          <Input.Password width={"100%"} placeholder="FirstName" />
        </Form.Item>

        <Form.Item
          className="login-input"
          label="LastName"
          name="lastName"
          rules={[
            {
              message: "Please input your LastName!",
            },
          ]}
        >
          <Input.Password placeholder="LastName" />
        </Form.Item>

        <Form.Item
          className="login-input"
          label="GroupName"
          name="groupName"
          rules={[
            {
              message: "Please input your GroupName!",
            },
          ]}
        >
          <Input.Password placeholder="GroupName" />
        </Form.Item>

        <Form.Item
          className="login-input"
          label="PhoneNumber"
          name="phoneNumber"
          rules={[
            {
              message: "Please input your PhoneNumber!",
            },
          ]}
        >
          <Input.Password  placeholder="PhoneNumber" />
        </Form.Item>

        <Form.Item>
          <Button disabled={loading} className="login-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <span className="change-auth">
            Do you have already your account? <a href="/auth/login">Login</a>{" "}
          </span>
        </Form.Item>
      </Form>
      <ToastContainer />
    </div>
  );
};
export default RegisterPage;
