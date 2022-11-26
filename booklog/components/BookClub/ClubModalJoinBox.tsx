import { Stage } from "../../res/interface/BookClubInterface";
import { Dispatch, SetStateAction, useState } from "react";

interface joinProps {
  id: number;
  setStage: Dispatch<SetStateAction<Stage>>;
}

export default function ClubModalJoinBox(props: joinProps) {
  const { id, setStage } = props;
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [err, setErr] = useState("");

  const tmpQuestions = [
    "첫 번째 질문입니다.",
    "두 번째 질문입니다.",
    "세 번째 질문입니다.",
    "네 번째 질문입니다.",
    "다섯번 째 질문입니다.",
  ];

  const wrhiteAnswer = (ind: number, value: string) => {
    const newAnswer = answers.map((ans, index) =>
      index === ind ? value : ans
    );
    setAnswers(newAnswer);
  };

  const nextStage = () => {
    setStage(Stage.Complete);
    setErr("");
  };

  const checkAnswer = () => {
    const ansNum = answers.filter((ans) => ans !== "").length;
    tmpQuestions.length === ansNum
      ? nextStage()
      : setErr("아직 작성하지 않은 답변이 있습니다.");
  };

  return (
    <div className="container">
      <span className="title">가입 신청서 작성</span>
      <ul>
        {tmpQuestions.map((q, index) => (
          <li key={`${q}-${index}`}>
            <label htmlFor={q}>{q}</label>
            <input
              id={q}
              type="text"
              placeholder={`${index + 1}번 질문의 답변을 작성해주세요.`}
              value={answers[index]}
              onChange={(e) => wrhiteAnswer(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      {err !== "" ? <span className="err-msg">{err}</span> : <></>}
      <button onClick={() => checkAnswer()}>신청</button>
      <style jsx>{`
        .container {
          width: 100%;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 5px;
          padding: 20px 0px;
        }
        .title {
          font-size: 28px;
          color: white;
          font-weight: 700;
          text-shadow: 2px 2px 4px #141414;
        }
        ul {
          width: 100%;
          list-style-type: none;
          padding: 0px;
          margin: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 10px;
          margin-top: 5px;
        }
        li {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 5px;
        }
        label {
          font-size: 16px;
          font-weight: 400;
          color: white;
          text-shadow: 1px 1px 2px #141414;
          word-break: keep-all;
          white-space: pre-line;
        }
        input {
          width: 100%;
          height: 30px;
          border-radius: 5px;
          border: 1px solid #c9c9c9;
          padding: 0px 5px;
        }
        button {
          align-self: flex-end;
          border: none;
          font-size: 14px;
          font-weight: 900;
          background-color: white;
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 20px;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
          cursor: pointer;
        }
        .err-msg {
          align-items: flex-end;
          font-size: 14px;
          font-weight: 400;
          color: white;
          text-shadow: 1px 1px 2px #141414;
        }
      `}</style>
    </div>
  );
}
