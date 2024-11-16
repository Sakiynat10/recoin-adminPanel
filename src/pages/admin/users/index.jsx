import { Button, Form, Input, Modal, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import request from '../../../server/request';
import Cookies from 'js-cookie';
import { TOKEN } from '../../../constants';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined , PlusOutlined } from '@ant-design/icons';







const UserPage = () => {
  const [users, setUsers] = useState(null);
  const [loading , setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [btnLoading ,setBtnLoading] = useState(false);
  const [callback , setCallback] = useState(false);
  const [form] = Form.useForm();
  const token = Cookies.get(TOKEN);
  const [userId , setUserId] = useState(1);

  const refetch = () => {
    setCallback(!callback);
  }


    const submit = async() => {
      console.log(token);
      try{
        const values = await form.validateFields();
        setBtnLoading(true)
        await request.post(`https://microtech.uz/api/user/1/add-balance?balance=100`, values,   {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        refetch();
        setIsOpen(false)
      }finally{
        setBtnLoading(false);
        setLoading(false)
      }
    }



  const openModal = () => {
    setIsOpen(true);
  }
  
  const columns = [
    {
      title: 'FirstName',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Group',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: "Action user balance",
      dataIndex:"id",
      key: "id",
      render: (id) => (
        <>
          <Button  type style={{ marginRight: "16px" , color:"blue" , border:"1px solid blue" }}>
            <EditOutlined/>
          </Button>
          <Button onClick={openModal} style={{ color:"blue" , border:"1px solid green" }}>
            <PlusOutlined style={{color:"green" , background:"transparent"}} />
          </Button>
        </>
      ),
    },
  ];


  const closeModal = () => {
    setIsOpen(false);
  }


  useEffect(() => {
    const getCategories = async() => {
      try{
        setLoading(true)
        const {data} = await request.get("/user/all", {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(data);
        setUsers(data)
      }finally{
        setLoading(false)
      }
    }
    getCategories();
  },[])

  return(
    <>
      <Table loading={loading} columns={columns} key={users} dataSource={users} />
      <Modal
        title="Product data"
        open={isOpen}
        onOk={submit}
        okText={"Add"}
        onCancel={closeModal}
        confirmLoading={btnLoading}
      >
        <Form
          form={form}
          name="Products"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Balance"
            name="balance"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  
  )
}
export default UserPage;