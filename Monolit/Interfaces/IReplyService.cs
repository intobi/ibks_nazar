using Monolit.DTOs;

namespace Monolit.Interfaces;

public interface IReplyService
{
    Task<IEnumerable<ReplyDto>> GetAllRepliesByTicketId(long ticketId);
    Task<ReplyDto?> GetReplyById(int id);
    Task<ReplyDto> AddNewReply(ReplyCreateDto reply);
}