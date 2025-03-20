using Microsoft.AspNetCore.Mvc;
using Monolit.Data;
using Monolit.DTOs;
using Monolit.Interfaces;
using Monolit.Models;

namespace Monolit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketsService _ticketsService;
        private readonly IUserService _userService;

        public TicketsController(ITicketsService ticketsService, IUserService userService)
        {
            _ticketsService = ticketsService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResponse<TicketListItemDto>>> GetTickets([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            var tickets = await _ticketsService.GetAllTickets(page, limit);
            var totalCount = await _ticketsService.GetTotalTicketsCount();
            var response = new PaginatedResponse<TicketListItemDto>
            {
                Items = tickets,
                TotalCount = totalCount
            };
            return Ok(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TicketViewDto>> GetTicket(long id)
        {
            var ticket = await _ticketsService.GetTicketById(id);

            if (ticket == null)
            {
                return NotFound();
            }
            
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<ActionResult<TicketViewDto>> CreateTicket(TicketCreateDto ticket)
        {
            var randomUserOID = await _userService.GetRandomUserId();
            
            var newTicket = await _ticketsService.AddNewTicket(ticket, randomUserOID);
            return Ok(newTicket);
        }
        
        [HttpPut]
        public async Task<ActionResult<TicketViewDto>> UpdateTicket(TicketUpdateDto ticket)
        {
            var editedTicket = await _ticketsService.UpdateTicket(ticket);
            return Ok(editedTicket);
        }
        
        [HttpGet("types")]
        public async Task<ActionResult<IEnumerable<DropdownItemDto>>> GetTypes()
        {
            var ticketTypes = await _ticketsService.GetTicketTypes();
            return Ok(ticketTypes);
        }
        
        [HttpGet("modules")]
        public async Task<ActionResult<IEnumerable<DropdownItemDto>>> GetModules()
        {
            var ticketTypes = await _ticketsService.GetModules();
            return Ok(ticketTypes);
        }
        
        [HttpGet("statuses")]
        public async Task<ActionResult<IEnumerable<DropdownItemDto>>> GetStatuses()
        {
            var ticketTypes = await _ticketsService.GetStatuses();
            return Ok(ticketTypes);
        }
        
        [HttpGet("priorities")]
        public async Task<ActionResult<IEnumerable<DropdownItemDto>>> GetPriorities()
        {
            var ticketTypes = await _ticketsService.GetPriorities();
            return Ok(ticketTypes);
        }
    }
}
