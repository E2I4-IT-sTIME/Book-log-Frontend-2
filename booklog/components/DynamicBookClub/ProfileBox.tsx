import Image from "next/image";
import { useState } from "react";

export default function ProfileBox() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="container">
      <span className="info-box">
        반갑습니다, <span className="st">중규리</span>님
      </span>
      <div className="img-box" onClick={() => setOpenModal((prev) => !prev)}>
        <Image
          src={
            "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg"
          }
          layout="fill"
          objectFit="cover"
        />
      </div>
      {openModal ? (
        <div className="modal">
          <ul>
            <li>모임에서 탈퇴하고 싶어요.</li>
            <li>모임 가입자 명단을 보고 싶어요.</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
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
