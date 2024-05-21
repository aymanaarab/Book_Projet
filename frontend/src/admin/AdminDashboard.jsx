import  { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const { Header, Sider, Content } = Layout;
const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem('token');
  
      await axios.post('http://127.0.0.1:3001/api/logout_User', null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      localStorage.removeItem('token');
  
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="w-screen h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BookOutlined />,
              label: <NavLink to={"booksa"}> Books</NavLink>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <NavLink to={"usersa"}> Users</NavLink>,
            },
            {
              key: "3",
              icon: <DollarOutlined />,
              label: <NavLink to={"loansa"}> Loans</NavLink>,
            },
          ]}
        />

<button className="p-4 bg-cyan-600 text-white rounded-ee-full absolute bottom-0 " onClick={logoutUser}>logout</button>

      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <br />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminDashboard;
