import CardFrontBGImage from "images/bg-card-front.png";

import "./style.scss";

function CardFront() {
  return (
    <div className="card-front-wrapper">
      <img className="card-front-bg" src={CardFrontBGImage} alt="Card front" />
    </div>
  );
}

export default CardFront;
