<template>
  <b-form-group :label="label">
    <b-form-input
        @input="$emit('input', $event)"
        :value="value"
        :type="type"
    ></b-form-input>
    <span v-if="errors" class="errors">{{ errors[0] }}</span>
    <b-form-text v-if="hint">{{ hint }}</b-form-text>
  </b-form-group>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    value: {
      type: String,
      default: null
    },
    errors: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
  },
}
</script>
<style scoped>
.errors {
  font-size: 80%;
  color: red;
}
</style>
