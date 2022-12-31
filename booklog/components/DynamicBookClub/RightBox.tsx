import axios from "axios";
import { useState, useEffect } from "react";
import DefaultTextArea from "./DefaultTextArea";
import CommentBox from "./CommentBox";
import moment from "moment";

interface noticeProps {
  id: number;
  isAdmin: boolean;
}

export interface Comment {
  comment_id: number;
  content: string;
  createtDate: string;
  email: string;
  username: string;
}

interface Notice {
  createDate: string;
  getCommentResList: Array<Comment>;
  notice: string;
}

export default function RightBox(props: noticeProps) {
  const { id, isAdmin } = props;
  const [notice, setNotice] = useState<Notice>();
  const [inputComment, setInputComment] = useState("");
  const [noticeEditable, setNoticeEditable] = useState(false);
  const [inputNotice, setInputNotice] = useState("");

  const getNotice = () => {
    const jwt = localStorage.getItem("access_token");
    axios
      .get(`http://15.165.100.90:8080/auth/meeting/${id}/notice`, {
        headers: {
          "Content-Type": `application/json`,
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadComment = () => {
    if (inputComment === "") {
      alert("댓글을 작성해주세요.");
      return;
    }

    const jwt = localStorage.getItem("access_token");
    axios
      .post(
        `http://15.165.100.90:8080/auth/meeting/${id}/comment`,
        {
          content: inputComment,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        setInputComment("");
        getNotice();
      })
      .catch((err) => {
        alert("저장에 실패했습니다.");
        console.log(err);
      });
  };

  const uploadNotice = () => {
    const jwt = localStorage.getItem("access_token");
    axios
      .patch(
        `http://15.165.100.90:8080/auth/meeting/${id}/notice`,
        {
          notice: inputNotice,
        },
        {
          headers: {
            "Content-Type": `application/json`,
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setNoticeEditable(false);
        getNotice();
      })
      .catch((err) => {
        alert("저장에 실패했습니다.");
        console.log(err);
      });
  };

  const editableHandler = () => {
    if (noticeEditable) {
      //저장구문추가
      inputNotice !== "" ? uploadNotice() : setNoticeEditable(false);
      return;
    } else {
      setNoticeEditable(true);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="container">
      <span className="title">필독! 공지사항</span>
      <div className="content-box">
        <div className="notice-info-box">
          <span className="date">
            {notice && moment(notice.createDate).format("YYYY-MM-DD HH:MM")}
          </span>
          {isAdmin ? (
            <span className="edit-btn" onClick={() => editableHandler()}>
              {noticeEditable ? "저장" : "공지 수정"}
            </span>
          ) : (
            <></>
          )}
        </div>
        {noticeEditable ? (
          <DefaultTextArea
            value={inputNotice}
            onChange={(value) => setInputNotice(value)}
            placeholder="공지를 입력해주세요."
          />
        ) : (
          <span className="content">
            {notice && notice.notice
              ? notice.notice
              : "아직 작성된 공지가 없습니다. :("}
          </span>
        )}
      </div>
      <div className="input-comment">
        <DefaultTextArea
          value={inputComment}
          onChange={(value) => setInputComment(value)}
          placeholder="댓글을 입력해주세요."
        />
        <button className="save-btn" onClick={() => uploadComment()}>
          저장
        </button>
      </div>
      <div className="comment-box">
        {notice && notice.getCommentResList ? (
          notice.getCommentResList.map((comment) => (
            <CommentBox id={id} comment={comment} getNotice={getNotice} />
          ))
        ) : (
          <span>댓글이 존재하지 않습니다. :(</span>
        )}
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
          position: relative;
          z-index: 9999999;
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
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
          white-space: pre-line;
          word-break: keep-all;
          color: #242424;
        }
        .notice-info-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .date,
        .edit-btn {
          font-size: 11px;
        }
        .edit-btn {
          cursor: pointer;
        }
        .input-comment {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }
        .save-btn {
          width: 60px;
          padding: 5px 0px;
          border: none;
          border-radius: 5px;
          background-color: #125b50;
          color: white;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }
        .comment-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
