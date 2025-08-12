import { Router } from "express";
import * as feesController from "./controllers/fees.js";

const feesRouter = Router();

feesRouter.post("/", feesController.addFees);
feesRouter.get("/", feesController.allFeesStructure);
feesRouter.delete("/:id", feesController.deleteFeeStructureByID);

/**
 * GET    /         => get all
 * POST   /         => insert
 * GET    /:id      => specific
 * PUT    /:id/edit => full update
 * PATCH  /:id/edit => partial update
 * DELETE /:id      => delete
 *
 */

export { feesRouter };
