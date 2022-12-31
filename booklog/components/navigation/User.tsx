import { useState, useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import { recoilKakakoState } from "../../states/recoilKakaoRedirection";
import Router from "next/router";
import axios from "axios";
import ProfileEditModal from "./ProfileEditModal";

interface UserInfo {
  id: number;
  image: string;
  username: string;
}

export default function User() {
  const router = Router;
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);
  const [userObj, setUserObj] = useState<UserInfo>();
  const [openModal, setOpenModal] = useState(false); //프로필 이미지 눌렀을 때 나오는 모달
  const [openEditModal, setOpenEditModal] = useState(false); //프로필 수정 눌렀을 때 나오는 모달

  const induceSign = "북로그에 가입하고,\n서평으로 내 이력서를 채워보세요!";

  const getUserInfo = () => {
    const uid = localStorage.getItem("uid");
    axios
      .get(`http://15.165.100.90:8080/auth/user/${uid}`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setUserObj(res.data);
      })
      .catch((error) => {
        setIsLogined(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("uid");
        console.log(error);
      });
  };

  const signOut = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("uid");
      setIsLogined(false);
    }
  };

  const withDraw = () => {
    if (
      confirm("정말 탈퇴하시겠습니까?\n탈퇴 이후 계정을 복구할 수 없습니다.")
    ) {
      const uid = localStorage.getItem("uid");
      axios
        .patch(`http://15.165.100.90:8080/auth/user/delete/${uid}`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          setIsLogined(false);
          localStorage.removeItem("access_token");
          localStorage.removeItem("uid");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    const jwt = localStorage.getItem("access_token");
    if (uid && uid !== "" && jwt && jwt !== "") {
      setIsLogined(true);
    }
  }, []);

  useEffect(() => {
    if (isLogined) {
      getUserInfo();
    }
  }, [isLogined]);

  return (
    <div className="container">
      {isLogined && userObj ? (
        <>
          <div className="signed-box">
            <span>
              반갑습니다, <b>{userObj.username}</b>님!
            </span>
            <div
              className="profile-box"
              onClick={() => setOpenModal((prev) => !prev)}
            >
              <Image
                src={userObj.image}
                layout="fill"
                objectFit="cover"
                alt="profile-img"
              />
            </div>
          </div>
          {openModal ? (
            <div className="profile-modal">
              <ul>
                <li onClick={signOut}>로그아웃</li>
                <li onClick={() => setOpenEditModal(true)}>프로필 수정</li>
                <li onClick={() => withDraw()}>회원 탈퇴</li>
              </ul>
              <ProfileEditModal
                info={userObj}
                open={openEditModal}
                close={() => setOpenEditModal(false)}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      ) : isRedirection ? (
        <></>
      ) : (
        <div className="sign-box">
          <button>
            <span className="no-hover">Sign In</span>
            <a
              className="hover"
              href="https://kauth.kakao.com/oauth/authorize?client_id=13ceafa8d13d6bd8104550a84132db96&redirect_uri=http://localhost:3000/signup&response_type=code"
            >
              Login with Kakao
            </a>
          </button>
          <span className="induce">{induceSign}</span>
        </div>
      )}
      <style jsx>{`
        .sign-box {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }
        .sign-box button {
          border: none;
          background-color: #125b50;
          color: white;
          font-weight: 700;
          font-size: 14px;
          border-radius: 20px;
          cursor: pointer;
          width: 76.5px;
          height: 36.8px;
          transition: all 0.25s;
          position: relative;
        }
        .hover,
        .no-hover {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .hover {
          opacity: 0;
          transition: all 0.25s;
          color: #000000;
        }
        .no-hover {
          opacity: 1;
          transition: all 0.25s;
        }
        .sign-box button:hover {
          width: 150px;
          background-color: #fee500;
        }
        .sign-box button:hover .hover {
          opacity: 1;
        }
        .sign-box button:hover .no-hover {
          opacity: 0;
        }
        .induce {
          text-align: end;
          color: black;
          font-size: 14px;
          font-weight: 300;
          white-space: pre-line;
        }
        .signed-box {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }
        .profile-box {
          width: 50px;
          height: 50px;
          position: relative;
          border-radius: 100%;
          overflow: hidden;
          cursor: pointer;
        }
        .signed-box span {
          text-align: end;
          color: black;
          font-weight: 400;
          white-space: pre-line;
        }
        .profile-modal {
          background-color: white;
          align-self: flex-end;
          margin-top: 10px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        .profile-modal ul {
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .profile-modal ul li {
          padding: 15px 10px;
          width: 100%;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s;
        }
        .profile-modal ul li:hover {
          background-color: #125b5078;
        }
      `}</style>
    </div>
  );
}
