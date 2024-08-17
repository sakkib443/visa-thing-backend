import { User } from "./user.model"



// Admin Id 
export const findLastAdminId = async():Promise<string|undefined>=>{
    const lastAdmin = await User.findOne({role:'admin'},{id:1,_id:0})
    .sort({
        createdAt:-1,
    })
    .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2):undefined;
};

// generate admin ID 
export const generateAdminId =  async (): Promise<string>=>{
    const currentId =(await findLastAdminId())|| (0).toString().padStart(5,'0');
    let incrementedId = (parseInt(currentId)+1).toString().padStart(5,'0');
    incrementedId = `A-${incrementedId}`;

    return incrementedId;
}


// Customer Id 
export const findLastCustomerId = async():Promise<string|undefined>=>{
    const lastCustomer = await User.findOne({role:'customer'},{id:1,_id:0})
    .sort({
        createdAt:-1,
    })
    .lean();

    return lastCustomer?.id ? lastCustomer.id.substring(2):undefined;
};

// generate Customer ID 
export const generateCustomerId =  async (): Promise<string>=>{
    const currentId =(await findLastCustomerId())|| (0).toString().padStart(5,'0');
    let incrementedId = (parseInt(currentId)+1).toString().padStart(5,'0');
    incrementedId = `C-${incrementedId}`;

    return incrementedId;
}