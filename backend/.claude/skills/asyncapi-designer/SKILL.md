---
name: asyncapi-designer
description: Author and maintain the RpgAssistant AsyncAPI contract at `backend/Utilities/AsyncContract.yaml`. The backend is **API-first**: the contract is the source of truth for every message-driven interaction and must be updated **before** code. Targets AsyncAPI **3.1.0** with **Apache Kafka** as the broker and **SignalR** (modeled via the WebSocket binding) for real-time push to the UI. Every schema MUST declare bounds (`minLength`/`maxLength`, `minItems`/`maxItems`, `minimum`/`maximum`).
---

# AsyncAPI Spec Generation — RpgAssistant

This project follows an **API-first** workflow for async communication too.
The AsyncAPI document at `backend/Utilities/AsyncContract.yaml` is the single
source of truth for every Kafka topic and every SignalR hub method. Code
follows the contract — never the other way around.

Spec version: **AsyncAPI 3.1.0** (document root `asyncapi: 3.1.0`). The v3
layout puts **operations at the document root**, each referencing a
`channels.<name>`. Do **not** use the v2 channel-nested operation form.

## When to use this skill

- Adding or changing a Kafka topic (producer or consumer).
- Adding or changing a SignalR hub method (client invoke or server push).
- Adding or changing a message payload schema.
- Renaming an event, changing partition/replica counts, or changing a
  consumer group.
- Validating the contract against producers and consumers.

## Source of truth

| File | Role |
|---|---|
| `backend/Utilities/AsyncContract.yaml` | **Source of truth.** Edit this first. |
| `backend/src/RpgAssistant.Application/Events/*.cs` (producers / consumers) | Event record types — must mirror the message schemas in the contract. |
| `backend/src/RpgAssistant.Infrastructure/Kafka/*.cs` | Kafka producer/consumer setup — `topic`, `groupId`, `clientId` values must match the contract bindings. |
| `backend/src/RpgAssistant.Api/Hubs/*Hub.cs` | SignalR hub classes — hub URL and method names must match channels modeled in the contract. |
| `frontend/src/services/realtime/*.ts` | SignalR client wiring — hub URL and method names must match the contract. |

## API-first workflow

For every contract-affecting change, follow this order:

1. **Edit `backend/Utilities/AsyncContract.yaml`** — add or modify the
   server, channel, operation, or message. Validate the file (see
   "Validation" below) before continuing.
2. **Add an example for every message** (see "Examples" below). Examples
   must satisfy the schema constraints.
3. **Update the producer and the consumer code** in `Application/Events/`
   and `Infrastructure/Kafka/` (and `Api/Hubs/` for SignalR) so payloads,
   topic names, group ids, and hub method names match the contract
   exactly.
4. **Update the frontend** — for SignalR hubs the frontend client lives in
   `frontend/src/services/realtime/`; method names and payload shapes
   must follow the contract.
5. **Write tests** — Application tests for handlers that publish or
   consume; Integration tests using Testcontainers (Kafka container, plus
   the existing Neo4j one) for end-to-end event flow. Cover happy path
   **and** at least one not-happy path (deserialization failure, missing
   correlation id, consumer-group rebalance, hub disconnect).

If you discover the contract drifts from the implementation, fix the
**contract first**, then bring the code back into line.

## Mandatory schema constraints

Every schema in `AsyncContract.yaml` MUST declare explicit bounds. These
rules are identical to the OpenAPI skill — both contracts share validators.

| Property type | Required keywords | Notes |
|---|---|---|
| `string` (free text) | `minLength`, `maxLength` | Both required, even if `minLength: 0`. |
| `string` with `format: uuid` / `date-time` / `date` / `email` | format only | Length is implied by the format; do not add min/max. |
| `string` with a regex | `pattern` + `minLength`/`maxLength` | Pattern alone is not enough. |
| `integer`, `number` | `minimum`, `maximum` | Both required. |
| `array` | `minItems`, `maxItems` + bounded `items` | Element schema must itself follow these rules. |
| `object` | required keys via `required: [...]` | List every non-optional property; no orphan optionals. |
| Any property | `description` | Required if the name is not self-explanatory. |
| Any nullable property | `nullable: true` | Be explicit — never rely on absence. |

