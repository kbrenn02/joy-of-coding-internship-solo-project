import prisma from '@/prisma/client';

interface Props {
    params: {field: string}
}

const EditTask = async (idToEdit: number, newValue: any) => {
    try {
        const result = await prisma.task.update({
            where : {
                id : idToEdit
            },
            data : {
                status : newValue
            }
        })
        return result;
    } catch (error) {
        return error;
    }
    


}

export default EditTask