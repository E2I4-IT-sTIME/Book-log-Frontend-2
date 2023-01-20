interface contentProps {
  title: string;
  sub: string;
}

const PageTitle = (props: contentProps) => {
  const { title, sub } = props;
  const subText = () => {
    return (
      <span>
        {sub.split("\n").map((txt) => (
          <>
            {txt}
            <br />
          </>
        ))}
      </span>
    );
  };

  return (
    <>
      <div className="container">
        <div className="title">{title}</div>
        <div className="sub">{subText()}</div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          margin: 20px 0;
          font-family: "Pretendard-Regular";
        }
        .title {
          font-size: 30px;
          font-weight: 900;
          color: #125b50;
          margin-bottom: 20px;
        }
        .sub {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default PageTitle;
