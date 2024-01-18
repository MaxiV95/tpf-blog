// user.test.model.ts
import { Schema } from 'mongoose';
import { UserSchema } from '../user.schema';

const userTestSchema = new Schema(UserSchema.obj);

userTestSchema.methods.toJSON = UserSchema.methods.toJSON.bind(userTestSchema);

const userTestModel = {
  name: 'UserTest',
  schema: userTestSchema,
};

export default userTestModel;
