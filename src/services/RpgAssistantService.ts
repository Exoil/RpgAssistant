import { RpgAssistantClient, UpdateCharacterDto } from './HttpClients/RpgAssistantClient'
import { VersionedCharacter } from './Models/VersionedCharacter'
import type { PageQuery } from './Models/PageQuery'
import type { UpdateCharacter } from './Models/UpdateCharacter'
import {Character} from "@/services/Models/Character.ts";

export class RpgAssistantService {
  private _rpgAssistantClient: RpgAssistantClient

  constructor(baseUrl: string) {
    this._rpgAssistantClient = new RpgAssistantClient(baseUrl);
  }

  public async getCharacterAsync(id: string, signal?: AbortSignal): Promise<VersionedCharacter> {
    const response = await this._rpgAssistantClient.getCharacterById(id, signal);

    return new VersionedCharacter(response.id, response.name, response.version);
  }

  public async updateCharacterAsync(updateCharacter: UpdateCharacter, signal?: AbortSignal) {
    const modelToUpdate = new UpdateCharacterDto({
      name: updateCharacter.name
    });
    const ifMatch = '"'+updateCharacter.version.toString() + '"';

    await this._rpgAssistantClient.updateCharacter(updateCharacter.id, ifMatch, modelToUpdate, signal);
  }

  public async deleteCharacterAsync(id: string, signal?: AbortSignal) {
    await this._rpgAssistantClient.deleteCharacter(id, signal);
  }

  public async getCharactersAsync(
    pageQuery: PageQuery,
    signal?: AbortSignal,
  ): Promise<Character[]> {
    const arrayOfCharacters = await this._rpgAssistantClient.getPagedCharacters(
      pageQuery.pageNumber,
      pageQuery.pageSize,
      pageQuery.sortType,
      pageQuery.sortOrder,
      signal,
    )

    return arrayOfCharacters.map((c) => new Character(c.id, c.name))
  }
}
