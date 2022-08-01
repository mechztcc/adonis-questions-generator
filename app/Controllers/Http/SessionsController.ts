import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateSessionsValidator)

    const token = await auth
      .use('api')
      .attempt(payload.email, payload.password, { expiresIn: '2hours' })

		return response.created({ user: auth.user, token: token })
  }
}
