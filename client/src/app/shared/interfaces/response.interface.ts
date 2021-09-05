import { IDepartment } from "./department.interface";
import { IGroup } from "./group.interface";

export interface IResponse{
    result: IDepartment[] | IDepartment | IGroup[] | IGroup | any,
    status: number
}