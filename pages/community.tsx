import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";

const community: NextPage = () => {
  //community 페이지
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);

  useEffect(() => {
    setIsRedirection(false);
    setLayoutState(CurrentLayout.Header);
  }, []);
  return <></>;
};

export default community;
