import httpStatus from 'http-status';
import db from '../../config/sequelize';
import logger from "../../config/winston/get-default-logger";
import {QueryTypes} from "sequelize";

const { Computer, Processor, Ram, Gpu } = db;

/**
 * Load computers list filtered
 */
function getListFiltered(req, res, next) {
  // Parse values from request body
  let ramFilter = Number.parseInt(req.body.ram);
  let gpuFilter = Number.parseInt(req.body.gpu);
  let processorFilter = Number.parseInt(req.body.processor);
  let computerFilter = req.body.computer || "";
  // Validate values
  ramFilter = Number.isInteger(ramFilter) && ramFilter >= 0 ? ramFilter : null;
  gpuFilter = Number.isInteger(gpuFilter) && gpuFilter >= 0 ? gpuFilter : null;
  processorFilter = Number.isInteger(processorFilter) && processorFilter >= 0 ? processorFilter : null;

  if (ramFilter || gpuFilter || processorFilter || (computerFilter && computerFilter.length)) {
    logger.info("PARSED");
    logger.info(ramFilter + " " + gpuFilter + " " + processorFilter + " " + computerFilter);
    logger.info("BODY");
    logger.info(req.body.ram + " " + req.body.gpu + " " + req.body.processor + " " + req.body.computer);

    let queryString = 'SELECT DISTINCT "Computers"."id" FROM "Computers" ' +
      ' LEFT OUTER JOIN "Processors" ON "Computers"."ProcessorId" = "Processors"."id" ' +
      ' LEFT JOIN ( ' +
      ' "RamsToComputers" INNER JOIN "Rams" ON "Rams"."id" = "RamsToComputers"."RamId" ' +
      ' ) ON "Computers"."id" = "RamsToComputers"."ComputerId" ' +
      ' LEFT OUTER JOIN "Gpus" ON "Computers"."GpuId" = "Gpus"."id" ';

    let whereString = ' WHERE "Computers"."id" > 0 ';
    let orderByString = ' ORDER BY "Computers"."id"';
    let queryParams = {};
    if (ramFilter) {
      whereString += ' AND "Rams"."id" = :ramFilter ';
      queryParams["ramFilter"] = ramFilter;
    }
    if (gpuFilter) {
      whereString += ' AND "Gpus"."id" = :gpuFilter ';
      queryParams["gpuFilter"] = gpuFilter;
    }
    if (processorFilter) {
      whereString += ' AND "Processors"."id" = :processorFilter';
      queryParams["processorFilter"] = processorFilter;
    }
    if (computerFilter) {
      whereString += ' AND ( UPPER("Computers"."model") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Processors"."model") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Processors"."manufacturer") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Gpus"."model") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Gpus"."manufacturer") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Gpus"."memoryType") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Rams"."model") LIKE UPPER(CONCAT(:computerFilter, \'%\')) OR ' +
        ' UPPER("Rams"."memoryType") LIKE UPPER(CONCAT(:computerFilter, \'%\')) )';
      queryParams["computerFilter"] = computerFilter;
    }



    db.sequelize.query(queryString + whereString + orderByString, {
      replacements: queryParams,
      type: QueryTypes.SELECT,
      raw: true
    }).then(computerIds => {
      let pcIds = computerIds.map(computer => computer.id);
      Computer.findAll({
        where: {
          id: pcIds
        },
        include: [Processor, Gpu]
      }).then(computers => {
        let pcsRams = computers.map(pc => pc.getRams());
        Promise.all(pcsRams).then(rams => {
          for (let i = 0; i < computers.length; i++) {
            computers[i].dataValues.Rams = rams[i];
          }
          res.json(computers)
        });
      });

    });

  } else {
    Computer.findAll({
      // include: [{ all: true }],
      include: [Processor, Gpu]
    })
      .then((computers) => {
        let pcsRams = computers.map(pc => pc.getRams());
        Promise.all(pcsRams).then(rams => {
          for (let i = 0; i < computers.length; i++) {
            computers[i].dataValues.Rams = rams[i];
          }
          res.json(computers)
        });

      })
      .catch((e) => {
        logger.error(e);
        next(e);
      });
  }
}

/**
 * Load Gpu list
 */
function getGpuList(req, res, next) {
  Promise.all([
    Gpu.findAll(),
    Processor.findAll(),
    Ram.findAll(),
    Computer.findAll({
      // include: [{ all: true }],
      include: [Processor, Gpu]
    })
  ])
    .then(result => {
      let computers = result[3];
      let pcsRams = computers.map(pc => pc.getRams());
      Promise.all(pcsRams).then(rams => {
        for (let i = 0; i < computers.length; i++) {
          computers[i].dataValues.Rams = rams[i];
        }
        res.json({gpus: result[0], processors: result[1], rams: result[2], computers: computers})
      });
    })
    .catch(err => {
      logger.error(err);
    });
}


export default {
  getListFiltered, getGpuList
};
