import { clubInfo } from "../../res/interface/DynamicBookClubInterface";

interface titleProps {
  info: clubInfo;
}

export default function TitleBox(props: titleProps) {
  const { info } = props;

  return (
    <div className="container">
      <span className="title">{info.name}</span>
      <div className="tags">
        {info.tags.map((tag, index) =>
          tag !== null ? (
            <span key={`${tag}-${index}`} className="tag">
              {tag}
            </span>
          ) : (
            <></>
          )
        )}
      </div>
      <div className="content">
        <span>#{info.onoff ? "대면 모임" : "비대면 모임"}</span>
        <span>{info.info}</span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
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
