<template>
  <b-card no-body>
    <b-form @submit.stop.prevent="submit">
      <b-card-header>
        <span>Crud</span>
      </b-card-header>
      <b-card-body>
        <text-input label="Crud name" v-model="form.name" :errors="errors.name" v-on:input="form.name = $event"></text-input>
      </b-card-body>
      <b-card-footer>
        <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
        <b-button @click="$emit('cancel-button-clicked')">Cancel</b-button>
      </b-card-footer>
    </b-form>
  </b-card>
</template>

<script>
import ApiService from "@/applications/Common/ApiService";
import TextInput from "@/applications/Admin/components/form/TextInput";

export default {
  name: "Create",
  components: {TextInput, SelectInput},
  data() {
    return {
      selectOptions: [],
      form: {
        name: '',
        products: []
      },
      errors: []
    }
  },
  async mounted() {
    const products = await ApiService.get('/products')
    this.selectOptions = products.data.map(element => {
      return {value: element.id, text: element.name}
    })
  },
  methods: {
    async submit() {
      this.errors = []
      try {
        await ApiService.post('/crud', this.form)
        this.$emit('resource-created')
        this.toast('Resource created.')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors
          this.toast('Please check form errors.', 'danger')
        } else {
          this.toast('Something gone wrong.', 'danger')
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
