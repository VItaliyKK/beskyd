import { IDepartment } from "./department.interface";
import { IGroup } from "./group.interface";
import { IStudent } from "./student.interface";

export interface IResponse{
    result: IDepartment[] | IDepartment | IGroup[] | IGroup | IStudent | IStudent[] | any,
    status: number
}