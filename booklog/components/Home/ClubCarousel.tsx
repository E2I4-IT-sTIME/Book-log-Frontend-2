export default function ClubCarousel() {
  const content =
    "함께하면 두배로 재미있는 법.\n독서도 마찬가지죠. 나와 독서 취향이 맞는 사람들을 구해서 함께 책을 읽어봐요.\n분명 의지력도 향상되고, 훨씬 즐거울 거예요.";
  return (
    <div className="container">
      <div className="upper-box">
        <div className="title-box">
          <span className="subtitle">심심하고 지루한 독서는 그만.</span>
          <span className="title">취향 맞는 사람끼리 모여 같이 읽자!</span>
        </div>
        <span className="content">{content}</span>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
          white-space: pre-line;
        }
        .upper-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .subtitle {
          font-size: 28px;
          font-weight: 800;
        }
        .title {
          font-size: 32px;
          font-weight: 900;
        }
        .content {
          line-height: 22px;
        }
      `}</style>
    </div>
  );
}
