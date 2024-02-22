import { User, authenticator } from '@/core/config/auth/auth.server'
import { LoaderFunction, defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

const Index = () => {
  const data = useLoaderData<{ user: User }>()
  console.log('user', data.user)
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={data.user}>
            {(user: User) => {
              return (
                <>
                  <div>id: {user.id}</div>
                  <div>email: {user.email}</div>
                  <form action="signout" method="post">
                    <button>Signout</button>
                  </form>
                </>
              )
            }}
          </Await>
        </Suspense>
        <h1>Welcome to Remix</h1>
      </div>
    </>
  )
}
export default Index

export const loader: LoaderFunction = async ({ request }) => {
  const getUser = async () => {
    await wait(2000)
    return authenticator.isAuthenticated(request, {
      failureRedirect: '/signin',
    }) as Promise<User | null>
  }
  // const user = authenticator.isAuthenticated(request, {
  //   failureRedirect: '/signin',
  // }) as Promise<User | null>
  return defer({ user: getUser() })
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
