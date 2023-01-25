interface IdeleteButton {
  id?: string;
  text: string;
  color?: string;
  onClick: (id: any) => void;
}

const DeleteButton = (props: IdeleteButton) => {
  const { id, text, color, onClick } = props;

  return (
    <>
      <div
        className="delete"
        onClick={() => {
          onClick(id);
        }}
      >
        {text}
      </div>
      <style jsx>{`
        .delete {
          background-color: ${color || "#ff8396"};
          border-radius: 50%;
          color: white;
          height: 20px;
          min-width: 20px;
          line-height: 18px;
          text-align: center;
          font-weight: bold;
          transition: all 0.2s;
        }
        .delete:hover {
          margin-top: -1px;
          margin-left: 0px;
          transform: scale(1.1, 1.1);
          box-shadow: 0px 5px 5px -2px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
};

export default DeleteButton;
