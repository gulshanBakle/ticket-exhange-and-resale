import mongoose from 'mongoose'
import { Password } from '../services/password';

//Define attributes a user can have using a ts interface
interface UserAttr{
    email:string;
    password: string
}

//interface that describes user model
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttr): UserDoc;
}


//An interface that describes user document props
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
}

//create user schema in mongoose:
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });


userSchema.statics.build = (attrs:UserAttr)=>{
    return new User(attrs)
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export {User};