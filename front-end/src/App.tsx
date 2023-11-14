import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";

import "./index.css";

type Product = {
  id: number;
  title: string;
  description: String;
  price: number;
};
const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
  });

const[isEdit,setIsEdit]=useState(false);
const[selectedProductId,setSelectedProductId]=useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleFormOpen = ()=>{
    setIsFormOpen(!isFormOpen)
  }

  const fetchAllProduct = async () => {
    const { data } = await axios.get("http://localhost:8000/products");
    setProducts(data.payload);
  };

  const handleDelete = async (id: number) => {
   try {
    await axios.delete(`http://localhost:8000/products/${id}`);
    fetchAllProduct();

   } catch (error) {
   
   }
  };

  const createNewProduct = async (product: { title: string; description: String ; price: number }) => {
    try { await axios.post(
        "http://localhost:8000/products",
        product
      );
      fetchAllProduct();
    } catch (error) {
      
    }
  };

  
  const handleUpdateProduct=async()=>{
try {
  if(!selectedProductId){
    ('Please select a product to update')
    return
  }
  const updateProductData={
    title:product.title,
    description:product.description,
    price:product.price
  }
  await axios.put(`http://localhost:8000/products/${selectedProductId}`,updateProductData);
  ("Product updated successfully");
  fetchAllProduct()
  setIsEdit(false);
  setSelectedProductId(null);
  setProduct({
    title:'',
    description:'',
    price:0
  })
} catch (error) {
}
  }

  const updateOrCreateNewProduct=async()=>{
if(isEdit){
  handleUpdateProduct()
}else{
  createNewProduct(product)
}
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProduct((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateOrCreateNewProduct()
    setProduct({
      title: "",
      description:'',
      price: 0,
    });
   
    setIsEdit(false);
    setSelectedProductId(null);
  };
  return (
    <>
    <button onClick={handleFormOpen}>Add</button>
      {isFormOpen &&
      <form action="" onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          placeholder="Enter the name of the product"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="text"
          placeholder="Enter the description of the product"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="input-box"
        />
        <input
          type="number"
          placeholder="Enter the price of the product"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="input-box"
        />
        <button className="btn">{isEdit ? "Edit" : "Create"}</button>
      </form>
}
      <section className="products">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <article key={product.id} className="product">
                <h2>Name:{product.title}</h2>
                <h4>Description:{product.description}</h4>
                <h4>Price: {product.price} SR</h4>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </button>
              
                <button  className="btn" onClick={()=>{
                  setIsEdit(true);
                  setSelectedProductId(product.id);
                  setProduct({
                    title:product.title,
                    description:product.description,
                    price:product.price
                  })
                }}>Update</button>
              </article>
            );
          })}
      </section>
    </>
  );
};

export default App;