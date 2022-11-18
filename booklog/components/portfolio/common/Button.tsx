interface propsType {
  onClick: () => void;
  color: string;
  text: string;
}

const Button = (props: propsType) => {
  return (
    <>
      <button style={{ backgroundColor: props.color }} onClick={props.onClick}>
        {props.text}
      </button>
      <style jsx>{`
        button {
          border: 0px;
          font-size: 20px;
          font-weight: bold;
          color: white;
          border-radius: 20px;
          padding: 15px 40px;
          cursor: pointer;
          box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default Button;
