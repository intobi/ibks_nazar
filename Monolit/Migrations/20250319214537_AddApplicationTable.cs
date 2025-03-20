using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Monolit.Migrations
{
    public partial class AddApplicationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Applications",
                schema: "Support",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                });
            
            migrationBuilder.Sql(@"
                INSERT INTO Support.Applications (Name)
                SELECT DISTINCT ApplicationName FROM Support.Ticket;

                UPDATE t
                SET ApplicationId = a.Id
                FROM Support.Ticket t
                INNER JOIN Support.Applications a ON t.ApplicationName = a.Name;
            ");

            migrationBuilder.DropColumn(
                name: "ApplicationName",
                schema: "Support",
                table: "Ticket");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_ApplicationId",
                schema: "Support",
                table: "Ticket",
                column: "ApplicationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ticket_Applications_ApplicationId",
                schema: "Support",
                table: "Ticket",
                column: "ApplicationId",
                principalSchema: "Support",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ticket_Applications_ApplicationId",
                schema: "Support",
                table: "Ticket");

            migrationBuilder.DropTable(
                name: "Applications",
                schema: "Support");

            migrationBuilder.DropIndex(
                name: "IX_Ticket_ApplicationId",
                schema: "Support",
                table: "Ticket");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationName",
                schema: "Support",
                table: "Ticket",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
