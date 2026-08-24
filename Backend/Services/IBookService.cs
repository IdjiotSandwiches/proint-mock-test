namespace Backend.Services;

public interface IBookService
{
    Task<List<Book>> GetBooks(int page, int size);
    Task<Book?> GetBook(Guid id);
    Task<Book> CreateBook(BookRequest request);
    Task<Book> UpdateBook(Guid id, BookRequest request);
    Task RemoveBook(Guid id);
}