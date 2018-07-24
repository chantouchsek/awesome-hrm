<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-form @submit.prevent="login">
        <b-row class="justify-content-center">
          <b-col md="8">
            <b-card-group>
              <b-card no-body class="p-4">
                <b-card-body>
                  <h1>ログイン</h1>
                  <b-form-group id="labelStaffId"
                                label="スタッフID"
                                label-for="staffId">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input id="staffId"
                                    v-model.trim="user.username"
                                    type="text"
                                    placeholder=""
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group id="labelPassword"
                                label="パスワード"
                                label-for="staffPassword">
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input id="staffPassword"
                                    v-model.trim="user.password"
                                    type="password"
                                    placeholder=""
                      ></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" type="submit">ログイン</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0" @click.prevent="getSelfResetPasswordRoute">
                        パスワード忘れた場合?
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * The name of the page
     */
    name: 'login-page',

    /**
     * The data of the page can use
     *
     * @return {Object} The data
     */
    data () {
      return {
        user: {
          username: null,
          password: null
        }
      }
    },

    /**
     * The methods of the page can be used
     */

    methods: {
      /**
       * Method can be used to login the user
       */

      login () {
        this.$store.dispatch('auth/login', this.user)
      },

      removeAlert (alert) {
        this.$store.dispatch('application/removeAlert', alert)
      },

      /**
       * Method used to get the user resetting password route.
       *
       * @returns {Object} The user route.
       */
      getSelfResetPasswordRoute () {
        this.$router.push({
          name: 'PasswordEmail'
        })
      }
    }
  }
</script>
