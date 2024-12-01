using NorthernNerds.Aspire.Hosting.Neo4j;
using Projects;

var builder = DistributedApplication.CreateBuilder(args);



var neo4jLogin = builder.Configuration["GraphDb:Login"];
var neo4Password = builder.Configuration["GraphDb:Pass"];
var neo4jPass = builder.AddParameter("neo4j-pass", secret: true);
var neo4jUser = builder.AddParameter("neo4j-user", secret: true);

var neo4jDb = builder.AddNeo4j(
    "RpgAssistant-graph-db",
    neo4jUser,
    neo4jPass,
    boltPort: 8687,
    httpPort: 8484)
    .WithEnvironment("NEO4J_AUTH", "neo4j/s3cr3ts3cr3t")
    .WithEnvironment("NEO4J_initial_dbms_default__database", "RpgCampaignDb")
    .WithEnvironment("NEO4J_dbms_default__advertised__address", "neo4j")
    .WithEnvironment("NEO4J_dbms_ssl_policy_https_client__auth", "NONE")
    .WithEnvironment("NEO4J_dbms_ssl_policy_bolt_client__auth", "NONE")
    .WithEnvironment("NEO4J_dbms_default__listen__address", "0.0.0.0")
    .WithEnvironment("NEO4J_dbms_security_auth__enabled", "false")
    .WithEnvironment("NEO4J_server_http_listen__address", ":8484")
    .WithEnvironment("NEO4J_server_http_advertised__address", $":8484")
    .WithEnvironment("NEO4J_server_https_listen__address", ":8483")
    .WithEnvironment("NEO4J_server_https_advertised__address", $":8483")
    .WithEnvironment("NEO4J_server_http_enabled", "true")
    .WithEnvironment("NEO4J_server_bolt_advertised__address", $":8687")
    .WithEnvironment("NEO4J_server_bolt_listen__address", $":8687")
    .WithEnvironment("NEO4J_server_bolt_enabled", $"true")
    .WithEnvironment("NEO4J_ACCEPT_LICENSE_AGREEMENT", "yes");
var api = builder
    .AddProject<RpgAssistant_Api>("RpgRpgAssistantApi")
    .WithReference(neo4jDb);


builder.Build().Run();
