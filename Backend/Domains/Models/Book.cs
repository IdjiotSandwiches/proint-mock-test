namespace Backend.Domains.Models;

[EntityTypeConfiguration(typeof(BookConfiguration))]
public class Book
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Code { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}