<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <c-table fixed bordered caption="Bordered Table" :items="user.all" :add="redirectToCreatePage"/>
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
        query: null,
        pageNumbers: [
          5,
          10,
          15
        ]
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
      }
    },
    /**
     * The methods which the page can use.
     */
    methods: {
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
          params: {userId: id}
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
    }
  }
</script>
