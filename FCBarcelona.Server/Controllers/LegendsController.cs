using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FCBarcelona.Server.Data;

namespace FCBarcelona.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LegendsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public LegendsController(AppDbContext db) => _db = db;

        // Returneaza toate legendele fara nicio filtrare
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var legends = await _db.Legends.ToListAsync();
            return Ok(legends);
        }

        // Cauta o legenda specifica dupa ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var legend = await _db.Legends.FindAsync(id);
            if (legend == null) return NotFound();
            return Ok(legend);
        }

        //Separa jucatorii de manager pentru a construi echipa pe teren
        [HttpGet("formation")]
        public async Task<IActionResult> GetFormation()
        {
            var players = await _db.Legends.Where(l => !l.IsManager).ToListAsync();

            var manager = await _db.Legends.FirstOrDefaultAsync(l => l.IsManager);

            // Trimitem un obiect JSON combinat catre Frontend
            return Ok(new { Players = players, Manager = manager });
        }
    }
}