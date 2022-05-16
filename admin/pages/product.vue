<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3" />
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium" />
            <h2 class="a-text-center">Add a new product</h2>

            <form>
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Title</label>
                <input type="text" class="a-input-text" style="width: 100%" />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Description</label>
                <textarea placeholder="Product description" style="width: 100%" />
              </div>

              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0">Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label for="" class="choosefile-button">
                    <i class="fal fa-plus" />
                  </label>
                  <input type="file" />
                  <p>Name of the photo</p>
                </div>
              </div>

              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text">Add product</span>
                  </span>
                </span>
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
export default {};
</script>
