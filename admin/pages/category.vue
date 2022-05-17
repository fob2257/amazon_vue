<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Add a new category</h2>
          <form>
            <div class="a-spacing-top-medium">
              <label>Type</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="type"
              />
            </div>

            <hr />
            <div class="a-spacing-top-large">
              <button type="submit" class="a-button-register" @click="handleSubmit">
                <span class="a-button-inner">
                  <span class="a-button-text">Add category</span>
                </span>
              </button>
            </div>
          </form>

          <br />
          <ul class="list-group">
            <li class="list-group-item" v-for="category in categories" :key="category._id">
              {{ category.type }}
            </li>
          </ul>
        </div>
        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const { categories } = await $axios.$get('http://localhost:3000/api/categories');

      return { categories };
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      type: '',
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      try {
        const { type } = this;

        const res = await this.$axios.$post('http://localhost:3000/api/categories', {
          type,
        });

        if (res.success) {
          const { categories } = await this.$axios.$get(
            'http://localhost:3000/api/categories'
          );

          this.categories = categories;
          this.type = '';
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
