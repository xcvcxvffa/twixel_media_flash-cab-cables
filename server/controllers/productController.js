import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Private
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json({
      data: products,
      total: products.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Private
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      slug: req.body.slug || '',
      description: req.body.description || '',
      imgList: req.body.imgList || [],
      applications: req.body.applications || [],
      technicalDetails: req.body.technicalDetails || [],
      features: req.body.features || [],
      specificationHtml: req.body.specificationHtml || '',
      status: req.body.status !== undefined ? req.body.status : 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.slug = req.body.slug !== undefined ? req.body.slug : product.slug;
      product.description = req.body.description !== undefined ? req.body.description : product.description;
      product.imgList = req.body.imgList || product.imgList;
      product.applications = req.body.applications || product.applications;
      product.technicalDetails = req.body.technicalDetails || product.technicalDetails;
      product.features = req.body.features || product.features;
      if (req.body.specificationHtml !== undefined) product.specificationHtml = req.body.specificationHtml;
      product.status = req.body.status !== undefined ? req.body.status : product.status;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid product data' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
