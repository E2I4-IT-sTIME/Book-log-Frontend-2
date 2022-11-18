import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import { useEffect } from "react";
import Router from "next/router";

const signup: NextPage = () => {
  const router = Router;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [kakaoState, setKakaoState] = useRecoilState(recoilKakakoState);

  useEffect(() => {
    if (kakaoState) {
      setLayoutState(CurrentLayout.Header);
    } else {
      router.push("/404");
    }
  }, []);

  return (
    <div className="container">
      <div className="layout"></div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          background-color: #faf5e4;
        }
        .layout {
          width: 80%;
          height: 100%;
          background-color: white;
        }
      `}</style>
    </div>
  );
};

export default signup;
