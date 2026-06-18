import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

async function updateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    try {
      await Product.collection.dropIndex('productCode_1');
      console.log('Dropped index productCode_1');
    } catch (e) {
      console.log('Index productCode_1 might not exist or already dropped.', e.message);
    }

    const result = await Product.collection.updateMany({}, { $unset: { productCode: "" } });
    console.log(`Removed productCode field from ${result.modifiedCount} documents.`);

    process.exit(0);
  } catch (error) {
    console.error('Error updating slugs:', error);
    process.exit(1);
  }
}

updateSlugs();
