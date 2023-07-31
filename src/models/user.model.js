import { model, Schema, Types } from 'mongoose'

const collection = 'users'

const userSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, default: 'default.jpg' },
  email: { type: String, unique: true, index: true },
  age: { type: Number },
  role: { type: String, default: 'PUBLIC' },
  password: { type: String, required: true },
  cartId: { type: Types.ObjectId, ref: 'carts', default: null }
})

const UserModel = model(collection, userSchema)

export default UserModel