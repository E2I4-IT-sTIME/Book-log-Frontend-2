import { GetServerSideProps } from "next";
import Seo from "../../components/Seo";
import { clubInfo } from "../../res/interface/DynamicBookClubInterface";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../../states/recoilLayoutState";
import Layout from "../../components/DynamicBookClub/Layout";
import axios from "axios";
import { MyStateInClub } from "../../res/interface/BookClubInterface";

interface serversideProps {
  item: clubInfo;
  id: number;
}

export default function BookClubDynamicPage(props: serversideProps) {
  const { item, id } = props;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [myRight, setMyRight] = useState<MyStateInClub>(MyStateInClub.NoMember);
  const [isAdmin, setIsAdmin] = useState(false);

  const rightCheck = () => {
    const jwt = localStorage.getItem("access_token");
    axios
      .get(`https://booklog.site/auth/meeting/${id}/check`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        const right = res.data;
        if (right === 0) {
          setMyRight(MyStateInClub.NoMember);
        } else if (right === 1) {
          setMyRight(MyStateInClub.Waiting);
        } else if (right === 2) {
          setMyRight(MyStateInClub.Member);
        } else if (right === 3) {
          setMyRight(MyStateInClub.Member);
          setIsAdmin(true);
        }
      });
  };

  useEffect(() => {
    // 처음 들어왔을 때 헤더 없앰
    setLayoutState(CurrentLayout.NoHeader);
    rightCheck();
  }, []);

  return (
    <>
      <Seo
        title={item.name}
        content="Booklog - 취향에 맞는 독서모임을 찾아, 함께해봐요!"
      />
      {myRight === MyStateInClub.Member ? (
        <Layout id={id} info={item} isAdmin={isAdmin} />
      ) : (
        <></>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const clubId = query.params;
    const clubsRes = await axios.get(
      `https://booklog.site/meetings/${clubId}`,
      {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // const tmpData: clubInfo = {
    //   name: "루시 아일랜드",
    //   id: 123,
    //   dates: ["2022-10-27", "2022-10-28", "2022-11-01", "2022-11-02"],
    //   image:
    //     "https://i.pinimg.com/564x/ff/ac/d8/ffacd8ce790f36a011b1d566a89cb328.jpg",
    //   info: "이젠 머리가 어지러워 어느새 해는 져 있고 난 오늘이 무슨 요일인지도 모르고 사나 봐 어질러진 방은 치울 엄두조차 나질 않고 침대 위에 누워 얼마나 잘 수 있나 생각해",
    //   max_num: 10,
    //   cur_num: 5,
    //   ment: "",
    //   notice: "모입 가입 멘트입니다",
    //   onoff: false,
    //   tags: [
    //     "개화",
    //     "떼굴떼굴",
    //     "맞네",
    //     "결국아무것도알수없었지만",
    //     "이미다알고있었지만",
    //   ],
    // };
    if (clubsRes.status === 200) {
      const clubData = clubsRes.data;
      return {
        props: { item: clubData, id: clubId },
      };
    }
    return { props: {} };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
