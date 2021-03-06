import { HttpResponse } from '../protocols/htt'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
