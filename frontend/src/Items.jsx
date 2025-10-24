const Items = (props) => {
  return (
    <div>
        <a href="" className="box">
            <img src={props.img} alt=""></img>
            <h3>{props.name}</h3>
            <h4>From {props.price}</h4>
        </a>
    </div>
  );
};

export default Items;