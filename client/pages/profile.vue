<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Profile page</h2>
          <a href="#" @click="onLogout">Logout</a>

          <form>
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="name"
                :placeholder="$auth.user.name"
              />
            </div>

            <div class="a-spacing-top-medium">
              <label>Email</label>
              <input
                type="email"
                class="a-input-text"
                style="width: 100%"
                v-model="email"
                :placeholder="$auth.user.email"
              />
            </div>

            <div class="a-spacing-top-medium">
              <label>Password</label>
              <input
                type="password"
                class="a-input-text"
                style="width: 100%"
                v-model="password"
              />
            </div>

            <hr />

            <div class="a-spacing-top-large">
              <button type="submit" class="a-button-register" @click="handleSubmit">
                <span class="a-button-inner">
                  <span class="a-button-text">Update profile</span>
                </span>
              </button>
            </div>
          </form>

          <br />
        </div>
        <div class="col-sm-3" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();

      try {
        const { name, email, password } = this;

        const res = await this.$axios.$put('/api/auth', { name, email, password });

        if (res.success) {
          await this.$auth.fetchUser();

          this.name = '';
          this.email = '';
          this.password = '';
        }
      } catch (error) {
        console.error(error);
      }
    },
    async onLogout() {
      await this.$auth.logout();
    },
  },
};
</script>
