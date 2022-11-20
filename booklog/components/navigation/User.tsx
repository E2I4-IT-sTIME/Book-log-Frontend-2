import { useState } from "react";
import noSign from "../../res/noSign.svg";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import { recoilKakakoState } from "../../states/recoilKakaoRedirection";
import Router from "next/router";
import axios from "axios";

export default function User() {
  const router = Router;
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);
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
      ) : isRedirection ? (
        <></>
      ) : (
        <div className="sign-box">
          <button>
            <span className="no-hover">Sign In</span>
            <a
              className="hover"
              href="https://kauth.kakao.com/oauth/authorize?client_id=13ceafa8d13d6bd8104550a84132db96&redirect_uri=http://localhost:3000/signup&response_type=code"
            >
              Login with Kakao
            </a>
          </button>
          <span className="induce">{induceSign}</span>
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
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          width: 76.5px;
          height: 36.8px;
          transition: all 0.25s;
          position: relative;
        }
        .hover,
        .no-hover {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .hover {
          opacity: 0;
          transition: all 0.25s;
          color: #000000;
        }
        .no-hover {
          opacity: 1;
          transition: all 0.25s;
        }
        .sign-box button:hover {
          width: 150px;
          background-color: #fee500;
        }
        .sign-box button:hover .hover {
          opacity: 1;
        }
        .sign-box button:hover .no-hover {
          opacity: 0;
        }
        .induce {
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
