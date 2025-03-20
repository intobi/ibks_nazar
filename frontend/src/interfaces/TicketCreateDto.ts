export interface TicketCreateDto {
    description: string;
    title: string;
    typeId: number;
    statusId: number;
    priorityLvlId: number;
    moduleId: number;
}