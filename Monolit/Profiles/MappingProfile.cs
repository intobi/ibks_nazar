using AutoMapper;
using Monolit.Models;
using Monolit.DTOs;

namespace Monolit.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Ticket, TicketListItemDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.PriorityLvlId, opt => opt.MapFrom(src => src.PriorityId))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Application.Name))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.TicketType != null ? src.TicketType.Title : string.Empty))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status != null ? src.Status.Title : string.Empty));
            
            CreateMap<Ticket, TicketViewDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.PriorityLvlId, opt => opt.MapFrom(src => src.PriorityId))
                .ForMember(dest => dest.ModuleId, opt => opt.MapFrom(src => src.ApplicationId))
                .ForMember(dest => dest.TypeId, opt => opt.MapFrom(src => src.TicketTypeId))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<TicketCreateDto, Ticket>()
                .ForMember(dest => dest.ApplicationId, opt => opt.MapFrom(src => src.ModuleId))
                .ForMember(dest => dest.TicketTypeId, opt => opt.MapFrom(src => src.TypeId))
                .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
                .ForMember(dest => dest.PriorityId, opt => opt.MapFrom(src => src.PriorityLvlId))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title));

            CreateMap<Reply, ReplyDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ReplyId.ToString()))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content));

            CreateMap<ReplyCreateDto, Reply>()
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.TicketId, opt => opt.MapFrom(src => src.TicketId));

            CreateMap<Application, DropdownItemDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Name));
            
            CreateMap<Status, DropdownItemDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Title));
            
            CreateMap<Priority, DropdownItemDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Title));
            
            CreateMap<TicketType, DropdownItemDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Title));
        }
    }
}