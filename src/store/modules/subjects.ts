export default {
    namespaced: true,
    state:{
        // global var with all subject
        all:[
            {
                id: 0,
                name: 'Materia De Portugues',
                tests: [],
            },
            {
                id: 1,
                name: 'Materia De Ingles',
                tests: [],
            },
        ],
        lastId: 2
    },
    mutations:{
        // change the global var all subjects
        setAll(state: any, newData: any){
            let lastId = localStorage.getItem('subjects_lastId');
            
            if(lastId !== null && lastId !== ''){
                state.lastId = Number(lastId);
            }

            state.all = newData;
        },
        // add new subject to the global variable
        addNew(state: any, subjectData: any){
            // add id and default data to subject
            subjectData['id'] = state.lastId;
            subjectData['tests'] = [];
            state.all.push(subjectData);
            state.lastId++;
        },
        // edit subject by id
        editSubject(state: any, subjectData: any){            
            
            state.all = state.all.map( (subject: any) => {
                
                // search for the subject with same id in the args
                if(subject['id'] == subjectData['id']){
                    subject.name = subjectData.name;
                }
                
                return subject;
            });
        },
        // delete subject by id
        deleteSubject(state: any, id: number){
            // remove the subject object of global var using filter() function
            state.all = state.all.filter( (subject: any) => {
                if(subject.id !== id){
                    return subject;
                }
            })
        },
    },
    actions:{
        // check if have localData and set the global variable in state
        setAll({ commit, getters }: any){
            let subjects: any = localStorage.getItem('subjects_all');            
            if(subjects !== '' && subjects !== null){
                subjects = JSON.parse(subjects);
            }else{
                subjects = [];
            }            
            commit('setAll', subjects);
            getters.saveDataInLocalStorange();
        },
        // add new subject to global var
        add({ commit, getters }: any, newSubject){
            commit('addNew', newSubject);
            getters.saveDataInLocalStorange();
        },
        // edit existent subject function
        edit({ commit, getters }: any , subjectData: any): void{

            commit('editSubject', subjectData);
            
            // update data in localStorange
            getters.saveDataInLocalStorange();      
        },
        // delete subject using id
        delete({ commit, getters }: any, id: number): void {
            commit('deleteSubject', id);
            // update data in localStorange
            getters.saveDataInLocalStorange();        
        }
    },
    getters:{
        saveDataInLocalStorange:(state: any) => (): void => {
            let subjectsJson = JSON.stringify(state.all);
            let lastId = state.lastId.toString();            
            
            // saving global variable subjec in localStorange            
            localStorage.setItem('subjects_all', subjectsJson);
            localStorage.setItem('subjects_lastId', lastId);
        }
    }
}