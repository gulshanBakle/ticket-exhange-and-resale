import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import {currentUserRouter} from './routes/current-user'
import {signinRouter} from './routes/signin'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {errorHandler} from './middleware/error-handler'
import {RouteNotFoundError} from './errors/route-notfound-error'

const app =express()
app.use(json())

const PORT = 3000

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(errorHandler)
app.all('*', async (req, res) => {
    throw new RouteNotFoundError();
  });


app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}. Hola!`)
})