namespace FCBarcelona.Server.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public DateTime VotedAt { get; set; }
        public string VoterIdentifier { get; set; } = ""; 
    }
}