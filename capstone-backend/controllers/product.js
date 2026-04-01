// capstone-backend/controllers/product.js
import Product from '../models/Product.js'; // const Product = require ('../models/Product.js'); 
import { v2 as cloudinary } from 'cloudinary'; // const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'capstone-example'
    };
     // Convert buffer to base64 string
    const base64Image = image.buffer.toString('base64');
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;
    console.log(image)
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(dataUri, options);

        const data = {
            url: result.secure_url,
            altText: `Image of ${result.display_name}`,
        };

        return data;

    } catch (error) {
        console.error(error);
    }
}

export const getProducts = async (req, res) => { 
    try {
        const { categories } = req.query;
        const filter = {};

        if (categories) filter.categories = categories;

        const products = await Product.find(filter);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const createProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        const uploadImages = [];
        for (const file of req.files) {
            uploadImages.push(await uploadImage(file));
        };

        const shortDesc = req.body.longDescription.length < 157 ? req.body.longDescription : `${req.body.longDescription.substring(0, 157)}...`;
        const product = new Product({
            ...req.body,
            images: uploadImages,
            shortDescription: shortDesc,
        });

        console.log(product);
        console.log(product.images);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted item" });
  } catch(err) {
    res.status(500).json({ error: err.message});
  }
}