import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./style.scss";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { AuthContext } from "../../../context/auth";
import { BackgroundBeamsWithCollision } from "../../ui/background-beams-with-collision";

const { Header, Sider, Content } = Layout;

const App = () => {
  const {isAuth , setIsAuth} = useContext(AuthContext)
  const Key = localStorage.getItem("KEY");
  const [collapsed, setCollapsed] = useState(false);
  const [modal, setModal] = useState(false);
  const [controlLogout, setControlLogout] = useState(false);
  const [key, setKey] = useState(Key ? Key : 1);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname;

  const currentPath = currentPage.split("/")[2];

  const logoutModal = () => {
    setControlLogout(true);
  };

  const logoutConfirm = () => {
    navigate("/auth");
    setControlLogout(false);
    setIsAuth(false)
    localStorage.setItem("KEY", 1)
    Cookies.set(TOKEN , "");
  };

  const logoutCancel = () => {
    setControlLogout(false);
  };

  const changeModal = () => {
    setModal(!modal);
  };

  const handleClickOutside = (event) => {
    if (
      modal &&
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modal]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <img className="admin-logo" src="/admin-logo.png" alt="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={`${key}`}
          defaultValue={key}
          items={[
            {
              key: "1",
              icon: (
                <DashboardOutlined
                style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}
                  onClick={() => {
                    setKey(1);
                    navigate("/admin/dashboard");
                  }}
                />
              ),
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,220)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(1);
                    navigate("/admin/dashboard");
                    localStorage.setItem("KEY", 1);
                  }}
                >
                  Dashboard
                </button>
              ),
            },
            {
              key: "2",
              icon: <UserOutlined
              style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}                 
              onClick={() => {
                setKey(2);
                navigate("/admin/users");
              }} />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(2);
                    navigate("/admin/users");
                    localStorage.setItem("KEY", 2);
                  }}
                >
                  Users
                </button>
              ),
            },
            {
              key: "3",
              icon: <OrderedListOutlined  
              style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}               
               onClick={() => {
                setKey(3);
                navigate("/admin/orders");
              }} />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(3);
                    navigate("/admin/orders");
                    localStorage.setItem("KEY", 3);
                  }}
                >
                  Orders
                </button>
              ),
            },
            {
              key: "4",
              icon: <ShoppingOutlined  
              style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}               
               onClick={() => {
                setKey(4);
                navigate("/admin/products");
              }} />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(4);
                    navigate("/admin/products");
                    localStorage.setItem("KEY", 4);
                  }}
                >
                  Products
                </button>
              ),
            },
            {
              key: "5",
              icon: <ProfileOutlined 
              style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}
              onClick={() => {
                setKey(5);
                navigate("/admin/profile");
              }}
              />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(5);
                    navigate("/admin/profile");
                    localStorage.setItem("KEY", 5);
                  }}
                >
                  Profile
                </button>
              ),
            },
            {
              key: "6",
              icon: <CreditCardOutlined
              style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}
              onClick={() => {
                setKey(6);
                navigate("/admin/billing");
              }}
              />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(6);
                    navigate("/admin/billing");
                    localStorage.setItem("KEY", 6);
                  }}
                >
                  Billing
                </button>
              ),
            },
            {
              key: "7",
              icon: <SettingOutlined style={{ width:"50px" , height:"38px",  objectFit:"cover", objectPosition:"center" ,paddingLeft:"20px" , marginLeft:"-20px"}}
              onClick={() => {
                setKey(7);
                navigate("/admin/settings");
              }}
              />,
              label: (
                <button
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "rgba(255 , 255 ,225)",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  onClick={() => {
                    setKey(7);
                    navigate("/admin/settings");
                    localStorage.setItem("KEY", 7);
                  }}
                >
                  Settings
                </button>
              ),
            },
            {
              key: "8",
              label: (
                <button
                className="logout-btn"
                  onClick={logoutModal}
                  style={{
                    width: "100%",
                    display: "flex",
                    padding: "0",
                    background: "transparent",
                    margin: "0",
                    color: "gray",
                    gap: "10px",
                    height: "30px",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "none",
                  }}
                  to={"/auth"}
                >
                  <UploadOutlined className="logout-img" style={{  marginRight:"10px"}} />
                  Logout
                </button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="relative">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            borderBottom: "1px solid rgba(128, 128, 128, 0.281)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <button
            onClick={changeModal}
            ref={buttonRef}
            style={{
              width: "53px",
              height: "53px",
              borderRadius: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: "51",
              border: "3px solid gray",
              cursor: "pointer",
              marginRight:"20px",
            }}
          >
            <img
              width="50px"
              height="50px"
              style={{ background: "red", borderRadius: "50px" }}
              src="/my-image.jpg"
              alt="logo"
            />
          </button>
          {modal && (
            <ul className="profile-lines" ref={modalRef}>
              <li>
                <button
                  onClick={() => {
                    setModal(false);
                    setKey(5);
                    navigate("/admin/profile");
                    localStorage.setItem("KEY" , 5)
                  }}
                >
                  <ProfileOutlined />
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setModal(false);
                    setKey(6);
                    navigate("/admin/billing");
                    localStorage.setItem("KEY" , 6)
                  }}
                >
                  <CreditCardOutlined />
                  Billing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setModal(false);
                    setKey(7);
                    navigate("/admin/settings");
                    localStorage.setItem("KEY" , 7)
                  }}
                >
                  <SettingOutlined />
                  Settings
                </button>
              </li>
            </ul>
          )}
        </Header>
        <BackgroundBeamsWithCollision>
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </BackgroundBeamsWithCollision>
      </Layout>
      {controlLogout ? (
        <div className="logout-back">
          <div className="logout-modal">
            <h2> Do you want to logout? </h2>
            <div className="logout-btns">
              <button onClick={logoutConfirm}>Yes</button>
              <button onClick={logoutCancel}>No</button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default App;
