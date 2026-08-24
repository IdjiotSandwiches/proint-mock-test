namespace Backend.Controllers.Requests;

public record BookRequest(
    [Required, MinLength(2), MaxLength(255)] string Title,
    [Required] string Description
);

public record PaginationResponse<T>(
    List<T> Data,
    int Page,
    int Size,
    int TotalItems,
    int TotalPages
);