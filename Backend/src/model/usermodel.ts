import { error } from "console";
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  address: string;
  phone: number;
  password: string;
}
const users: User[] = [];
export default users;
export function getAllUsers(): User[] {
  return users;
}
export function CreateUser(input: Omit<User, "id">): User {
  const newUser: User = {
    id: users.length + 1,
    ...input,
  };
  users.push(newUser);
  return newUser;
}
// export function getUserNameAndPasswordmodel(
//   username: string,
//   password: string
// ): User | null {
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   return user || null;
// }
