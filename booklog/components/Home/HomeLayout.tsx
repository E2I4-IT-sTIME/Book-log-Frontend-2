import MainBanner from "./MainBanner";
import PartnerShip from "./PartnerShip";
import CenterContent from "./CenterContent";
import ClubCarousel from "./ClubCarousel";
import { clubInfo } from "../../res/interface/HomeInterface";

interface homeProps {
  clubs: Array<clubInfo>;
}

export default function HomeLayout(props: homeProps) {
  const { clubs } = props;
  return (
    <div className="container">
      <div className="first-box">
        <MainBanner />
        <PartnerShip />
      </div>
      <CenterContent />
      <ClubCarousel clubs={clubs} />
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          gap: 100px;
          padding-bottom: 100px;
        }
        .first-box {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
