import { atom } from "recoil";

export const recoilKakakoState = atom<boolean>({
  //최초 카카오 로그인시 리다이렉션 -> true로 설정된 사람만 signup 페이지 접근 가능
  key: "isRedirection",
  default: false,
});
