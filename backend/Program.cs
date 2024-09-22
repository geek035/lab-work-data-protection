using Backend.interfaces;
using Backend.repositories;
using Backend.services;
using Backend.models;

using FluentValidation.AspNetCore;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services
    .AddFluentValidationAutoValidation()
    .AddFluentValidationClientsideAdapters();

builder.Services
    .AddScoped<IUserRepository, FileUserRepository>(
        provider => new FileUserRepository("../general-data/users.txt")
);

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IValidator<UserDTO>, UserDTOValidator>();
builder.Services.AddScoped<IValidator<LoginRequest>, LoginRequestValidator>();
builder.Services.AddScoped<IUserAuthenticationService, UserAuthenticationService>();



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularOrigin", builder => 
        {
            builder
                .WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowAngularOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
