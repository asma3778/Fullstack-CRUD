let products = [
    {
      "id": 1,
      "title": "Laptop",
      "description": "High-performance laptop for all your needs.",
      "price": 7000
    },
    {
      "id": 2,
      "title": "Smartphone",
      "description": "Latest smartphone with advanced features.",
      "price": 5000
    },
    {
      "id": 3,
      "title": "Gameing",
      "description": "Next-gen gaming console for immersive gameplay.",
      "price": 900
    },
    {
      "id": 4,
      "title": "Tablet",
      "description": "Compact and powerful tablet for work and entertainment.",
      "price": 3000
    },
    {
      "id": 5,
      "title": "Camera",
      "description": "High-resolution camera for capturing memories.",
      "price": 2000
    },
    {
      "id": 6,
      "title": "Fitness Tracker",
      "description": "Track your health and fitness goals with this smart tracker.",
      "price": 500
    },
    {
      "id": 7,
      "title": "Home Theater System",
      "description": "Create a cinematic experience at home with this system.",
      "price": 5000
    }
  ]
  

  export const getAllProducts =  (req, res) =>{
    res.status(200).send({
        success: true,
        message: 'all products are returned',
        payload: products,
    });
    return;
  };

  export const addProduct = (req, res) =>{
    try{
    const newProuct = {
        id: new Date(),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    };
    products.push(newProuct);
    res.status(201).json ({
        success: true,
        message: 'product is added'
    })
}catch (error){
    res.status(500).json ({
        message: error.message
    })
}
  }
  
  export const deleteSingleProduct = (req, res) => {
    try {
      const id = Number(req.params.id);
      const product = products.find((product) => product.id === id);
      if (!product) {
        res.status(404).json ({
            message: `Product not found with this id ${id}`
        }) 
      }
      const filteredProducts = products.filter((product) => product.id !== id);
      products = filteredProducts;
      res.status(200).json ({
        message: `deleted product with id ${id}`,
        payload: products
    }) 
    } catch (error){
        res.status(500).json ({
            message: error.message
        })
    }
  };

  export const updateSingleProduct  = (req, res) => {
    try {
      const id = Number(req.params.id);
      const product = products.find((product) => product.id === id);
      const { title, description, price } = req.body;

      const index = products.findIndex((product) => product.id === id);
      if (index < 0){
        res.status(404).json ({
            message: `Product not found with this id ${id}`
      })
      }
      products[index].title = title ?? products[index].title;
      products[index].description = description ?? products[index].description;
      products[index].price = price ?? products[index].price;
      res.status(200).json ({
        message: `update product with id ${id}`,
        payload: products
    }) 
    } catch (error){
        res.status(500).json ({
            message: error.message
        })
    }
  };