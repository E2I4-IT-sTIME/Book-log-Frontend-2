import { GetServerSideProps } from "next";
import HomeLayout from "../components/Home/HomeLayout";

interface clubInfo {
  id: number;
  image: string;
  info: string;
  max_num: number;
  cur_num: number;
  name: string;
  onoff: boolean;
  tags: Array<string>;
}

interface ServersideProps {
  clubs: Array<clubInfo>;
}

export default function Home(props: ServersideProps) {
  const { clubs } = props;
  console.log(clubs);
  return (
    <>
      <HomeLayout />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const tmpClub: clubInfo = {
      id: 0,
      image: "",
      info: "dd",
      max_num: 10,
      cur_num: 1,
      name: "이준규",
      onoff: false,
      tags: ["경기", "개발자", "취업"],
    };
    const tmpArray = [tmpClub, tmpClub, tmpClub, tmpClub];
    return { props: { tmpArray } };
  } catch (err) {
    console.log(err);
    return { props: {} };
  }
};
