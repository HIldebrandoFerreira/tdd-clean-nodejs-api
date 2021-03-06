import { HttpRequest, HttpResponse } from './htt'

export interface Controller {
  handle (httpRequest: HttpRequest): HttpResponse
}
