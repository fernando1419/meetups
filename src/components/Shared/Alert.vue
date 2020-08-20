<template>
  <v-alert
    border="left"
    close-text="Close Alert"
    type="error"
    dark
    dismissible
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
