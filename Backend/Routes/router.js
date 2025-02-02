const express = require('express');
const router = express.Router();
const products = require('../Models/Products');

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

{/*router.get('/searchproducts', async (req, res) => {
    const query = req.query.query;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Search query is required.' });
  }

  try {
    // Use regex to search for products with the query as a substring, case-insensitive
    const products = await Products.find({
      ProductName: { $regex: query, $options: 'i' } // 'i' for case-insensitive
    });

    if (products.length === 0) {
      return res.status(200).json({ success: true, message: 'No products found.', products: [] });
    }

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ success: false, message: 'Failed to search products.' });
  }
});*/}

// Route to search for products by name (partial match)
router.get('/searchproducts', async (req, res) => {
    const query = req.query.query;
  
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required.' });
    }
  
    try {
      // Log the search query for debugging
      console.log("Search Query:", query);
  
      // Search for products with ProductName matching the query (case-insensitive, partial match)
      const Products = await products.find({
        ProductName: { $regex: query, $options: 'i' } // 'i' for case-insensitive search
      });
  
      // Log the fetched products for debugging
      console.log("Products Found:", Products);
  
      if (products.length === 0) {
        
        return res.status(200).json({ success: true, message: 'No products found.', Products: [] });
      } 
      res.status(200).json({
        
        success: true,
        Products,
      });
    } catch (error) {
      console.error('Error searching for products:', error);
      res.status(500).json({ success: false, message: 'Failed to search products.' });
    }
  });


//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;