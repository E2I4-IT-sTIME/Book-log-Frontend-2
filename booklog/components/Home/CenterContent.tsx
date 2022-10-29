import { useState } from "react";
import linked from "../../res/linked.svg";
import portfolio from "../../res/portfolio.svg";
import Image from "next/image";
import Link from "next/link";

enum Theme {
  Green,
  Yellow,
}

export default function CenterContent() {
  const [theme, setTheme] = useState(Theme.Green);
  const content =
    "책을 찾아서 서평을 작성해보세요.\n내가 어떤 사람인지 보여줄 수 있도록, 유사한 테마끼리 묶어 포트폴리오로 제작할 수 있습니다.\n생성된 포트폴리오 링크를 공유해보세요!";
  console.log(theme);
  return (
    <div className="container">
      <div className="title-box">
        <span className="subtitle">독서가 스펙이 되는 마법</span>
        <span className="main-title">북로그에선 가능합니다.</span>
        <span className="content">{content}</span>
      </div>
      <div className="puzzle-box">
        <div className="center-box">
          <div
            className="left-up"
            onClick={() =>
              setTheme((prev) =>
                prev === Theme.Green ? Theme.Yellow : Theme.Green
              )
            }
          />
          <div
            className="right-up"
            onClick={() =>
              setTheme((prev) =>
                prev === Theme.Green ? Theme.Yellow : Theme.Green
              )
            }
          />
          <div
            className="left-down"
            onClick={() =>
              setTheme((prev) =>
                prev === Theme.Green ? Theme.Yellow : Theme.Green
              )
            }
          />
          <div
            className="right-down"
            onClick={() =>
              setTheme((prev) =>
                prev === Theme.Green ? Theme.Yellow : Theme.Green
              )
            }
          />
        </div>
        <div className="content-box">
          <div className="img-box">
            <Image
              src={theme === Theme.Green ? linked : portfolio}
              layout="fill"
              objectFit="cover"
              alt="banner-img"
            />
          </div>
          <span className="title">
            {theme === Theme.Green
              ? "책 읽고,\n 링크드인 채우고!"
              : "독서를 사랑하니까,\n포트폴리오는 책으로!"}
          </span>
          <Link href="">
            <span className="link">서평 작성하러가기</span>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container{
          width:100%
          display:flex;
          flex-direction:column;
          align-items:center;
          gap: 30px;
        }
        .title-box{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:5px;
        }
        .subtitle{
          font-size: 28px;
          font-weight: 800;
        }
        .main-title{
          font-size: 32px;
          font-weight: 900;
        }
        .content{
          font-weight:300;
          font-size: 16px;
          white-space:pre-line;
          text-align:center;
          line-height: 22px;
          margin-top:20px;
        }
        .puzzle-box{
          position:relative;
          display:flex;
          justify-content:center;
          align-items:center;
          margin: 100px 0px;
        }
        .center-box{
          width:300px;
          height: 300px;
          background-color: ${theme === Theme.Green ? "#125B50" : "#FFB200"};
          border-radius: 20px;
          transform:rotate(45deg);
          position:relative;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }
        .left-up, .right-down{
          width: 0;
          height: 0;
          border-bottom: ${
            theme === Theme.Green ? "80px solid #FFB200" : "80px solid #125B50"
          };
          border-top: 80px solid transparent;
          border-left: ${
            theme === Theme.Green ? "80px solid #FFB200" : "80px solid #125B50"
          };
          border-right: 80px solid transparent;
          border-radius:0px 0px 0px 30px;
          position:absolute;
        }
        .left-down, .right-up{
          width: 0;
          height: 0;
          border-bottom: ${
            theme === Theme.Green ? "80px solid #125B50" : "80px solid #FFB200"
          };
          border-top: 80px solid transparent;
          border-left: ${
            theme === Theme.Green ? "80px solid #125B50" : "80px solid #FFB200"
          };
          border-right: 80px solid transparent;
          border-radius: 0px 0px 0px 30px;
          position:absolute;
        }
        .left-up{
          top: 75px;
          left: -105px;
          transform: rotate(45deg);
        }
        .left-down{
          transform: rotate(-45deg);
          left: 75px;
          bottom: -105px;
        }
        .right-up{
          transform: rotate(135deg);
          right: 65px;
          top: -105px;
        }
        .right-down{
          transform: rotate(-135deg);
          right: -105px;
          bottom: 65px;
        }
        .img-box{
          position:relative;
          width:160px;
          height:160px;
        }
        .content-box{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
          display:flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          white-space: pre-line;
          text-align: center;
          gap:5px;
        }
        .title{
          color:${theme === Theme.Green ? "white" : "black"};
          font-size: 20px;
          font-weight: 600;
        }
        .link{
          color:${theme === Theme.Green ? "white" : "black"};
          font-size: 14px;
          font-weight: 300;
          text-decoration: underline;
          cursor:pointer;
        }
      `}</style>
    </div>
  );
}
