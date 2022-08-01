import { test } from '@japa/runner'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

test.group('Sessions sessions', () => {
  test('It should be create a sessions', async ({ client, assert }) => {
    const user = await UserFactory.merge({ password: '123456' }).create()

    const response = await client.post('/sessions').json({ email: user.email, password: '123456' })

    response.assertStatus(201)
  })
})
