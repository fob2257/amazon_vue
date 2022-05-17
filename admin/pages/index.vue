<template>
  <main>
    <div class="a-spacing-large" />
    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">All products</h1>
          <div class="a-spacing-large" />
          <nuxt-link to="/products" class="a-button-buy-again" style="margin-right: 10px">
            Add a new product
          </nuxt-link>
          <nuxt-link to="/category" class="a-button-history margin-right-10">
            Add a new category
          </nuxt-link>
          <nuxt-link to="/owner" class="a-button-history margin-right-10">
            Add a new owner
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="a-spacing-large" />
    <div class="container-fluid browsing-history">
      <div class="row">
        <div
          class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb"
          v-for="(product, idx) in products"
          :key="product._id"
        >
          <div class="history-box">
            <a href="#" class="a-link-normal">
              <img :src="product.photo" alt="" class="img-fluid" />
            </a>

            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{ product.title }}</div>
              </span>
            </div>

            <div class="a-row">
              <a href="#">
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
                <i class="fas fa-star" />
              </a>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-smal asin-reviews">(1780)</span>
            </div>

            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">${{ product.price }}</span>
              </span>
            </div>

            <div class="a-row">
              <nuxt-link
                :to="`/products/${product._id}`"
                class="a-button-history margin-right-10"
              >
                Update
              </nuxt-link>
              <button
                class="a-button-history margin-right-10"
                @click="handleDeleteProduct(product._id, idx)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const { products } = await $axios.$get('http://localhost:3000/api/products');

      return {
        products,
      };
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async handleDeleteProduct(id, idx) {
      try {
        const res = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`);

        if (res.success) {
          this.products.splice(idx, 1);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
