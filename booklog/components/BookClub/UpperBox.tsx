import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  nameKeywordState,
  tagKeywordState,
  onoffState,
  ClubState,
  clubState,
} from "../../states/recoilClubSearch";
import Router from "next/router";

interface upperProps {
  setClubs: (state: boolean) => void;
}

export default function UpperBox(props: upperProps) {
  const { setClubs } = props;
  const [onoff, setOnoff] = useRecoilState(onoffState);
  const [nameKeyword, setNameKeyword] = useRecoilState(nameKeywordState);
  const [tagKeyword, setTagKeyword] = useRecoilState(tagKeywordState);
  const [clubStatus, setClubStatus] = useRecoilState(clubState);
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const router = Router;

  const onSearchByName = () => {
    setNameKeyword(searchName);
    setSearchName("");
    setTagKeyword("");
  };

  const onSearchByTag = () => {
    setTagKeyword(searchTag);
    setSearchTag("");
    setNameKeyword("");
  };

  const onChangeStatus = () => {
    if (clubStatus === ClubState.AllClubs) {
      setClubs(false);
      setClubStatus(ClubState.MyClubs);
    } else {
      setClubs(true);
      setClubStatus(ClubState.AllClubs);
    }
  };

  return (
    <div className="container">
      <span className="title">{`독서는, 함께할 때 진짜니까!`}</span>
      <span className="subtitle">{`북로그에서 나만의 독서모임을 만들고 찾아보세요 !`}</span>
      <div className="btn-box">
        <button className="my-club" onClick={() => onChangeStatus()}>
          {clubStatus === ClubState.AllClubs
            ? "내 모임 보기"
            : "전체 모임 보기"}
        </button>
        <button
          className="make-club"
          onClick={() => router.push("/makebookclub")}
        >
          독서모임 만들기
        </button>
      </div>
      <div className="search-box">
        {clubStatus === ClubState.AllClubs ? (
          <>
            <label htmlFor="name">독서모임 명으로 검색하기</label>
            <div className="input-line">
              <input
                id="name"
                type="text"
                placeholder="찾고싶은 독서모임 이름을 입력해주세요."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button onClick={() => onSearchByName()}>검색</button>
            </div>
            <label htmlFor="tag">독서모임 태그로 검색하기</label>
            <div className="input-line">
              <input
                id="tag"
                type="text"
                placeholder="찾고싶은 독서모임 태그를 입력해주세요."
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
              />
              <button onClick={() => onSearchByTag()}>검색</button>
            </div>
          </>
        ) : (
          <div className="my-search-box">
            <span className="my-title">내가 가입한 모임들</span>
            <span className="my-subtitle">
              내 모임에서는 검색 기능을 사용할 수 없습니다.
            </span>
          </div>
        )}
        <div className="onoff-box">
          <span>{onoff ? `대면 모임` : `비대면 모임`}</span>
          <label className="switch-button">
            <input
              type="checkbox"
              checked={onoff}
              onChange={(e) => setOnoff(e.target.checked)}
            />
            <span className="onoff-switch"></span>
          </label>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          padding-bottom: 30px;
        }
        .title {
          font-size: 36px;
          font-weight: 900;
          color: #125b50;
        }
        .subtitle {
          font-size: 18px;
          font-weight: 600;
          color: #125b50;
        }
        .btn-box {
          display: flex;
          gap: 10px;
        }
        .btn-box button {
          border: none;
          font-size: 16px;
          font-weight: 900;
          padding: 10px 15px;
          border-radius: 15px 0px 15px 15px;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-box button:not(.my-club) {
          color: white;
        }
        .my-club {
          background-color: ${clubStatus === ClubState.AllClubs
            ? "#f94c66"
            : "#F8B400"};
          color: ${clubStatus === ClubState.AllClubs ? "#fff" : "#141414"};
        }
        .make-club {
          background-color: #125b50;
        }
        .btn-box button:hover {
          transform: scale(1.02);
        }
        .search-box {
          background-color: white;
          width: 40vw;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 30px;
          border-radius: 20px 0px 20px 20px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          margin-top: 10px;
        }
        .search-box label {
          color: #6b737d;
          font-size: 14px;
          font-weight: 600;
        }
        .input-line {
          font-size: 16px;
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
        }
        .input-line input {
          width: 87%;
          height: 100%;
          border: 1px solid #c9c9c9;
          border-radius: 15px;
          padding: 3px 10px;
        }
        .input-line button {
          border: none;
          background-color: #d9d9d9;
          color: #6b737d;
          font-weight: 900;
          width: 10%;
          height: 100%;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .input-line button:hover {
          background-color: #125b50;
          color: white;
        }
        .input-line button:active {
          transition: scale(0.98);
        }
        .onoff-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 5px;
          justify-content: flex-end;
          color: ${onoff ? "#125B50" : "#F94C66"};
          margin-top: 10px;
        }

        .switch-button {
          position: relative;
          display: inline-block;
          width: 45px;
          height: 25px;
        }

        .switch-button input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .onoff-switch {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background-color: #f94c66;
          box-shadow: inset 1px 5px 1px #f94c66;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .onoff-switch:before {
          position: absolute;
          content: "";
          height: 17px;
          width: 17px;
          left: 4px;
          bottom: 4px;
          background-color: #fff;
          -webkit-transition: 0.5s;
          transition: 0.4s;
          border-radius: 20px;
        }

        .switch-button input:checked + .onoff-switch {
          background-color: #125b50;
          box-shadow: inset 1px 5px 1px #125b50;
        }

        .switch-button input:checked + .onoff-switch:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
        .my-search-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
        }
        .my-title {
          font-size: 24px;
          font-weight: 900;
          color: #242424;
        }
        .my-subtitle {
          font-size: 16px;
          font-weight: 400;
          color: #242424;
        }
      `}</style>
    </div>
  );
}
