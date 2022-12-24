import { clubInfo } from "../../res/interface/BookClubInterface";
import BottomBoxItem from "./BottomBoxItem";
import { useRecoilState } from "recoil";
import {
  nameKeywordState,
  tagKeywordState,
  onoffState,
  ClubState,
  clubState,
} from "../../states/recoilClubSearch";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import EmptyBox from "./EmptyBox";

interface boxProps {
  clubs: Array<clubInfo>;
}

export default function BottomBox(props: boxProps) {
  const { clubs } = props;
  const [clubArr, setClubArr] = useState(clubs);
  const [onoff, setOnoff] = useRecoilState(onoffState);
  const [nameKeyword, setNameKeyword] = useRecoilState(nameKeywordState);
  const [tagKeyword, setTagKeyword] = useRecoilState(tagKeywordState);
  const [clubStatus, setClubStatus] = useRecoilState(clubState);

  const resetKeyword = () => {
    setNameKeyword("");
    setTagKeyword("");
  };

  const classificationByOnoff = () => {
    if (clubs) {
      const newClubs = clubs.filter((club) => club.onoff === onoff);
      setClubArr(newClubs);
    }
  };

  useEffect(() => {
    setClubArr(clubs);
  }, [clubs]);

  useEffect(() => {
    classificationByOnoff();
  }, [clubs]);

  useEffect(() => {
    classificationByOnoff();
  }, [onoff]);

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">
          {clubStatus === ClubState.AllClubs ? "모집 중인" : "나의"} 독서모임{" "}
          {clubArr ? clubArr.length : 0}개
        </span>
        <span className="tag">{onoff ? "대면 모임" : "비대면 모임"}</span>
      </div>
      {nameKeyword !== "" && clubStatus === ClubState.AllClubs ? (
        <div className="search-box">
          <span className="search-keyword">
            {nameKeyword}의 모임명 검색 결과입니다.
          </span>
          <button onClick={() => resetKeyword()}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      ) : (
        <></>
      )}
      {tagKeyword !== "" ? (
        <div className="search-box">
          <span className="search-keyword">
            {tagKeyword}의 태그 검색 결과입니다.
          </span>
          <button onClick={() => resetKeyword()}>
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      ) : (
        <></>
      )}
      {clubArr && clubArr.length > 0 ? (
        <div className="grid-box">
          {clubArr.map((club, index) => (
            <BottomBoxItem item={club} key={`${club.id} - ${index}`} />
          ))}
        </div>
      ) : (
        <EmptyBox />
      )}
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 30px;
        }
        .grid-box {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto;
          gap: 50px;
        }
        .title-box {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          align-items: center;
        }
        .title {
          font-size: 22px;
          font-weight: 700;
          color: #141414;
        }
        .tag {
          font-size: 16px;
          font-weight: 800;
          padding: 5px 10px;
          background-color: ${onoff ? "#125b50" : "#f94c66"};
          border-radius: 10px;
          color: white;
        }
        .search-keyword {
          font-size: 16px;
          font-weight: 400;
          color: #141414;
        }
        .search-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-top: -20px;
        }
        .search-box button {
          border: none;
          background: none !important;
          font-size: 12px;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.25s;
        }
        .search-box button:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
