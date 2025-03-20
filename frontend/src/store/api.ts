import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {TicketViewDto} from "../interfaces/TicketViewDto";
import {TicketCreateDto} from "../interfaces/TicketCreateDto";
import {TicketUpdateDto} from "../interfaces/TicketUpdateDto";
import {ReplyDto} from "../interfaces/ReplyDto";
import {ReplyCreateDto} from "../interfaces/ReplyCreateDto";
import {PaginatedTicketsResponse} from "../interfaces/PaginatedTicketsResponse";
import {DropdownItemDto} from "../interfaces/DropdownItemDto";

// RTK Query API
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5254/api' }),
    tagTypes: ['Tickets', 'Replies'],

    endpoints: (builder) => ({

        // tickets
        getTickets: builder.query<PaginatedTicketsResponse, { page: number; limit: number }>({
            query: ({ page, limit }) => `tickets?page=${page}&limit=${limit}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ id }) => ({ type: 'Tickets' as const, id })),
                        { type: 'Tickets', id: 'LIST' },
                    ]
                    : [{ type: 'Tickets', id: 'LIST' }],
        }),

        getTicketById: builder.query<TicketViewDto, number>({
            query: (id) => `tickets/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tickets', id }],
        }),

        createTicket: builder.mutation<TicketViewDto, TicketCreateDto>({
            query: (newTicket) => ({
                url: 'tickets',
                method: 'POST',
                body: newTicket,
            }),
            invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
        }),

        updateTicket: builder.mutation<TicketViewDto, TicketUpdateDto>({
            query: (updatedTicket) => ({
                url: 'tickets',
                method: 'PUT',
                body: updatedTicket,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }, { type: 'Tickets', id: 'LIST' }],
        }),

        // replies
        getRepliesByTicketId: builder.query<ReplyDto[], number>({
            query: (id) => `replies/by-ticketId/${id}`,
            providesTags: (result, error, id) => [{ type: 'Replies', id }],
        }),

        createReply: builder.mutation<ReplyDto, ReplyCreateDto>({
            query: (newReply) => ({
                url: 'replies',
                method: 'POST',
                body: newReply,
            }),
            invalidatesTags: (result, error, { ticketId }) => [{ type: 'Replies', id: ticketId }],
        }),

        // dropdown
        getTicketTypes: builder.query<DropdownItemDto[], void>({
            query: () => 'tickets/types',
        }),

        getModules: builder.query<DropdownItemDto[], void>({
            query: () => 'tickets/modules',
        }),

        getStatuses: builder.query<DropdownItemDto[], void>({
            query: () => 'tickets/statuses',
        }),

        getPriorities: builder.query<DropdownItemDto[], void>({
            query: () => 'tickets/priorities',
        }),
    }),
});

export const {
    useGetTicketsQuery,
    useGetTicketByIdQuery,
    useCreateTicketMutation,
    useUpdateTicketMutation,
    useGetRepliesByTicketIdQuery,
    useCreateReplyMutation,
    useGetTicketTypesQuery,
    useGetModulesQuery,
    useGetStatusesQuery,
    useGetPrioritiesQuery,
} = api;
