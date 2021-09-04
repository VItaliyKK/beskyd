import { IDepartment } from "./department.interface";

export interface IResponse{
    result: IDepartment[] | IDepartment | any,
    status: number
  }