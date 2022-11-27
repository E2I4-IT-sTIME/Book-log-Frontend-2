export default function TitleBox() {
  const hashTags = ["독서", "책읽기", "시집", "다함께", "감성"];
  const onoff = false;
  return (
    <div className="container">
      <span className="title">독서모임 이름입니다.</span>
      <div className="tags">
        {hashTags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="content">
        <span>#{onoff ? "대면 모임" : "비대면 모임"}</span>
        <span>{`감성적인 책을 좋아하는 사람들의 모임입니다.\n모임명은 별 헤는 밤 독서모임이지만, 장르를 가리지 않아요!`}</span>
      </div>
      <div className="sub-box">{}</div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 7px;
          justify-content: flex-start;
        }
        .title {
          color: white;
          font-size: 32px;
          font-weight: 900;
        }
        .tags {
          display: flex;
          flex-direction: row;
          gap: 5px;
          align-items: center;
          justify-content: flex-start;
        }
        .tag {
          color: #125b50;
          background-color: white;
          padding: 7px 15px;
          border-radius: 20px;
          font-weight: 900;
          font-size: 14px;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 3px;
          color: white;
          font-weight: 400;
          white-space: pre-line;
          word-break: keep-all;
        }
      `}</style>
    </div>
  );
}
