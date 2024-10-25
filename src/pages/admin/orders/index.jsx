import { Button, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import request from '../../../server/request';
import Cookies from 'js-cookie';
import { TOKEN } from '../../../constants';
const columns = [
  {
    title: 'ProductName',
    dataIndex: 'productName',
    key: 'productName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
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


const OrdersPage = () => {
  const [products, setProducts] = useState(null);
  const [loading , setLoading] = useState(false);
  const token = Cookies.get(TOKEN)
  useEffect(() => {
    const getCategories = async() => {
      try{
        setLoading(true)
        const {data} = await request.get("/product/order/all/get", {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(data);
        setProducts(data)
      }finally{
        setLoading(false)
      }
    }
    getCategories();
  },[])

  return(
    <Table loading={loading} columns={columns} key={products} dataSource={products} />
  )
}
export default OrdersPage;