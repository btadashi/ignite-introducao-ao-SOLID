import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) { }

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      /** Como há a possibilidade de vir uma array de string de
       * dentro do headers, então temos que garantir que vamos
       * recuperar apenas uma valor do tipo string vindo do headers
       */
      const userList = this.listAllUsersUseCase.execute({
        user_id: String(user_id),
      });

      return response.json(userList);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
