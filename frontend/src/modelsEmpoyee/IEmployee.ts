import { AdminInterface } from "../models/IAdmins"
import { DepartmentInterface } from "./IDepartment"
import { PositionInterface } from "./IPosition"
import dayjs, { Dayjs } from "dayjs";


export interface EmployeeInterface{
    ID?:number
    Name ?:   string
	Gender?:  string
	Age  ?:   number
	Contact?: string
	Address?: string
	Date  ?: Dayjs | null;
	Admin?: string,
  	AdminID?: AdminInterface
	DepartmentID?: number
	Department ?:  DepartmentInterface
	PositionID?: number
	Position  ?: PositionInterface
}


