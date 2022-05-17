<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-spacing-top-medium" />
          <h2>Add a new owner</h2>
          <form>
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input
                type="text"
                class="a-input-text"
                style="width: 100%"
                v-model="name"
              />
            </div>

            <div class="a-spacing-top-medium">
              <label style="margin-bottom: 0">About</label>
              <textarea
                placeholder="Add a brief description"
                style="width: 100%"
                v-model="about"
              />
            </div>

            <div class="a-spacing-top-medium">
              <label style="margin-bottom: 0">Photo</label>
              <div class="a-row a-spacing-top-medium">
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input type="file" @change="handlePhotoInput" />
                </label>
                <div v-if="photo">
                  <p>{{ photo.name }}</p>
                </div>
              </div>
            </div>

            <hr />
            <div class="a-spacing-top-large">
              <button type="submit" class="a-button-register" @click="handleSubmit">
                <span class="a-button-inner">
                  <span class="a-button-text">Add owner</span>
                </span>
              </button>
            </div>
          </form>

          <br />
          <ul class="list-group">
            <li class="list-group-item" v-for="owner in owners" :key="owner._id">
              {{ owner.name }}
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
      const { owners } = await $axios.$get('http://localhost:3000/api/owners');

      return { owners };
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      name: '',
      about: '',
      photo: null,
    };
  },
  methods: {
    handlePhotoInput(e) {
      const [file] = e.target.files;

      this.photo = file;
    },
    async handleSubmit(e) {
      e.preventDefault();

      try {
        const { name, about, photo } = this;

        const data = new FormData();
        data.append('name', name);
        data.append('about', about);
        data.append('photo', photo, photo.name);

        const res = await this.$axios.$post('http://localhost:3000/api/owners', data);

        if (res.success) {
          const { owners } = await this.$axios.$get('http://localhost:3000/api/owners');

          this.owners = owners;
          this.name = '';
          this.about = '';
          this.photo = null;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
