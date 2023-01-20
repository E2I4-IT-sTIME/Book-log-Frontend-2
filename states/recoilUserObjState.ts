import { atom } from 'recoil';

interface IUserObj {
  id: number;
  image: string;
  username: string;
}

export const recoilUserObjState = atom<IUserObj>({
  key: 'userObj',
  default: {
    id: -1,
    image: '/noSign.svg',
    username: 'User',
  },
});
