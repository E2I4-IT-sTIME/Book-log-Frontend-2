import { useState } from "react";
import Image from "next/image";

export default function BookReviewsModal(props) {
  return (
    <div className="container">
      <div className="img-box">모달입니다</div>
      <div className="glass" />
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 30px;
          position: relative;
          padding: 20px;
        }
        .glass {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 10;
          filter: brightness(70%);
        }
        .img-box {
          width: 100%;
          max-width: 500px;
          height: 500px;
          position: relative;
          z-index: 20;
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
            rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        }
      `}</style>
    </div>
  );
}
