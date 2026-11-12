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
