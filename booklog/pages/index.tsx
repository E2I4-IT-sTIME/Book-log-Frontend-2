import { GetServerSideProps } from "next";
import HomeLayout from "../components/Home/HomeLayout";
import { clubInfo } from "../res/interface/HomeInterface";
import Seo from "../components/Seo";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect } from "react";

interface serversideProps {
  clubs: Array<clubInfo>;
}

export default function Home(props: serversideProps) {
  const { clubs } = props;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);

  useEffect(() => {
    setLayoutState(CurrentLayout.Header);
  }, []);
  return (
    <>
      <Seo title="Home" />
      <HomeLayout clubs={clubs} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const tmpClub: clubInfo = {
      id: 0,
      image:
        "https://i.pinimg.com/564x/b5/78/03/b57803fc499cbcd05d28277d6810ce4f.jpg",
      info: "라브리 그림책 독서모임",
      max_num: 10,
      cur_num: 1,
      name: "이준규",
      onoff: false,
      tags: ["경기", "개발자", "취업"],
    };
    const tmpArray = [
      tmpClub,
      tmpClub,
      tmpClub,
      tmpClub,
      tmpClub,
      tmpClub,
      tmpClub,
      tmpClub,
    ];
    return { props: { clubs: tmpArray } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
