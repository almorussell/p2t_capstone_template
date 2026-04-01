import axios from 'axios';

const baseUrl = 'http://localhost:3500/';

export async function getProducts() {
    const { data } = await axios.get(`${baseUrl}product`);
    return data;
}

// This function retrieves a product by its ID and has been created for you, but you will need to import it in your components as needed.
export async function getProductById(id) {
    const { data } = await axios.get(`${baseUrl}product/${id}`);
    return data;
}

// This function creates a new product in the database
export async function createProduct(formData) {
    await axios.post(`${baseUrl}products`, {
        id: formData.id,
        name: formData.name,
        price: formData.price,
    })
}

export async function deleteProduct(id) {
    const { data } = await axios.delete(`${baseUrl}product/${id}`);
    return data;
}