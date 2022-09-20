<template>
  <div
    class="control d-flex padding--left--xs is-flex"
    style="justify-content: start; align-items: center; width: 100%;"
  >
    <div class="checkbox d-flex align-items--center">
      <input
        v-model="model"
        :id="checkboxID"
        :value="checkboxValue"
        type="checkbox"
        class="margin--right"
        style="transform: scale(1.5);"
      />
      <label class="checkbox" style="flex-grow: 1;" :for="checkboxID">
        {{ checkboxLabel }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkboxID: {
      type: String,
      required: true,
    },
    checkboxValue: {
      type: String,
      required: true,
    },
    checkboxLabel: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
