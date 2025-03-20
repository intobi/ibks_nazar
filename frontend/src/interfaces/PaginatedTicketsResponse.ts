import { TicketListItemDto } from "./TicketListItemDto";

export interface PaginatedTicketsResponse {
    items: TicketListItemDto[];
    totalCount: number;
}