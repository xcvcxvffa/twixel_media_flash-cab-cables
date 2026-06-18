import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function updateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    const products = await Product.find({});
    let updatedCount = 0;

    for (const product of products) {
      if (!product.slug || product.slug === '') {
        const oldCode = product.get('productCode');
        
        if (oldCode && oldCode !== '') {
          product.slug = oldCode;
        } else if (product.name) {
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
    
    const result = await Product.collection.updateMany({}, { $unset: { productCode: "" } });
    console.log(`Removed productCode field from ${result.modifiedCount} documents.`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating slugs:', error);
    process.exit(1);
  }
}

updateSlugs();
