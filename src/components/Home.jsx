/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1])

  const [filterProducts, setFilterProducts] = useState(null)

  const getProductsCategory = async () => {
    try {
      const {data} = await axios.get(`/products/category/${category}`)
      setFilterProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(!filterProducts) setFilterProducts(products);
    if(category != "undefined") getProductsCategory();
  },[category,products]);


  return products ? (
    <>
      <Nav />
      <div className="w-[80%] p-10 pt-[5%] flex flex-wrap gap-6 overflow-x-hidden overflow-y-auto">
        {filterProducts && filterProducts.map((item, index) => {
            return (
                <Link key={item.id}
                to={`/details/${item.id}`}
                className="card w-[20%] h-[40vh] p-3 shadow rounded border flex flex-col items-center justify-center"
              >
                <div className="w-full h-[80%] mb-3 hover:scale-110 bg-contain bg-no-repeat bg-center transition-transform" style={{
                    backgroundImage: `url(${item.image})`
                }}>
                </div>
                <h1 className="leading-5 hovet:text-blue-300">
                  {item.title}
                </h1>
              </Link>
            )
        })}
      </div>
    </>
  ) : (<Loading />)
};

export default Home;
