import { Comment } from "./RightBox";
import axios from "axios";
import { timeFormatter } from "./TimeFormatter";

interface commentProps {
  id: number;
  comment: Comment;
  getNotice: () => void;
}

export default function CommentBox(props: commentProps) {
  const { id, comment, getNotice } = props;

  const deleteComment = () => {
    if (
      confirm("정말 댓글을 삭제하시겠습니까?\n삭제된 댓글은 복구되지 않습니다.")
    ) {
      const jwt = localStorage.getItem("access_token");
      axios
        .delete(
          `https://booklog.site/auth/meeting/${id}/comment/${comment.comment_id}`,
          {
            headers: {
              "Content-Type": `application/json`,
              Accept: "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          alert("삭제되었습니다.");
          getNotice();
        })
        .catch((err) => {
          alert("삭제에 실패했습니다.");
          console.log(err);
        });
    }
  };

  return (
    <div className="comment-box">
      <div className="profile-box">
        <div className="info-box">
          <span className="writer">{comment.username || "User"}</span>
          <div className="light-box">
            <span className="comment-date">
              {timeFormatter(comment.createtDate)}
            </span>
            <span className="delete-btn" onClick={() => deleteComment()}>
              삭제
            </span>
          </div>
        </div>
      </div>
      <div className="content-box">
        <span className="content">{comment.content}</span>
      </div>
      <style jsx>{`
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
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .writer {
          color: #4f4f4f;
          font-weight: 700;
        }
        .light-box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 200;
          gap: 30px;
        }
        .delete-btn {
          cursor: pointer;
        }
        .delete-btn:hover {
          color: #125b50;
        }
        .content-box {
          color: #242424;
        }
        .content {
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
}
