using FCBarcelona.Server.Models;
namespace FCBarcelona.Server.Data
{
    public static class SeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Players.Any())
                return; 
            context.Players.AddRange(
                // Goalkeepers
                new Player
                {
                    Name = "Joan Garcia",
                    Position = "Goalkeeper",
                    Number = 13, 
                    ImageUrl = "/images/joan-garcia.jpg",
                    Nationality = "Spain",
                    Goals = 0,  
                    DateOfBirth = new DateTime(2001, 05, 04) 
                },

                new Player
                {
                    Name = "Marc-André ter Stegen",
                    Position = "Goalkeeper",
                    Number = 1,
                    ImageUrl = "/images/ter-stegen.jpg",
                    Nationality = "Germany",
                    Goals = 0,
                    DateOfBirth = new DateTime(1992, 04, 30)
                },

                new Player
                {
                    Name = "Wojciech Szczesny",
                    Position = "Goalkeeper",
                    Number = 25,
                    ImageUrl = "/images/szczesny.jpg",
                    Nationality = "Poland",
                    Goals = 0,
                    DateOfBirth = new DateTime(1990, 4, 18)
                },


                // Defenders
                new Player
                {
                    Name = "Jules Koundé",
                    Position = "Defender",  
                    Number = 23,
                    ImageUrl = "/images/kounde.jpg",
                    Nationality = "France",
                    Goals = 8,  
                    DateOfBirth = new DateTime(1998, 11, 12)
                },
                new Player
                {
                    Name = "Ronald Araújo",
                    Position = "Defender", 
                    Number = 4,
                    ImageUrl = "/images/araujo.jpg",
                    Nationality = "Uruguay",
                    Goals = 12, 
                    DateOfBirth = new DateTime(1999, 03, 07)
                },
                new Player
                {
                    Name = "Andreas Christensen",
                    Position = "Defender",
                    Number = 15,
                    ImageUrl = "/images/christensen.jpg",
                    Nationality = "Denmark",
                    Goals = 4,
                    DateOfBirth = new DateTime(1996, 04, 10)
                },
                new Player
                {
                    Name = "Alejandro Balde",
                    Position = "Defender",
                    Number = 3,
                    ImageUrl = "/images/balde.jpg",
                    Nationality = "Spain",
                    Goals = 3,
                    DateOfBirth = new DateTime(2003, 10, 18)
                },

                new Player
                {
                    Name = "Pau Cubarsi",
                    Position = "Defender",
                    Number = 5, 
                    ImageUrl = "/images/cubarsi.jpg",
                    Nationality = "Spain",
                    Goals = 1, 
                    DateOfBirth = new DateTime(2007, 01, 22) 
                },

                new Player
                {
                    Name = "Eric Garcia",
                    Position = "Defender",
                    Number = 24, 
                    ImageUrl = "/images/eric-garcia.jpg",
                    Nationality = "Spain",
                    Goals = 7, 
                    DateOfBirth = new DateTime(2001, 01, 09) 
                },

                new Player
                {
                    Name = "Gerard Martín",
                    Position = "Defender",
                    Number = 18, 
                    ImageUrl = "/images/martin.jpg",
                    Nationality = "Spain",
                    Goals = 1, 
                    DateOfBirth = new DateTime(2002, 02, 26) 
                },

                // Mijlocasi
                new Player
                {
                    Name = "Frenkie de Jong",
                    Position = "Midfielder",
                    Number = 19,
                    ImageUrl = "/images/de-jong.jpg",
                    Nationality = "Netherlands",
                    Goals = 4,
                    DateOfBirth = new DateTime(1997, 05, 12)
                },
                new Player
                {
                    Name = "Pedri",
                    Position = "Midfielder",
                    Number = 8,
                    ImageUrl = "/images/pedri.jpg",
                    Nationality = "Spain",
                    Goals = 28,
                    DateOfBirth = new DateTime(2002, 11, 25)
                },
                new Player
                {
                    Name = "Gavi",
                    Position = "Midfielder",
                    Number = 6,
                    ImageUrl = "/images/gavi.jpg",
                    Nationality = "Spain",
                    Goals = 10,
                    DateOfBirth = new DateTime(2004, 08, 05)
                },

                new Player
                {
                    Name = "Dani Olmo",
                    Position = "Midfielder",
                    Number = 20, 
                    ImageUrl = "/images/olmo.jpg",
                    Nationality = "Spain",
                    Goals = 13, 
                    DateOfBirth = new DateTime(1998, 05, 07) 
                },

                new Player
                {
                    Name = "Marc Casado", 
                    Position = "Midfielder",
                    Number = 17, 
                    ImageUrl = "/images/casado.jpg",
                    Nationality = "Spain",
                    Goals = 1, 
                    DateOfBirth = new DateTime(2003, 09, 14) 
                },

                new Player
                {
                    Name = "Fermin Lopez", 
                    Position = "Midfielder",
                    Number = 16,
                    ImageUrl = "/images/fermin.jpg",
                    Nationality = "Spain",
                    Goals = 25, 
                    DateOfBirth = new DateTime(2003, 11, 05) 
                },

                new Player
                {
                    Name = "Marc Bernal", 
                    Position = "Midfielder",
                    Number = 22,
                    ImageUrl = "/images/bernal.jpg",
                    Nationality = "Spain",
                    Goals = 0, 
                    DateOfBirth = new DateTime(2007, 05, 26)
                },

                // Atacanti
                new Player
                {
                    Name = "Raphinha",
                    Position = "Forward",
                    Number = 11,
                    ImageUrl = "/images/raphinha.jpg",
                    Nationality = "Brazil",
                    Goals = 57,
                    DateOfBirth = new DateTime(1996, 12, 14)
                },

                new Player
                {
                    Name = "Ferran Torres",
                    Position = "Forward",
                    Number = 7,
                    ImageUrl = "/images/ferran.jpg",
                    Nationality = "Spain",
                    Goals = 51,
                    DateOfBirth = new DateTime(2000, 02, 29)
                },
                new Player
                {
                    Name = "Robert Lewandowski",
                    Position = "Forward",
                    Number = 9,
                    ImageUrl = "/images/lewandowski.jpg",
                    Nationality = "Poland",
                    Goals = 108,
                    DateOfBirth = new DateTime(1988, 08, 21)
                },

                new Player
                {
                    Name = "Marcus Rashford",
                    Position = "Forward",
                    Number = 14,
                    ImageUrl = "/images/rashford.jpg",
                    Nationality = "England",
                    Goals = 6,
                    DateOfBirth = new DateTime(1997, 10, 31)
                },

                new Player
                {
                    Name = "Roony Bardghji",
                    Position = "Forward",
                    Number = 28,
                    ImageUrl = "/images/roony.jpg",
                    Nationality = "Sweden",
                    Goals = 0,
                    DateOfBirth = new DateTime(2005, 11, 15)
                },

                new Player
                {
                    Name = "Lamine Yamal",
                    Position = "Forward",
                    Number = 10,
                    ImageUrl = "/images/yamal.jpg",
                    Nationality = "Spain",
                    Goals = 30,
                    DateOfBirth = new DateTime(2007, 07, 13)
                }
            );
            context.SaveChanges();
        }
    }
}