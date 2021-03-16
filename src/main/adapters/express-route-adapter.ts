import { Controller, HttpRequest } from '../../presentations/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httRequest: HttpRequest = {
      body: req.body
    }
    const httResponse = await controller.handle(httRequest)
    res.status(httResponse.statusCode).json(httResponse.body)
  }
}
