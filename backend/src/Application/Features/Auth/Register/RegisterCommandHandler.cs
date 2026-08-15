using Application.Common.Interface;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, string>
{
    private readonly UserManager<User> _userManager;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(UserManager<User> userManager, IJwtTokenGenerator jwtTokenGenerator)
    {
        _userManager = userManager;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = new User
        {
            UserName = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new Exception($"Registration failed: {errors}");
        }

        var token = _jwtTokenGenerator.GenerateToken(user);

        return token;
    }
}
