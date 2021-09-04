export interface IGroup {
    id?: number;
    abbr: string;
    form_education: 'Денна' | 'Заочна';
    max_quantity_members?: number;
    department_id: number;
}