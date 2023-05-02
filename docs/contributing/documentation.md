---
title: How to use VitePress?
---

# {{ $frontmatter.title }}

[[toc]]

## Extensions for this project

### PreviewAndCopyCode component

This component allows to preview the sample code provided in the documentation, to be sure to keep them in sync.
Here is the output:

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
    <button class="a-btn a-primary">This is some HTML, cool!</button>
</div>
```

</PreviewAndCopyCode>


To use this component, write this markdown in the docs source:

````vue
Some markdown classique text

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
<button class="a-btn a-primary">This is some HTML, cool!</button>
</div>
```

</PreviewAndCopyCode>
````





## Random text

Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse molestiae sequi voluptate corporis unde odit, provident quam illo eum, consequuntur nulla laudantium incidunt harum, ratione praesentium veniam obcaecati ipsam tenetur?

## Available formats

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Markdown extensions

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click to view details
Oh waw
:::

```js{2}
console.log("Hello, VitePress!");
console.debug("this line is highlighted")
```
