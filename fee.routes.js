import { Router } from "express";
import * as feesController from "./controllers/fees.js";

const feesRouter = Router();

feesRouter.post("/", feesController.addFees);
feesRouter.get("/", feesController.allFeesStructure);

/**
 * GET   /         => get all
 * POST  /         => insert
 * GET   /:id      => specific
 * PUT   /:id/edit => full update
 * PATCH /:id/edit => partial update
 * DELET /:id      => delete
 *
 */

export { feesRouter };
