import { Button, Flex, Image, Table, Modal, Input, Select } from "antd";
import { useEffect, useState } from "react";
import request from "../../../server/request";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { Form } from "antd";
import {DeleteOutlined , EditOutlined} from "@ant-design/icons"
import DeleteWarning from "../../../components/card/delete-warning";
import Search from "antd/es/transfer/search";




const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [btnLoading ,setBtnLoading] = useState(false);
  const [callback , setCallback] = useState(false);
  const [selected , setSelected] = useState(null);
  const [deleteModal , setDeleteModal] = useState(false);
  const [deleteId , setDeleteId] = useState(null);
  const [searchValue , setSearchValue] = useState("");
  const [sortOrder , setSortOrder] = useState('asc');
  const [sortNameOrder , setSortNameOrder] = useState("asc")


  const refetch = () => {
    setCallback(!callback);
  }

  const handleSearchValues = (event) => {
    setSearchValue(event.currentTarget.value);
  }

  const handleSortPriceValues = (value) => {
    setSortOrder(value)
  }

  const handleSortNameValues = (value) => {
    setSortNameOrder(value)
  }

  // const result = products?.filter((product) => product?.name.toLowerCase().includes(searchValue.toLowerCase()));
 
  // const sortedNameProducts = result?.sort((a,b) => {
  //   if (sortNameOrder) {
  //     if (sortNameOrder === "asc") {
  //       const result1 = a.name.localeCompare(b.name);
  //       if (result1 !== 0) return result1;
  //     } else {
  //       const result1 = b.name.localeCompare(a.name);
  //       if (result1 !== 0) return result1;
  //     }
  //   }
  // })


//   const result = products?.filter(product => product?.name.toLowerCase().includes(searchValue.toLowerCase()));

// const sortedNameProducts = result?.sort((a, b) => {
//   if (sortNameOrder === "asc") {
//     return a.name.localeCompare(b.name);
//   } else if (sortNameOrder === "desc") {
//     return b.name.localeCompare(a.name);
//   }
//   return 0; // Default case: No sorting if sortNameOrder is not "asc" or "desc".
// });

//   const sortedProducts = sortedNameProducts?.sort((a,b) => {
//     if(sortOrder === 'asc'){
//       return a.price - b.price;
//     } else{
//       return b.price - a.price;
//     }
//   })



// Step 1: Filter products by name
const result = products?.filter(product => 
  product?.name.toLowerCase().includes(searchValue.toLowerCase())
);

// Step 2: Sort the filtered products by name
const sortedNameProducts = result?.sort((a, b) => {
  if (sortNameOrder === "asc") {
    return a.name.localeCompare(b.name);
  } else if (sortNameOrder === "desc") {
    return b.name.localeCompare(a.name);
  }
  return 0; // No sorting if sortNameOrder is not provided or invalid
});

// Step 3: Sort the already sorted-by-name products by price
const sortedProducts = sortedNameProducts?.sort((a, b) => {
  if (sortOrder === 'asc') {
    return a.price - b.price;
  } else if (sortOrder === 'desc') {
    return b.price - a.price;
  }
  return 0; // No sorting if sortOrder is not provided or invalid
});

// sortedProducts now holds the final result


  

  /*------CRUD START------ */

   /* ---- Edit start -----*/
    const editProduct = async(id) => {
      try{
        setIsOpen(true);
        setBtnLoading(true);
        setSelected(id);
        const {data} = await request.get(`/admin/product/${id}/get` , {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        form.setFieldsValue(data)
      }finally{
        setBtnLoading(false)
      }
    }
    /* ---- Edit end -------*/


    /* ----Adding Start ---- */
    const submit = async () => {
      try {
        setBtnLoading(true); // Show loading state on the button
        const values = await form.validateFields();
        const token = Cookies.get(TOKEN);
    
        const formValues = {
          ...values,
          price: Number(values.price),
          availableQuantity: Number(values.availableQuantity),
        };

        if(selected === null){
          await request.post("/admin/product/create", formValues, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }else{
          await request.post(`/admin/product/${selected}/update`, formValues , {
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
        }

        refetch();
        setIsOpen(false);    // Close the modal
      } catch (error) {
        console.error("Error submitting the form:", error);
      } finally {
        setBtnLoading(false);
        setSelected(null);
        // Remove loading state on the button
      }
    };
    /* ---- Adding end ---- */


    /*------- Delete Product ------*/
    const deleteProduct = (id) => {
      setDeleteModal(true)
      setDeleteId(id)
    }

    const closeDeleteModal = () => {
      setDeleteModal(false)
    }
    /*-------Delete End ------*/


    const closeModal = () => {
      setIsOpen(false);
    };

    const showModal = () => {
      setIsOpen(true);
      form.resetFields();  // Clear the form fields after submission
    };

  /*------CRUD END------ */

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key:"image",
      render: (imageUrl) => (
        <Image style={{objectFit:"cover" , objectPosition:"center" , display:"flex" , alignItems:"center" , justifyContent:"center", background:" rgba(0, 0, 0, 0.203)"}} src={imageUrl} alt="url" width={60} height={60} />
      )
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
      dataIndex:"id",
      key: "id",
      render: (id) => (
        <>
          <Button onClick={() => editProduct(id)} type style={{ marginRight: "16px" , color:"blue" , border:"1px solid blue" }}>
            <EditOutlined/>
          </Button>
          <Button onClick={() => deleteProduct(id)} style={{border:"1px solid red"}}>
            <DeleteOutlined style={{     color:"red"}} />
          </Button>
        </>
      ),
    },
  ];





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

        setProducts(data);
        console.log(data);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [callback]);

  return (
    <>
      <Table
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Products {result?.length}</h1>{" "}
            <Flex gap={20}>
              <Search onChange={handleSearchValues} placeholder="Searching products ... " />
              <Select 
               defaultValues="asc"
               onChange={handleSortPriceValues}
               placeholder="Sorted price"
               options={[
                {value:"asc" , label:"Low to High"},
                {value:"desc" , label:"High to Low"}
               ]}
              />
              <Select 
               defaultValues="asc"
               onChange={handleSortNameValues}
               placeholder="Sorted Name"
               options={[
                {value:"asc" , label:"A to Z"},
                {value:"desc" , label:"Z to A"}
               ]}
              />
              <Button disabled={btnLoading} type="dashed" onClick={showModal}>
                Add products
              </Button>
            </Flex>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        key={products}
        dataSource={sortedProducts}
      />
       {deleteModal ? 
            <DeleteWarning onEvent={refetch} closeDeleteModal={closeDeleteModal} text="product" id={deleteId} />  
            : ""
      }
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
        </Form>
      </Modal>
    </>
  );
};
export default ProductsPage;

