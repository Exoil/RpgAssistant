# Use the official .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project files and restore dependencies
COPY . .
RUN dotnet restore

# Publish the application
RUN dotnet publish -c Release -o /app/out

# Use the official .NET runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out .

# Copy the secrets.json file
COPY ./secrets.json /app/secrets.json

# Set environment variable to use secrets.json
ENV DOTNET_USER_SECRETS=/app/secrets.json

# Set the entry point for the application
ENTRYPOINT ["dotnet", "RpgAssistant.Api.dll"]