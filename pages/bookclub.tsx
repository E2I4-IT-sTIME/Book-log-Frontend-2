import { GetServerSideProps } from "next";
import ClubLayout from "../components/BookClub/ClubLayout";
import Seo from "../components/Seo";
import { clubInfo } from "../res/interface/BookClubInterface";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../states/recoilLayoutState";
import { useEffect } from "react";
import { recoilKakakoState } from "../states/recoilKakaoRedirection";
import axios from "axios";

interface serversideProps {
  clubs: Array<clubInfo>;
}

export default function BookClub(props: serversideProps) {
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
        title="Book Club"
        content="Booklog - 나만의 독서 모임을 만들고, 동료를 구해보세요!"
      />
      <ClubLayout clubs={clubs} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // const tmp: clubInfo = {
    //   username: "이준규",
    //   id: 0,
    //   email: "abc@naver.com",
    //   image:
    //     "https://i.pinimg.com/564x/ff/ac/d8/ffacd8ce790f36a011b1d566a89cb328.jpg",
    //   name: "루시가 최고야\n떼굴떼굴",
    //   onoff: true,
    //   max_num: 10,
    //   cur_num: 5,
    //   info: "이젠 머리가 어지러워 어느새 해는 져 있고 난 오늘이 무슨 요일인지도 모르고 사나 봐 어질러진 방은 치울 엄두조차 나질 않고 침대 위에 누워 얼마나 잘 수 있나 생각해",
    //   tags: [
    //     "개화",
    //     "떼굴떼굴",
    //     "맞네",
    //     "결국아무것도알수없었지만",
    //     "이미다알고있었지만",
    //   ],
    // };

    // const tmpArray = [
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    //   tmp,
    // ];
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
