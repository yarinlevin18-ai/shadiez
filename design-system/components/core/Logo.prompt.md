The SHADIEZ brand lockup — use in headers, footers, and anywhere a "logo" belongs. `WaveMark` is the icon alone.

```jsx
<Logo size={20} />                         {/* header scale */}
<Logo size={34} color="var(--cream)" />    {/* hero, over imagery */}
<WaveMark size={28} color="var(--wood)" /> {/* mark only */}
```

`Logo` composes the wave-mark + the Fraunces wordmark (light, all-caps, 0.22em tracked) + a diamond accent. Toggle `showMark` / `showAccent`. Everything inherits `color` (defaults to `currentColor`).
