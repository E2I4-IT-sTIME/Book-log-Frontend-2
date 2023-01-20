import MakeClubFrame from "./MakeClubFrame";

export default function MakeClubLayout() {
  return (
    <div className="container">
      <div className="upper-box" />
      <div className="frame">
        <div className="title-box">
          <span className="title">독서모임 생성하기</span>
          <span className="subtitle">
            나만의 독서모임을 생성하고, 함께 포트폴리오를 채워보세요.
          </span>
        </div>
        <MakeClubFrame />
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 500px;
        }
        .upper-box {
          width: 100%;
          height: 700px;
          background-color: #faf5e4;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-right: 500px;
        }
        .frame {
          width: 70vw;
          position: absolute;
          top: 150px;
          right: 70px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 20px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;
        }
        .title {
          font-size: 28px;
          font-weight: 900;
          color: #125b50;
        }
        .subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #141414;
        }
      `}</style>
    </div>
  );
}
