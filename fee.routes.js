import { Router } from "express";
import * as feesController from "./controllers/fees.js";

const feeStructureRouter = Router();

feeStructureRouter.get("/", feesController.allFeesStructure);
feeStructureRouter.post("/", feesController.addFees);
feeStructureRouter.put("/:id/edit", feesController.updateFeeStructureByID);
feeStructureRouter.delete("/:id", feesController.deleteFeeStructureByID);

export { feeStructureRouter };
