import { Button, Flex, Image, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import request from "../../../server/request";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { Form } from "antd";
const columns = [
  {
    title: "Image",
    dataIndex: "photo",
    key: "photo",
    render: (photo) => {
      return <Image src={photo?.url} />;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "AvailableQuantity",
    dataIndex: "availableQuantity",
    key: "availableQuantity",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Action",
    key: "action",
    render: () => (
      <>
        <Button type={"primary"} style={{ marginRight: "16px" }}>
          Edit
        </Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </>
    ),
  },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [btnLoading ,setBtnLoading] = useState(false);

  /*CRUD START */

  const submit = async () => {
    const token = Cookies.get(TOKEN)
    try{
      const values = await form.validateFields();
      console.log(values);
      await request.post("/admin/product/create")
      setBtnLoading(true)
    }finally{
      setBtnLoading(false)
    }
    // setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  /*CRUD END */

  const token = Cookies.get(TOKEN);
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("/admin/product/all/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return (
    <>
      <Table
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Products</h1>{" "}
            <Button type="dashed" onClick={showModal}>
              Add products
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        key={products}
        dataSource={products}
      />
      <Modal
        title="Product data"
        open={isOpen}
        onOk={submit}
        onCancel={closeModal}
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ImageUrl"
            name="imageUrl"
            rules={[
              {
                required: true,
                message: "Please input ImageUrl!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Available Quantity"
            name="availableQuantity"
            rules={[
              {
                required: true,
                message: "Please input quantity!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
export default ProductsPage;
