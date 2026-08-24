namespace Backend.Domains.Configurations;

public class BookConfiguration : IEntityTypeConfiguration<Book>
{
    public void Configure(EntityTypeBuilder<Book> builder)
    {
        builder.ToTable("Books");
        builder.HasKey(x => x.Id);
        builder.HasIndex(x => x.Code)
            .IsUnique();
        builder.Property(x => x.Title)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(x => x.Description)
            .IsRequired();
        builder.Property(x => x.CreatedDate)
            .IsRequired();
    }
}