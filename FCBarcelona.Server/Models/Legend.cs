namespace FCBarcelona.Server.Models
{
    public class Legend
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Position { get; set; } = ""; 
        public int? Number { get; set; } 
        public string ImageUrl { get; set; } = "";
        public string Nationality { get; set; } = "";
        public string YearsAtClub { get; set; } = ""; 
        public int Appearances { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int LaLigaTitles { get; set; }
        public int ChampionsLeague { get; set; }
        public int CopaDelRey { get; set; }
        public int OtherTrophies { get; set; }
        public string Description { get; set; } = ""; 
        public string Achievements { get; set; } = ""; 
        public int FormationX { get; set; } 
        public int FormationY { get; set; } 

        public bool IsManager { get; set; } = false;
    }
}