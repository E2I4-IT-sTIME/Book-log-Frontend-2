import Stamp from "./Stamp";
import axios from "axios";
import moment from "moment";

const today = new Date();

interface bottomProps {
  infoUpdate: () => void;
  id: number;
  dates: Array<string>;
}

export default function BottomBox(props: bottomProps) {
  const { infoUpdate, id, dates } = props;

  const attendance = () => {
    if (dates) {
      for (let i = 0; i < dates.length; i++) {
        if (
          moment(dates[i]).format("YYYY-MM-DD") ===
          moment(today).format("YYYY-MM-DD")
        ) {
          alert("이미 출석을 완료하였습니다.");
          return;
        }
      }
      const jwt = localStorage.getItem("access_token");
      axios
        .post(
          `http://15.165.100.90:8080/auth/meeting/${id}/attendance`,
          {
            date: today.toString(),
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
          infoUpdate();
        })
        .catch((err) => {
          alert("출석체크에 실패했습니다.");
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <Stamp
        isCompleted={false}
        date={today.toString()}
        attendance={attendance}
      />
      <div className="horizon-line" />
      {dates && dates.length > 0 ? (
        dates.map((date, index) => (
          <Stamp
            isCompleted={true}
            date={date}
            attendance={attendance}
            key={date}
          />
        ))
      ) : (
        <></>
      )}
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          gap: 30px;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 50px 100px;
          overflow-y: scroll;
          overflow-x: auto;
        }
        .container::-webkit-scrollbar {
          width: 5px;
        }
        .container::-webkit-scrollbar-thumb {
          background-color: #125b50;
        }
        .container::-webkit-scrollbar-track {
          background-color: #00ff0000;
        }
        .horizon-line {
          height: 1px;
          width: 90%;
          background-color: #d1d3d4;
        }
      `}</style>
    </div>
  );
}
