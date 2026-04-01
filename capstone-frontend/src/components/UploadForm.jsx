// capstone-frontend/src/components/UploadForm.jsx
import { useState } from 'react';


const UploadForm = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState({
    file: null,
    name: '',
    price: '',
    description: '',
    categories: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleFileChange = (event) => {
    setFormData(prev => ({ ...prev, file: event.target.files[0] }));
    setError(null);
    setFieldErrors(prev => ({ ...prev, file: null }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.file) {
      errors.file = 'Please select an image';
    }
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Please enter a valid price greater than 0';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setError(null);

    // Create FormData and append all fields
    const uploadFormData = new FormData();
    uploadFormData.append('productImages', formData.file);
    uploadFormData.append('name', formData.name);
    uploadFormData.append('price', formData.price);
    uploadFormData.append('longDescription', formData.description);
    uploadFormData.append('categories', formData.categories); //Hard-coded Category, be sure to change this for dynamic purpose

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/product/add`,
        {
          method: 'POST',
          body: uploadFormData,
        }
      );

      const result = await res.json();
      
      if (res.ok) {
        onUploadSuccess({
          url: result.url,
          publicId: result.public_id,
          name: formData.name,
          price: formData.price,
          description: formData.description
        });
        
        // Reset form
        setFormData({
          file: null,
          name: '',
          price: '',
          description: ''
        });
        // Reset file input
        event.target.reset();
      } else {
        setError(result.message || 'Upload failed');
        console.error(result);
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Image Upload Field */}
      <div>
        <label htmlFor="image">
          <span>Product Image *</span>
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {fieldErrors.file && (
          <label>
            <span>{fieldErrors.file}</span>
          </label>
        )}
      </div>
            <select id="categories" name="categories" onChange={handleInputChange}>
        <option value="shoes">Shoes</option>
        <option value="clothing">Clothing</option>
        <option value="accessories">Accessories</option>
      </select>

      {/* Product Name Field */}
      <div>
        <label htmlFor="name">
          <span>Product Name *</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={isUploading}
        />
        {fieldErrors.name && (
          <label>
            <span>{fieldErrors.name}</span>
          </label>
        )}
      </div>

      {/* Price Field */}
      <div>
        <label htmlFor="price">
          <span>Price *</span>
        </label>
        <div>
          <span>$</span>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            disabled={isUploading}
          />
        </div>
        {fieldErrors.price && (
          <label>
            <span>{fieldErrors.price}</span>
          </label>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description">
          <span>Description *</span>
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Enter product description (minimum 10 characters)"
          value={formData.description}
          onChange={handleInputChange}
          disabled={isUploading}
        />
        {fieldErrors.description && (
          <label>
            <span>{fieldErrors.description}</span>
          </label>
        )}
        {!fieldErrors.description && formData.description && (
          <label>
            <span>
              {formData.description.length}/10 minimum characters
            </span>
          </label>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button 
          type="submit"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              Uploading...
            </>
          ) : (
            'Upload Product'
          )}
        </button>
      </div>
      
      {/* Error Message */}
      {error && (
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

export default UploadForm;