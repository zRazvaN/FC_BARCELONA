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

        // Calculeaza clasamentul jucatorilor in functie de numarul de voturi
        [HttpGet("results")]
        public async Task<IActionResult> GetResults()
        {
            // Grupam voturile dupa ID-ul jucatorului si le numaram
            var results = await _db.Votes
                .GroupBy(v => v.PlayerId)
                .Select(g => new
                {
                    PlayerId = g.Key,
                    VoteCount = g.Count()
                })
                .OrderByDescending(r => r.VoteCount)
                .ToListAsync();

            // Asociem fiecare rezultat cu datele complete ale jucatorului (nume, imagine)
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

        // Inregistreaza un vot nou in baza de date
        [HttpPost]
        public async Task<IActionResult> CastVote([FromBody] VoteRequest request)
        {
            // Verificam daca acest vizitator (VoterIdentifier) a votat deja
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

            // Salveaza votul cu timestamp-ul actual
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

        // Verifica statusul unui vizitator pentru a sti ce sa afisam in Modal
        [HttpGet("check/{voterIdentifier}")]
        public async Task<IActionResult> CheckIfVoted(string voterIdentifier)
        {
            var hasVoted = await _db.Votes
                .AnyAsync(v => v.VoterIdentifier == voterIdentifier);

            return Ok(new { HasVoted = hasVoted });
        }
    }

    // Obiect ajutator pentru a receptiona datele de la Frontend
    public class VoteRequest
    {
        public int PlayerId { get; set; }
        public string VoterIdentifier { get; set; } = "";
    }
}