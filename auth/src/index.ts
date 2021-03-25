import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {errorHandler} from './middleware/error-handler'
import {RouteNotFoundError} from './errors/route-notfound-error'

const app =express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed:false,
    secure: true
  })
)

const PORT = 3000

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)
app.all('*', async (req, res) => {
    throw new RouteNotFoundError();
  });

const start = async ()=>{
  if (!process.env.JWT_KEY){
    throw new Error('JWT_KEY not defined')
  }
  try{
    await mongoose.connect('mongodb://auth-mongo-serv:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log('Connect to MongoDB!')
  }
  catch(err){
    console.error(err)
  }
  app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}. Hola!`)
})
}
start();

