---
title: Spacing
---

# {{ $frontmatter.title }}

## Margin and padding

<PreviewAndCopyCode>

```html
<div class="a-docs-example-column a-docs-spacing">
    <div class="m-0">Margin 0 <code>m-0</code></div>
    <div class="m-05">Margin 0.5 <code>m-05</code></div>
    <div class="m-1">Margin 1 <code>m-1</code></div>
    <div class="m-2">Margin 2 <code>m-2</code></div>
</div>
<div class="a-docs-example-line a-docs-spacing">
    <div class="p-0">Padding 0 <code>p-0</code></div>
    <div class="p-05">Padding 0.5 <code>p-05</code></div>
    <div class="p-1">Padding 1 <code>p-1</code></div>
    <div class="p-2">Padding 2 <code>p-2</code></div>
</div>
```

</PreviewAndCopyCode>

### Vertical and horizontal margin and padding

<PreviewAndCopyCode>

```html
<div class="a-docs-example-column a-docs-spacing">
    <div class="mh-1"><code>mh-1</code></div>
    <div class="mv-1"><code>mv-1</code></div>
    <div class="mh-2 mv-1">Warning: Cannot stack <code>mh-2 mv-1</code></div>
</div>
<div class="a-docs-example-line a-docs-spacing">
    <div class="ph-1"><code>ph-1</code></div>
    <div class="pv-1"><code>pv-1</code></div>
    <div class="ph-2 pv-1">Warning: Cannot stack <code>ph-2 pv-1</code></div>
</div>
```

</PreviewAndCopyCode>

### Sided Margin and padding

<PreviewAndCopyCode>

```html
<div class="a-docs-example-column a-docs-spacing">
    <div class="mr-2"><code>mr-2</code></div>
    <div class="mb-05"><code>mb-05</code></div>
    <div class="mr-1 mb-2"><code>mr-1 mb-2</code></div>
    <div class="ml-2 mr-1"><code>ml-2 mr-1</code></div>
</div>
```

</PreviewAndCopyCode>

## Width and heights

All widths and heights are available with a 5% interval, from 0% to 100%.

<PreviewAndCopyCode>

```html
<div class="a-docs-example-column a-docs-spacing">
    <div class="w5"><code>w5</code></div>
    <div class="w10"><code>w10</code></div>
    <div class="w50"><code>w50</code></div>
    <div class="w100"><code>w100</code></div>
</div>

<div class="a-docs-example-line a-docs-spacing" style="height: 5em;">
    <div class="h50"><code>h50</code></div>
    <div class="h70"><code>h70</code></div>
    <div class="h100"><code>h100</code></div>
</div>
```

</PreviewAndCopyCode>