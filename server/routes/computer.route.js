import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import computerCtrl from '../controllers/computer.controller';
import logger from "../../config/winston/get-default-logger";

const router = express.Router(); // eslint-disable-line new-cap

router.route('/filter')
  /** POST /api/computers/filter - Get computers list filtered */
  .post(computerCtrl.getListFiltered);

// router.route('/gpus')
//   .get(computerCtrl.getGpuList);

router.route('/initialize')
  .get(computerCtrl.getGpuList);

export default router;
