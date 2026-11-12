# Pin UI to Plinth UI migration inventory

Status: **in progress, approach agreed for review.** The components are MIT licensed (Pin UI README and https://www.pinui.xyz/terms) and published through a shadcn registry at `https://pinui.xyz/r/<name>.json`. Integration uses that official channel, keeps the licence notice (`THIRD_PARTY_NOTICES.md`) and credits the author, Rachit Thakur. The Pin UI name, mark and demo media are excluded by the licence and are not used.

Integrated so far: **Liquid Voice** (`components/audio/LiquidVoice.tsx` and `liquid-voice.css`, dependency `motion`). Everything else below is still pending until the approach is approved.

This list comes from the component names supplied by the project owner. It is a starting point, not a complete inventory: routes, categories and the Blocx collection still need to be discovered from the repository.

## Registry components (official shadcn registry, 30 items)

| ID | Name | Folder | Status | Notes |
|---|---|---|---|---|
| liquid-voice | Liquid Voice | components/audio | Complete | WebGL 2 with CSS fallback, shown with the fallback in the test browser |
| recorder | Recorder | components/audio | Complete |  |
| presence-cards | Presence Cards | components/cards | Complete |  |
| reader-card | Reader Card | components/cards | Complete |  |
| file-box | File Box | components/cards | Complete |  |
| task-card | Task Card | components/cards | Complete | Remote avatars from dicebear |
| magnify | Magnify | components/cards | Complete |  |
| calendar-card | Calendar | components/cards | Complete |  |
| swap-card | Swap Card | components/cards | Complete |  |
| thermal-dial | Thermal Dial | components/cards | Complete |  |
| weather | Weather | components/cards | Complete |  |
| taxi | Taxi | components/cards | Complete |  |
| balance-card | Balance Card | components/cards | Complete | Catalogue slug pin-balance-card |
| cart-card | Add To Cart | components/cards | Complete | Pin UI demo photo not available. Preview passes a stock photo through the image prop |
| theme-switch | Theme Switch | components/interactive | Complete | Catalogue slug pin-theme-switch |
| lamp-switch | Lamp Switch | components/interactive | Complete |  |
| joystick | Joystick | components/interactive | Integrated, drawing not verified | Canvas based. Test browser has no WebGL |
| copy-paste-pad | Copy Paste Pad | components/interactive | Integrated, 3D not verified | Needs three. Shows its own fallback message when WebGL is missing, as in the test browser |
| desk-computer | Desk Computer | components/interactive | BLOCKED | Needs /library/desk-computer.svg, which is not in the registry or the supplied folder. Code is in components/interactive but it has no catalogue entry |
| dynamic-drop-zone | Dynamic Drop Zone | components/interactive | Complete |  |
| progress-image | Progress Image | components/interactive | Complete | Uses a picsum.photos demo image |
| search-card | Search Card | components/forms | Complete |  |
| prompt-composer | Prompt Composer | components/forms | Complete |  |
| chips | Chips | components/forms | Complete |  |
| otp-input | Egg OTP | components/forms | Complete |  |
| selection-list | Selection List | components/lists | Complete |  |
| chat-room | Chat Room | components/lists | Complete | Catalogue slug pin-chat-room |
| liquid-tabs | Liquid Tabs | components/lists | Complete |  |
| add-member | Add Member | components/lists | Complete | Remote portraits from randomuser.me as demo data |
| session-list | Count down | components/lists | Complete |  |

"Complete" means: integrated, type checked, built, and rendered with content in the browser. Interactions were not individually exercised except Liquid Voice. Light and dark variants exist where the component has a theme prop.

## Blocx page sections (from the supplied source folder)

Source: `/home/Shreekumar/Pictures/components/blocks/demo`. The supplied `library/` folder was byte-identical to the registry components above, so it added nothing new. Site chrome (headers, footers, hero wall, ads, waitlist, legal pages, Pin UI marks) was deliberately not imported.

| ID | Name | Status | Notes |
|---|---|---|---|
| halo-sign-in | Halo sign in | Complete | Renders with no broken images |
| luna-hero | Luna storefront hero | Complete | Needs @phosphor-icons/react. Preview wrapper blocks link navigation |
| odometer-pricing | Odometer pricing | Complete | |
| pixelkit-sign-in | Pixelkit sign in | Complete | |
| synais-footer | Synais footer | Complete | |
| partylabs-hero | Party labs hero | BLOCKED | Needs about 25 images at /blocx/partylabs-hero/*.webp, not supplied. Code copied to components/blocks, no catalogue entry |
| smart-pricing | Smart pricing | BLOCKED | Needs SVG art at /blocx/smart-pricing/*.svg (knob, union, dot), not supplied. Code copied, no catalogue entry |
| storybook-hero | Storybook hero | BLOCKED | Needs /blocx/storybook-hero/logo.svg and illustration.webp, not supplied. Code copied, no catalogue entry |
| caremetric-footer | Caremetric footer | BLOCKED | Needs logo.svg and texture.webp. Not copied |
| contact-form | Contact form | BLOCKED | Needs /blocx/contact-form/hand.webp. Not copied |
| orbit-hero | Orbit hero | BLOCKED | Needs clouds, earth, logo and surface webp files. Not copied |

Each blocked item can be finished by supplying its asset files under `public/blocx/<name>/` and adding the catalogue entry back.

## Animata components (MIT, from the supplied repository)

Supplied source: `/home/Shreekumar/Downloads/animata-main`. 213 component files were copied into `animata/` (kept in its own folder structure so internal `@/animata/...` imports keep working). Each component's default export is its own preview. Left out entirely: `hero-section`, `video-chat`, `clock-with-photo`, `music-widget`, `profile`, `orbiting-items`, `orbiting-items-3-d` (they depend on Animata media, logos or removed brand icons). The remaining sub-files of compound components (for example `preloader/split-reveal/*`) are support code, not separate entries.

Catalogued entries: **150** (prefixed `an-`). Every entry renders inside a stage: backgrounds and layout components get a fixed-height box so they have something to fill. Measured in the browser for visible content (text, media or painted boxes) and for crashes: all 150 pass.

Code present in `animata/` but **not** in the catalogue (42):

| Component | Reason |
|---|---|
| animata/accordion/faq | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/card-stack | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/comment-reply-card | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/notification-card | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/notify-user-info | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/reminder-scheduler | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/score-card | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/survey-card | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/card/swap-text-card | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/carousel/image-carousel | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/container/animated-dock | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/container/nav-tabs | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/fabs/flower-menu | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/feature/cards-confirmation-message | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/feature/cards-content-scan | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/graphs/bar-chart | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/image/photo-booth | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/list/menu-animation | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/list/transaction-list | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/text/circular-text | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/text/gibberish-text | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/text/swap-text | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/text/text-animator | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/text/typing-text | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/widget/music-stack-interaction | Default export needs example props (crashes with none). Props are in the upstream story file |
| animata/widget/direction-card | Preview never finishes loading |
| animata/widget/vpn-widget | Preview never finishes loading |
| animata/card/swap-card | Image component with no source supplied by default |
| animata/image/disclose-image | Image component with no source supplied by default |
| animata/image/image-box-shadow | Image component with no source supplied by default |
| animata/image/skew-image | Image component with no source supplied by default |
| animata/image/zoom-image | Image component with no source supplied by default |
| animata/widget/flight-widget | Hotlinks a third-party brand logo that does not load |

| animata/text/animated-gradient-text | Renders nothing without text passed in as children |
| animata/text/double-underline | Renders nothing without text passed in as children |
| animata/text/glitch-text | Renders nothing without text passed in as children |
| animata/text/jitter-text | Renders nothing without text passed in as children |
| animata/text/metis-text | Renders nothing without text passed in as children |
| animata/text/roll-text | Renders nothing without text passed in as children |
| animata/text/underline-hover-text | Renders nothing without text passed in as children |
| animata/text/wave-reveal | Renders nothing without text passed in as children |
| animata/section/pricing | Crashes without its example props |
To finish any of these, wrap it in a preview that passes the example props from its `*.stories.tsx` in the upstream repository, then add its entry back.
