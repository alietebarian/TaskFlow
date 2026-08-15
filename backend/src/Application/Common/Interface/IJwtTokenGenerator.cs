using Domain.Entities;

namespace Application.Common.Interface;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
