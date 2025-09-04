import { initServer } from "./app";
async function init() {
  const app = await initServer();
  app.listen(8080,()=>console.log("server is start on port 8080"))
  
}
init()