import speechbubble from "../res/speechbubble.svg";
import Image from "next/image";
import notetaking from "../res/notetaking.svg";
import Router from "next/router";

export default function Error() {
  const router = Router;

  const toHome = () => {
    router.push("/");
  };
  return (
    <div className="container">
      <div className="img-box">
        <Image src={speechbubble} width="266" height="91" alt="404" />
        <Image src={notetaking} width="406" height="306" alt="note" />
      </div>
      <div className="info-box">
        <span>접근할 수 없는 페이지입니다!</span>
        <button onClick={() => toHome()}>북로그 메인 화면으로</button>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          padding-top: 100px;
          background-color: #faf5e4;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .img-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .info-box span {
          font-size: 24px;
          color: #125b50;
          font-weight: 900;
        }
        .info-box button {
          color: #faf5e4;
          font-weight: 900;
          border: none;
          background-color: #125b50;
          border-radius: 10px;
          padding: 10px 15px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .info-box button:hover {
          background-color: #ff6363;
        }
      `}</style>
    </div>
  );
}
