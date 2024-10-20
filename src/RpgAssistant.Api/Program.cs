using RpgAssistant.Api.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.RegisterApi();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.RegisterUtilitiesEndpoints();
app.Run();