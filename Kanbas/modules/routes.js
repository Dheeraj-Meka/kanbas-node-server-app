import * as dao from "./dao.js";

function ModuleRoutes(app) {
    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        const status = await dao.updateModule(mid, module);
        res.sendStatus(204);
      });    

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.sendStatus(200);
      });    

    app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    const new_module = await dao.createModule(newModule);
    res.send(newModule);
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const modules = await dao.findAllModules(cid);
    res.send(modules);
  });

}
export default ModuleRoutes;