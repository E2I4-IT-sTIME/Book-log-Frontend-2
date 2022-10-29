import MainBanner from "./MainBanner";
import PartnerShip from "./PartnerShip";
import CenterContent from "./CenterContent";

export default function HomeLayout() {
  return (
    <div className="container">
      <div className="first-box">
        <MainBanner />
        <PartnerShip />
      </div>
      <CenterContent />
      <style jsx>{`
        .container {
          width: 100vw;
          display: flex;
          flex-direction: column;
          gap: 100px;
        }
        .first-box {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