### Project-specific defaults

Reuse the same defaults as the REST contract — do not invent alternatives:

- Character names: `minLength: 1`, `maxLength: 50`.
- Free-text descriptions: `minLength: 0`, `maxLength: 500`.
- Id arrays (e.g. `affectedCharacterIds`): `minItems: 0`, `maxItems: 50`.
- Version integers: `minimum: 1`, `maximum: 1000000`.
- Event timestamps: `string` with `format: date-time`.
- All identifiers: `string` with `format: uuid`.
- Correlation/trace ids: `string`, `minLength: 1`, `maxLength: 100`.

## Document skeleton

```yaml
asyncapi: 3.1.0
info:
    title: RpgAssistant Async API
    version: 1.0.0
    description: |
        Kafka topics published/consumed by the backend, plus the SignalR
        hub that pushes domain events to the SPA. Source of truth.
defaultContentType: application/json

servers:
    kafka-prod:
        host: kafka:9092
        protocol: kafka
        description: Apache Kafka cluster (production).
        bindings:
            kafka:
                schemaRegistryUrl: https://schema-registry.example
                schemaRegistryVendor: confluent
                bindingVersion: '0.5.0'
    signalr-hub:
        host: api.example.com
        pathname: /hubs/characters
        protocol: wss
        description: SignalR hub for real-time character updates. Modeled via the WebSocket binding.

channels:
    # Kafka channels live under components.channels via $ref in operations,
    # or inline here. Prefer inline so the topic config is co-located.
    characterCreated:
        address: rpgassistant.character.created.v1
        servers:
            -   $ref: '#/servers/kafka-prod'
        messages:
            characterCreated:
                $ref: '#/components/messages/CharacterCreated'
        bindings:
            kafka:
                topic: rpgassistant.character.created.v1
                partitions: 6
                replicas: 3
                topicConfiguration:
                    cleanup.policy: ["delete"]
                    retention.ms: 604800000
                bindingVersion: '0.5.0'

operations:
    publishCharacterCreated:
        action: send
        channel:
            $ref: '#/channels/characterCreated'
        messages:
            -   $ref: '#/channels/characterCreated/messages/characterCreated'
        bindings:
            kafka:
                clientId:
                    type: string
                    enum: ['rpgassistant-api']
                bindingVersion: '0.5.0'

components:
    messages:
        CharacterCreated:
            name: CharacterCreated
            title: Character created
            summary: Emitted when a character is successfully created.
            contentType: application/json
            payload:
                $ref: '#/components/schemas/CharacterCreatedPayload'
            bindings:
                kafka:
                    key:
                        type: string
                        format: uuid
                        description: Character id used as the partitioning key.
                    bindingVersion: '0.5.0'

    schemas:
        CharacterCreatedPayload:
            type: object
            required: [ eventId, occurredAt, characterId, name, version, correlationId ]
            properties:
                eventId:
                    type: string
                    format: uuid
                occurredAt:
                    type: string
                    format: date-time
                characterId:
                    type: string
                    format: uuid
                name:
                    type: string
                    minLength: 1
                    maxLength: 50
                version:
                    type: integer
                    format: int32
                    minimum: 1
                    maximum: 1000000
                correlationId:
                    type: string
                    minLength: 1
                    maxLength: 100
```

## Apache Kafka patterns

Kafka bindings exist at **four** levels. Always specify the `bindingVersion`.

### Server-level binding

Describes the Schema Registry tied to a broker.

```yaml
servers:
    kafka-prod:
        host: kafka:9092
        protocol: kafka
        bindings:
            kafka:
                schemaRegistryUrl: https://schema-registry.example
                schemaRegistryVendor: confluent
                bindingVersion: '0.5.0'
```

