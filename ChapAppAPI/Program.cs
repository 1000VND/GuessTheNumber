using Microsoft.OpenApi.Models;
using ChapAppAPI.Services;
using ChapAppAPI.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddSingleton<IDictionary<string, UserRoomConnection>>(new Dictionary<string, UserRoomConnection>());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ChapAppAPI", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:4200", "http://localhost:5001")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
    }
    else
    {
        options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://172.18.224.1:4200", "http://172.18.224.1:5001")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
    }
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.Run();