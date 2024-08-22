import { IUserListReq } from 'services/api/user/type';

export const userKeys = {
  all: ['user'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters: IUserListReq) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id: number) => [...userKeys.details(), id]
};
