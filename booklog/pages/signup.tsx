import { NextPage } from "next";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect } from "react";

const signup: NextPage = () => {
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);

  useEffect(() => {
    setLayoutState(CurrentLayout.Header);
  }, []);
  return <></>;
};

export default signup;
