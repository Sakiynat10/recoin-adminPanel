
import React, { useContext, useState } from "react";
import { Button, Form, Input } from "antd";
import request from "../../../server/request";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.scss";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { AuthContext } from "../../../context/auth";


const LoginPage = () => {

  const [loading , setLoading] = useState(false)
  const {setIsAuth} = useContext(AuthContext)
  const navigate = useNavigate();
   
  const login = async (values) => {
    try{
      setLoading(true)
      const {data: {token}} = await request.post("/auth/login" , values);

      console.log(token);
      if(token){
        Cookies.set(TOKEN, token);
        setIsAuth(true)
        navigate("/admin/dashboard");
      }else{
        navigate("/auth/register")
      }

      /* Toast Message*/

      toast.success("Successfully login "  , {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }finally{
      setLoading(false)
    }
    setLoading(true)
    console.log(values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
        <div className="login">
      <h1>Log in</h1>
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
        <Form.Item>
          <Button disabled={loading} className="login-btn" type="primary" htmlType="submit">
            Submit
          </Button>
          <span className="change-auth">
            Don’t have an account? <a href="/auth/register">Sign up</a>{" "}
          </span>
        </Form.Item>
      </Form>
    </div>
    <ToastContainer/>
    </>

  );
};
export default LoginPage;
