---
title: Spinners
---

# {{ $frontmatter.title }}

## Simple loading spinner

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
  <button class="mySpinnableButtons a-btn a-primary">Click me!</button>
  <button class="mySpinnableButtons a-btn a-secondary">No, me!</button>
  <button class="mySpinnableButtons a-btn a-light">Choose me!</button>
</div>

<script>
    document.querySelectorAll(".mySpinnableButtons").forEach(el => {
        const spinner = new AtomSpinnerElement(el)

        el.addEventListener('click', function () {
            spinner.spin('Please wait… ');
            setTimeout(() => spinner.stop(), 2000);
        });
    })
</script>
```

</PreviewAndCopyCode>

## Stop and update


<PreviewAndCopyCode>

```html
<div class="flex-column ai-c">
    <button id="loadUser" class="a-btn a-primary">Load a random user</button>
    <div id="imageHolder">The user will be here</div>
</div>

<script>
    const holder = document.getElementById('imageHolder');
    const spinner = new AtomSpinnerElement(holder)

    document.getElementById('loadUser').addEventListener('click', async function (ev) {
        spinner.spin('Please while we load the user… ');

        await new Promise(resolve => setTimeout(resolve, 1000)); // Artificial sleep

        try {
            const response = await fetch('https://randomuser.me/api/');
            const body = await response.json();
            const userData = body.results[0]

            spinner.stopAndUpdate(
            `<div>
                <img src="${userData.picture.large}"/>
                <h4 class="subtitle is-4">${userData.name.first}${userData.name.last}</h4>
            </div>`);
        } catch (err) {
            console.error(err);
            spinner.stopAndUpdate("Error when loading random user");
        }
    });
</script>
```

</PreviewAndCopyCode>
