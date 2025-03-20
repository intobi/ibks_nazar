using AutoMapper;
using Monolit.DTOs;
using Monolit.Interfaces;
using Monolit.Interfaces.Repository;
using Monolit.Models;

namespace Monolit.Services;

public class ReplyService: IReplyService
{
    private readonly IGenericRepository<Reply> _replyRepository;
    private readonly IMapper _mapper;

    public ReplyService(IMapper mapper, IGenericRepository<Reply> replyRepository)
    {
        _mapper = mapper;
        _replyRepository = replyRepository;
    }

    public async Task<IEnumerable<ReplyDto>> GetAllRepliesByTicketId(long ticketId)
    {
        var replies = await _replyRepository.GetAllByConditionAsync(x => x.Ticket.Id == ticketId, x => x.Ticket);
        return _mapper.Map<IEnumerable<ReplyDto>>(replies);
    }

    public async Task<ReplyDto?> GetReplyById(int id)
    {
        var reply = await _replyRepository.GetByIdAsync(id);
        return _mapper.Map<ReplyDto>(reply);
    }

    public async Task<ReplyDto> AddNewReply(ReplyCreateDto reply)
    {
        var newReplay = _mapper.Map<Reply>(reply);
        await _replyRepository.AddAsync(newReplay);
        
        return _mapper.Map<ReplyDto>(newReplay);
    }
}