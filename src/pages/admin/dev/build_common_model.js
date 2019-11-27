import until from "../../../common/until";
export default function (tableName) {
    const modelName = until.camelCase(tableName) + 'Model'

    return `<?php
namespace app\\common\\model;



class ${modelName} extends BaseModel
{
    protected $table = '${tableName}';
   
}
    `
}