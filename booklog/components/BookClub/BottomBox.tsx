import { clubInfo } from "../../res/interface/BookClubInterface";
import BottomBoxItem from "./BottomBoxItem";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  nameKeywordState,
  tagKeywordState,
  onoffState,
} from "../../states/recoilClubSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface boxProps {
  clubs: Array<clubInfo>;
}

export default function BottomBox(props: boxProps) {
  const { clubs } = props;
  const [onoff, setOnoff] = useRecoilState(onoffState);
  const [nameKeyword, setNameKeyword] = useRecoilState(nameKeywordState);
  const [tagKeyword, setTagKeyword] = useRecoilState(tagKeywordState);

  const resetKeyword = () => {
    setNameKeyword("");
    setTagKeyword("");
  };

  return (
    <div className="container">
      <div className="title-box">
        <span className="title">모집 중인 독서모임 {clubs.length}개</span>
        <span className="tag">{onoff ? "대면 모임" : "비대면 모임"}</span>
      </div>
      {nameKeyword !== "" ? (
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
      <div className="grid-box">
        {clubs.map((club, index) => (
          <BottomBoxItem item={club} key={`${club.id} - ${index}`} />
        ))}
      </div>
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
