import { clubInfo } from "../../res/interface/DynamicBookClubInterface";
import { useState, useEffect } from "react";
import LeftBar from "./LeftBar";
import ProfileBox from "./ProfileBox";
import RightBox from "./RightBox";
import TitleBox from "./TitleBox";
import axios from "axios";

interface infoProps {
  id: number;
  info: clubInfo;
  isAdmin: boolean;
}

const tmpImages = [
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
  "https://i.pinimg.com/564x/42/0d/e8/420de8cce15c86343592a7a5c5929956.jpg",
];

export default function Layout(props: infoProps) {
  const { id, info, isAdmin } = props;
  const [userList, setUserList] = useState<Array<string>>([]);

  const getUserList = () => {
    const jwt = localStorage.getItem("access_token");
    axios
      .get(`http://15.165.100.90:8080/auth/meeting/${id}`, {
        headers: {
          "Content-Type": `application/json`,
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setUserList(res.data.userImage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className="container">
      <div className="back-1" />
      <div className="back-2" />
      <div className="profile-box">
        <ProfileBox />
      </div>
      <div className="left-bar">
        <LeftBar images={userList} />
      </div>
      <div className="right-box">
        <RightBox id={id} isAdmin={isAdmin} />
      </div>
      <div className="top-box">
        <TitleBox info={info} />
      </div>
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
        .top-box {
          width: 80%;
          height: 32vh;
          position: absolute;
          top: 0px;
          left: 130px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
