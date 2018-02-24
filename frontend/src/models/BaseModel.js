/* =============
* Base Model
* =============
*
* The BaseModel for the rest of the models
*/

class BaseModel {
  /**
   * The constructor for base model
   *
   * @param {Object} data Teh properties which are publicly accessible
   */

  constructor (data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key]
    })
  }
}

export default BaseModel
