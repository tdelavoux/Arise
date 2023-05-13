---
title: Notifications
---

# {{ $frontmatter.title }}

## Basic Usage

Throw a new notification with `new AriseNotification("Text to display", {Options})`

<PreviewAndCopyCode>

```html
<button id="basic-notification-button" class="a-btn a-primary">Notify Me</button>
```

```html
<script>
    document.getElementById('basic-notification-button').addEventListener("click", () => {
        new AriseNotification('Hey! You have been notified 😀');
    });
</script>
```

</PreviewAndCopyCode>


## Notifications Types


<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
    <button class="notification-button a-btn a-success" data-type="success" data-icon="😀">Success</button>
    <button class="notification-button a-btn a-secondary" data-type="secondary" data-icon="😉">Secondary</button>
    <button class="notification-button a-btn a-warning" data-type="warning" data-icon="🤨">Warning</button>
    <button class="notification-button a-btn a-danger" data-type="danger" data-icon="😱">Danger</button>
</div>
```

```html
<script>
    [...document.getElementsByClassName('notification-button')].forEach((el) => {
        el.addEventListener("click", (e) => {
            new AriseNotification(`${el.dataset.icon} I am a ${el.dataset.type} notification`, {
                type: el.dataset.type,
            });
        });
    });
</script>
```

</PreviewAndCopyCode>


### Notifications Options

Options should be passed to AriseNotification's constructor as Object (see exemple above)

| Name                  | Type    | Description                                                                                                 | Default Value |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | ------------- |
| clickToHide           | boolean | Allow to close notification clicking on it                                                                  | true          |
| autoHide              | boolean | Allow notification to close after delay                                                                     | true          |
| autoHideDelay         | integer | Delay to close auto notification (ms)                                                                       | 10000         |
| alignment             | string  | Position where notification will be display. Accept : `tl`, `tr`, `bl`, `br`                                | tr            |
| type                  | boolean | Notification type. Accept : `success`, `danger`, `info`, `warning`, `light`, `dark`, `primary`, `secondary` | success       |
| showAnimationTime     | integer | Timimg for appear animation                                                                                 | 400           |
| hideAnimationDuration | integer | Timimg for hide animations                                                                                  | 300           |
| htmlEnable            | boolean | Allow to display html in notification content                                                               | true          |
| customClass           | string  | Custom class to transform the notification                                                                  | null          |

### Overwrite Basic Configuration

Don't want to specify a basic configuration at every notification in your application ? You can overwrite the default values of every settings above.
Configure once, Enjoy all along 💪

```js
AriseNotification.setGlobalConfiguration({
    type: danger,
    clickToHide: false,
    autoHideDelay: 2000,
});
```

### Playground

<PreviewAndCopyCode>

```html
<div class="a-docs-example-line">
    <button id="custom-button" class="a-btn a-primary"
        data-text='<i class="fa-solid fa-tower-cell"></i> <b>CUSTOM NOTIFICATION HERE !</b> <br/><i class="fa-solid fa-arrow-right"></i> I will not close unless you click me <i class="fa-solid fa-arrow-left"></i>'>
        Custom notification
    </button>
</div>
```

```html
<script>
    document.getElementById('custom-button').addEventListener("click", (el) => {
        new AriseNotification(el.target.dataset.text, {
            autoHide: false,
            alignment: "br",
            customClass: "a-docs-custom-notification"
        });
    });
</script>
```

</PreviewAndCopyCode>


## Customize Wrappers

You may want to limit the number of notifications displayed on a single Wrapper overwriting the global config.

<div class="a-alert a-alert-warning" role="alert">
    Notifications use existant wrappers and create them if needed. Wrappers's global config need to be implemented before pushing the first notification in it.
</div>

```js
AriseNotificationWrapper.setGlobalConfig({
    maxElements: 5,
});
```
