import { atom } from "recoil";

export enum CurrentLayout {
  NoHeader,
  Header,
  WhiteHeader,
}

export const ClubLayoutState = atom<CurrentLayout>({
  key: "layout",
  default: CurrentLayout.Header,
});
