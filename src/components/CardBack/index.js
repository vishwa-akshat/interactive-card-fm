import CardBackBGImage from "images/bg-card-back.png";

import "./style.scss";

function CardBack() {
  return (
    <div className="card-back-wrapper">
      <img className="card-back-bg" src={CardBackBGImage} alt="Card back" />
    </div>
  );
}

export default CardBack;
