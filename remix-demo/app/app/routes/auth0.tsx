import { authenticator } from '@/core/config/auth/auth.server'
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'

export const loader: LoaderFunction = () => redirect('/signin')

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate('auth0', request)
}
