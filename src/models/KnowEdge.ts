import type { EdgeWithId } from 'v-network-graph'

export class KnowEdge implements EdgeWithId {
  id: string
  source: string
  target: string

  constructor(id: string, source: string, target: string) {
    this.id = id
    this.source = source
    this.target = target
  }
}
