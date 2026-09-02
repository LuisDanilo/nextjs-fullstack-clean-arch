import { type NextRequest,NextResponse } from 'next/server'

import { LOCALE_COOKIE } from '@/i18n/request'
import { detectLocale } from '@/i18n/routing'

export function proxy(request: NextRequest) {
  const cookieStore = request.cookies
  if (cookieStore.has(LOCALE_COOKIE)) {
    return NextResponse.next()
  }

  const locale = detectLocale(request.headers.get('accept-language'))
  const response = NextResponse.next()
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
