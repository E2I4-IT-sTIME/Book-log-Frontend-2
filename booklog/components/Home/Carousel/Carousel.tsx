import { clubInfo } from "../../../res/interface/HomeInterface";
import { useState, useEffect } from "react";
import CarouselItem from "./CarouselItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

interface carouselProps {
  clubs: Array<clubInfo>;
}

enum Direction {
  Left,
  Right,
}

export default function Carousel(props: carouselProps) {
  const { clubs } = props;
  const [clubArray, setClubArray] = useState(clubs);
  const [moveX, setMoveX] = useState(0);
  const [curIndex, setCurIndex] = useState(0);

  const move = (direction: Direction) => {
    console.log(clubs.length);
    if (direction === Direction.Left) {
      curIndex === clubs.length - 1 ? null : moveLeft();
    } else {
      curIndex === 0 ? null : moveRight();
    }
  };

  const moveLeft = () => {
    setMoveX((prev) => prev - 340);
    setCurIndex((prev) => prev + 1);
  };

  const moveRight = () => {
    setMoveX((prev) => prev + 340);
    setCurIndex((prev) => prev - 1);
  };

  useEffect(() => {
    clubArray.length > 10 ? setClubArray((prev) => prev.slice(0, 10)) : null;
  }, []);

  useEffect(() => {
    console.log(moveX);
  }, [moveX]);

  return (
    <div className="container">
      <div className="btns">
        <button className="left-btn" onClick={() => move(Direction.Left)}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button className="right-btn" onClick={() => move(Direction.Right)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      <div className="items">
        {clubArray.map((club, index) => (
          <CarouselItem
            key={club.id}
            index={index}
            item={club}
            length={clubArray.length}
          />
        ))}
      </div>
      <style jsx>{`
        .container {
          margin-top: 20px;
          position: relative;
          transition: all 0.25s;
        }
        .btns {
          width: 100vw;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
          padding: 0px 35px 0px 20px;
        }
        button {
          border: none;
          background-color: #777777;
          color: white;
          font-size: 20px;
          width: 24px;
          height: 24px;
          border-radius: 100%;
          opacity: 0.7;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          cursor: pointer;
          z-index: 20;
        }
        button:hover {
          background-color: #125b50;
          opacity: 1;
        }
        button:active {
          background-color: #082924;
        }
        .items {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          gap: 40px;
          transform: ${`translateX(${moveX}px)`};
          transition: all 0.25s;
        }
      `}</style>
    </div>
  );
}
