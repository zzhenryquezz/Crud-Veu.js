export default {
    namespaced: true,
    state:{
        // global var with all students
        all:[]
    },
    mutations:{
        // add new subject to the global variable
        addNew(state: any, subjectsData: any){
            state.all.push(subjectsData);
        }
    },
    actions:{

    }
}