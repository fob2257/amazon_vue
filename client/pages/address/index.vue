<template>
  <!--MAIN-->
  <main>
    <!--REGISTER ADDRESS-->
    <div class="registerAddress mt-3">
      <div class="container-fluid c-section">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-10">
            <div class="a-section a-spacing-medium">
              <div class="a-subheader a-breadcrumb a-spacing-small">
                <ul>
                  <li>
                    <a href="#">
                      <span>Your Account</span>
                    </a>
                  </li>
                  <li class="a-breadcrumb-divider">›</li>
                  <li class="active">
                    <a href="#">
                      <span>Your Adresses</span>
                    </a>
                  </li>
                </ul>
              </div>
              <h1 class="a-spacing-medium a-spacing-top-medium">Your Addresses</h1>
              <!-- Message from Server -->
              <div class="a-section a-spacing-none a-spacing-top-small" v-if="message">
                <b>{{ message }}</b>
              </div>
              <div class="a-spacing-double-large">
                <div class="row a-spacing-micro">
                  <div class="col-lg-4 col-md-5 col-sm-12 pb-2">
                    <nuxt-link
                      to="/address/add"
                      class="a-link-normal add-new-address-button"
                      style="text-decoration: none"
                    >
                      <div class="a-box first-desktop-address-tile">
                        <div class="a-box-inner a-padding-extra-large">
                          <i class="far fa-plus"></i>
                          <h2 class="a-color-tertiary">Add Address</h2>
                        </div>
                      </div>
                    </nuxt-link>
                  </div>
                  <!-- Address -->
                  <div class="col-lg-4 col-md-4 col-sm-12 pl-md-0 pb-2">
                    <div
                      class="a-box a-spacing-none normal-desktop-address-tile"
                      v-for="(address, idx) in addresses"
                      :key="address._id"
                    >
                      <div class="a-box-inner a-padding-none">
                        <div class="address-section-no-default">
                          <div class="a-spacing-small">
                            <ul class="a-unordered-list a-nostyle a-vertical">
                              <li>
                                <h5>
                                  <!-- Address Fullname -->
                                  <b>{{ address.fullName }}</b>
                                </h5>
                              </li>
                              <!-- Address street address -->
                              <li>{{ address.streetAddress }}</li>
                              <!-- Address city state zip code -->
                              <li>
                                {{ address.city }}, {{ address.state }}
                                {{ address.zipCode }}
                              </li>
                              <!-- Address country -->
                              <li>{{ address.country }}</li>
                              <!-- Address Phone number -->
                              <li>Phone number: {{ address.phoneNumber }}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="edit-address-desktop-link">
                        <nuxt-link
                          :to="`/address/${address._id}`"
                          class="a-button-history margin-right-10"
                        >
                          Edit
                        </nuxt-link>
                        &nbsp; | &nbsp;
                        <!-- Delete Button -->
                        <a href="#" @click="handleDeleteAddress(address._id, idx)">
                          Delete
                        </a>
                        &nbsp; | &nbsp;
                        <!-- Set Address as Default -->
                        <a href="#" @click="handleSetDefault(address._id)">
                          Set as Default
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-3 col-sm-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/REGISTER ADDRESS-->
  </main>
  <!--/MAIN-->
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData({ $axios }) {
    try {
      const { addresses } = await $axios.$get('/api/addresses');

      return { addresses };
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    async handleSetDefault(id) {
      try {
        const res = await this.$axios.$put('/api/addresses/set/default', { address: id });

        if (res.success) {
          this.message = res.message;
        }
      } catch (error) {
        this.message = res.message;
        console.error(error);
      }
    },
    async handleDeleteAddress(id, idx) {
      try {
        const res = await this.$axios.$delete(`/api/products/${id}`);

        if (res.success) {
          this.addresses.splice(idx, 1);
        }
      } catch (error) {
        this.message = res.message;
        console.error(error);
      }
    },
  },
};
</script>
