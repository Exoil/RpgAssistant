using RpgAssistant.Api.IoC;
using Serilog;

var builder = WebApplication.CreateBuilder(args);



Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();
builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services));
    // Add services to the container.
builder.Services.AddHttpContextAccessor();
builder.Services.RegisterApi(builder.Configuration);
builder.Services.SetCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors();
app.UseHttpsRedirection();
app.RegisterUtilitiesEndpoints();
app.RegisterCharacterEndpoints();
app.Run();