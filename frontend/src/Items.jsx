import { Link } from "react-router-dom";

const Items = ({ id, img, name, price, style, ...rest }) => {
  return (
    <div>
      <Link to={`/item/${id}`} className="box" state={{ product: { id, img, name, price, style, ...rest } }}>
        <img src={img} alt={name} style={style} />
        <h3>{name}</h3>
        <h4>From {price}</h4>
      </Link>
    </div>
  );
};

export default Items;
