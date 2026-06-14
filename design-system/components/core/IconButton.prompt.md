Icon-only round action — dialog close, nav toggles, social links. Always pass `label` for accessibility.

```jsx
<IconButton label="Close" onClick={close}>
  <XIcon />
</IconButton>
<IconButton label="Instagram" variant="ghost" size="lg"><IgIcon /></IconButton>
```

Variants: `ghost` (default, tints on hover), `solid` (ink), `cream`. Sizes `sm`/`md`/`lg` (44px hit target at `lg`). Set `round={false}` for the 4px square.
