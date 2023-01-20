export interface IUserInfo {
  image: string;
  username: string;
}

export interface IReview {
  review_id: number;
  title: string;
  content: string;
  isbn: string;
  selected: boolean;
}
