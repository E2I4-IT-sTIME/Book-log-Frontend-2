import { Stage } from "../../res/interface/BookClubInterface";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";

interface joinProps {
  id: number;
  setStage: Dispatch<SetStateAction<Stage>>;
}

export default function ClubModalJoinBox(props: joinProps) {
  const { id, setStage } = props;
  const [questions, setQuestions] = useState<Array<string>>();
  const [answers, setAnswers] = useState<Array<string>>();
  const [err, setErr] = useState("");

  const writeAnswer = (ind: number, value: string) => {
    const newAnswer = answers?.map((ans, index) =>
      index === ind ? value : ans
    );
    setAnswers(newAnswer);
  };

  const nextStage = () => {
    setStage(Stage.Complete);
    setErr("");
  };

  const checkAnswer = () => {
    const ansNum = answers?.filter((ans) => ans !== "").length;
    const qNum = questions?.filter((q) => q !== null).length;
    qNum === ansNum
      ? register()
      : setErr("아직 작성하지 않은 답변이 있습니다.");
  };

  const getQuestions = () => {
    axios
      .get(`https://booklog.site/auth/${id}/question`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        const resQuestions: Array<string> = res.data.questions;
        setQuestions(resQuestions);
        resQuestions.forEach((q) => {
          q !== null
            ? setAnswers((prev) => (prev ? [...prev, ""] : [""]))
            : null;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = () => {
    axios
      .post(
        `https://booklog.site/auth/meetings/${id}`,
        {
          answers: answers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        nextStage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="container">
      <span className="title">가입 신청서 작성</span>
      <ul>
        {questions &&
          answers &&
          questions.map((q, index) =>
            q !== null ? (
              <li key={`${q}-${index}`}>
                <label htmlFor={q}>{q}</label>
                <input
                  id={q}
                  type="text"
                  placeholder={`${index + 1}번 질문의 답변을 작성해주세요.`}
                  value={answers[index]}
                  onChange={(e) => writeAnswer(index, e.target.value)}
                />
              </li>
            ) : (
              <></>
            )
          )}
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
