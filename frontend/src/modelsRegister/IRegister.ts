import { GenderInterface } from "./IGender";
import { StatusInterface } from "./IStatus";
import { ProvinceInterface } from "./IProvince";

export interface RegisterInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  Password?: string;
  Email?: string;
  Gender?: GenderInterface;
  Gender_ID?: number;
  Status?: StatusInterface;
  Status_ID?: number;
  Province_ID?: number;
  Province?: ProvinceInterface;
}
