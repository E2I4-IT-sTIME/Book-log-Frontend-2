import {
  useState,
  useEffect,
  ComponentProps,
  DOMAttributes,
  Dispatch,
  SetStateAction,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import axios from "axios";

type EventHandlers<T> = Omit<
  DOMAttributes<T>,
  "children" | "dangerouslySetInnerHTML"
>;

export type Event<
  TElement extends keyof JSX.IntrinsicElements,
  TEventHandler extends keyof EventHandlers<TElement>
> = ComponentProps<TElement>[TEventHandler];

enum Direction {
  Left,
  Right,
}

enum Stage {
  Make,
  Complete,
}

interface boxProps {
  setStage: Dispatch<SetStateAction<Stage>>;
}

export default function MakeClubBox(props: boxProps) {
  const { setStage } = props;
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [onoff, setOnoff] = useState(false);
  const [profile, setProfile] = useState("");
  const [attachment, setAttachment] = useState("");
  const [imgFile, setImgFile] = useState<File>();
  const [maxNum, setMaxNum] = useState(2);
  const [tags, setTags] = useState<Array<string>>();
  const [ment, setMent] = useState("");
  const [questions, setQuestions] = useState<Array<string>>();
  const [err, setErr] = useState("");

  const handleOnChange: Event<"input", "onChange"> = (e) => {
    if (window.FileReader) {
      const {
        currentTarget: { files, value },
      } = e;
      if (files !== null) {
        const theFile = files![0];
        const reader = new FileReader();
        setProfile(value);
        reader.onloadend = (finishedEvent: any) => {
          const {
            target: { result },
          } = finishedEvent;
          setAttachment(result);
          setImgFile(theFile);
        };
        reader.readAsDataURL(theFile);
      }
    }
  };

  const handleNum = (direction: Direction) => {
    if (direction === Direction.Left) {
      maxNum === 2 ? null : setMaxNum((prev) => prev - 1);
    } else {
      maxNum === 30 ? null : setMaxNum((prev) => prev + 1);
    }
  };

  const updateTags = () => {
    if (tags && tags.length === 5) {
      setErr("태그는 최대 5개 까지 작성할 수 있습니다.");
      return;
    }
    setTags((prev) => (prev ? [tag, ...prev] : [tag]));
    setTag("");
    setErr("");
  };

  const deleteTag = (ind: number) => {
    if (tags) {
      const newTags = tags.filter((tag, index) => index !== ind);
      setTags(newTags);
      setErr("");
    }
  };

  const updateQuestions = () => {
    if (questions && questions.length === 5) {
      setErr("질문은 최대 5개 까지 작성할 수 있습니다.");
      return;
    }
    setQuestions((prev) => (prev ? [...prev, question] : [question]));
    setQuestion("");
    setErr("");
  };

  const deleteQuestions = (ind: number) => {
    if (questions) {
      const newQuestions = questions.filter((question, index) => index !== ind);
      setQuestions(newQuestions);
      setErr("");
    }
  };

  const completeMake = () => {
    attachment !== "" &&
    name !== "" &&
    tags &&
    tags.length > 0 &&
    content !== "" &&
    ment !== "" &&
    questions &&
    questions.length > 0
      ? setStage(Stage.Complete)
      : setErr("입력하지 않은 정보가 존재합니다.");
  };

  const makeQuery = () => {
    const newObj = new FormData();
    // newObj.append("hashtags");

    axios
      .post(
        "http://43.200.85.245:8080/auth/meeting",
        {},
        {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            // Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log("Error!");
      });
  };

  return (
    <div className="container">
      <div className="first-info-box">
        <div className="img-box">
          {attachment !== "" ? (
            <Image src={attachment} layout="fill" objectFit="cover" />
          ) : (
            <div className="no-img" />
          )}
          <div className="hover-box">
            <label htmlFor="file" className="vanilla-label">
              업로드
            </label>
            <input
              name="file"
              type="file"
              id="file"
              accept="image/*"
              onChange={handleOnChange}
              value={profile}
            />
          </div>
        </div>
        <ul className="info-box">
          <li>
            <label htmlFor="name" className="vanilla-label">
              모임명
            </label>
            <input
              id="name"
              placeholder="독서모임의 이름을 입력해주세요."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="tag" className="vanilla-label">
              모임 태그
            </label>
            <form
              className="btn-input"
              onSubmit={(e) => {
                e.preventDefault();
                updateTags();
              }}
            >
              <input
                id="tag"
                placeholder="태그를 입력해주세요."
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button>입력</button>
            </form>
            <div className="tag-box">
              {tags ? (
                tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="tag"
                    onClick={() => deleteTag(index)}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <></>
              )}
            </div>
          </li>
          <li>
            <label htmlFor="max-num" className="vanilla-label">
              최대 인원
            </label>
            <div className="num-box">
              <button onClick={() => handleNum(Direction.Left)}>
                <FontAwesomeIcon icon={faCaretDown} />
              </button>
              <span>{maxNum}</span>
              <button onClick={() => handleNum(Direction.Right)}>
                <FontAwesomeIcon icon={faCaretUp} />
              </button>
            </div>
          </li>
          <li className="onoff-title">
            <label className="switch-button">
              <input
                type="checkbox"
                checked={onoff}
                onChange={(e) => setOnoff(e.target.checked)}
              />
              <span className="onoff-switch"></span>
            </label>
            <span>{onoff ? `대면 모임` : `비대면 모임`}</span>
          </li>
        </ul>
      </div>
      <div className="second-info-box">
        <ul>
          <li>
            <label htmlFor="content" className="vanilla-label">
              모임 설명
            </label>
            <textarea
              id="content"
              placeholder="모임에 대해 간략하게 설명해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </li>
          <li>
            <label htmlFor="ment" className="vanilla-label">
              환영 멘트를 작성해주세요.
            </label>
            <input
              id="ment"
              type="text"
              placeholder="모임원을 맞이할 짧은 환영 문구를 작성해주세요."
              value={ment}
              onChange={(e) => setMent(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="questions" className="vanilla-label">
              최대 5개의 가입 질문을 입력해주세요.
            </label>
            <form
              className="btn-input"
              onSubmit={(e) => {
                e.preventDefault();
                updateQuestions();
              }}
            >
              <input
                id="questions"
                placeholder="가입 질문을 입력해주세요."
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button>입력</button>
            </form>
            <div className="questions-box">
              {questions ? (
                questions.map((question, index) => (
                  <div className="question" key={`${question}-${index}`}>
                    Q{index + 1}. {question}{" "}
                    <button onClick={() => deleteQuestions(index)}>
                      <FontAwesomeIcon icon={faX} />
                    </button>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="btn-box">
        <span className="err-msg">{err}</span>
        <button onClick={() => completeMake()}>생성 완료</button>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 20px;
        }
        ul {
          width: 100%;
          list-style-type: none;
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        li {
          width: 100%;
          display: flex;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
        .first-info-box {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 2.7fr;
          grid-gap: 20px;
        }
        .img-box {
          display: flex;
          justify-content: center;
          align-items: center;
          object-fit: cover;
          overflow: hidden;
          width: 100%;
          height: 300px;
          border-radius: 10px;
          box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
            0 8px 16px -8px rgba(0, 0, 0, 0.3),
            0 -6px 16px -6px rgba(0, 0, 0, 0.025);
          position: relative;
        }
        .no-img {
          background-color: #cacaca;
          width: 100%;
          height: 100%;
        }
        .attachment {
          object-fit: cover;
        }
        .hover-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: 300px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          border: 2px solid rgba(255, 255, 255, 0.18);
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          transition: opacity 0.25s linear;
        }
        .img-box:hover .hover-box {
          opacity: 1;
        }
        input[type="file"] {
          /* 파일 필드 숨기기 */
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .hover-box label {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          border-radius: 5px;
          border: 2px solid #125b50;
          background-color: #00ff0000;
          color: #125b50;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 5px 18px 0px rgba(50, 50, 93, 0.111),
            0 3px 10px -3px rgba(0, 0, 0, 0.137),
            0 -1px 8px -1px rgba(0, 0, 0, 0.025);
          transition: 0.25s;
          cursor: pointer;
        }
        .hover-box label:hover {
          background-color: #125b50;
          color: white;
        }
        .info-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-evenly;
        }
        .onoff-title {
          color: ${onoff ? "#125b50" : "#f94c66"};
          font-size: 14px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .switch-button {
          position: relative;
          display: inline-block;
          width: 45px;
          height: 25px;
        }

        .switch-button input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .onoff-switch {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 20px;
          background-color: #f94c66;
          box-shadow: inset 1px 5px 1px #f94c66;
          -webkit-transition: 0.4s;
          transition: 0.4s;
        }

        .onoff-switch:before {
          position: absolute;
          content: "";
          height: 17px;
          width: 17px;
          left: 4px;
          bottom: 4px;
          background-color: #fff;
          -webkit-transition: 0.5s;
          transition: 0.4s;
          border-radius: 20px;
        }

        .switch-button input:checked + .onoff-switch {
          background-color: #125b50;
          box-shadow: inset 1px 5px 1px #125b50;
        }

        .switch-button input:checked + .onoff-switch:before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
        .vanilla-label {
          font-size: 16px;
          color: #6b737d;
        }
        input[type="text"] {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #c9c9c9;
        }
        .num-box {
          display: flex;
          flex-direction: row;
          gap: 5px;
          justify-content: flex-start;
          align-items: center;
        }
        .num-box button {
          border: none;
          background: none;
          cursor: pointer;
          font-size: 20px;
          color: #6b737d;
        }
        #content {
          width: 100%;
          height: 200px;
          padding: 10px;
        }
        .second-info-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
            Pretendard, Roboto, "Noto Sans KR", "Segoe UI", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        }
        .btn-box {
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }
        .err-msg {
          color: #f94c66;
        }
        .btn-box button {
          color: white;
          font-size: 16px;
          font-weight: 800;
          color: white;
          padding: 10px 15px;
          border: none;
          background-color: #125b50;
          border-radius: 5px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          cursor: pointer;
        }
        .tag-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: center;
        }
        .tag {
          padding: 0px 10px;
          height: 24px;
          background-color: #d9d9d9;
          color: #6b737d;
          font-size: 14px;
          font-weight: 600;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .btn-input {
          display: grid;
          width: 100%;
          grid-template-columns: 7fr 1fr;
          grid-gap: 10px;
        }
        .btn-input button {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #6b737d;
          color: #d9d9d9;
          font-weight: 600;
          border-radius: 5px;
          cursor: pointer;
        }
        .questions-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 5px;
          margin-top: 5px;
        }
        .questions-box div {
          color: #141414;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }
        .questions-box button {
          border: none;
          background-color: #6b737d;
          width: 16px;
          height: 16px;
          border-radius: 100%;
          font-size: 8px;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
