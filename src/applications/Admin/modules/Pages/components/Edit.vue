<template>
  <b-card no-body>
    <b-form @submit.stop.prevent="submit">
      <b-card-header>
        <span>Edit page</span>
      </b-card-header>
      <b-card-body>
        <text-input v-model="form.title" :errors="errors.title" v-on:input="form.title = $event"></text-input>
        <text-input v-model="form.content" :errors="errors.content" v-on:input="form.content = $event"></text-input>
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
import SelectInput from "@/applications/Admin/components/form/SelectInput";

export default {
  name: "Edit",
  components: {TextInput, SelectInput},
  props: ['id'],
  data() {
    return {
      selectOptions: [],
      form: {
        title: '',
        content: '',
      },
      errors: []
    }
  },
  async mounted() {
    const resource = await ApiService.get('/pages/' + this.id)
    this.form = resource.data
  },
  methods: {
    async submit() {
      this.errors = [];
      try {
        await ApiService.put('pages/' + this.id, this.form)
        this.$emit('resource-updated')
        this.toast('Resource saved.')
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
