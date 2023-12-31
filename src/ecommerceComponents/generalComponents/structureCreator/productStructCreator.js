//structure for product object
function structCreator(keys){
    if(!keys) return null;
    let keyArr=keys.split(', ');
    let count=keyArr.length;

    function constructor(){
        for(let i=0;i<count;i++){
            this[keyArr[i]]=arguments[i];
        }   
    }
    return constructor;
}

const productStruct= new structCreator("authentication, role");

export default productStruct;