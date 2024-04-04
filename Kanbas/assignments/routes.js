import db from "../Database/index.js";
function AssignmentRoutes(app) {
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(assignment);
        res.send(assignment);
    });
    app.delete("/api/assignments/:aid", (req, res) => {
        const { id } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== id);
        res.sendStatus(200);
    });
    app.put("/api/assignments/:aid", (req, res) => {
        const { id } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === id);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
}
export default AssignmentRoutes;