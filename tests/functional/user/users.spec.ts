import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Users users', () => {
  test('Its should be return 409 when email already in use', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const anotherUser = { name: 'Usertest', email: user.email, password: '123456' }

    const response = await client.post('/users').json(anotherUser)
    console.log(response.body())
    const body = response.body()

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'E-mail already in use' })
  })
})
