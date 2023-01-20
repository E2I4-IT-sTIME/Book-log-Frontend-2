interface propsType {
  onClick: () => void;
  color: string;
  text: string;
}

const Button = (props: propsType) => {
  return (
    <>
      <div
        className="button"
        style={{ backgroundColor: props.color }}
        onClick={props.onClick}
      >
        {props.text}
      </div>
      <style jsx>{`
        .button {
          border: 0px;
          font-size: 20px;
          font-weight: bold;
          color: white;
          border-radius: 20px;
          padding: 15px 40px;
          cursor: pointer;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease-in-out;
        }
        .button:hover {
          margin-top: -1px;
          margin-left: 0px;
          transform: scale(1.03, 1.03);
          box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default Button;
