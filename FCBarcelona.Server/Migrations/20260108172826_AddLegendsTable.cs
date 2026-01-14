using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FCBarcelona.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddLegendsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Legends",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Position = table.Column<string>(type: "TEXT", nullable: false),
                    Number = table.Column<int>(type: "INTEGER", nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    Nationality = table.Column<string>(type: "TEXT", nullable: false),
                    YearsAtClub = table.Column<string>(type: "TEXT", nullable: false),
                    Appearances = table.Column<int>(type: "INTEGER", nullable: false),
                    Goals = table.Column<int>(type: "INTEGER", nullable: false),
                    Assists = table.Column<int>(type: "INTEGER", nullable: false),
                    LaLigaTitles = table.Column<int>(type: "INTEGER", nullable: false),
                    ChampionsLeague = table.Column<int>(type: "INTEGER", nullable: false),
                    CopaDelRey = table.Column<int>(type: "INTEGER", nullable: false),
                    OtherTrophies = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Achievements = table.Column<string>(type: "TEXT", nullable: false),
                    FormationX = table.Column<int>(type: "INTEGER", nullable: false),
                    FormationY = table.Column<int>(type: "INTEGER", nullable: false),
                    IsManager = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Legends", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Legends");
        }
    }
}
