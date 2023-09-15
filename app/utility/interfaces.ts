import { JsxElement } from "typescript";

export interface signOutReturn {
  status: true;
  message: "Successfully signedout";
}

export interface alertInterface{
  message: string, 
  type: string
}

export interface alertIcons{
  [key: string] : React.JSX.Element
}