Labeled form row — the lead-dialog field pattern.

```jsx
<Field label="Email" htmlFor="email" required error={err}>
  <Input id="email" type="email" invalid={!!err} />
</Field>
<Field label="Phone" htmlFor="phone" optional>
  <Input id="phone" type="tel" />
</Field>
```

Uppercase tracked label, navy required `*`, "optional" hint or inline `error` on the right.
