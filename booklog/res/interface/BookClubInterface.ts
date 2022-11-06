export interface clubInfo {
  username: string;
  id: number;
  email: string;
  image: string;
  name: string;
  onoff: boolean;
  max_num: number;
  cur_num: number;
  info: string;
  tags: Array<string>;
}

export interface clubQuestions {
  name: string;
  questions: Array<string>;
  createDate: string;
}



export enum Stage {
  Introduce, //소개
  Join, //가입신청
  Complete, //가입신청 완료
}