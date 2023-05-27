import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ product }) => {
  return (
    <div className="card">
      <Link target='_blank' to={`/products/${product.id}`} className="card__link">
        <div className="card_image_wrapper">
          <img className="card__image" src={product.img} alt={product.title} />
        </div>
        <div className="card__content">
          <h3 className="card__title">{product.title}</h3>
        </div>
        <div className="card__footer">
          <div className="card__price">${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
