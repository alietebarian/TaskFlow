using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
public abstract class BaseApiController : ControllerBase
{
    protected Guid CurrentUserId => 
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
}
