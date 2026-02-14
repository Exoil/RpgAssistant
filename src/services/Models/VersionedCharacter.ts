export class VersionedCharacter {
  public id: string;
  public name: string;
  public version: number;

  constructor(id: string, name: string, version: number) {
    this.id = id;
    this.name = name;
    this.version = version;
  }
}
