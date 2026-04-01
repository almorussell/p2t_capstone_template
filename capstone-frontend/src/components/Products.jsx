import { useCartStore } from "../store/CartStore";
import { useUserStore } from "../store/UserStore";
import { deleteProduct } from "../services/ProductService";

const Products = ({ products = [] }) => {
const { addItem } = useCartStore();
const { role } = useUserStore();
async function handleDelete(id) {
  try{
    await deleteProduct(id);
  } catch(err) {
    console.log(err.message);
  }
}
return (
    <section>
        {products?.map((product) => (
          <section key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            {/* Remove width and height if using proper styling */}
          <img src={product.images[0].url} width="100" height="100" />
          <br></br>
            {role === "admin" && (
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          )}
            <button type="button" onClick={() => addItem(product)}>Add to Cart</button>
          </section>
     ))}
    </section>
  );
};

export default Products;