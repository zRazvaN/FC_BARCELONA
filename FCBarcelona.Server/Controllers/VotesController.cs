using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCBarcelona.Server.Data;
using FCBarcelona.Server.Models;

namespace FCBarcelona.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VotesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public VotesController(AppDbContext db) => _db = db;

        // GET: api/votes/results
        [HttpGet("results")]
        public async Task<IActionResult> GetResults()
        {
            var results = await _db.Votes
                .GroupBy(v => v.PlayerId)
                .Select(g => new
                {
                    PlayerId = g.Key,
                    VoteCount = g.Count()
                })
                .OrderByDescending(r => r.VoteCount)
                .ToListAsync();

            var playersWithVotes = new List<object>();
            foreach (var result in results)
            {
                var player = await _db.Players.FindAsync(result.PlayerId);
                if (player != null)
                {
                    playersWithVotes.Add(new
                    {
                        Player = player,
                        VoteCount = result.VoteCount
                    });
                }
            }

            var totalVotes = await _db.Votes.CountAsync();

            return Ok(new { Results = playersWithVotes, TotalVotes = totalVotes });
        }

        // POST: api/votes
        [HttpPost]
        public async Task<IActionResult> CastVote([FromBody] VoteRequest request)
        {
            var existingVote = await _db.Votes
                .FirstOrDefaultAsync(v => v.VoterIdentifier == request.VoterIdentifier);

            if (existingVote != null)
            {
                return BadRequest(new { Message = "You have already voted this month!" });
            }

            var player = await _db.Players.FindAsync(request.PlayerId);
            if (player == null)
            {
                return NotFound(new { Message = "Player not found" });
            }

            var vote = new Vote
            {
                PlayerId = request.PlayerId,
                VoterIdentifier = request.VoterIdentifier,
                VotedAt = DateTime.UtcNow
            };

            _db.Votes.Add(vote);
            await _db.SaveChangesAsync();

            return Ok(new { Message = "Vote cast successfully!", Vote = vote });
        }

        // GET: api/votes/check/{voterIdentifier}
        [HttpGet("check/{voterIdentifier}")]
        public async Task<IActionResult> CheckIfVoted(string voterIdentifier)
        {
            var hasVoted = await _db.Votes
                .AnyAsync(v => v.VoterIdentifier == voterIdentifier);

            return Ok(new { HasVoted = hasVoted });
        }
    }

    public class VoteRequest
    {
        public int PlayerId { get; set; }
        public string VoterIdentifier { get; set; } = "";
    }
}