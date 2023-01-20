import Link from "next/link";

export default function MakeClubComplete() {
  return (
    <div className="container">
      <span className="title">모임 생성이 완료되었습니다!</span>
      <span className="subtitle">
        새로운 모임원들과 함께 열심히 포트폴리오를 채워봐요.
      </span>
      <Link href="/bookclub" className="back">
        <a>돌아가기</a>
      </Link>
      <style jsx>{`
        .container {
          width: 100%;
          height: 600px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .title {
          font-size: 28px;
          font-weight: 900;
          color: #125b50;
        }
        .subtitle {
          font-size: 16px;
          font-weight: 500;
          color: #141414;
        }
        .back {
          margin-top: 10px;
        }
        a {
          margin-top: 10px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 300;
          color: #141414;
        }
      `}</style>
    </div>
  );
}