### Channel-level binding (topic config)

Pin the topic name and Kafka topic settings. Every Kafka channel must
declare `topic`, `partitions`, and `replicas`.

```yaml
channels:
    characterUpdated:
        address: rpgassistant.character.updated.v1
        bindings:
            kafka:
                topic: rpgassistant.character.updated.v1
                partitions: 6
                replicas: 3
                topicConfiguration:
                    cleanup.policy: ["delete"]
                    retention.ms: 604800000   # 7 days
                bindingVersion: '0.5.0'
```

**Topic-naming convention:** `rpgassistant.<aggregate>.<event>.v<n>`. The
suffix `v1` is required so a new schema version can ship as `v2` without
breaking consumers.

### Operation-level binding (producer / consumer identity)

- Producers (`action: send`) — declare a stable `clientId`.
- Consumers (`action: receive`) — declare both `groupId` (rebalance unit)
  and `clientId`.

```yaml
operations:
    publishCharacterUpdated:
        action: send
        channel:
            $ref: '#/channels/characterUpdated'
        bindings:
            kafka:
                clientId:
                    type: string
                    enum: ['rpgassistant-api']
                bindingVersion: '0.5.0'

    consumeCharacterUpdated:
        action: receive
        channel:
            $ref: '#/channels/characterUpdated'
        bindings:
            kafka:
                groupId:
                    type: string
                    enum: ['rpgassistant-projector']
                clientId:
                    type: string
                    enum: ['rpgassistant-projector']
                bindingVersion: '0.5.0'
```

### Message-level binding (key + schema-registry lookup)

Always declare the partition `key` (use the aggregate id) so events for the
same entity stay in order on the same partition.

```yaml
components:
    messages:
        CharacterUpdated:
            payload:
                $ref: '#/components/schemas/CharacterUpdatedPayload'
            bindings:
                kafka:
                    key:
                        type: string
                        format: uuid
                        description: Character id — partitioning key.
                    schemaIdLocation: payload
                    schemaIdPayloadEncoding: '4'
                    schemaLookupStrategy: TopicIdStrategy
                    bindingVersion: '0.5.0'
```

## SignalR patterns

**AsyncAPI has no native SignalR binding.** The pragmatic and documented
modeling: declare the SignalR hub as a server using the WebSocket protocol,
declare each hub method as a channel, and use operations to express the
direction (`send` = client → server invocation; `receive` = server → client
push). This matches the way SignalR negotiates: the contract describes the
**logical** hub regardless of which transport SignalR ends up negotiating
(WebSockets / SSE / Long Polling).

### Server (the hub itself)

```yaml
servers:
    signalr-hub:
        host: api.example.com
        pathname: /hubs/characters
        protocol: wss
        description: SignalR hub for real-time character updates.
```

### Server-push channel (server → client)

Use `action: receive` from the perspective of the **client application**
described by this AsyncAPI document.

```yaml
channels:
    characterCreatedPush:
        address: characterCreated   # SignalR method name
        servers:
            -   $ref: '#/servers/signalr-hub'
        messages:
            characterCreated:
                $ref: '#/components/messages/CharacterCreated'

operations:
    onCharacterCreated:
        action: receive
        channel:
            $ref: '#/channels/characterCreatedPush'
        messages:
            -   $ref: '#/channels/characterCreatedPush/messages/characterCreated'
```

### Client-invoke channel (client → server)

```yaml
channels:
    subscribeToCharacter:
        address: SubscribeToCharacter   # SignalR hub method on the server
        servers:
            -   $ref: '#/servers/signalr-hub'
        messages:
            subscribeRequest:
                $ref: '#/components/messages/SubscribeRequest'

operations:
    subscribeToCharacter:
        action: send
        channel:
            $ref: '#/channels/subscribeToCharacter'
```

### Conventions for SignalR channels

- `address` is the **exact SignalR method name** (case-sensitive). Do
  **not** rename it for stylistic reasons.
