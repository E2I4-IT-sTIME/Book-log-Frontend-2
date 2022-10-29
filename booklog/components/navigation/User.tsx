import Button from "../portfolio/Button";
import { useState, useEffect } from "react";
import img from "../image/tmp.jpg";
import noSign from "../../res/noSign.svg";
import Image from "next/image";

export default function User() {
  const [isLogined, setIsLogined] = useState(false);
  const [userName, setUserName] = useState("이준규");
  const induceSign = "북로그에 가입하고,\n서평으로 내 이력서를 채워보세요!";
  return (
    <div className="container">
      {isLogined ? (
        <div className="signed-box">
          <span>
            반갑습니다, <b>{userName}</b>님!
          </span>
          <div className="profile-box">
            <Image
              src={noSign}
              layout="fill"
              objectFit="cover"
              alt="profile-img"
            />
          </div>
        </div>
      ) : (
        <div className="sign-box">
          <button onClick={() => setIsLogined(true)}>Sign In</button>
          <span>{induceSign}</span>
        </div>
      )}
      <style jsx>{`
        .sign-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .sign-box button {
          border: none;
          background-color: #125b50;
          color: white;
          font-weight: 700;
          padding: 10px 15px;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .sign-box button:hover {
          transform: scale(1.02);
        }
        .sign-box span {
          text-align: end;
          color: black;
          font-size: 14px;
          font-weight: 300;
          white-space: pre-line;
        }
        .signed-box {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .profile-box {
          width: 50px;
          height: 50px;
          position: relative;
        }
        .signed-box span {
          text-align: end;
          color: black;
          font-weight: 400;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
}
