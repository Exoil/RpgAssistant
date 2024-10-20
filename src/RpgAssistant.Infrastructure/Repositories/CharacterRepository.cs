using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Repositories;

public class CharacterRepository : BaseNeo4jRepository
{
    public CharacterRepository(IDriver driver) : base(driver)
    {
    }
}