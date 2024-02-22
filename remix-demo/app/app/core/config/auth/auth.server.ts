import { Auth } from '@/core/constants'
import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { Auth0Strategy } from 'remix-auth-auth0'

export type User = {
  id: string
  email: string
}

// ユーザーのEmailアドレスを受け取り返すだけのサンプル関数
export const login = async (id: string, email: string) => {
  return { id, email } satisfies User
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_remix_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['SECRETS'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const authenticator = new Authenticator(sessionStorage)

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: Auth.AUTH0_CALLBACK_URL,
    clientID: Auth.AUTH0_CLIENT_ID,
    clientSecret: Auth.AUTH0_CLIENT_SECRET,
    domain: Auth.AUTH0_DOMAIN,
  },
  async ({ profile }) => {
    // profileにAuth0のプロフィール情報が返ってきます
    // console.log(profile)
    //
    // 返ってきた情報を利用してDBへ書き込むなどの処理
    // 加工するなどの処理を入れる
    //
    // 今回はユーザーのEmailアドレスを返す関数を返すのみ
    const id = profile.id ?? ''
    const email = profile.emails ? profile.emails[0].value : ''
    return await login(id, email)
  },
)

authenticator.use(auth0Strategy)

export const { getSession, commitSession, destroySession } = sessionStorage
