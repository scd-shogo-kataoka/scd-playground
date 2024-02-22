import { authenticator } from '@/core/config/auth/auth.server'
import { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/',
    failureRedirect: '/signin',
  })
}
