import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar";
import productsController from "../../controller/products";
import BasicPagination from "../../components/Pagination";
import BasicSelect from "../../components/Select";
import "./Products.css";
import RangeSlider from "../../components/Slider";
import { useDebounce } from "../../hooks/useDebounce";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalCountProducts, setTotalCountProducts] = useState(0);
  const [itemsPerPage] = useState(5);
  const [category, setCategory] = useState("All");
  const [currentPrices, setCurrentPrices] = useState([0, 20]);

  const searchRef = useRef({});

  const search = async () => {
    const searchQuery = searchRef.current.value;
    setSearchParams(searchQuery);
    await fetchProducts(searchQuery);
  };

  const priceDebounce = useDebounce(currentPrices, 1000);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, priceDebounce]);

  const fetchProducts = async (searchQuery = "") => {
    setLoading(true);
    const { totalProducts, data } = await productsController.getProducts(
      currentPage,
      itemsPerPage,
      searchQuery,
      currentPrices[0], // Минимальная цена
      currentPrices[1] // Максимальная цена
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

  const handleCurrentPricesChange = (currentPrices) => {
    setCurrentPrices(currentPrices);
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
        <RangeSlider
          currentPrices={currentPrices}
          setCurrentPrices={handleCurrentPricesChange}
        />
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
