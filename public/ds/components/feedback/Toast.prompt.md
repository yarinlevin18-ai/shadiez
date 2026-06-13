Warm notification card. Presentational — position it (e.g. fixed bottom-right) and remove on a timer in your app.

```jsx
<Toast tone="success" title="Message sent." message="We'll be in touch shortly." />
<Toast tone="error" title="Couldn't send" message="Try again in a moment." onDismiss={fn} />
```

Tones: `default` (wood accent), `success` (green check), `error` (red). Left accent bar + optional glyph + optional dismiss.
