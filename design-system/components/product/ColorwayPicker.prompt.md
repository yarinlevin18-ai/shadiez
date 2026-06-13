The brand's signature shop control — the colorway selector. Controlled by index.

```jsx
const [i, setI] = useState(0);
<ColorwayPicker value={i} onChange={(idx) => setI(idx)} />
```

Defaults to the real SHADIEZ line (Cream, Coral, Butter, Dusty Blue, Navy, Burgundy, Pinstripe — exported as `SHADIEZ_COLORWAYS`). In real use, selecting a colorway also swaps the product photo and floods the section to that exact `--cw-*` token. Pass your own `colorways` array to override.
