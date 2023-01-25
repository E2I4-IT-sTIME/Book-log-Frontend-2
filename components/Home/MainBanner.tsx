import readingBook from "../../res/readingBook.svg";
import Image from "next/image";
import Router from "next/router";

export default function MainBanner() {
  const router = Router;

  return (
    <div className="container">
      <div className="left-box">
        <span className="sub-content">{"독서도\n스펙이 될 수 있다."}</span>
        <span className="main-content">{"북로그와 함께라면-"}</span>
        <div className="btns">
          <button onClick={() => router.push("/portfolio")}>
            포트폴리오 작성하기
          </button>
          <button
            onClick={() =>
              window.open(
                "https://velog.io/@igun0423/Booklog-%EC%82%AC%EC%9A%A9%EB%B2%95"
              )
            }
          >
            북로그 사용법
          </button>
        </div>
      </div>
      <div className="right-box">
        <div className="f-circle" />
        <div className="s-circle" />
        <div className="t-circle" />
        <div className="img-box">
          <Image
            src={readingBook}
            layout="fill"
            objectFit="cover"
            alt="reading-book-img"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 600px;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .left-box {
          width: 100%;
          height: 100%;
        }
        .right-box {
          background-color: #faf5e4;
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .f-circle,
        .s-circle,
        .t-circle {
          position: absolute;
          border-radius: 100%;
        }
        .f-circle {
          width: 200px;
          height: 200px;
          background-color: #f8b400;
          top: 50px;
          left: -50px;
        }
        .s-circle {
          width: 250px;
          height: 250px;
          background-color: #125b50;
          right: -50px;
          top: 150px;
        }
        .t-circle {
          width: 300px;
          height: 300px;
          background-color: #ff6363;
          left: 50px;
          bottom: -100px;
        }
        .img-box {
          width: 60%;
          height: 50%;
          position: relative;
        }
        .left-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 0px 50px 70px 0px;
          white-space: pre-line;
          text-align: end;
          gap: 10px;
        }
        .sub-content {
          font-weight: 800;
          font-size: 28px;
        }
        .main-content {
          font-weight: 900;
          font-size: 32px;
        }
        .btns {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .btns button {
          border: 3px solid #265042;
          font-size: 18px;
          font-weight: 800;
          color: #265042;
          background-color: white;
          cursor: pointer;
          transition: all 0.15s;
          padding: 7px 15px;
          border-radius: 10px;
        }
        .btns button:hover {
          color: white;
          background-color: #265042;
        }
      `}</style>
    </div>
  );
}
