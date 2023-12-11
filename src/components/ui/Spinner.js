import './Spinner.css';

function Spinner({ fullscreen }) {
  return (
    <div className={fullscreen ? "SpinnerFullscreen" : "Spinner"}>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
