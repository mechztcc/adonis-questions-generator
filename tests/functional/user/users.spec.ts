import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Users users', () => {
  test('Its should be return 409 when email already in use', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const anotherUser = { name: 'Usertest', email: user.email, password: '123456' }

    const response = await client.post('/users').json(anotherUser)

    response.assertBodyContains({
      code: 'BAD_REQUEST',
      message: 'E-mail already in use',
      status: 409,
    })
  })

  test('Its should be return 422 when password have no required min length', async ({
    client,
    assert,
  }) => {
    const user = { name: 'Usertest', email: 'email@email.com', password: '1234' }

    const response = await client.post('/users').json(user)

    response.assertBodyContains({
      errors: [
        {
          rule: 'minLength',
          field: 'password',
          message: 'minLength validation failed',
        },
      ],
    })
  })
})
