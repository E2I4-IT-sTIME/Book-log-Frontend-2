import { clubInfo } from "../../res/interface/BookClubInterface";
import Image from "next/image";
import club from "../../res/club.svg";
import UpperBox from "./UpperBox";
import BottomBox from "./BottomBox";

interface clubProps {
  clubs: Array<clubInfo>;
}

export default function ClubLayout(props: clubProps) {
  const { clubs } = props;
  return (
    <div className="container">
      <div className="upper-box">
        <div className="upper-circle" />
        <div className="upper-img-cover">
          <div className="upper-img-box">
            <Image src={club} layout="fill" objectFit="cover" />
          </div>
        </div>
        <UpperBox />
      </div>
      <div className="bottom-box">
        <BottomBox clubs={clubs} />
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-bottom: 200px;
        }
        .upper-box {
          width: 100%;
          height: 600px;
          background-color: #faf5e4;
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          padding-right: 500px;
        }
        .upper-circle {
          width: 400px;
          height: 400px;
          background-color: #125b50;
          border-radius: 100%;
          position: absolute;
          bottom: -50px;
          right: -50px;
        }
        .upper-img-cover {
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
        .upper-img-box {
          width: 400px;
          height: 380px;
          position: relative;
        }
        .bottom-box {
          width: 90%;
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
}
