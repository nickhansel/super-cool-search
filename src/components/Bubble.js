import "./Bubble.css";

import grad from "../utils/grad";

function Bubble({ image, seed, hue, symbol, text, decoration, size }) {
  let bubbleStyles = {};
  if (image) {
    bubbleStyles.backgroundImage = `url("${image}")`;
  } else {
    bubbleStyles.background = grad(seed, hue);
  }

  return (
    <div className="Bubble" style={bubbleStyles} alt={text}>
      {image || !symbol ? "" : symbol}
      {decoration ? <div className="BubbleDecoration">{decoration}</div> : ""}
    </div>
  );
}

export default Bubble;
