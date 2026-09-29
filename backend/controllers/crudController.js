export const asyncHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
const protectedFields = new Set(['id','createdAt','updatedAt']);
export const pickFields = (Model, body={}) => {
  const out={};
  for (const [key,value] of Object.entries(body)) if (Model.rawAttributes[key] && !protectedFields.has(key)) out[key]=value;
  return out;
};
export function crudController(Model, options={}) {
  const { order=[['createdAt','DESC']], include=[], whereBuilder } = options;
  return {
    getAll: asyncHandler(async(req,res)=>{
      const where=whereBuilder?whereBuilder(req):{};
      for(const [key,value] of Object.entries(req.query)) if(Model.rawAttributes[key] && value!==undefined && value!=='') where[key]=value;
      const items=await Model.findAll({where,order,include}); res.json(items);
    }),
    getOne: asyncHandler(async(req,res)=>{const item=await Model.findByPk(req.params.id,{include}); if(!item)return res.status(404).json({message:'Record not found.'}); res.json(item);}),
    create: asyncHandler(async(req,res)=>{const item=await Model.create(pickFields(Model,req.body)); res.status(201).json(item);}),
    update: asyncHandler(async(req,res)=>{const item=await Model.findByPk(req.params.id); if(!item)return res.status(404).json({message:'Record not found.'}); await item.update(pickFields(Model,req.body)); res.json(item);}),
    remove: asyncHandler(async(req,res)=>{const item=await Model.findByPk(req.params.id); if(!item)return res.status(404).json({message:'Record not found.'}); await item.destroy(); res.json({message:'Deleted successfully.',id:item.id});}),
  };
}
