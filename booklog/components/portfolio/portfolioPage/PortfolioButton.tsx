interface Ibutton {
  text: string;
  color: string;
  onClick: () => {};
}

const PortfolioButton = (props: Ibutton) => {
  const { text, color, onClick } = props;
  return (
    <>
      <div
        className="button"
        onClick={() => {
          onClick();
        }}
      >
        {text}
      </div>
      <style jsx>{`
        .button {
          display: inline-block;
          font-size: 14px;
          font-weight: 700;
          padding: 8px 15px;
          margin-left: 10px;
          border-radius: 10px;
          color: white;
          border: none;
          cursor: pointer;
          background-color: ${color};
          transition: all 0.2s;
        }
        .button:hover {
          transform: scale(1.1, 1.1);
          box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default PortfolioButton;
