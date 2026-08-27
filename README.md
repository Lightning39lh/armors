# Constructor de Armaduras

Web estática para armar una armadura por partes y filtrar piezas compatibles según rangos históricos.

## Modelo inicial

Los datos mock viven en `public/data/armor-pieces.json`.

Cada pieza tiene:

- `id`: identificador único.
- `name`: nombre visible.
- `part`: parte en inglés (`helmet`, `chest`, `arms`, `gloves`, `legs`, `boots`).
- `startYear`: año inicial.
- `endYear`: año final.
- `thumbnail`: imagen liviana para catálogo.
- `image`: imagen grande para el maniquí.

La posición visual NO vive en cada pieza. Vive centralizada por tipo de parte en `src/domain/armor-part.ts`.

## Compatibilidad

Dos piezas son compatibles si sus rangos de años se solapan:

```txt
a.startYear <= b.endYear && b.startYear <= a.endYear
```

Cada pieza candidata debe ser compatible con todas las piezas ya seleccionadas.

## Scripts

```bash
npm install
npm run dev
npm run typecheck
```

No hay backend todavía. La primera versión usa JSON e imágenes estáticas.
