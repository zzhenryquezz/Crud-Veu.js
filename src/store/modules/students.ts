/**
 *  Module of Students
 *  Here Are the global variables and Function related to Students
 */

 export default {
    namespaced: true,
    state:{
        // global var with all students
        all: [],
        lastId: 0 // last student id used by the system
    },
    mutations:{
        changeAllStudents(state: any, newData: any = []){
            let lastId = localStorage.getItem('students_lastId');
            if(lastId !== null && lastId !== ''){
                state.lastId = Number(lastId);
            }
            state.all = newData;
        },        
        addNewStudent(state: any, newStudent: any){
            state.all.push(newStudent);
        },
        editStudent(state: any, studentData: any){
            
            state.all = state.all.map( (student: any) => {
                
                // search for the student with same id in the args
                if(student['id'] == studentData['id']){
                    student = studentData;
                }
                
                return student;
            });
        },
        deleteStudent(state: any, id: number){
            // remove the student object of global var using filter() function
            state.all = state.all.filter( (student: any) => {
                if(student.id !== id){
                    return student;
                }
            })
        },
        incrementLastId(state: any){
            state.lastId++;
        }  
    },
    actions:{
        // set the global variable of students
        setAll({ commit, getters }: any){
            let students: any = localStorage.getItem('students_all');            
            if(students !== '' && students !== null){
                students = JSON.parse(students);
            }else{
                students = [];
            }            
            commit('changeAllStudents',students);

            // update data in localStorange
            getters.saveDataInLocalStorange();        
        },
        // add new student function
        addNew({commit, state, getters}: any, studentData: any): void{
                    
            let id = state.lastId;
            studentData['id'] = id;
            
            // add empty default values to the student
            studentData['tests'] = [];            

            // add new item in global array of students
            commit('addNewStudent', studentData);

            // update the last id of itens
            commit('incrementLastId');

            // update data in localStorange
            getters.saveDataInLocalStorange();        
        },
        // edit existent student function
        edit({ commit, getters }: any , studentData: any): void{

            commit('editStudent', studentData);
            
            // update data in localStorange
            getters.saveDataInLocalStorange();      
        },
        // delete student using id
        delete({ commit, getters }: any, id: number): void {
            commit('deleteStudent', id);
            // update data in localStorange
            getters.saveDataInLocalStorange();        
        },
        // detete all student tests with test id
        deteteTests({commit, dispatch}:any, args: any){
            let newStudent = args.student;
            newStudent['tests'] = newStudent['tests'].filter((test: any) => {                
                if(test.fk_test !== args.testId){
                    return test;
                }
            });
                        
            dispatch('edit', newStudent);
        }
    },
    getters:{
        // get student by id
        getById:(state: any) => (id: number) => {
            let student = null;
            
            // search item that have the same id
            state.all.map((item: any) => {
                if(item.id == id){
                    // store the item in a variable 
                    student = item;
                }
            });
            
            return student;
            
        },
        saveDataInLocalStorange:(state: any) => () => {

            let studentsJson = JSON.stringify(state.all);
            let lastId = state.lastId.toString();
            

            // saving global variable students in localStorange            
            localStorage.setItem('students_all', studentsJson);
            localStorage.setItem('students_lastId', lastId);
        }
    }

 }