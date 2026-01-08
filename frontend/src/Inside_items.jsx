import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart, saveCart } from "./cartStorage";

const InsideItems = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (!product) return;
    const exists = getCart().some(
      item => item.productId === product.id
    );
    setIsInCart(exists);
  }, [product]);

  const handleToggleCart = () => {
    const cart = getCart();

    if (isInCart) {
      saveCart(cart.filter(item => item.productId !== product.id));
      setIsInCart(false);
    } else {
      saveCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          prices: product.prices,
          img: product.img,
          quantity: 1,
        },
      ]);
      setIsInCart(true);
    }
  };

  if (!product)
    return (
      <h2 className="text-center text-2xl mt-10">
        Product Not Found
      </h2>
    );

  return (
    <div
      className="w-screen h-screen flex justify-center items-center gap-20
        bg-white dark:bg-[#121212] p-5
        md:flex-col md:h-auto md:text-center"
    >
      <img
        src={product.img}
        alt={product.name}
        className="w-[450px] h-[80vh] object-contain
          md:w-[300px] md:h-auto"
      />

      <div>
        <p className="text-[40px] font-semibold text-[#222] dark:text-white">
          {product.name}
        </p>

        <h6 className="text-[32px] text-green-600 my-5">
          {product.price}
        </h6>

        <button
          onClick={handleToggleCart}
          className={`px-7 py-3 rounded-xl text-xl font-bold
            text-white transition
            ${
              isInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-accent hover:bg-yellow-600"
            }`}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default InsideItems;
