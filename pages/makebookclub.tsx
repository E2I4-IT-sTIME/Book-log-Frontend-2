import Seo from '../components/Seo';
import MakeClubLayout from '../components/BookClub/MakeClub/MakeClubLayout';
import { useRecoilState } from 'recoil';
import { CurrentLayout, ClubLayoutState } from '../states/recoilLayoutState';
import { useEffect } from 'react';
import { recoilKakakoState } from '../states/recoilKakaoRedirection';

export default function Makebookclub() {
  const [layoutState, setLayoutState] = useRecoilState(ClubLayoutState);
  const [isRedirection, setIsRedirection] = useRecoilState(recoilKakakoState);

  useEffect(() => {
    setIsRedirection(false);
    setLayoutState(CurrentLayout.Header);
  }, []);

  return (
    <>
      <Seo
        title="Make Book Club"
        content="Booklog - 나만의 독서 모임을 만들고, 동료를 구해보세요!"
      />
      <MakeClubLayout />
    </>
  );
}
