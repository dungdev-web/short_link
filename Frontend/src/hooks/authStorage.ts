import { StoredUser } from "@/types/StoredUser";
import { UserData } from "@/types/UserData";

export function saveUserToLocalStorage(data: UserData): void {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.user.userId);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email", data.user.email);
}

export function clearUserFromLocalStorage(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
}

export function getUserFromLocalStorage(): StoredUser {
  return {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };
}