- Use a `signalr:` prefix on channel keys (e.g. `signalrCharacterCreated`)
  if you want to keep them visually separated from Kafka channels in the
  contract. Required only if names collide.
- Reuse the same `components.messages.<Name>` between Kafka and SignalR
  whenever the payload is identical. Domain events typically are.
- SignalR `OnConnectedAsync` / disconnect events are out of scope — they
  belong to the framework, not the contract.

## Authoring examples from the contract

Every message MUST include at least one `example` (or `examples:` block)
under `components.messages.<Name>.examples`. Examples must satisfy the
schema's bounds.

### Example — Kafka event payload

```yaml
components:
    messages:
        CharacterCreated:
            payload:
                $ref: '#/components/schemas/CharacterCreatedPayload'
            examples:
                -   name: standard
                    summary: Minimal valid CharacterCreated event
                    payload:
                        eventId: "5d9b1a4c-1c1c-4c1c-9c1c-1c1c1c1c1c1c"
                        occurredAt: "2026-05-17T12:34:56Z"
                        characterId: "0b6c1f8a-9c2e-4a18-93a5-3a5e3a5e3a5e"
                        name: "Gandalf"
                        version: 1
                        correlationId: "req-7f3b2a1c-9d8e"
                    headers:
                        kafka_key: "0b6c1f8a-9c2e-4a18-93a5-3a5e3a5e3a5e"
```

### Example — KnowRelation events (matches the existing Cypher model)

```yaml
components:
    schemas:
        KnowRelationCreatedPayload:
            type: object
            required: [ eventId, occurredAt, knowRelationId, fromCharacterId, toCharacterId, description, version, correlationId ]
            properties:
                eventId:
                    type: string
                    format: uuid
                occurredAt:
                    type: string
                    format: date-time
                knowRelationId:
                    type: string
                    format: uuid
                fromCharacterId:
                    type: string
                    format: uuid
                toCharacterId:
                    type: string
                    format: uuid
                description:
                    type: string
                    minLength: 0
                    maxLength: 500
                version:
                    type: integer
                    format: int32
                    minimum: 1
                    maximum: 1000000
                correlationId:
                    type: string
                    minLength: 1
                    maxLength: 100
```

### Example — SignalR server push

```yaml
operations:
    onKnowRelationCreated:
        action: receive
        channel:
            $ref: '#/channels/knowRelationCreatedPush'
        messages:
            -   $ref: '#/channels/knowRelationCreatedPush/messages/knowRelationCreated'

components:
    messages:
        KnowRelationCreated:
            payload:
                $ref: '#/components/schemas/KnowRelationCreatedPayload'
            examples:
                -   name: standard
                    summary: Gandalf now knows Frodo (server push)
                    payload:
                        eventId: "5d9b1a4c-1c1c-4c1c-9c1c-1c1c1c1c1c1c"
                        occurredAt: "2026-05-17T12:34:56Z"
                        knowRelationId: "9c1c1c1c-1c1c-4c1c-9c1c-1c1c1c1c1c1c"
                        fromCharacterId: "0b6c1f8a-9c2e-4a18-93a5-3a5e3a5e3a5e"
                        toCharacterId: "11111111-1111-4111-8111-111111111111"
                        description: "Met in the Shire"
                        version: 1
                        correlationId: "req-7f3b2a1c-9d8e"
```

## Adding a new event — checklist

When adding an event to `AsyncContract.yaml`, verify each item:

- [ ] Event name follows the topic convention
      `rpgassistant.<aggregate>.<event>.v<n>` (Kafka) or matches the
      exact SignalR method name (SignalR).
- [ ] `components.messages.<Name>` defined with `name`, `title`, `summary`,
      `contentType: application/json`, and a `payload` referencing
      `components.schemas.<Name>Payload`.
- [ ] Payload schema includes the common envelope fields: `eventId`,
      `occurredAt`, the aggregate id, `version`, `correlationId`.
