const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');

async function updateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const products = await Product.find({});
    let updatedCount = 0;

    for (const product of products) {
      // If slug is empty or we want to re-generate it
      if (!product.slug || product.slug === '') {
        // Try to get from productCode (since it might still be in the doc dynamically)
        const oldCode = product.get('productCode');
        
        if (oldCode && oldCode !== '') {
          product.slug = oldCode;
        } else if (product.name) {
          // Generate from name
          product.slug = product.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        } else {
          product.slug = `product-${Date.now()}`;
        }
        
        await product.save();
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} products with slugs.`);
    
    // Also remove productCode field from all documents
    const result = await Product.collection.updateMany({}, { $unset: { productCode: "" } });
    console.log(`Removed productCode field from ${result.modifiedCount} documents.`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating slugs:', error);
    process.exit(1);
  }
}

updateSlugs();
