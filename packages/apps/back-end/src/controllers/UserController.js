
import { Controller, RequestMapping, RequestMethod } from '../utils/decorators'

@Controller('/user')
export default class UserController {
  @RequestMapping(RequestMethod.GET, "/all")
  async getAllUsers() {
    return "get all users";
  }

  @RequestMapping(RequestMethod.GET, "/:id")
  async getUserById() {
    return "get user by id";
  }

  @RequestMapping(RequestMethod.POST, "/")
  async createUser() {
    return "create user";
  }
}
