import { useState, ComponentProps, DOMAttributes } from "react";
import Image from "next/image";
import axios from "axios";
import { useRecoilState } from "recoil";
import { recoilLoginedState } from "../../states/recoilLogiendState";

interface UserInfo {
  id: number;
  image: string;
  username: string;
}

interface modalState {
  info: UserInfo;
  open: boolean;
  close: () => void;
}

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

export default function BasicModal(props: modalState) {
  const { info, open, close } = props;
  const [isLogined, setIsLogined] = useRecoilState<boolean>(recoilLoginedState);
  const [name, setName] = useState(info.username);
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState(info.image);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setProfile(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const closeModal = () => {
    setName(info.username);
    setProfile("");
    setAttachment(info.image);
    setImgFile(null);
    close();
  };

  const save = () => {
    if (confirm("저장하시겠습니까?")) {
      saveInfo();
    }
  };

  const saveInfo = () => {
    const uid = localStorage.getItem("uid");
    const multipartFile = new FormData();
    multipartFile.append("username", name);
    if (imgFile) {
      multipartFile.append("image", imgFile);
    }
    axios
      .patch(`http://15.165.100.90:8080/auth/user/${uid}`, multipartFile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        alert("저장이 완료되었습니다.");
        close();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const withDraw = () => {
    if (
      confirm(
        "정말로 탈퇴하시겠어요?\n탈퇴 후에는, 어떤 기록도 복구할 수 없습니다."
      )
    ) {
      deleteInfo();
    }
  };

  const deleteInfo = () => {
    const uid = localStorage.getItem("uid");
    axios
      .patch(`http://15.165.100.90:8080/auth/user/delete/${uid}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("uid");
        setIsLogined(false);
        alert("회원 탈퇴가 완료되었습니다.");
        close();
        console.log(res);
      })
      .catch((error) => {
        alert(
          "회원 탈퇴에 실패하였습니다.\n같은 문제가 반복된다면, 페이지 하단 이메일로 문의 부탁드립니다."
        );
        console.log(error);
      });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            프로필 정보 변경
            <button className="close" onClick={closeModal}>
              &times;
            </button>
          </header>
          <main>
            <div className="container">
              <div className="img-box">
                {attachment !== "" ? (
                  <Image src={attachment} layout="fill" objectFit="cover" />
                ) : (
                  <div className="no-img" />
                )}
                <div className="hover-box">
                  <label htmlFor="file" className="vanilla-label">
                    업로드
                  </label>
                  <input
                    name="file"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleOnChange}
                    value={profile}
                  />
                </div>
              </div>

              <div className="info-box">
                <label htmlFor="name">닉네임</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </main>
          <footer>
            <button onClick={withDraw}>회원 탈퇴</button>
            <button className="close" onClick={save}>
              저장
            </button>
          </footer>
        </section>
      ) : null}
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.6);
        }
        .modal button {
          outline: none;
          cursor: pointer;
          border: 0;
        }
        .modal > section {
          min-width: 500px;
          width: 40%;
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 0.3rem;
          background-color: #fff;
          animation: modal-show 0.3s;
          overflow: hidden;
        }
        .modal > section > header {
          position: relative;
          padding: 16px 64px 16px 16px;
          background-color: #f1f1f1;
          font-weight: 700;
        }
        .modal > section > header button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }
        .modal > section > main {
          border-bottom: 1px solid #dee2e6;
          border-top: 1px solid #dee2e6;
          padding: 20px 0px;
        }
        .modal > section > footer {
          padding: 12px 16px;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }
        .modal > section > footer button {
          padding: 6px 12px;
          color: #fff;
          background-color: #6c757d;
          border-radius: 5px;
          font-size: 13px;
        }
        .modal.openModal {
          display: flex;
          align-items: center;
          animation: modal-bg-show 0.3s;
        }
        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }
        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        //메인
        .container {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;
        }
        .img-box {
          width: 150px;
          height: 150px;
          border-radius: 100%;
          overflow: hidden;
          position: relative;
        }

        .no-img {
          background-color: #cacaca;
          width: 100%;
          height: 100%;
        }
        .attachment {
          object-fit: cover;
        }
        .hover-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 150px;
          height: 150px;
          border-radius: 100%;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border: 2px solid rgba(255, 255, 255, 0.18);
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }
        .img-box:hover .hover-box {
          opacity: 1;
        }
        input[type="file"] {
          /* 파일 필드 숨기기 */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .hover-box label {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          border-radius: 5px;
          border: 2px solid #125b50;
          background-color: #00ff0000;
          color: #125b50;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }
        .hover-box label:hover {
          background-color: #125b50;
          color: white;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 5px;
        }
        .info-box label {
          color: #125b50;
          font-size: 14px;
          font-weight: 500;
        }
        .info-box input {
          border: 1px solid #c9c9c9;
          border-radius: 15px;
          height: 35px;
          width: 100%;
          padding: 0px 15px;
          min-width: 250px;
          background: none;
          outline: none;
          color: #242424;
        }
      `}</style>
    </div>
  );
}