- [ ] Every bound from the constraints table is present on every schema
      you touched.
- [ ] At least one `example` whose payload satisfies all constraints.
- [ ] **Kafka** — channel binding declares `topic`, `partitions`,
      `replicas`, `topicConfiguration`; message binding declares the
      partition `key`; operation binding declares `clientId` (and
      `groupId` for consumers).
- [ ] **SignalR** — channel `address` matches the hub method name
      exactly; the operation `action` is `send` (client invoke) or
      `receive` (server push) from the **client's** perspective.
- [ ] After saving, run validation.

## Validation

Spectral ships an AsyncAPI ruleset. Extend it with the bounds rules from
the OpenAPI skill — keep both contracts validated the same way.

```bash
# Spectral (lint)
npx --yes @stoplight/spectral-cli lint backend/Utilities/AsyncContract.yaml

# Schema-only validation via the AsyncAPI CLI (optional)
npx --yes @asyncapi/cli validate backend/Utilities/AsyncContract.yaml
```

Project-local `.spectral.yaml` (single file can cover both `Contract.yaml`
and `AsyncContract.yaml`):

```yaml
extends: ["spectral:oas", "spectral:asyncapi"]
rules:
  asyncapi-info-description: warn
  asyncapi-operation-description: warn
  asyncapi-operation-operationId: error
  asyncapi-tag-description: warn
  # Bounds-required rules — same definitions as the OpenAPI skill; they
  # also match AsyncAPI schemas because both use JSON Schema-compatible types.
  string-bounds:
    description: Free-text strings must declare minLength and maxLength.
    severity: error
    given: "$..properties[?(@.type == 'string' && !@.format && !@.enum)]"
    then:
      - field: minLength
        function: truthy
      - field: maxLength
        function: truthy
  array-bounds:
    description: Arrays must declare minItems and maxItems.
    severity: error
    given: "$..properties[?(@.type == 'array')]"
    then:
      - field: minItems
        function: defined
      - field: maxItems
        function: truthy
  integer-bounds:
    description: Integers and numbers must declare minimum and maximum.
    severity: error
    given: "$..properties[?(@.type == 'integer' || @.type == 'number')]"
    then:
      - field: minimum
        function: defined
      - field: maximum
        function: defined
```

## Regeneration / code wiring

Unlike the REST contract (which feeds NSwag → `RpgAssistantClient.ts`),
AsyncAPI generators are not part of this project's build. The contract
drives **hand-written** types:

- Backend event records live in
  `backend/src/RpgAssistant.Application/Events/` as `record` types whose
  shape mirrors `components.schemas.<Name>Payload` exactly.
- Kafka producer/consumer configuration lives in
  `backend/src/RpgAssistant.Infrastructure/Kafka/`. Topic, `partitions`,
  `replicas`, `groupId`, `clientId` must match the contract values byte
  for byte.
- SignalR hub methods live in `backend/src/RpgAssistant.Api/Hubs/`. The
  hub class's URL and method names must match the contract.
- Frontend SignalR wiring lives in `frontend/src/services/realtime/`. The
  `HubConnectionBuilder` URL and the `connection.on("<method>", ...)`
  names must match the contract.

When the contract changes, update all of the above in the same PR.

## Resources

- AsyncAPI 3.1.0 spec: <https://www.asyncapi.com/docs/reference/specification/latest>
- AsyncAPI Kafka binding: <https://github.com/asyncapi/bindings/tree/master/kafka>
- AsyncAPI WebSocket binding (used here to model SignalR):
  <https://github.com/asyncapi/bindings/tree/master/websockets>
- AsyncAPI CLI (validate / preview): <https://github.com/asyncapi/cli>
- Spectral AsyncAPI ruleset: <https://docs.stoplight.io/docs/spectral/4dec24461f3af-async-api-rules>
- SignalR documentation: <https://learn.microsoft.com/en-us/aspnet/core/signalr/introduction>