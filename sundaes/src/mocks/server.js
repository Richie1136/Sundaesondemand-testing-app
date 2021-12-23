import { setupServer, SetupServer } from "msw/node";
import { handlers } from "./handlers";


// This configures a request mocking server with the given response

export const server = setupServer(...handlers)




