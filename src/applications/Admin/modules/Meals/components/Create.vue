<template>
  <b-card no-body>
    <b-form @submit.stop.prevent="submit">
      <b-card-header>
        <span>{{ config.labels.title }}</span>
      </b-card-header>
      <b-card-body>

        <text-input label="Meal name" v-model="form.name" :errors="errors.name" v-on:input="form.name = $event"
        ></text-input>

        <div class="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h4 class="text-dark font-weight-normal m-0">Products</h4>
          <a @click="form.products.push({product_id: null, weight: null})" class="btn btn-primary float-right">Add
            product</a>
        </div>

        <div
            class=""
            v-for="(input, index) in form.products"
            :key="`product-${index}`">
          <b-form-group>
            <div class="row">
              <select-input class="col-sm-6" v-model="form.products[index].product_id" :options="selectOptions"
                            :errors="errors['products.'+index+'.product_id']"
              ></select-input>
              <text-input class="col-sm-5" v-model="form.products[index].weight"
                          :errors="errors['products.'+index+'.weight']"
              ></text-input>
              <span class="h5 mt-2" v-b-tooltip.hover="{ variant: 'info' }" title="Remove">
                <b-icon-trash class="icon pointer" @click="form.products.splice(index, 1);"/>
              </span>
            </div>
          </b-form-group>
        </div>

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
import config from '../config'
import TextInput from "@/applications/Admin/components/form/TextInput";
import SelectInput from "@/applications/Admin/components/form/SelectInput";

export default {
  name: "Create",
  components: {TextInput, SelectInput},
  data() {
    return {
      config: config.create,
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
        await ApiService.post(config.url, this.form)
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
