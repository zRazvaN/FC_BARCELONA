using FCBarcelona.Server.Models;

namespace FCBarcelona.Server.Data
{
    public static class LegendsSeedData
    {
        public static void Initialize(AppDbContext context)
        {
            if (context.Legends.Any())
                return; // Already seeded

            context.Legends.AddRange(
                // Goalkeeper
                new Legend
                {
                    Name = "Victor Valdés",
                    Position = "GK",
                    Number = 1,
                    ImageUrl = "/images/legends/valdes.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2002-2014",
                    Appearances = 535,
                    Goals = 0,
                    Assists = 1,
                    LaLigaTitles = 6,
                    ChampionsLeague = 3,
                    CopaDelRey = 2,
                    OtherTrophies = 10,
                    Description = "One of the greatest goalkeepers in Barcelona history",
                    Achievements = "3x Champions League winner, 6x La Liga champion",
                    FormationX = 50,
                    FormationY = 5,
                    IsManager = false
                },

                // Defenders
                new Legend
                {
                    Name = "Dani Alves",
                    Position = "DF",
                    Number = 2,
                    ImageUrl = "/images/legends/alves.jpg",
                    Nationality = "Brazil",
                    YearsAtClub = "2008-2016, 2021-2022",
                    Appearances = 408,
                    Goals = 23,
                    Assists = 101,
                    LaLigaTitles = 6,
                    ChampionsLeague = 3,
                    CopaDelRey = 4,
                    OtherTrophies = 10,
                    Description = "Most decorated player in football history",
                    Achievements = "Most assists by a defender, 43 total trophies",
                    FormationX = 85,
                    FormationY = 25,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Carles Puyol",
                    Position = "DF",
                    Number = 5,
                    ImageUrl = "/images/legends/puyol.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "1999-2014",
                    Appearances = 593,
                    Goals = 18,
                    Assists = 12,
                    LaLigaTitles = 6,
                    ChampionsLeague = 3,
                    CopaDelRey = 2,
                    OtherTrophies = 10,
                    Description = "Legendary captain and defensive rock",
                    Achievements = "One-club man, 15 years at Barcelona",
                    FormationX = 60,
                    FormationY = 20,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Gerard Piqué",
                    Position = "DF",
                    Number = 3,
                    ImageUrl = "/images/legends/pique.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2008-2022",
                    Appearances = 616,
                    Goals = 53,
                    Assists = 15,
                    LaLigaTitles = 8,
                    ChampionsLeague = 3,
                    CopaDelRey = 7,
                    OtherTrophies = 12,
                    Description = "Ball-playing defender and club legend",
                    Achievements = "30 trophies with Barcelona",
                    FormationX = 40,
                    FormationY = 20,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Jordi Alba",
                    Position = "DF",
                    Number = 18,
                    ImageUrl = "/images/legends/alba.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2012-2024",
                    Appearances = 458,
                    Goals = 27,
                    Assists = 89,
                    LaLigaTitles = 6,
                    ChampionsLeague = 1,
                    CopaDelRey = 5,
                    OtherTrophies = 8,
                    Description = "Lightning-fast attacking left-back",
                    Achievements = "Most assists by a Barcelona defender",
                    FormationX = 15,
                    FormationY = 25,
                    IsManager = false
                },

                // Midfielders
                new Legend
                {
                    Name = "Xavi Hernández",
                    Position = "MF",
                    Number = 6,
                    ImageUrl = "/images/legends/xavi.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "1998-2015",
                    Appearances = 767,
                    Goals = 85,
                    Assists = 185,
                    LaLigaTitles = 8,
                    ChampionsLeague = 4,
                    CopaDelRey = 3,
                    OtherTrophies = 10,
                    Description = "Maestro of tiki-taka, midfield genius",
                    Achievements = "Most appearances for Barcelona, World Cup winner",
                    FormationX = 40,
                    FormationY = 45,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Andrés Iniesta",
                    Position = "MF",
                    Number = 8,
                    ImageUrl = "/images/legends/iniesta.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2002-2018",
                    Appearances = 674,
                    Goals = 57,
                    Assists = 135,
                    LaLigaTitles = 9,
                    ChampionsLeague = 4,
                    CopaDelRey = 6,
                    OtherTrophies = 13,
                    Description = "Magical midfielder, big game player",
                    Achievements = "2010 World Cup final goal scorer, 32 trophies",
                    FormationX = 60,
                    FormationY = 45,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Sergio Busquets",
                    Position = "MF",
                    Number = 5,
                    ImageUrl = "/images/legends/busquets.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2008-2023",
                    Appearances = 722,
                    Goals = 18,
                    Assists = 42,
                    LaLigaTitles = 9,
                    ChampionsLeague = 3,
                    CopaDelRey = 7,
                    OtherTrophies = 12,
                    Description = "The pivot, defensive midfield master",
                    Achievements = "31 trophies, unsung hero of Barça's success",
                    FormationX = 50,
                    FormationY = 35,
                    IsManager = false
                },

                // Forwards
                new Legend
                {
                    Name = "Lionel Messi",
                    Position = "FW",
                    Number = 10,
                    ImageUrl = "/images/legends/messi.jpg",
                    Nationality = "Argentina",
                    YearsAtClub = "2004-2021",
                    Appearances = 778,
                    Goals = 672,
                    Assists = 303,
                    LaLigaTitles = 10,
                    ChampionsLeague = 4,
                    CopaDelRey = 7,
                    OtherTrophies = 14,
                    Description = "Greatest player of all time, club's all-time top scorer",
                    Achievements = "6 Ballon d'Or awards at Barcelona, 672 goals",
                    FormationX = 75,
                    FormationY = 60,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Ronaldinho",
                    Position = "FW",
                    Number = 10,
                    ImageUrl = "/images/legends/ronaldinho.jpg",
                    Nationality = "Brazil",
                    YearsAtClub = "2003-2008",
                    Appearances = 207,
                    Goals = 94,
                    Assists = 71,
                    LaLigaTitles = 2,
                    ChampionsLeague = 1,
                    CopaDelRey = 0,
                    OtherTrophies = 3,
                    Description = "The smile of Barcelona, brought joy back to Camp Nou",
                    Achievements = "2005 Ballon d'Or winner, magical entertainer",
                    FormationX = 25,
                    FormationY = 60,
                    IsManager = false
                },

                new Legend
                {
                    Name = "Johan Cruyff",
                    Position = "FW",
                    Number = 14,
                    ImageUrl = "/images/legends/cruyff-player.jpg",
                    Nationality = "Netherlands",
                    YearsAtClub = "1973-1978",
                    Appearances = 180,
                    Goals = 48,
                    Assists = 36,
                    LaLigaTitles = 1,
                    ChampionsLeague = 0,
                    CopaDelRey = 1,
                    OtherTrophies = 1,
                    Description = "Revolutionized Barcelona as player and later as manager",
                    Achievements = "3x Ballon d'Or winner, architect of Barça philosophy",
                    FormationX = 50,
                    FormationY = 70,
                    IsManager = false
                },

                // Manager
                new Legend
                {
                    Name = "Pep Guardiola",
                    Position = "MANAGER",
                    Number = null,
                    ImageUrl = "/images/legends/guardiola.jpg",
                    Nationality = "Spain",
                    YearsAtClub = "2008-2012",
                    Appearances = 0, // Manager
                    Goals = 0,
                    Assists = 0,
                    LaLigaTitles = 3,
                    ChampionsLeague = 2,
                    CopaDelRey = 2,
                    OtherTrophies = 7,
                    Description = "Greatest manager in Barcelona history, architect of the greatest team ever",
                    Achievements = "14 trophies in 4 years, 2 trebles, revolutionized football",
                    FormationX = 0,
                    FormationY = 0,
                    IsManager = true
                }
            );

            context.SaveChanges();
        }
    }
}