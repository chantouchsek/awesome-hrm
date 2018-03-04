/* ============
 * Permission Model
 * ============
 *
 * The model for a permission.
 */

import Model from './BaseModel'

class Permission extends Model {
  /**
   * Getter for the name of the permission.
   *
   * @returns {string} The name of the permission.
   */
  get fullName () {
    return `${this.name}`
  }
}

export default Permission
