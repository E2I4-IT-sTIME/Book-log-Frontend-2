import Seo from "../components/Seo";
import MakeClubLayout from "../components/BookClub/MakeClub/MakeClubLayout";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect } from "react";

export default function makebookclub() {
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);

  useEffect(() => {
    setLayoutState(CurrentLayout.Header);
  }, []);
  return (
    <>
      <Seo title="Make Book Club" />
      <MakeClubLayout />
    </>
  );
}
