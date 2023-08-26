import UserModel from '../Mongo/models/user.model.js'

class UserManagerDao {
    constructor() {
      this.UserModel = UserModel
    }

    async getUsers() {
      return await UserModel.find({})
    }

    async findById(userId) {
      return await UserModel.findById(userId)
    }

    async findByEmail(email) {
      return await UserModel.findOne({ email: email })
    }

    async create(data) {
      return await UserModel.create(data)
    }

    async createData(name, email, age, photo, password) {
      return await UserModel.create({name, email, age, photo, password})
    }

    async deleteUser(email) {
      return await UserModel.deleteOne({email: email})
    }

    async setColor(id, color) {
      return await UserModel.findByIdAndUpdate(
        id,
        { $set: { chatColor: color } },
        { new: true }
      )
    }

    async getColorById(id) {
      return await UserModel.findById(id).then(user => user?.chatColor)
    }

    async setCartId(email, cartId) {
      return await UserModel.findOneAndUpdate(
        { email: email },
        { cartId: cartId },
        { new: true }
      )
    }
}

export default UserManagerDao