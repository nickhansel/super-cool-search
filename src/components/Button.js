import './Button.css';

function Button({ children, size, inverted, nopadding, onClick }) {

  const styleClass = inverted ? "ButtonInverted" : "";
  const sizeClass = `Button${size || "Med"}`;
  const paddingClass = !nopadding ? "ButtonPadding" : "";

  return (
    <div onClick={onClick} className={`Button ${sizeClass} ${styleClass} ${paddingClass}`}>
      {children}
    </div>
  );
}

export default Button;
