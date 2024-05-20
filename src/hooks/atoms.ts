import { atom } from 'recoil';

export interface Todo {
    id: number;
    text: string;
    checked: boolean;
}
  
export const todoState = atom<Todo[]>({
    key: 'todoState',
    default: [
        {
            id: 1,
            text: "example1",
            checked: true,
          },
          {
            id: 2,
            text: "example2",
            checked: false,
          },
          {
            id: 3,
            text: "example3",
            checked: true,
          },
    ],
});