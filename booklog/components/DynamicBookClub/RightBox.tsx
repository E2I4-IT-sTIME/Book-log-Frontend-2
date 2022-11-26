import Image from "next/image";

export default function RightBox() {
  return (
    <div className="container">
      <span className="title">필독! 공지사항</span>
      <div className="content-box">
        <span className="date">2022-11-20</span>
        <span className="content">
          {
            "해당 독서모임의 관리자입니다. 반갑습니다!\n저희 독서모임은 주 1회 비대면으로 진행되고 있습니다.\n이번주는 10월 13일 오후 8시에 ZOOM으로 진행될예정입니다.\n사정이 있어서 참석하지 못하는 분들은 여기에 댓글 달아주세요."
          }
        </span>
      </div>
      <div className="comment-box">
        <div className="profile-box">
          <div className="profile-img">
            <Image
              src={`https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="info-box">
            <span className="writer">김루시</span>
            <div className="light-box">
              <span className="comment-date">2022-11-21</span>
              <div className="btn-box">
                <span>수정</span>|<span>삭제</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <span className="content">어쩌구저쩌구 솰라솰라</span>
        </div>
      </div>
      <div className="comment-box">
        <div className="profile-box">
          <div className="profile-img">
            <Image
              src={`https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="info-box">
            <span className="writer">김루시</span>
            <div className="light-box">
              <span className="comment-date">2022-11-21</span>
              <div className="btn-box">
                <span>수정</span>|<span>삭제</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <span className="content">어쩌구저쩌구 솰라솰라</span>
        </div>
      </div>
      <div className="comment-box">
        <div className="profile-box">
          <div className="profile-img">
            <Image
              src={`https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="info-box">
            <span className="writer">김루시</span>
            <div className="light-box">
              <span className="comment-date">2022-11-21</span>
              <div className="btn-box">
                <span>수정</span>|<span>삭제</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <span className="content">어쩌구저쩌구 솰라솰라</span>
        </div>
      </div>
      <div className="comment-box">
        <div className="profile-box">
          <div className="profile-img">
            <Image
              src={`https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg`}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <div className="info-box">
            <span className="writer">김루시</span>
            <div className="light-box">
              <span className="comment-date">2022-11-21</span>
              <div className="btn-box">
                <span>수정</span>|<span>삭제</span>
              </div>
            </div>
          </div>
        </div>
        <div className="content-box">
          <span className="content">어쩌구저쩌구 솰라솰라</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          overflow-y: scroll;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 30px;
          gap: 30px;
        }
        .container::-webkit-scrollbar {
          width: 5px;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #295b77;
        }
        .container::-webkit-scrollbar-track {
          background-color: #00ff0000;
        }
        .title {
          font-size: 24px;
          font-weight: 900;
          color: #125b50;
        }
        .content-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          white-space: pre-line;
          word-break: keep-all;
          color: #242424;
        }
        .date {
          font-size: 11px;
        }
        .comment-box {
          width: 100%;
          border-radius: 10px;
          background-color: #f4f4f4;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }
        .profile-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }
        .profile-img {
          width: 35px;
          height: 35px;
          position: relative;
          border-radius: 100%;
          overflow: hidden;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .writer {
          color: #4f4f4f;
          font-weight: 700;
        }
        .light-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 200;
          gap: 30px;
        }
        .btn-box {
          display: flex;
          flex-direction: row;
          gap: 5px;
        }
        .btn-box span {
          cursor: pointer;
        }
        .content-box {
          color: #242424;
        }
      `}</style>
    </div>
  );
}
