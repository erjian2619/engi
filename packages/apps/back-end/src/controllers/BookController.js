import { Controller, RequestMapping, RequestMethod } from "../utils/decorators";

@Controller("/book")
export default class BookController {
  @RequestMapping(RequestMethod.GET, "/all")
  async getAllBooks(ctx) {
    console.log("getAllBooks");
    await setTimeout(() => {}, 500);
    ctx.body = { books: [{ id: 1, name: 'book1' }] };
  }
}
