import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar";
import productsController from "../../controller/products";
import BasicPagination from "../../components/Pagination";
import BasicSelect from "../../components/Select";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalCountProducts, setTotalCountProducts] = useState(0);
  const [itemsPerPage] = useState(5);
  const [category, setCategory] = useState("All");

  const searchRef = useRef({});

  const search = async () => {
    const searchQuery = searchRef.current.value;
    setSearchParams(searchQuery);
    await fetchProducts(searchQuery);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async (searchQuery = "") => {
    setLoading(true);
    const { totalProducts, data } = await productsController.getProducts(
      currentPage,
      itemsPerPage,
      searchQuery
    );

    setTotalCountProducts(totalProducts);
    setProducts(data);
    setLoading(false);

    if (currentPage === undefined) {
      const totalPages = Math.ceil(totalProducts / itemsPerPage);
      setCurrentPage(totalPages > 0 ? 1 : undefined);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setCurrentPage(undefined);
    setSearchParams("");
  };

  useEffect(() => {
    let filteredData = [...products];
    if (category !== "All") {
      filteredData = products.filter((d) => d.category === category);
    }
    setProducts(filteredData);
  }, [category, products]);

  return (
    <div>
      <Navbar />
      <h1>Products</h1>
      <div className="filters-container">
        <div className="filters-search">
          <input type="text" ref={searchRef} />
          <button onClick={search}>Search</button>
        </div>
        <BasicSelect category={category} setCategory={handleCategoryChange} />
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {products.map((p) => (
            <Card key={p.id} product={p} />
          ))}
          <div>
            {currentPage !== undefined && (
              <BasicPagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalCountProducts / itemsPerPage)}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;