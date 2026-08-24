using System.Security.Cryptography;

namespace Backend.Services;

public class BookService(
    AppDbContext dbContext
) : IBookService
{
    private readonly AppDbContext _dbContext = dbContext;

    public async Task<PaginationResponse<Book>> GetBooks(int page, int size)
    {
        var totalItems = await _dbContext.Books.CountAsync();

        var books = await _dbContext.Books
            .OrderByDescending(x => x.CreatedDate)
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync();

        return new PaginationResponse<Book>(
            books,
            page,
            size,
            totalItems,
            (int)Math.Ceiling((double)totalItems / size)
        );
    }

    public Task<Book?> GetBook(Guid id)
    {
        return _dbContext.Books
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Book> CreateBook(BookRequest request)
    {
        var book = new Book
        {
            Code = $"{request.Title[0]}{request.Title[^1]}-{RandomNumberGenerator.GetInt32(10, 100)}{DateTime.UtcNow:ddMMyyyy-hhss}",
            Title = request.Title,
            Description = request.Description
        };

        _dbContext.Books.Add(book);
        await _dbContext.SaveChangesAsync();

        return book;
    }

    public async Task<Book> UpdateBook(Guid id, BookRequest request)
    {
        var book = await GetBook(id);
        if (book == null)
            throw new Exception("Book not found!");

        book.Title = request.Title;
        book.Description = request.Description;
        await _dbContext.SaveChangesAsync();

        return book;
    }

    public async Task RemoveBook(Guid id)
    {
        var book = await GetBook(id);
        if (book == null)
            throw new Exception("Book not found!");

        _dbContext.Books.Remove(book);
        await _dbContext.SaveChangesAsync();
    }
}