/* ==============
* Permission Actions
* ===============
*
* The actions available for the permission module
 */

import Vue from 'vue'
import * as types from './mutation-types'
import store from '@/store'
import Proxy from '@/proxies/PermissionProxy'
import PermissionTransformer from '@/transformers/PermissionTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new Proxy()

/**
 * Action fired when all permissions will be fetched.
 *
 * @param {function} commit Commit function to update the store.
 * @param {function} fn     Callback to edit the parameters on the proxy.
 */
const all = ({commit}, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      console.log(response)
      const data = {
        permissions: PermissionTransformer.fetchCollection(response.data),
        pagination: PaginationTransformer.fetch(response.pagination)
      }

      commit(types.ALL, data)
    })
}

/**
 * Action fired when an permission will be created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that will be created.
 */
const create = ({commit}, permission) => {
  const transformedPermission = PermissionTransformer.send(permission)

  proxy.create(transformedPermission)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Permission has been created!'
      })

      Vue.router.push({
        name: 'permissions.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be created'
      })
    })
}

/**
 * Action fired when an permission has been created.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that has been created.
 */
const created = ({commit}, permission) => {
  commit(types.CREATED, PermissionTransformer.fetch(permission))
}

/**
 * Action fired when an permission will be updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that will be updated.
 */
const update = ({commit}, permission) => {
  const transformedPermission = PermissionTransformer.send(permission)

  proxy.update(permission.id, transformedPermission)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Permission has been updated!'
      })

      Vue.router.push({
        name: 'permissions.show',
        params: {
          permissionId: permission.id
        }
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be updated'
      })
    })
}

/**
 * Action fired when an permission has been updated.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that has been updated.
 */
const updated = ({commit}, permission) => {
  commit(types.UPDATED, PermissionTransformer.fetch(permission))
}

/**
 * Action fired when an permission will be destroyed.
 *
 * @param {function} commit    Commit function to update the store.
 * @param {Object}   permissionId  The permission that will be destroyed.
 */
const destroy = ({commit}, permissionId) => {
  proxy.destroy(permissionId)
    .then(() => {
      store.dispatch('application/addAlert', {
        type: 'success',
        message: 'Permission has been destroyed!'
      })

      Vue.router.push({
        name: 'permissions.index'
      })
    })
    .catch(() => {
      store.dispatch('application/addAlert', {
        type: 'danger',
        message: 'The permission could not be destroyed'
      })
    })
}

/**
 * Action fired when an permission has been destroyed.
 *
 * @param {function} commit  Commit function to update the store.
 * @param {Object}   permission  The permission that has been destroyed.
 */
const destroyed = ({commit}, permission) => {
  commit(types.DESTROYED, PermissionTransformer.fetch(permission))
}

export default {
  all,
  create,
  created,
  update,
  updated,
  destroy,
  destroyed
}
