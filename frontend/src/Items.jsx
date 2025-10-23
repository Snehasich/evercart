import { Link } from 'react-router-dom';

const Items = (props) => {
  const itemData = {
    name: props.name,
    price: props.price,
    img: props.img
  };

  return (
    <div>
        <Link to="/item-detail" state={{ item: itemData }} className="box">
            <img src={props.img} alt=""></img>
            <h3>{props.name}</h3>
            <h4>From {props.price}</h4>
        </Link>
    </div>
  );
};

export default Items;