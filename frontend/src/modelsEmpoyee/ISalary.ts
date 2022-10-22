import { DepartmentInterface } from "./IDepartment";
import { PositionInterface } from "./IPosition";

export interface SalaryInterface {
  ID?: number;

  DepartmentID?: number;
  Department?: DepartmentInterface;

  PositionID?: number;
  Position?: PositionInterface;

  Amount?: number;
}
