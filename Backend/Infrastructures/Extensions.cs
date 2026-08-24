namespace Backend.Infrastructures;

internal static class Extensions
{
    public static void AddApplicationServices(this IHostApplicationBuilder builder)
    {
        var config = builder.Configuration;
        var services = builder.Services;

        services.AddControllers();
        services.AddOpenApi();

        var connectionStrings = config.GetConnectionString("Database");
        services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionStrings));

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            );
        });

        services.AddScoped<IBookService, BookService>();
    }
}