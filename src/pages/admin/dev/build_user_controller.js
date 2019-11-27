import until from "../../../common/until";
export default function (tableName) {
    const controllerName = until.camelCase(tableName)
    const modelName = controllerName + 'Model'

    return `<?php
namespace app\\user\\controller;

use app\\common\\controller\\ApiController;
use app\\common\\model\\${modelName};

class ${controllerName} extends ApiController
{
    protected $noNeedAuth = '*';

    /**
     * @autowired
     * @var ${modelName}
     */
    protected $model;
}
    `
}