import { clubInfo } from "../../res/interface/BookClubInterface";
import BottomBoxItem from "./BottomBoxItem";

interface boxProps {
  clubs: Array<clubInfo>;
}

export default function BottomBox(props: boxProps) {
  const { clubs } = props;
  return (
    <div className="container">
      {clubs.map((club, index) => (
        <BottomBoxItem item={club} key={`${club.id} - ${index}`} />
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto;
          gap: 50px;
        }
      `}</style>
    </div>
  );
}
