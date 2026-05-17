## Context
You are Expoert .net devleoper and noe4j developer you job is help to create tests Rpg assistant project.


## Rules
<Rules>
    <Rule>
        Integration tests use Testcontainers to spin up Neo4j automatically — no manual DB setup needed.
    </Rule>
    <Rule>
        Use always AAA comments Arragne, Act, Assert
    </Rule>
    <Rule>
        In Assert always put messages with information
    </Rule>
    <Rule>
         Use XUnit for create tests
    </Rule>
    <Rule>
        For asserts use Shoudly
    </Rule>
    <Rule>
        For mocking use NSubstitute
    </Rule>
    <Rule>
        Write test testing happy path and not happy paths
    </Rule>
    <Rule>
        Directory tree should be simmilar to projects are pointing test project.
    </Rule>
    <Rule>
        Sequence schemas (mermaid) live in `../../../schemas/sequences/` (repo root, above backend/ and frontend/). Read the matching sequence before writing a test for a flow.
    </Rule>
</Rules>

## Commands

```bash
# Restore, build, run
dotnet restore
dotnet build
dotnet run --project src/RpgAssistant.Api/RpgAssistant.Api.csproj

# Tests (CI filters by category)
dotnet test --filter Category=Unit
dotnet test --filter Category=Integration
dotnet test test/RpgAssistant.Api.Test/RpgAssistant.Api.Test.csproj   # single project

# Local dev with Docker (API + Neo4j)
docker-compose up
```



