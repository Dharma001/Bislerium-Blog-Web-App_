using backend.appDbContext;
using backend.Contract;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<applicationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRegisterService, RegisterService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IHomeService, HomeService>();

builder.Services.AddControllers();
builder.Services.AddAuthentication(cfg => {
    cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    cfg.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
    x.RequireHttpsMetadata = false; 
    x.SaveToken = false;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:JWT_Secret"])
      ),
        ValidateIssuer = false, 
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(policyBuilder =>
  policyBuilder.AddDefaultPolicy(policy =>
    policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod())
);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();


app.UseRouting();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.Map("/user", userApp =>
{
    userApp.UseMiddleware<UserAuthorizationMiddleware>();

    userApp.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "userArea",
            pattern: "user/{controller}/{action}/{id?}");
    });
});

app.Map("/admin", adminApp =>
{
    adminApp.UseMiddleware<AdminAuthorizationMiddleware>();

    adminApp.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "adminArea",
            pattern: "admin/{controller}/{action}/{id?}");
    });
});

app.MapControllers();

app.Run();
