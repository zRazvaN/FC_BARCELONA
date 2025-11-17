using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCBarcelona.Server.Data;
using FCBarcelona.Server.Models;

namespace FCBarcelona.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public PlayersController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var players = await _db.Players.ToListAsync();
            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var player = await _db.Players.FindAsync(id);
            if (player == null) return NotFound();
            return Ok(player);
        }
    }
}
