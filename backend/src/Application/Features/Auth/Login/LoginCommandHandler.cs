using Application.Common.Interface;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly UserManager<User> _userManager;

    public LoginCommandHandler(IJwtTokenGenerator jwtTokenGenerator, UserManager<User> userManager)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userManager = userManager;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null) throw new Exception("Invalid email or password");

        var result = await _userManager.CheckPasswordAsync(user, request.Password);

        if (!result) throw new Exception("Invalid email or password");

        var token = _jwtTokenGenerator.GenerateToken(user);

        return token;
    }
}