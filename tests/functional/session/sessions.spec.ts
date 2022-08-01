import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Sessions sessions', () => {
  test('It should be create a sessions', async ({ client, assert }) => {
    const user = await UserFactory.merge({ password: '123456' }).create()

    const response = await client.post('/sessions').json({ email: user.email, password: '123456' })

    response.assertStatus(201)
  })

  test('It should be return 400 when try to create a sessions with invalid password', async ({
    client,
    assert,
  }) => {
    const user = await UserFactory.create()

    const response = await client
      .post('/sessions')
      .json({ email: user.email, password: 'wrong-password' })

    response.assertBodyContains({
      errors: [{ message: 'E_INVALID_AUTH_PASSWORD: Password mis-match' }],
    })
  })
})
