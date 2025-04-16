type TData = { [key: string]: unknown } | unknown

export const responseHandle = (data:TData, errorMsg?:boolean)=>{
    if(errorMsg){
        return{
            message:data
        }
    }
    return {
        data:data,
    }
}