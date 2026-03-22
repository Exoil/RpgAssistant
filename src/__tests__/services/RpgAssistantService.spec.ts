/**
 * RpgAssistantService wraps the auto-generated HTTP client (RpgAssistantClient).
 * These tests mock the HTTP client so no real network calls are made.
 *
 * In .NET terms: this is like unit-testing a service class whose repository
 * dependency is swapped for an in-memory fake via dependency injection.
 *
 * vi.hoisted() ensures the mock object exists before Vitest hoists vi.mock()
 * to the top of the file — without it, the variable would be undefined inside
 * the mock factory.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RpgAssistantService } from '@/services/RpgAssistantService';
import { UpdateCharacter } from '@/services/Models/UpdateCharacter';
import { PageQuery } from '@/services/Models/PageQuery';

// --- Mock the auto-generated HTTP client ---
const mockClient = vi.hoisted(() => ({
  createCharacter: vi.fn(),
  getCharacterById: vi.fn(),
  updateCharacter: vi.fn(),
  deleteCharacter: vi.fn(),
  getPagedCharacters: vi.fn(),
  createKnowRelationship: vi.fn(),
  deleteKnowRelationship: vi.fn(),
}));

vi.mock('@/services/HttpClients/RpgAssistantClient', () => ({
  // Regular function (not arrow) so it can be called with `new`
  RpgAssistantClient: vi.fn(function () {
    return mockClient;
  }),
  // DTOs are plain data containers — use a class so `new Dto(data)` just copies the fields
  CreateCharacterDto: class {
    constructor(data: object) {
      Object.assign(this, data);
    }
  },
  UpdateCharacterDto: class {
    constructor(data: object) {
      Object.assign(this, data);
    }
  },
  CreateKnowsDto: class {
    constructor(data: object) {
      Object.assign(this, data);
    }
  },
}));

describe('RpgAssistantService', () => {
  let service: RpgAssistantService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new RpgAssistantService('http://localhost:8080');
  });

  // ------------------------------------------------------------------ //
  describe('createCharacterAsync', () => {
    it('returns the new character id from the API response', async () => {
      mockClient.createCharacter.mockResolvedValue({ result: 'new-id-123' });

      const result = await service.createCharacterAsync('Gandalf');

      expect(result).toBe('new-id-123');
    });

    it('calls the HTTP client exactly once', async () => {
      mockClient.createCharacter.mockResolvedValue({ result: 'id' });

      await service.createCharacterAsync('Gandalf');

      expect(mockClient.createCharacter).toHaveBeenCalledOnce();
    });

    it('forwards the AbortSignal to the client', async () => {
      mockClient.createCharacter.mockResolvedValue({ result: 'id' });
      const controller = new AbortController();

      await service.createCharacterAsync('Gandalf', controller.signal);

      expect(mockClient.createCharacter).toHaveBeenCalledWith(
        expect.anything(),
        controller.signal,
      );
    });
  });

  // ------------------------------------------------------------------ //
  describe('getCharacterAsync', () => {
    it('returns a VersionedCharacter with id, name, and etag as version', async () => {
      mockClient.getCharacterById.mockResolvedValue({
        result: { id: '1', name: 'Frodo', knowCharacterIds: [] },
        headers: { etag: '"v1"' },
      });

      const result = await service.getCharacterAsync('1');

      expect(result.id).toBe('1');
      expect(result.name).toBe('Frodo');
      expect(result.version).toBe('"v1"');
    });

    it('passes the character id to the client', async () => {
      mockClient.getCharacterById.mockResolvedValue({
        result: { id: '42', name: 'Sam', knowCharacterIds: [] },
        headers: { etag: '"v2"' },
      });

      await service.getCharacterAsync('42');

      expect(mockClient.getCharacterById).toHaveBeenCalledWith('42', undefined);
    });
  });

  // ------------------------------------------------------------------ //
  describe('updateCharacterAsync', () => {
    it('calls the client with id, version, and dto', async () => {
      mockClient.updateCharacter.mockResolvedValue({});
      const update = new UpdateCharacter('1', 'Frodo Baggins', '"v1"');

      await service.updateCharacterAsync(update);

      expect(mockClient.updateCharacter).toHaveBeenCalledWith(
        '1',
        '"v1"',
        expect.anything(), // UpdateCharacterDto
        undefined,
      );
    });
  });

  // ------------------------------------------------------------------ //
  describe('deleteCharacterAsync', () => {
    it('calls the client with the character id', async () => {
      mockClient.deleteCharacter.mockResolvedValue({});

      await service.deleteCharacterAsync('char-1');

      expect(mockClient.deleteCharacter).toHaveBeenCalledWith('char-1', undefined);
    });
  });

  // ------------------------------------------------------------------ //
  describe('getCharactersAsync', () => {
    it('maps the API response to Character instances', async () => {
      mockClient.getPagedCharacters.mockResolvedValue({
        result: [
          { id: '1', name: 'Frodo', knowCharacterIds: ['2'] },
          { id: '2', name: 'Sam', knowCharacterIds: [] },
        ],
      });

      const result = await service.getCharactersAsync(new PageQuery(1, 10, 'name', 'Asc'));

      expect(result).toHaveLength(2);
      expect(result[0]!.id).toBe('1');
      expect(result[0]!.name).toBe('Frodo');
      expect(result[0]!.knowCharacterIds).toEqual(['2']);
      expect(result[1]!.id).toBe('2');
    });

    it('passes pagination parameters to the client', async () => {
      mockClient.getPagedCharacters.mockResolvedValue({ result: [] });

      await service.getCharactersAsync(new PageQuery(2, 25, 'name', 'Desc'));

      expect(mockClient.getPagedCharacters).toHaveBeenCalledWith(2, 25, 'name', 'Desc', undefined);
    });
  });

  // ------------------------------------------------------------------ //
  describe('createKnowRelationBetweenCharacters', () => {
    it('returns the new relationship id', async () => {
      mockClient.createKnowRelationship.mockResolvedValue({ result: 'rel-id' });

      const result = await service.createKnowRelationBetweenCharacters('1', '2', '');

      expect(result).toBe('rel-id');
    });

    it('passes fromId, toId, and description in the DTO', async () => {
      mockClient.createKnowRelationship.mockResolvedValue({ result: 'id' });

      await service.createKnowRelationBetweenCharacters('char-1', 'char-2', 'childhood friends');

      const dtoArg = mockClient.createKnowRelationship.mock.calls[0][0] as {
        fromCharacterId: string;
        toCharacterId: string;
        description: string;
      };
      expect(dtoArg.fromCharacterId).toBe('char-1');
      expect(dtoArg.toCharacterId).toBe('char-2');
      expect(dtoArg.description).toBe('childhood friends');
    });
  });

  // ------------------------------------------------------------------ //
  describe('deleteKnowRelationBetweenCharacters', () => {
    it('calls the client with fromId and toId', async () => {
      mockClient.deleteKnowRelationship.mockResolvedValue({ result: undefined });

      await service.deleteKnowRelationBetweenCharacters('char-1', 'char-2');

      expect(mockClient.deleteKnowRelationship).toHaveBeenCalledWith('char-1', 'char-2', undefined);
    });
  });
});