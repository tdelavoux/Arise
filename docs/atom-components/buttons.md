---
title: Atom Buttons
---

# {{ $frontmatter.title }}

## Basic Atom Buttons

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <button class="a-btn a-primary">Primary</button>
  <button class="a-btn a-secondary">Secondary</button>
  <button class="a-btn a-light">Light</button>
  <button class="a-btn a-success">Success</button>
  <button class="a-btn a-info">Info</button>
  <button class="a-btn a-warning">Warning</button>
  <button class="a-btn a-danger">Danger</button>
  <button class="a-btn a-dark">Dark</button>
</div>
<div class="a-docs-example-line">
  <button class="a-btn a-primary" disabled>Primary</button>
  <button class="a-btn a-secondary" disabled>Secondary</button>
  <button class="a-btn a-light" disabled>Light</button>
  <button class="a-btn a-success" disabled>Success</button>
  <button class="a-btn a-info" disabled>Info</button>
  <button class="a-btn a-warning" disabled>Warning</button>
  <button class="a-btn a-danger" disabled>Danger</button>
  <button class="a-btn a-dark" disabled>Dark</button>
</div>
```

</PreviewAndCopyCode>

## Full Buttons

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <button class="a-btn a-full-primary">Primary</button>
  <button class="a-btn a-full-secondary">Secondary</button>
  <button class="a-btn a-full-light">Light</button>
  <button class="a-btn a-full-success">Success</button>
  <button class="a-btn a-full-info">Info</button>
  <button class="a-btn a-full-warning">Warning</button>
  <button class="a-btn a-full-danger">Danger</button>
  <button class="a-btn a-full-dark">Dark</button>
</div>
<div class="a-docs-example-line">
  <button class="a-btn a-full-primary" disabled>Primary</button>
  <button class="a-btn a-full-secondary" disabled>Secondary</button>
  <button class="a-btn a-full-light" disabled>Light</button>
  <button class="a-btn a-full-success" disabled>Success</button>
  <button class="a-btn a-full-info" disabled>Info</button>
  <button class="a-btn a-full-warning" disabled>Warning</button>
  <button class="a-btn a-full-danger" disabled>Danger</button>
  <button class="a-btn a-full-dark" disabled>Dark</button>
</div>
```

</PreviewAndCopyCode>

## Half and link Buttons

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-primary">ANNULER</button>
  <button class="a-btn-sm a-half-primary">VALIDER</button>
  <button class="a-btn-sm a-full-primary">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-success">ANNULER</button>
  <button class="a-btn-sm a-half-success">VALIDER</button>
  <button class="a-btn-sm a-full-success">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-secondary">ANNULER</button>
  <button class="a-btn-sm a-half-secondary">VALIDER</button>
  <button class="a-btn-sm a-full-secondary">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-light">ANNULER</button>
  <button class="a-btn-sm a-half-light">VALIDER</button>
  <button class="a-btn-sm a-full-light">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-danger">ANNULER</button>
  <button class="a-btn-sm a-half-danger">VALIDER</button>
  <button class="a-btn-sm a-full-danger">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-warning">ANNULER</button>
  <button class="a-btn-sm a-half-warning">VALIDER</button>
  <button class="a-btn-sm a-full-warning">VALIDER</button>
</div>

<div class="a-docs-example-line">
  <button class="a-btn-sm a-link-info">ANNULER</button>
  <button class="a-btn-sm a-half-info">VALIDER</button>
  <button class="a-btn-sm a-full-info">VALIDER</button>
</div>
```

</PreviewAndCopyCode>

## Buttons sizes

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <button class="a-btn-xs a-danger">danger</button>
  <button class="a-btn-sm a-primary">Primary</button>
  <button class="a-btn a-secondary">Secondary</button>
</div>
```

</PreviewAndCopyCode>

## Customizing colors

All buttons colors might be overwritten by changing Atom css var but be aware this action will influence all of the components sharing same type (primary, secondary ... etc).

Please, check the [Customize section](../advanced/customize) for more informations

```css
:root {
  --p-primary: #437cb5;
  --h-primary: #d0e0fc;
  --t-primary: #0b3d91;
}
```
