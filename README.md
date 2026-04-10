# Hexagonal Architecture — Proyecto progresivo

Proyecto TypeScript que construye un sistema de pedidos paso a paso, introduciendo cada patron de arquitectura hexagonal en su propio commit etiquetado.

## Como navegar los pasos

```bash
# Ver todos los pasos disponibles
git tag -l

# Ir a un paso concreto
git checkout v01-domain-entity

# Ver que cambio entre dos pasos
git diff v03-ports v04-use-cases

# Volver al estado completo
git checkout main
```

## Pasos del proyecto

| Tag | Contenido |
|-----|-----------|
| `v01-domain-entity` | Entidad `Order` pura — sin frameworks, sin imports externos |
| `v02-value-objects` | `Money`, `OrderId`, `CustomerId` como Value Objects |
| `v03-ports` | Puertos de entrada y salida — las interfaces del hexagono |
| `v04-use-cases` | Capa de aplicacion — los Use Cases orquestan el dominio |
| `v05-adapters` | Adapters en memoria + Composition Root (`main.ts`) |
| `v06-http-adapter` | Adapter HTTP primario — Express controller |
| `v07-domain-events` | Domain Events acumulados y despachados tras el save |
| `v08-command-bus` | Command Bus con middlewares (logging, validacion) |
| `v09-cqrs` | CQRS — Read Model separado de los Commands |
| `v10-unit-of-work` | Unit of Work como puerto de salida transaccional |
| `v11-testing` | Tests de dominio, use case con Fakes y contract tests |
| `v12-acl` | Anti-Corruption Layer + Circuit Breaker para servicio externo |

## Estructura del proyecto (estado final)

```
src/
  domain/
    model/          # Entidades y Aggregates
    value-objects/  # Value Objects inmutables
    events/         # Domain Events
    ports/          # Interfaces (puertos de entrada y salida)
    errors/         # Errores de dominio tipados
  application/
    services/       # Use Cases — orquestan el dominio
    bus/            # Command Bus y middlewares
    queries/        # Read side (CQRS)
  infrastructure/
    driven/         # Adapters secundarios (BD, email, cache)
    driving/        # Adapters primarios (HTTP, CLI, Kafka)
  main.ts           # Composition Root — unico lugar que conoce implementaciones concretas
```

## Prerequisitos

```bash
npm install
npm run build
npm start
```
