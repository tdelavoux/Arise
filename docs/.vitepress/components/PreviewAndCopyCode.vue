<template>
  <div class="preview" ref="preview"></div>

  <details class="details custom-block">
    <summary>Click to view and copy code</summary>
    <div class="code" ref="code">
      <slot />
    </div>
  </details>
</template>

<script>
export default {
  setup() {
    // expose to template and other options API hooks
    return {
      setupHtmlAndJs() {
        this.$refs.preview.innerHTML =
          [... this.$refs.code.querySelectorAll("code")]
            .map(el => el.textContent.replaceAll(/\>\s+\</gm, "><"))
            .join("");

        for (const script of this.$refs.preview.querySelectorAll("script")) {
          eval(script.textContent);
        }

        window.document.dispatchEvent(new Event("AriseDocumentationSetupListeners"));
      },
    };
  },
  async mounted() {
    console.info("[PREVIEW] Loading built Arise JS");
    await import("../../../dist/latest/js/arise-all.min.js");
    console.info("[PREVIEW] Arise JS loaded");

    this.setupHtmlAndJs();
  },
  updated() {
    this.setupHtmlAndJs();
  },
};
</script>
