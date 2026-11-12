# Third party notices

## Pin UI components

Components in `components/audio/` (and any other folder marked with a Pin UI source notice) come from **Pin UI**, designed and built by **Rachit Thakur**.

- Source: https://github.com/shadcn-labs/Pin-UI and https://www.pinui.xyz
- Licence: MIT. The Pin UI terms (https://www.pinui.xyz/terms, last updated 22 September 2026) state that every component published on the site is offered under the MIT licence and ask that the licence notice stays with the code when it is redistributed. The upstream repository README says the same.
- Not included in that licence and not used here: the Pin UI name and mark, and photographs or recordings used to demonstrate components.
- The upstream repository did not contain a separate `LICENSE` file when these components were integrated. The MIT permission text below applies to the Pin UI component code, with the copyright held by its author.

```
MIT License

Copyright (c) Rachit Thakur (Pin UI)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Folders containing Pin UI components: `components/audio`, `components/cards`, `components/interactive`, `components/forms`, `components/lists`, `components/blocks`. These files are kept unmodified apart from a source header, and are excluded from linting for that reason.

`components/interactive/desk-computer-engine.ts` also carries its own upstream credit inside the file (a link to https://github.com/wheresryan22/anatomy). That credit must stay with the file.

Per the Pin UI terms, these components are credited to their author and are not presented as PlinthUI's own work.

## Motion-Primitives components

Components in `components/motion/` come from **Motion-Primitives** by **ibelick**.

- Source: https://github.com/ibelick/motion-primitives and https://motion-primitives.com
- Licence: MIT. The repository README states it is MIT licensed, and its licence file reads:

```
MIT License

Copyright (c) 2024 ibelick

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

The 33 files are kept unmodified apart from a source header and, where React 19 typings reject upstream React 18 types, a `// @ts-nocheck` line (types only, no runtime change). The two hooks in `hooks/` (`useClickOutside`, `usePreventScroll`) were not in the supplied source and were written for this project. The preview demos in `previews/mp-*.tsx` are original to this project. The docs-site files in the supplied folder (header, logos, code viewers) were not imported.

## Animata components

Components in `animata/` come from **Animata**.

- Source: https://github.com/codse/animata and https://animata.design
- Licence: MIT. The supplied repository's `LICENSE.md` reads:

```
MIT License

Copyright (c) Animata

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

The component files are kept unmodified apart from a source header and, where React 19 typings reject upstream types, a types-only `// @ts-nocheck` line. Not imported: the Animata docs site, its logo and brand icons, its `public/` photos, and the components that depend on them (`hero/hero-section`, `widget/video-chat`, `widget/clock-with-photo`, `widget/music-widget`, `widget/profile`, `list/orbiting-items`, `list/orbiting-items-3-d`). The three hooks in `hooks/` (`use-lock-body`, `use-mouse-position`, `use-prefers-reduced-motion`) `lerp` and `getDistance` in `lib/utils.ts`, and `components/shapes/card-stack-mask-defs.tsx` are copied from the same MIT source.
