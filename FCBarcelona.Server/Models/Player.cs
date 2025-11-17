namespace FCBarcelona.Server.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Position { get; set; } = "";
        public int Number { get; set; }
        public string ImageUrl { get; set; } = "";
        public string Nationality { get; set; } = "";
        public int Goals { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}