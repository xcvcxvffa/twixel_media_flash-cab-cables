import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    imgList: [
      {
        id: String,
        name: String,
        img: String, // base64 string
      },
    ],
    applications: [
      {
        id: String,
        title: String,
        icon: String, // base64 image or icon class
      },
    ],
    technicalDetails: [
      {
        id: String,
        label: String,
        value: String,
      },
    ],
    features: [
      {
        id: String,
        title: String,
        description: String, // Rich text
      },
    ],
    specificationHtml: {
      type: String,
      default: '',
    },
    status: {
      type: Number, // 0: Active, 1: Draft, etc.
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
