export default {
    namespaced: true,
    state:{
        all:[
            {
                id: 0,
                name: 'Prova 1',
                description: 'Descrição',
                subject: 'Portugues'
            },
            {
                id: 1,
                name: 'Prova 2',
                description: 'Descrição',
                subject: 'Portugues'
            }
        ],
        lastId: 0,
    },
    mutations:{
        // change the global var all tests
        setAll(state: any, newData: any){
            let lastId = localStorage.getItem('tests_lastId');
            
            if(lastId !== null && lastId !== ''){
                state.lastId = Number(lastId);
            }

            state.all = newData;
        },
        // add new test to the global variable
        addNew(state: any, testData: any){
            // add id and default data to test
            testData['id'] = state.lastId;
            state.all.push(testData);
            state.lastId++;
        },
        // edit test by id
        edit(state: any, testData: any){            
            
            state.all = state.all.map( (test: any) => {
                
                // search for the test with same id in the args
                if(test['id'] == testData['id']){
                    test = testData;
                }
                
                return test;
            });
        },
        // delete test by id
        delete(state: any, id: number){
            // remove the test object of global var using filter() function
            state.all = state.all.filter( (test: any) => {
                if(test.id !== id){
                    return test;
                }
            })
        },        
    },
    actions:{
        // check if have localData and set the global variable in the state
        setAll({ commit, getters }: any){
            let tests: any = localStorage.getItem('tests_all');            
            if(tests !== '' && tests !== null){
                tests = JSON.parse(tests);
            }else{
                tests = [];
            }            
            commit('setAll', tests);
            getters.saveDataInLocalStorange();
        },
        // add new test to global var
        add({ commit, getters }: any, newTest: any){
            commit('addNew', newTest);
            getters.saveDataInLocalStorange();
        },
        // edit existent test
        edit({ commit, getters }: any , testData: any): void{

            commit('edit', testData);
            
            // update data in localStorange
            getters.saveDataInLocalStorange();      
        },

        // delete test using id
        delete({ commit, getters, rootState, dispatch }: any, id: number): void {

            let studentsTests = rootState.students.all;
            studentsTests.forEach((student: any) => {
                dispatch('students/deteteTests', {student, testId: id}, {root: true})
            });
            
            commit('delete', id);
            // update data in localStorange
            getters.saveDataInLocalStorange();        
        }
       
    },
    getters:{
        // get test by id
        getById:(state: any) => (id: number) => {
            let test = null;
            
            // search item that have the same id
            state.all.map((item: any) => {
                if(item.id == id){
                    // store the item in a variable 
                    test = item;
                }
            });
            
            return test;
            
        },
        saveDataInLocalStorange:(state: any) => (): void => {
            let testsJson = JSON.stringify(state.all);
            let lastId = state.lastId.toString();            
            
            // saving global variable tests in localStorange            
            localStorage.setItem('tests_all', testsJson);
            localStorage.setItem('tests_lastId', lastId);
        }
    }
}