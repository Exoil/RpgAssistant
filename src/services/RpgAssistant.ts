import { RpgAssistantClient, UpdateCharacterDto } from './httpClients/RpgAssistantClient'
import { Character } from './Models/Character'
import type { PageQuery } from './Models/PageQuery'
import type { UpdateCharacter } from './Models/UpdateCharacter'

export class RpgAssistantService {
  private _rpgAssistantClient: RpgAssistantClient

  constructor(baseUrl: string) {
    this._rpgAssistantClient = new RpgAssistantClient(baseUrl)
  }

  public async GetCharacterAsync(id: string, signal?: AbortSignal): Promise<Character> {
    const response = await this._rpgAssistantClient.charactersGET(id, signal)

    return new Character(response.id, response.name, response.version)
  }

  public async UpdateCharacterAsync(updateCharacter: UpdateCharacter, signal?: AbortSignal) {
    const modelToUpdate = new UpdateCharacterDto({
      name: updateCharacter.name,
      version: updateCharacter.version,
    })

    await this._rpgAssistantClient.charactersPUT(updateCharacter.id, modelToUpdate, signal)
  }

  public async DeleteCharacterAsync(id: string, signal?: AbortSignal) {
    await this._rpgAssistantClient.charactersDELETE(id, signal)
  }

  public async GetCharactersAsync(
    pageQuery: PageQuery,
    signal?: AbortSignal,
  ): Promise<Character[]> {
    const arrayOfCharacters = await this._rpgAssistantClient.charactersAll(
      pageQuery.pageNumber,
      pageQuery.pageSize,
      pageQuery.sortType,
      pageQuery.sortOrder,
      signal,
    )

    return arrayOfCharacters.map((c) => new Character(c.id, c.name, c.version))
  }
}
