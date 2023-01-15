import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";
import Router from "next/router";
import BasicModal from "../BasicModal";
import WaitingModal from "./WaitingModal";

interface UserInfo {
  id: number;
  image: string;
  username: string;
}

interface answerInterface {
  answers: Array<string>;
  email: string;
  qna_id: number;
  questions: Array<string>;
  user_id: number;
  username: string;
}

interface profileProps {
  id: number;
  isAdmin: boolean;
}

export default function ProfileBox(props: profileProps) {
  const { id, isAdmin } = props;
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [openModal, setOpenModal] = useState(false);
  const [userObj, setUserObj] = useState<UserInfo>();
  const [waiter, setWaiter] = useState<Array<answerInterface>>();
  const [modalOpen, setModalOpen] = useState(false);
  const router = Router;

  const getUserInfo = () => {
    const uid = localStorage.getItem("uid");
    axios
      .get(`https://booklog.site/auth/user/${uid}`, {
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
        alert("로그아웃 되었습니다.");
        router.push("/");
        console.log(error);
      });
  };

  const getUserAnswers = () => {
    axios
      .get(`https://booklog.site/auth/meetings/${id}/answers`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setWaiter(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteClubs = () => {
    if (
      confirm(
        "정말 모임을 삭제하시겠습니까?\n삭제된 모임은 복구가 불가능합니다."
      )
    ) {
      axios
        .delete(`https://booklog.site/auth/meeting/${id}`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          alert("삭제가 완료되었습니다.");
          router.push("/");
        })
        .catch((error) => {
          alert("삭제에 실패하였습니다.");
          console.log(error);
        });
    }
  };

  const withDraw = () => {
    if (confirm("정말 모임을 탈퇴하시겠습니까?\n복구가 불가능합니다.")) {
      axios
        .delete(`https://booklog.site/auth/meeting/${id}/out`, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          alert("탈퇴가 완료되었습니다.");
          router.push("/");
        })
        .catch((error) => {
          alert("탈퇴에 실패하였습니다.");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getUserInfo();
    if (isAdmin) getUserAnswers();
  }, []);

  return (
    <div className="container">
      <span className="info-box">
        반갑습니다, <span className="st">{userObj && userObj.username}</span>님
      </span>
      <div className="img-box" onClick={() => setOpenModal((prev) => !prev)}>
        <Image
          src={userObj ? userObj.image : ""}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {openModal ? (
        isAdmin ? (
          <div className="modal">
            <ul>
              <li onClick={() => deleteClubs()}>모임을 삭제하고 싶어요.</li>
              <li onClick={() => setModalOpen(true)}>
                모임 가입자 명단을 보고 싶어요.
              </li>
            </ul>
          </div>
        ) : (
          <div className="modal">
            <ul>
              <li onClick={() => withDraw()}>모임에서 탈퇴하고 싶어요.</li>
              <li>모임을 신고하고 싶어요.</li>
            </ul>
          </div>
        )
      ) : (
        <></>
      )}
      <BasicModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        header="수락 대기인원"
      >
        {waiter ? (
          <WaitingModal
            meetingId={id}
            waiting={waiter}
            update={getUserAnswers}
          />
        ) : (
          <WaitingModal meetingId={id} waiting={[]} update={getUserAnswers} />
        )}
      </BasicModal>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }
        .info-box {
          color: #242424;
          font-weight: 500;
        }
        .st {
          font-weight: 800;
        }
        .img-box {
          height: 70%;
          aspect-ratio: 1/1;
          border-radius: 100%;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .modal {
          width: 100%;
          background-color: white;
          border-radius: 10px;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          position: absolute;
          bottom: -12vh;
          right: 0px;
          z-index: 99;
          padding: 15px 10px;
        }
        .modal ul {
          width: 100%;
          height: 100%;
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 5px;
        }
        .modal ul li {
          width: 100%;
          height: 100%;
          color: #242424;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s;
          text-align: end;
        }
        .modal ul li:hover {
          color: #125b50;
        }
      `}</style>
    </div>
  );
}
