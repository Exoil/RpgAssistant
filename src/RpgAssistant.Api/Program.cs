using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseHttpsRedirection();

app.MapGet("/", ([FromServices]IConfiguration configuration) => configuration.GetSection("AppVersion").Value);

app.Run();
