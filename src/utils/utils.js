let publicFunction = {
    //比较两个object 属性值的差别，并返回包含两者属性值有差别的新object;
    checkObjDataDifferent(obj1,obj2){
        let form = {};
        if(obj1){
            for(let attr in obj2){
            
                if(typeof obj2[attr] != 'obj' &&  obj1[attr] != obj2[attr]){
                    form[attr] = obj1[attr];
                    
                    form.isUpdate = 1;
                }{
                    if(!form.isUpdate){
                        form.isUpdate = 0;
                    }
                }
                if(attr == 'id'){
                    form.id = obj1[attr];
                }
            }
        }
        return form;
    },
}
export default publicFunction