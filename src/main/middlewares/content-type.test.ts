import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('Garantir como padrão o uso do json ', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
  test('Garantir que quando passar xml o conteudo retornado seja xml ', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })
    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
