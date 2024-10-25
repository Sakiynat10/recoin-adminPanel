import { Button, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import request from '../../../server/request';
import Cookies from 'js-cookie';
import { TOKEN } from '../../../constants';
const columns = [
  {
    title: 'FirstName',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <a>{text}</a>,
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
  //   {
  //   title: 'CreatedDate',
  //   dataIndex: 'createdDate',
  //   key: 'createdDate',
  // },
  // {
  //   title: 'LastDate',
  //   dataIndex: 'lastDate',
  //   key: 'lastDate',
  // },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <>
        <Button type={"primary"} style={{marginRight:"16px"}}>Edit</Button>
        <Button type='primary' danger>Delete</Button>
      </>
    ),
  },
];


const UserPage = () => {
  const [users, setUsers] = useState(null);
  const [loading , setLoading] = useState(false);
  const token = Cookies.get(TOKEN)
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
    <Table loading={loading} columns={columns} key={users} dataSource={users} />
  )
}
export default UserPage;