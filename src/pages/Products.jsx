import Card from "../components/Card/Card";
import Navbar from "../components/Navbar";
import productsController from "../controller/products";
import { useEffect, useRef, useState } from "react";
import BasicPagination from "../components/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const searchRef = useRef({});

  const search = async () => {
    setParams({ ...params, q: searchRef.current.value });
    console.log(params);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    const { data } = await productsController.getProducts();
    setProducts(data);
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <input type="text" ref={searchRef} />
      <button onClick={search}>Search</button>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((p) => <Card key={p.id} product={p} />)
      )}
      <BasicPagination/>
    </div>
  );
};

export default Products;
