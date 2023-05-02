---
title: Colors
---

# {{ $frontmatter.title }}

## Background colors

<PreviewAndCopyCode>

```html
<div class="a-bg-primary bg-square"></div>
<div class="a-bg-secondary bg-square"></div>
<div class="a-bg-light bg-square"></div>
<div class="a-bg-dark bg-square"></div>
<div class="a-bg-warning bg-square"></div>
<div class="a-bg-danger bg-square"></div>
<div class="a-bg-info bg-square"></div>
```

</PreviewAndCopyCode>

## Custom colors

All elements colors might be overwrited by changing Atom css var but be aware this action will influence all of the components sharing same type (primary, secondary ... etc).

Please, check the [Customize section](../advanced/customize) for more informations

<<< @/../src/css/_variables.scss{css}
