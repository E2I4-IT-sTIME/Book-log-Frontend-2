import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { recoilLoginedState } from "../states/recoilLogiendState";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

const Signup: NextPage = () => {
  const router = Router;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [kakaoState, setKakaoState] = useRecoilState(recoilKakakoState);

  const [name, setName] = useState("");
  const [uid, setUid] = useState(0);
  const [isExist, setIsExist] = useState(false);

  const requestToken = async (request_code: string) => {
    let returnValue = "none";
    let request_token_url = "https://kauth.kakao.com/oauth/token";
    axios({
      method: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
        client_id: "13ceafa8d13d6bd8104550a84132db96",
        redirect_uri: "https://booklog.swygbro.com/signup",
        code: request_code,
        client_secret: "Hzxodlq6y3ivzB7a8kRPzCGvGi7J5TIg",
      },
    })
      .then((response) => {
        returnValue = response.data.access_token;
        sendTokenToServer(returnValue);
      })
      .catch((error) => {
        console.log(error);
        setKakaoState(false);
      });
  };

  const sendTokenToServer = (token: string) => {
    axios
      .get(`https://booklog.site/api/access_token?token=${token}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          withCredentials: true,
        },
      })
      .then((res) => {
        //console.log(res);
        setIsExist(res.data.isExist);
        localStorage.setItem("access_token", res.data.jwtToken);
        localStorage.setItem("uid", res.data.userId);
        setUid(res.data.userId);
      })
      .catch((error) => {
        console.log(error);
        setKakaoState(false);
      });
  };

  useEffect(() => {
    setLayoutState(CurrentLayout.Header);
    const href = window.location.href;
    let params = new URL(document.URL).searchParams;
    let code = params.get("code");
    if (code) {
      requestToken(code);
    } else {
      setKakaoState(false);
    }
  }, []);

  useEffect(() => {
    if (!kakaoState) {
      router.push("/404");
    }
  }, [kakaoState]);

  useEffect(() => {
    if (isExist) {
      setIsLogined(true);
      router.push("/");
    }
  }, [isExist]);

  const registerInfo = () => {
    const uid = localStorage.getItem("uid");
    //추가정보입력함수
    axios
      .post(
        `https://booklog.site/join/${uid}/username?name=${name}`,
        {
          name: name,
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        router.push("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="container">
      <div className="layout" />
      <div className="input-layout">
        <div className="input-box">
          <span className="title">환영합니다!</span>
          <span className="subtitle">{`사용할 닉네임을 입력하고, 북로그의 다양한 기능을 무료로 이용해보세요!`}</span>
          <div className="input">
            <label htmlFor="name">닉네임</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="사용할 닉네임을 입력해주세요."
            />
          </div>
          <button onClick={() => registerInfo()}>가입완료</button>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          background-color: white;
          display: flex;
          justify-content: flex-start;
        }
        .layout {
          width: 25%;
          min-width: 330px;
          height: 100%;
          background-color: #faf5e4;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
        .input-layout {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .input-box {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .title {
          font-size: 24px;
          font-weight: 900;
          color: #125b50;
        }
        .subtitle {
          font-size: 18px;
          font-weight: 500;
          color: #125b50;
        }
        .input {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          margin: 25px 0px;
        }
        .input label {
          font-size: 14px;
          color: #454545;
        }
        .input input {
          width: 30vw;
          min-width: 300px;
          height: 40px;
          border: 1px solid #c9c9c9;
          border-radius: 10px;
          padding: 0px 10px;
        }
        button {
          border: none;
          color: white;
          background-color: #125b50;
          padding: 10px 15px;
          font-size: 16px;
          font-weight: 900;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Signup;
