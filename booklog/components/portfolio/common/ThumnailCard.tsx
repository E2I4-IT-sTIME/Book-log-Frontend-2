import { useEffect, useState } from "react";
import { bookImgSearch } from "./fetchBook";

const ThumnailCard = (props: any) => {
  const [bookImgSrc, setBookImgSrc] = useState("");

  const srcHandler = async () => {
    setBookImgSrc((await bookImgSearch(props.isbn)) || "");
  };

  useEffect(() => {
    srcHandler();
  }, []);

  return (
    <img
      className="hi"
      src={bookImgSrc || "/tmp.jpg"}
      style={{ width: 40, height: 70, borderRadius: 10, objectFit: "contain" }}
    />
  );
};

export default ThumnailCard;
