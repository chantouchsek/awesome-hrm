<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <div slot="header">
            <i class="fa fa-edit"></i> Users Table
            <div class="card-actions">
              <a href="#" class="btn btn-setting"><i class="icon-settings"></i></a>
              <b-btn class="btn btn-minimize" v-b-toggle.collapse1><i class="icon-arrow-up"></i></b-btn>
              <a href="#" class="btn btn-close"><i class="icon-close"></i></a>
              <b-link href="#/setting/users/create"><i class="icon-close"></i></b-link>
            </div>
          </div>
          <b-collapse id="collapse1" visible>
            <b-card-body>
              <b-table
                show-empty
                stacked="md"
                responsive="sm"
                :items="user.all"
                :fields="fields"
                :current-page="currentPage"
                :per-page="user.pagination.perPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                @filtered="onFiltered"
              >
                <template slot="status" slot-scope="data">
                  <b-badge
                    :variant="getBadge(row.item.status)">{{row.item.status}}
                  </b-badge>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination
                    :total-rows="user.pagination.totalCount"
                    :per-page="limit"
                    v-model="currentPage"
                    prev-text="Prev"
                    next-text="Next"
                    class="my-0"
                  ></b-pagination>
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Per page" class="mb-0">
                    <b-form-select
                      v-model="limit"
                      :options="pageNumbers"
                      class="mb-3"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import debounce from 'lodash.debounce'
  import cTable from '@/components/Table/Table'

  export default {
    /**
     * The name of the page.
     */
    name: 'users-table',
    /**
     * The data the page can use.
     *
     * @returns {Object} The data.
     */
    data () {
      return {
        fields: [
          { key: 'name' },
          { key: 'registered' }
        ],
        query: null,
        pageNumbers: [
          5,
          10,
          30,
          50,
          500
        ],
        sortBy: null,
        sortDesc: false,
        filter: null
      }
    },
    /**
     * The computed properties the page can use.
     */
    computed: {
      ...mapState('user', {
        user: state => state
      }),
      limit: {
        get () {
          return this.user.pagination.limit
        },
        set (limit) {
          this.setLimit(limit)
        }
      },
      currentPage: {
        get () {
          return this.user.pagination.currentPage
        },
        set (page) {
          this.setPage(page)
        }
      }
    },
    /**
     * The methods which the page can use.
     */
    methods: {
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        // this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      /**
       * Method used to get the user route.
       *
       * @param {Number} id The user identifier.
       *
       * @returns {Object} The user route.
       */
      getArtistRoute (id) {
        return {
          name: 'users.show',
          params: { userId: id }
        }
      },
      /**
       * Method used to redirect the user to the user create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'users.create'
        })
      },
      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },
      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('limit', limit)
            .removeParameter('page')
        })
      },
      /**
       * Method used to set the query of the search bar.
       * The results will be debounced using the lodash debounce method.
       */
      // eslint-disable-next-line
      setQuery: debounce(function (query) {
        this.$store.dispatch('user/all', (proxy) => {
          proxy.setParameter('q', query)
            .removeParameter('page')
        })
      }, 500)
    },
    /**
     * Available watchers for this page.
     */
    watch: {
      query (query) {
        this.setQuery(query)
      }
    },
    /**
     * The components that are being used.
     */
    components: {
      cTable
    },
    /**
     * This method will be fired once the application has been mounted.
     */
    mounted () {
      this.$store.watch((state) => {
        if (state.auth.authenticated) {
          this.$store.dispatch('user/all')
        }
      })
    }
  }
</script>
