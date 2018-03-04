<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <c-table fixed bordered caption="Bordered Table" :items="permission.all" :add="redirectToCreatePage" />
      </b-col><!--/.col-->
    </b-row><!--/.row-->
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import debounce from 'lodash.debounce'
  import cTable from '@/components/Table/Table'

  export default {
    name: 'permission-table',
    components: {
      cTable
    },

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
      ...mapState('permission', {
        permission: state => state
      }),
      limit: {
        get () {
          return this.permission.pagination.limit
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
       * Method used to get the artist route.
       *
       * @param {Number} id The artist identifier.
       *
       * @returns {Object} The artist route.
       */
      getArtistRoute (id) {
        return {
          name: 'permissions.show',
          params: {permissionId: id}
        }
      },

      /**
       * Method used to redirect the user to the artist create page.
       */
      redirectToCreatePage () {
        this.$router.push({
          name: 'Permissions.Create'
        })
      },

      /**
       * Method used to go to a different page.
       *
       * @param {Number} page The page number.
       */
      setPage (page) {
        this.$store.dispatch('permission/all', (proxy) => {
          proxy.setParameter('page', page)
        })
      },

      /**
       * Method used to set the limit of the items being displayed.
       *
       * @param {Number} limit The limit of items being displayed.
       */
      setLimit (limit) {
        this.$store.dispatch('permission/all', (proxy) => {
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
        this.$store.dispatch('permission/all', (proxy) => {
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
    }

  }
</script>
