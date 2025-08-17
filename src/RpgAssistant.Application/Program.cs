using RpgAssistant.Application.Endpoints;
using RpgAssistant.Application.IoC;
using RpgAssistant.Infrastructure.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.RegisterGraphDb(builder.Configuration);
builder.Services.RegisterHandlers();
builder.Host.ConfigureLogger(builder.Configuration);
builder.Services.RegisterResultsResolvers();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapUtilityEndpoints();

app.Run();
