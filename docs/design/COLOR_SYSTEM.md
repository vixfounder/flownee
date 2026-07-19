# Flownee Color System

Flownee uses color to clarify action and state while neutral backgrounds carry most of the interface. The target balance is approximately 70% neutrals, 15% violet, 8% teal, 5% muted blue, and 2% light-blue accents.

## Brand palette

| Token | Value | Role |
|---|---:|---|
| `--brand-primary` | `#525AFF` | Primary actions, selected states, links, voice action, next-task emphasis |
| `--brand-flow` | `#4AB5B5` | Completion, success, supportive actions, AI flow |
| `--brand-support` | `#6D8BC0` | Supporting icons, scheduling, inactive navigation, subtle borders |
| `--brand-highlight` | `#8FD9FB` | Suggested and empty-state tints, voice glow, restrained decoration |

## Neutrals

Light mode uses `#F8FAFC` for the background, white surfaces, `#17213F` primary text, `#667085` secondary text, and `#E5EAF2` borders. Dark mode uses `#10152B`, `#181F38`, `#2A3452`, `#F5F7FF`, and `#B7C0D8` respectively.

## Semantic colors

- Success uses teal.
- Warning uses `#E9A23B` with a dark foreground.
- The raw error token is `#D6455D`; destructive controls use the darker `#C7354F` so white normal-size text passes WCAG AA.
- The brand palette is not forced onto every semantic state.

## Gradient

```css
linear-gradient(135deg, #525AFF 0%, #6D8BC0 38%, #4AB5B5 72%, #8FD9FB 100%)
```

Use the gradient only for logo or hero treatments, active voice recording, AI processing, onboarding, and empty-state illustration. Do not apply it to ordinary buttons, cards, inputs, badges, or navigation.

## Component mapping

- Primary buttons: violet with white text.
- Secondary buttons: pale teal with a teal border and dark teal text.
- Next-task cards: white/dark surface with a violet edge.
- Completed cards: teal edge or tint.
- Scheduled cards: muted-blue edge or tint.
- Suggested cards: pale light-blue surface with navy text.
- Selected effort controls: violet.
- Inputs: neutral surface and border, violet focus, semantic error state.
- Bottom navigation: surface background, violet active item, gray-blue inactive items. This is a reusable preview and is not part of the current product shell.

## Accessibility

- White on primary violet is `4.92:1` and passes AA for normal text.
- Navy on teal is `6.46:1`; white on teal is only `2.45:1`, so teal controls use a dark foreground.
- Muted blue on white is `3.44:1`, so it is reserved for icons, borders, large elements, and tinted surfaces rather than important small text.
- Navy on light blue is `10.17:1`; light-blue text on white is prohibited.
- Primary navy on the light background is `15.14:1`; secondary neutral text on white is `4.97:1`.
- Dark-mode brand adaptations are lighter where they appear as text or focus indicators.
- Motion effects stop when `prefers-reduced-motion: reduce` is active.

The internal, no-index reference page is available at `/design-system`.
