import { destroySession, getSession } from '@/core/config/auth/auth.server'
import { Auth } from '@/core/constants'
import { ActionFunction, redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  console.log(Auth)
  const logoutURL = new URL(Auth.AUTH0_LOGOUT_URL)
  logoutURL.searchParams.set('client_id', Auth.AUTH0_CLIENT_ID)
  logoutURL.searchParams.set('returnTo', Auth.AUTH0_RETURN_TO_URL)
  return redirect(logoutURL.toString(), {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
