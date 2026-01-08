import { Link } from "react-router-dom";

const Items = ({ id, img, name, price }) => {
  return (
    <Link
      to={`/item/${id}`}
      state={{ product: { id, img, name, price } }}
      className="
        bg-white dark:bg-[#1e1e1e]
        rounded-2xl border
        p-4
        flex flex-col items-center
        text-center
        transition
        hover:scale-105 hover:shadow-lg
      "
    >
      <img
        src={img}
        alt={name}
        className="
          w-[140px] h-[160px]
          object-contain
          mb-3
        "
      />

      <h3 className="text-sm font-semibold mb-1">
        {name}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        From {price}
      </p>
    </Link>
  );
};

export default Items;
