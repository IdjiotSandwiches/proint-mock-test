namespace Backend.Controllers.Requests;

public record BookRequest(
    [Required, MinLength(2), MaxLength(255)] string Title,
    [Required] string Description
);