using NorthernNerds.Aspire.Hosting.Neo4j;
using Projects;

var builder = DistributedApplication.CreateBuilder(args);



var neo4jLogin = builder.Configuration["GraphDb:Login"];
var neo4Password = builder.Configuration["GraphDb:Pass"];
var neo4jPass = builder.AddParameter(neo4Password!, secret: true);
var neo4jUser = builder.AddParameter(neo4jLogin!, secret: true);

var neo4jDb = builder.AddNeo4j(
    "RpgAssistant-graph-db",
    neo4jUser,
    neo4jPass,
    boltPort: 8687,
    httpPort: 8484);
var api = builder
    .AddProject<RpgAssistant_Api>("RpgRpgAssistantApi")
    .WithReference(neo4jDb);


builder.Build().Run();
