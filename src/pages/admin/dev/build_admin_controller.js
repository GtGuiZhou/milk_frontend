import until from "../../../common/until";
export default function (tableName) {
    const controllerName = until.camelCase(tableName)
    const modelName = controllerName + 'Model'

    return `<?php
namespace app\\admin\\controller;

use app\\common\\controller\\ApiController;
use app\\common\\model\\${modelName};
use app\\common\\traits\\AdminCrudTrait;

class ${controllerName} extends ApiController
{
    use AdminCrudTrait;
    protected $noNeedAuth = '*';

    /**
     * @autowired
     * @var ${modelName}
     */
    protected $model;
}
    `
}