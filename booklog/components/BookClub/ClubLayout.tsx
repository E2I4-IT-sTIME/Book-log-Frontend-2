import { clubInfo } from "../../res/interface/BookClubInterface";
import { useState, useEffect } from "react";
import Image from "next/image";
import club from "../../res/club.svg";
import UpperBox from "./UpperBox";
import BottomBox from "./BottomBox";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  nameKeywordState,
  tagKeywordState,
  clubState,
  ClubState,
} from "../../states/recoilClubSearch";

interface clubProps {
  clubs: Array<clubInfo>;
}

export default function ClubLayout(props: clubProps) {
  const { clubs } = props;
  const [curClubs, setClubs] = useState(clubs);
  const [nameKeyword, setNameKeyword] = useRecoilState(nameKeywordState);
  const [tagKeyword, setTagKeyword] = useRecoilState(tagKeywordState);
  const [clubStatus, setClubStatus] = useRecoilState(clubState);

  const resetClubs = (state: boolean) => {
    //내 모임을 보여주거나 전체 모임 보여주거나
    //true 이면 전체모임 보여주기 - false이면 내 모임 보여주기
    if (state) {
      setClubs(clubs);
    } else {
      const uid = localStorage.getItem("uid");
      const jwt = localStorage.getItem("access_token");
      if (uid && jwt) {
        axios
          .get(`https://booklog.site/auth/user/${uid}/meetings`, {
            headers: {
              "Content-type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((res) => {
            setClubs(res.data);
            setClubStatus(ClubState.MyClubs);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setClubStatus(ClubState.AllClubs);
        alert("로그인 후 이용할 수 있는 서비스입니다.");
      }
    }
  };

  const getAllClubs = () => {
    const clubsRes = axios
      .get("https://booklog.site/meetings", {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchBookClubByTag = () => {
    axios
      .get(`https://booklog.site/auth/meeting/searchCategory`, {
        params: { category: tagKeyword },
      })
      .then((res) => {
        setClubs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchBookClubByName = () => {
    axios
      .get(`https://booklog.site/auth/meeting/searchName`, {
        params: { name: nameKeyword },
      })
      .then((res) => {
        setClubs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (nameKeyword === "" && tagKeyword !== "") {
      searchBookClubByTag();
    } else if (nameKeyword !== "" && tagKeyword === "") {
      searchBookClubByName();
    } else if (nameKeyword === "" && tagKeyword === "") {
      getAllClubs();
    }
  }, [nameKeyword, tagKeyword]);

  return (
    <div className="container">
      <div className="upper-box">
        <div className="upper-circle" />
        <div className="upper-img-cover">
          <div className="upper-img-box">
            <Image src={club} layout="fill" objectFit="cover" />
          </div>
        </div>
        <UpperBox setClubs={resetClubs} />
      </div>
      <div className="bottom-box">
        <BottomBox clubs={curClubs} />
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 200px;
        }
        .upper-box {
          width: 100%;
          height: 600px;
          background-color: #faf5e4;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-right: 500px;
        }
        .upper-circle {
          width: 400px;
          height: 400px;
          background-color: #125b50;
          border-radius: 100%;
          position: absolute;
          bottom: -50px;
          right: -50px;
        }
        .upper-img-cover {
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
        .upper-img-box {
          width: 400px;
          height: 380px;
          position: relative;
        }
        .bottom-box {
          width: 90%;
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
}
