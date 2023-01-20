import Link from "next/link";

interface customProps {
  title: string;
  url: string;
}

export default function ClubModalWaiting(props: customProps) {
  const { title, url } = props;
  return (
    <div className="container">
      <span className="title">{title}</span>
      <span className="subtitle">
        승인이 완료될 때 까지{" "}
        <Link href={url}>
          <a>서평 쓰고있기</a>
        </Link>
      </span>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          z-index: 20;
          gap: 5px;
          padding: 20px 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .title {
          font-size: 28px;
          color: white;
          font-weight: 700;
          text-shadow: 2px 2px 4px #141414;
        }
        .subtitle {
          font-size: 16px;
          font-weight: 400;
          color: white;
          text-shadow: 1px 1px 2px #141414;
        }
        a {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
