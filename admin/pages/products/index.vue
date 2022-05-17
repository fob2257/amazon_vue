<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium" />
            <h2 class="a-text-center">Add a new product</h2>

            <!-- <form @submit="handleSubmit"> -->
            <form>
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryId">
                  <option
                    v-for="category in categories"
                    :value="category._id"
                    :key="category._id"
                  >
                    {{ category.type }}
                  </option>
                </select>
              </div>

              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerId">
                  <option v-for="owner in owners" :value="owner._id" :key="owner._id">
                    {{ owner.name }}
                  </option>
                </select>
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Title</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="title"
                />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Price</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Stock quantity</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Description</label>
                <textarea
                  placeholder="Add a product description"
                  style="width: 100%"
                  v-model="description"
                />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="handlePhotoInput" />
                  </label>
                  <p>{{ photoName }}</p>
                </div>
              </div>

              <hr />
              <div class="a-spacing-top-large">
                <button type="submit" class="a-button-register" @click="handleSubmit">
                  <span class="a-button-inner">
                    <span class="a-button-text">Add product</span>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const [{ categories }, { owners }] = await Promise.all([
        $axios.$get('http://localhost:3000/api/categories'),
        $axios.$get('http://localhost:3000/api/owners'),
      ]);

      return { categories, owners };
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      title: '',
      description: '',
      price: 1,
      stockQuantity: 1,
      categoryId: null,
      ownerId: null,
      photo: null,
      photoName: '',
    };
  },
  methods: {
    handlePhotoInput(e) {
      const [file] = e.target.files;

      this.photo = file;
      this.photoName = file.name;
    },
    async handleSubmit(e) {
      e.preventDefault();

      try {
        const { title, description, price, stockQuantity, categoryId, ownerId, photo } =
          this;

        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('price', price);
        data.append('stockQuantity', stockQuantity);
        data.append('categoryId', categoryId);
        data.append('ownerId', ownerId);
        data.append('photo', photo, photo.name);

        await this.$axios.$post('http://localhost:3000/api/products', data);

        this.$router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
