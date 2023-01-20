export default function EmptyBox() {
  return (
    <div className="container">
      <span className="title">텅</span>
      <span className="subtitle">{`아무것도 없네요 :(`}</span>
      <style jsx>{`
        .container {
          width: 100%;
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .title {
          font-size: 48px;
          font-weight: 900;
          color: #125b50;
        }
        .subtitle {
          font-size: 24px;
          font-weight: 500;
          color: #242424;
        }
      `}</style>
    </div>
  );
}
