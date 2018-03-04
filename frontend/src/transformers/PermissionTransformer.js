/* ============
 * Permission Transformer
 * ============
 *
 * The transformer for a permission.
 */

import Transformer from './BaseTransformer'
import Permission from '@/models/Permission'

class PermissionTransformer extends Transformer {
  /**
   * Method used to transform a fetched permission.
   *
   * @returns {Permission} An permission model.
   */
  static fetch (permission) {
    return new Permission({
      id: permission.id,
      name: permission.name
    })
  }

  /**
   * Method used to transform a send permission.
   *
   * @returns {Object} The transformed permission.
   */
  static send (permission) {
    return {
      id: permission.id,
      name: permission.name
    }
  }
}

export default PermissionTransformer
