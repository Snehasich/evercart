import { Link } from "react-router-dom";

const Items = (props) => {
  return (
    <div>
      <Link to={`/item/${props.id}`} className="box" state={{ product: props }}>
        <img src={props.img} alt={props.name} />
        <h3>{props.name}</h3>
        <h4>From {props.price}</h4>
      </Link>
    </div>
  );
};

export default Items;
