using AutoMapper;
using Monolit.DTOs;
using Monolit.Interfaces;
using Monolit.Interfaces.Repository;
using Monolit.Models;

namespace Monolit.Services
{
    public class TicketsService : ITicketsService
    {
        private readonly ITicketsRepository _ticketRepository;
        private readonly IGenericRepository<Application> applicationRepository;
        private readonly IGenericRepository<Status> statusRepository;
        private readonly IGenericRepository<Priority> priorityRepository;
        private readonly IGenericRepository<TicketType> ticketTypeRepository;
        private readonly IMapper _mapper;

        public TicketsService(ITicketsRepository ticketRepository, 
            IMapper mapper, 
            IGenericRepository<Application> applicationRepository, 
            IGenericRepository<Status> statusRepository, 
            IGenericRepository<Priority> priorityRepository, 
            IGenericRepository<TicketType> ticketTypeRepository)
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
            this.applicationRepository = applicationRepository;
            this.statusRepository = statusRepository;
            this.priorityRepository = priorityRepository;
            this.ticketTypeRepository = ticketTypeRepository;
        }

        public async Task<IEnumerable<TicketListItemDto>> GetAllTickets(int page, int limit)
        {
            var tickets = await _ticketRepository.GetTicketsWithDetailsAsync(page, limit);
            return _mapper.Map<IEnumerable<TicketListItemDto>>(tickets);
        }
        
        public async Task<TicketViewDto?> GetTicketById(long id)
        {
            var ticket = await _ticketRepository.GetTicketById(id);
            
            return _mapper.Map<TicketViewDto>(ticket);
        }

        public async Task<TicketViewDto> AddNewTicket(TicketCreateDto ticket, string userOID)
        {
            var newTicket = _mapper.Map<Ticket>(ticket);
            
            newTicket.UserOID = userOID;
            newTicket.CreatedByOID = userOID;
            newTicket.InstalledEnvironmentId = 1; //by default
            newTicket.UserId = 1; // also by default
            
            await _ticketRepository.AddAsync(newTicket);

            return _mapper.Map<TicketViewDto>(newTicket);
        }
        
        public async Task<TicketViewDto> UpdateTicket(TicketUpdateDto ticketDto)
        {
            var existingTicket = await _ticketRepository.GetByIdAsync(ticketDto.Id);
            if (existingTicket == null)
            {
                throw new KeyNotFoundException($"Ticket with ID {ticketDto.Id} not found.");
            }
            
            if (!string.IsNullOrWhiteSpace(ticketDto.Title) && ticketDto.Title.Length > 250)
            {
                throw new ArgumentException("Title length exceeds 250 characters.");
            }

            if (!string.IsNullOrWhiteSpace(ticketDto.Title))
            {
                existingTicket.Title = ticketDto.Title;
            }
            if (!string.IsNullOrWhiteSpace(ticketDto.Description))
            {
                existingTicket.Description = ticketDto.Description;
            }
            if (ticketDto.TypeId.HasValue)
            {
                existingTicket.TicketTypeId = ticketDto.TypeId.Value;
            }
            if (ticketDto.StatusId.HasValue)
            {
                existingTicket.StatusId = ticketDto.StatusId.Value;
            }
            if (ticketDto.PriorityLvlId.HasValue)
            {
                existingTicket.PriorityId = ticketDto.PriorityLvlId.Value;
            }
            if (ticketDto.ModuleId.HasValue)
            {
                existingTicket.ApplicationId = ticketDto.ModuleId.Value;
            }
    
            existingTicket.LastModified = DateTime.UtcNow;
    
            await _ticketRepository.UpdateAsync(existingTicket);
    
            return _mapper.Map<TicketViewDto>(existingTicket);
        }

        public async Task<int> GetTotalTicketsCount()
        {
            return await _ticketRepository.GetAllCountAsync();
        }

        public async Task<IEnumerable<DropdownItemDto>> GetModules()
        {
            var modules = await applicationRepository.GetAllAsync();
            
            return _mapper.Map<IEnumerable<DropdownItemDto>>(modules);
        }
        
        public async Task<IEnumerable<DropdownItemDto>> GetTicketTypes()
        {
            var ticketTypes = await ticketTypeRepository.GetAllAsync();
            
            return _mapper.Map<IEnumerable<DropdownItemDto>>(ticketTypes);
        }
        
        public async Task<IEnumerable<DropdownItemDto>> GetStatuses()
        {
            var statuses = await statusRepository.GetAllAsync();
            
            return _mapper.Map<IEnumerable<DropdownItemDto>>(statuses);
        }
        
        public async Task<IEnumerable<DropdownItemDto>> GetPriorities()
        {
            var priorities = await priorityRepository.GetAllAsync();
            
            return _mapper.Map<IEnumerable<DropdownItemDto>>(priorities);
        }
    }
}