import { clubInfo } from "../../res/interface/DynamicBookClubInterface";
import LeftBar from "./LeftBar";
import RightBox from "./RightBox";

interface infoProps {
  info: clubInfo;
}

const tmpImages = [
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
];

export default function Layout(props: infoProps) {
  const { info } = props;
  return (
    <div className="container">
      <div className="back-1" />
      <div className="back-2" />
      <div className="profile-box"></div>
      <div className="left-bar">
        <LeftBar images={tmpImages} />
      </div>
      <div className="right-box">
        <RightBox />
      </div>
      <div className="top-box"></div>
      <div className="bottom-box"></div>
      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          background-color: #faf5e4;
          overflow: hidden;
          position: relative;
        }
        .back-1,
        .back-2 {
          background-color: #125b50;
          position: absolute;
          top: 0px;
        }
        .back-1 {
          width: 85%;
          height: 32vh;
          left: 0px;
          border-radius: 0px 0px 50vh 0px;
        }
        .back-2 {
          right: 0px;
          width: 30%;
          height: 20vh;
        }
        .left-bar {
          width: 100px;
          height: 100%;
          background-color: white;
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
          position: absolute;
          left: 0px;
        }
        .right-box {
          width: 25%;
          height: 85vh;
          background-color: white;
          position: absolute;
          bottom: 0px;
          right: 0px;
          border-radius: 8vh 0px 0px 0px;
          box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
        }
        .profile-box {
          width: 15%;
          height: 7vh;
          background-color: white;
          border-radius: 10px;
          position: absolute;
          top: 27px;
          right: 15px;
        }
      `}</style>
    </div>
  );
}
