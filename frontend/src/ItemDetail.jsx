import { useLocation, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  // If no item data, redirect to home
  if (!item) {
    navigate('/');
    return null;
  }

  const handleAddToCart = () => {
    alert(`Added ${item.name} to cart!`);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="item-detail">
      <div className="detail-container">
        <button onClick={handleGoBack} className="back-button">
          ← Back to Home
        </button>
        
        <div className="item-content">
          <div className="item-image">
            <img src={item.img} alt={item.name} />
          </div>
          
          <div className="item-info">
            <h1>{item.name}</h1>
            <h2 className="price">{item.price}</h2>
            
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

