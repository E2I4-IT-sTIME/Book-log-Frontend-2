import { GetServerSideProps } from "next";
import HomeLayout from "../components/Home/HomeLayout";
import { clubInfo } from "../res/interface/HomeInterface";
import Seo from "../components/Seo";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect } from "react";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import axios from "axios";

interface serversideProps {
  clubs: Array<clubInfo>;
}

export default function Home(props: serversideProps) {
  const { clubs } = props;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);

  useEffect(() => {
    setIsRedirection(false);
    setLayoutState(CurrentLayout.Header);
  }, []);
  return (
    <>
      <Seo
        title="Home"
        content="Booklog - 북로그, 포트폴리오에 나의 서평을 담다."
      />
      <HomeLayout clubs={clubs} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const clubsRes = await axios.get("https://booklog.site/meetings", {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (clubsRes.status === 200) {
      const clubs: Array<clubInfo> = clubsRes.data;
      return { props: { clubs: clubs } };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
