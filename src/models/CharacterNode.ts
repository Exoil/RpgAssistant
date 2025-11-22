import type { NodeWithId } from 'v-network-graph'

export class CharacterNode implements NodeWithId {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}
