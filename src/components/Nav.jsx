import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${
      (Math.random() * 255).toFixed()
    },0.4)`;
  };

  return (
    <>
      <nav className="w-[20%] h-full bg-zinc-100 flex flex-col items-center pt-5">
        <a
          className="px-5 py-3 rounded border border-blue-400 text-blue-400"
          href=""
        >
          Add New Product
        </a>
        <hr className="my-3 w-[80%]" />
        <h1 className="text-2xl mb-3 w-[80%]">Categories</h1>
        <div className="w-[80%]">
          {distinct_category.map((category, index) => (
            <Link
              key={index}
              to={`/?category=${category}`}
              className="mb-3 flex items-center"
            >
              <span
                style={{ backgroundColor: color() }}
                className="w-[15px] h-[15px] bg-blue-200 rounded-full mr-2"
              ></span>
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;
