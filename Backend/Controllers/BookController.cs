namespace Backend.Controllers;

[ApiController]
[Route("api/book")]
public class BookController(
    IBookService service
) : ControllerBase
{
    private readonly IBookService _service = service;

    [HttpGet]
    public async Task<IActionResult> GetBooks([FromQuery] int page = 1, [FromQuery] int size = 10)
    {
        var books = await _service.GetBooks(page, size);
        return Ok(books);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBook(Guid id)
    {
        var book = await _service.GetBook(id);
        return Ok(book);
    }

    [HttpPost]
    public async Task<IActionResult> PostBook([FromBody] BookRequest request)
    {
        try
        {
            var book = await _service.CreateBook(request);
            return Ok(book);
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutBook(Guid id, [FromBody] BookRequest request)
    {
        try
        {
            var book = await _service.UpdateBook(id, request);
            return Ok(book);
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(Guid id)
    {
        try
        {
            await _service.RemoveBook(id);
            return Ok();
        } catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}