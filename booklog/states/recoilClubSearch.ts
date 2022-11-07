import { atom } from "recoil";

export enum ClubState {
  AllClubs,
  MyClubs,
}

export const clubState = atom<ClubState>({
  key: "myClub",
  default: ClubState.AllClubs,
});

export const nameKeywordState = atom<string>({
  key: "nameKeyword",
  default: "",
});

export const tagKeywordState = atom<string>({
  key: "tagKeyword",
  default: "",
});

export const onoffState = atom<boolean>({
  //true일 때 대면, false일 때 비대면
  key: "onoff",
  default: true,
});
