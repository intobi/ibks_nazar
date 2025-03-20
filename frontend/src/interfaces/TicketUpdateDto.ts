export interface TicketUpdateDto {
    id: string;
    description?: string;
    title?: string;
    typeId?: number;
    statusId?: number;
    priorityLvlId?: number;
    moduleId?: number;
}