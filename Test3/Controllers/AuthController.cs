using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Test3.DTO;
using Test3.Models;
using BCrypt.Net;

namespace Test3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        // Register method to create a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            // Check if the user already exists by username or email
            var existingUser = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Username == userDto.Username || u.Email == userDto.Email);

            if (existingUser != null)
            {
                return Conflict(new { message = "User already exists." }); // 409 Conflict for existing user
            }

            // Hash the password before saving to the database
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            // Create new user object
            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                Password = hashedPassword // Store hashed password
            };

            // Save user to the database
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Return the created user
            return CreatedAtAction(nameof(Register), new { id = user.Id }, user);
        }

        // Login method to authenticate and generate JWT token
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserDto userDto)
        {
            var user = _dbContext.Users.SingleOrDefault(u => u.Username == userDto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password))
                return Unauthorized(new { message = "Invalid credentials" });

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        // Method to generate JWT token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Convert ID to string
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
