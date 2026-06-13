The SHADIEZ modal — warm ink overlay + blur, cream panel, thin wood-tone brand bar, big soft shadow. Closes on overlay click, the ghost X, or Escape.

```jsx
const [open, setOpen] = useState(false);
<Dialog open={open} onClose={() => setOpen(false)}
  title="Get in touch"
  description="Leave your details and we'll get back to you shortly."
  footer={<Button variant="primary" fullWidth>Send message</Button>}>
  <Field label="Name" required><Input /></Field>
  <Field label="Email" required><Input type="email" /></Field>
</Dialog>
```

Controlled via `open` / `onClose`. Title renders in Fraunces light.
