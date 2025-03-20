using Microsoft.AspNetCore.Mvc;
using Monolit.DTOs;
using Monolit.Interfaces;

namespace Monolit.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RepliesController : ControllerBase
{
    private readonly IReplyService _replyService;

    public RepliesController(IReplyService replyService)
    {
        _replyService = replyService;
    }
    
    [HttpGet("by-ticketId/{id}")]
    public async Task<ActionResult<IEnumerable<ReplyDto>>> GetReplies(long id)
    {
        var replies = await _replyService.GetAllRepliesByTicketId(id);
        return Ok(replies);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<ReplyDto>>> GetReply(int id)
    {
        var replyDto = await _replyService.GetReplyById(id);
        return Ok(replyDto);
    }
    
    [HttpPost]
    public async Task<ActionResult<ReplyDto>> CreateReply(ReplyCreateDto createReplyDto)
    {
        await _replyService.AddNewReply(createReplyDto);
        return Created();
    }
}