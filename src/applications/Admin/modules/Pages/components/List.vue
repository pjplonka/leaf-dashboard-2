<template>
  <b-card no-body>
    <b-card-header>
      <span>Pagess</span>
      <a @click="$emit('create-button-clicked')" class="float-right" style="cursor:pointer;">Add new page</a>
    </b-card-header>
    <b-card-body>
      <b-table borderless :items="items" :fields="this.fields" thStyle="{color: 'red'}">
        <template #cell(actions)="data">
          <span class="mr-3" v-b-tooltip.hover="{ variant: 'info' }" title="Edit">
            <b-icon-pencil class="icon pointer" @click="$emit('edit-button-clicked', data.item.id)"/>
          </span>
          <span class="mr-3" v-b-tooltip.hover="{ variant: 'info' }" title="Remove">
            <b-icon-trash class="icon pointer" @click="remove(data.item.id)"/>
          </span>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import Edit from "./Edit";
import ApiService from "@/applications/Common/ApiService";

export default {
  name: "List",
  components: {Edit},
  data() {
    return {
      items: [],
      fields: [
        {'key': 'id', 'label': 'ID'},
        {'key': 'name', 'label': 'Name'},
        {'key': 'calories'},
        {'key': 'actions', 'label': 'Actions'}
      ]
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async remove(id) {
      if (confirm("Are you sure?")) {
        try {
          await ApiService.delete('/crud/' + id)
          this.$emit('resource-created')
          this.toast('Resource removed.')
          this.load()
        } catch (error) {
          this.toast('Something gone wrong.', 'danger')
        }
      }
    },
    async load() {
      // const resources = await ApiService.get('/pages');
      const data = await ApiService.get('http://127.0.0.1:8000/api/pages')
console.log(data)
      this.items = resources.data
    }
  }
}
</script>

<style lang="scss">
tr td {
  border-bottom: 1px solid #eaeaea !important;
}

tr th {
  font-size: 80%;
  text-transform: uppercase;
  color: #bcc0c5;
  border-bottom: 1px solid #eaeaea !important;
}

.icon:hover {
  color: grey;
}
</style>
