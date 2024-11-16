import {
  Button,
  Flex,
  Image,
  Table,
  Modal,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import request from "../../../server/request";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { Form } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import DeleteWarning from "../../../components/card/delete-warning";
import Search from "antd/es/transfer/search";
import { ProductCard } from "../../../components/card/product-card";
import "./style.scss";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [sortNameOrder, setSortNameOrder] = useState("desc");
  const [sortCriteria, setSortCriteria] = useState(""); // Sort criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: asc/desc

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const columns = [
    { Image: "https://picsum.photos/200/300?random=1", name: "Laptop Pro", id: 1, availableQuantity: 100, description: "High-performance laptop with advanced features.", price: 1299.99 },
    { Image: "https://picsum.photos/200/300?random=2", name: "Smartphone X", id: 2, availableQuantity: 50, description: "Flagship smartphone with stunning display.", price: 899.99 },
    { Image: "https://picsum.photos/200/300?random=3", name: "Wireless Headphones", id: 3, availableQuantity: 200, description: "Noise-cancelling headphones for immersive sound.", price: 199.99 },
    { Image: "https://picsum.photos/200/300?random=4", name: "Gaming Mouse", id: 4, availableQuantity: 120, description: "Ergonomic mouse designed for gamers.", price: 49.99 },
    { Image: "https://picsum.photos/200/300?random=5", name: "Mechanical Keyboard", id: 5, availableQuantity: 80, description: "Durable keyboard with customizable keys.", price: 79.99 },
    { Image: "https://picsum.photos/200/300?random=6", name: "Smartwatch S2", id: 6, availableQuantity: 90, description: "Track your fitness and notifications.", price: 249.99 },
    { Image: "https://picsum.photos/200/300?random=7", name: "4K Action Camera", id: 7, availableQuantity: 70, description: "Capture stunning moments in 4K.", price: 349.99 },
    { Image: "https://picsum.photos/200/300?random=8", name: "Portable Speaker", id: 8, availableQuantity: 60, description: "Compact speaker with powerful sound.", price: 59.99 },
    { Image: "https://picsum.photos/200/300?random=9", name: "Drone Max", id: 9, availableQuantity: 90, description: "High-end drone for photography.", price: 1299.99 },
    { Image: "https://picsum.photos/200/300?random=10", name: "Wireless Charger", id: 10, availableQuantity: 150, description: "Fast charging for your devices.", price: 39.99 },
    { Image: "https://picsum.photos/200/300?random=11", name: "VR Headset", id: 11, availableQuantity: 110, description: "Immerse yourself in virtual reality.", price: 299.99 },
    { Image: "https://picsum.photos/200/300?random=12", name: "Bluetooth Earbuds", id: 12, availableQuantity: 130, description: "True wireless earbuds with crystal sound.", price: 89.99 },
    { Image: "https://picsum.photos/200/300?random=13", name: "Tablet Plus", id: 13, availableQuantity: 75, description: "Lightweight tablet with multitasking.", price: 499.99 },
    { Image: "https://picsum.photos/200/300?random=14", name: "Fitness Band", id: 14, availableQuantity: 200, description: "Track your steps and calories.", price: 49.99 },
    { Image: "https://picsum.photos/200/300?random=15", name: "Gaming Console", id: 15, availableQuantity: 50, description: "Next-gen console for endless fun.", price: 599.99 },
    { Image: "https://picsum.photos/200/300?random=16", name: "Smart Light", id: 16, availableQuantity: 180, description: "Control your lights with an app.", price: 24.99 },
    { Image: "https://picsum.photos/200/300?random=17", name: "Digital Camera", id: 17, availableQuantity: 90, description: "High-resolution camera for professionals.", price: 999.99 },
    { Image: "https://picsum.photos/200/300?random=18", name: "Robot Vacuum", id: 18, availableQuantity: 60, description: "Smart cleaning robot for your home.", price: 299.99 },
    { Image: "https://picsum.photos/200/300?random=19", name: "External SSD", id: 19, availableQuantity: 100, description: "Fast and portable storage solution.", price: 129.99 },
    { Image: "https://picsum.photos/200/300?random=20", name: "HD Monitor", id: 20, availableQuantity: 85, description: "Sharp display with vibrant colors.", price: 199.99 },
    { Image: "https://picsum.photos/200/300?random=21", name: "Electric Scooter", id: 21, availableQuantity: 40, description: "Eco-friendly ride for your commute.", price: 499.99 },
    { Image: "https://picsum.photos/200/300?random=22", name: "Air Purifier", id: 22, availableQuantity: 55, description: "Breathe cleaner air at home.", price: 149.99 },
    { Image: "https://picsum.photos/200/300?random=23", name: "Smart Thermostat", id: 23, availableQuantity: 45, description: "Control your home's temperature remotely.", price: 179.99 },
    { Image: "https://picsum.photos/200/300?random=24", name: "E-Reader", id: 24, availableQuantity: 95, description: "Read your favorite books on the go.", price: 139.99 },
    { Image: "https://picsum.photos/200/300?random=25", name: "Gaming Chair", id: 25, availableQuantity: 50, description: "Ergonomic chair for long gaming sessions.", price: 249.99 },
    { Image: "https://picsum.photos/200/300?random=26", name: "Home Projector", id: 26, availableQuantity: 30, description: "Transform your room into a cinema.", price: 299.99 },
    { Image: "https://picsum.photos/200/300?random=27", name: "Electric Grill", id: 27, availableQuantity: 80, description: "Grill delicious meals indoors.", price: 99.99 },
    { Image: "https://picsum.photos/200/300?random=28", name: "Portable Power Bank", id: 28, availableQuantity: 190, description: "Keep your devices charged on the go.", price: 49.99 },
    { Image: "https://picsum.photos/200/300?random=29", name: "Desk Lamp", id: 29, availableQuantity: 220, description: "Stylish lamp with adjustable brightness.", price: 19.99 },
    { Image: "https://picsum.photos/200/300?random=30", name: "Smart Fridge", id: 30, availableQuantity: 20, description: "Revolutionize your kitchen with smart features.", price: 1499.99 },
  ];
  

  const refetch = () => {
    setCallback(!callback);
  };

  const handleSearchValues = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleSortPriceValues = (value) => {
    setSortOrder(value);
  };

  const handleSortNameValues = (value) => {
    setSortNameOrder(value);
  };

  // Step 1: Filter products by name
  const result = columns?.filter((product) =>
    product?.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Step 2: Sort the filtered products by name
  const sortedProducts = [...result].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortCriteria === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
    return 0; // No sorting if sortCriteria is not provided
  });

  // sortedProducts now holds the final result

  /*------CRUD START------ */

  /* ---- Edit start -----*/
  const editProduct = async (id) => {
    try {
      setIsOpen(true);
      setBtnLoading(true);
      setSelected(id);
      const { data } = await request.get(`/admin/product/${id}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.setFieldsValue(data);
    } finally {
      setBtnLoading(false);
    }
  };
  /* ---- Edit end -------*/

  /* Adding product */

  const submit = async () => {
    // try {
    //   setBtnLoading(true); // Show loading state on the button
    //   const values = await form.validateFields();
    //   const token = Cookies.get(TOKEN);
    //   console.log(token);
    //   const formValues = {
    //     ...values,
    //     price: Number(values.price),
    //     availableQuantity: Number(values.availableQuantity),
    //   };
    //   console.log(formValues);
    //   if(selected === null){
    //     await request.post("/admin/product/create", formValues, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //   }else{
    //     await request.post(`/admin/product/${selected}/update`, formValues , {
    //       headers:{
    //         Authorization:`Bearer ${token}`
    //       }
    //     })
    //   }
    //   refetch();
    //   setIsOpen(false);    // Close the modal
    // } catch (error) {
    //   console.error("Error submitting the form:", error);
    // } finally {
    //   setBtnLoading(false);
    //   setSelected(null);
    //   // Remove loading state on the button
    // }
  };
  /* ---- Adding end ---- */

  /*------- Delete Product ------*/
  const deleteProduct = (id) => {
    setDeleteModal(true);
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  /*-------Delete End ------*/

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
    form.resetFields(); // Clear the form fields after submission
  };

  /*------CRUD END------ */

  // const columns = [
  //   {
  //     title:"Image",
  //     dataIndex:"imageUrl",
  //     key:"imageUrl",
  //     render: (imageUrl) => {
  //       return <>
  //       <Image src={imageUrl}/>
  //       </>
  //     }
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Id",
  //     dataIndex: "id",
  //     key: "id",
  //   },
  //   {
  //     title: "AvailableQuantity",
  //     dataIndex: "availableQuantity",
  //     key: "availableQuantity",
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Price",
  //     dataIndex: "price",
  //     key: "price",
  //   },

  //   {
  //     title: "Action",
  //     dataIndex:"id",
  //     key: "id",
  //     render: (id) => (
  //       <>
  //         <Button onClick={() => editProduct(id)} type style={{ marginRight: "16px" , color:"blue" , border:"1px solid blue" }}>
  //           <EditOutlined/>
  //         </Button>
  //         <Button onClick={() => deleteProduct(id)} style={{border:"1px solid red"}}>
  //           <DeleteOutlined style={{     color:"red"}} />
  //         </Button>
  //       </>
  //     ),
  //   },
  // ];

  const token = Cookies.get(TOKEN);
  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await request.get("/admin/product/all/get", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProducts(data);
  //       console.log(data);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getCategories();
  // }, [callback]);

  return (
    <>
      {/* <Table
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
      /> */}
      <div className="product-input-group">
        <Search
          className="search"
          onChange={handleSearchValues}
          placeholder="Searching products ... "
        />
      {/* Sort Criteria Dropdown */}
      <select id="criteria" value={sortCriteria} onChange={handleSortCriteriaChange}>
        <option value="">Select Criteria</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>

      {/* Sort Order Dropdown */}
      <select  disabled={Boolean(sortCriteria !== "name" && sortCriteria !== "price")} id="order" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">{sortCriteria === "name" ? "A - Z" : sortCriteria === "price" ? "Low to high" : "Sort products" }</option>
        <option value="desc">{sortCriteria === "name" ? "Z - A" : sortCriteria === "price" ? "High to low" : "Sort products" }</option>
      </select>
      </div>
      <div className="flex gap-4 flex-wrap justify-center md:justify-between xl:grid-cols-2">
        {sortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {deleteModal ? (
        <DeleteWarning
          onEvent={refetch}
          closeDeleteModal={closeDeleteModal}
          text="product"
          id={deleteId}
        />
      ) : (
        ""
      )}
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
            label="Url"
            name="imageUrl"
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
