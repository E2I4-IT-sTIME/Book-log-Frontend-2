import { GetServerSideProps } from "next";
import Seo from "../../components/Seo";
import { clubInfo } from "../../res/interface/DynamicBookClubInterface";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { CurrentLayout, ClubLayoutState } from "../../states/recoilLayoutState";

interface serversideProps {
  item: clubInfo;
  isMember: number;
}

export default function BookClubDynamicPage(props: serversideProps) {
  const { item, isMember } = props;
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);

  useEffect(() => {
    // 처음 들어왔을 때 헤더 없앰
    setLayoutState(CurrentLayout.NoHeader);
  }, []);

  return (
    <>
      <Seo title={item.name} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const clubId = query.params;
    const tmpData: clubInfo = {
      name: "루시가 최고야",
      id: 123,
      dates: ["2022-10-27", "2022-10-28", "2022-11-01", "2022-11-02"],
      image:
        "https://i.pinimg.com/564x/ff/ac/d8/ffacd8ce790f36a011b1d566a89cb328.jpg",
      info: "이젠 머리가 어지러워 어느새 해는 져 있고 난 오늘이 무슨 요일인지도 모르고 사나 봐 어질러진 방은 치울 엄두조차 나질 않고 침대 위에 누워 얼마나 잘 수 있나 생각해",
      max_num: 10,
      cur_num: 5,
      ment: "루시 아일랜드",
      notice: "",
      onoff: false,
      tags: [
        "개화",
        "떼굴떼굴",
        "맞네",
        "결국아무것도알수없었지만",
        "이미다알고있었지만",
      ],
    };
    //   if (res.status === 200) {
    //     const artist = res.data;
    //     return {
    //       props: { data: artist },
    //     };
    //   }
    return { props: { item: tmpData, isMember: 0 } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
