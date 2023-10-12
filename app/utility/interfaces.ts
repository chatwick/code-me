import { JsxElement } from "typescript";

export interface signOutReturn {
  status: true;
  message: "Successfully signedout";
}

export interface alertInterface {
  message: string;
  type: string;
}

export interface alertIcons {
  [key: string]: React.JSX.Element;
}

export interface availableUser {
  status: boolean;
  uid: string;
  user: { email: string };
  params: { userAcc: string };
}

export interface userParams {
  params: { userAcc: string };
}

export interface loginUser{
    status: boolean;
    message: string;
}