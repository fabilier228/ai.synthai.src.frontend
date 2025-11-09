export interface UserData {
  avatar: string;
  nickname: string;
  fullName: string;
  email: string;
  status: "Active" | "Email Unverified";
  registrationDate: string;
  lastLogin: string;
}
