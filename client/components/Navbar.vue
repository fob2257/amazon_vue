<template>
  <div>
    <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
      <div class="container-fluid desktop-nav">
        <div class="row">
          <div class="col-sm-2">
            <div class="logo-area">
              <nuxt-link to="/">
                <img src="/img/logo.png" alt="Logo" class="img-fluid" />
              </nuxt-link>
            </div>
          </div>

          <div class="col-sm-6 pt-0">
            <SearchBar />
          </div>

          <div class="col-sm-4" />
        </div>

        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 pl-2">
            <div class="nav-global-location">
              <nuxt-link to="/address" class="nav-a nav-a-2">
                <div class="nav-sprite" id="nav-packard-glow-loc-icon" />
                <div id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1">Deliver to</span>
                  <template v-if="$auth.loggedIn">
                    <span class="nav-line-2" id="glow-ingress-line2">
                      {{ $auth.$state.user.address.city }}
                    </span>
                  </template>
                  <span v-else class="nav-line-2" id="glow-ingress-line2">
                    California
                  </span>
                </div>
              </nuxt-link>
            </div>
          </div>

          <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 p-0">
            <div class="nav-fill">
              <div class="nav-shop">
                <nuxt-link to="/history" class="nav-a nav-a-2 nav-single-row-link">
                  <span class="nav-line-2">
                    Browsing history
                    <span class="nav-icon nav-arrow" style="visibility: visible" />
                  </span>
                </nuxt-link>
              </div>

              <div class="nav-xshop-container">
                <div class="nav-xshop">
                  <a href="#" class="nav-a">Today's deals</a>
                  <a href="#" class="nav-a">Your amazon.com</a>
                  <a href="#" class="nav-a">Gift cards</a>
                  <a href="#" class="nav-a">Registry</a>
                  <a href="#" class="nav-a">Sell</a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4 p-0">
            <div class="nav-tools">
              <a href="#" id="icp-nav-flyout" class="nav-a nav-a-2 icp-link-style-2">
                <span class="icp-nav-link-inner">
                  <span class="nav-line-1">
                    <span class="icp-nav-globe-img-2" />
                    <span class="icp-nav-language">EN</span>
                  </span>
                  <span class="nav-line-2">
                    &nbsp;
                    <span class="nav-icon nav-arrow" style="visibility: visible" />
                  </span>
                </span>
              </a>

              <span class="icp-nav-link-border" />

              <template v-if="$auth.loggedIn">
                <nuxt-link
                  to="/profile"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello,</span>
                  <span class="nav-line-2">
                    {{ $auth.$state.user.name }}
                  </span>
                </nuxt-link>
              </template>

              <template v-else>
                <nuxt-link
                  to="/signin"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello, Sign in</span>
                  <span class="nav-line-2">
                    Account &amp; Lists
                    <span class="nav-icon nav-arrow" style="visibility: visible" />
                  </span>
                </nuxt-link>
              </template>

              <nuxt-link
                to="/orders"
                class="nav-a nav-a-2 nav-single-row-link"
                tabindex="1"
              >
                <span class="nav-line-1" />
                <span class="nav-line-2">Orders</span>
              </nuxt-link>

              <nuxt-link to="/cart" class="nav-a nav-a-2" id="nav-cart" tabindex="2">
                <span aria-hidden="true" class="nav-line-1" />
                <span aria-hidden="true" class="nav-line-2">Cart</span>
                <span class="nav-cart-icon nav-sprite" />
                <span
                  id="nav-cart-count"
                  aria-hidden="true"
                  class="nav-cart-count nav-cart-0"
                >
                  0
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
};
</script>
