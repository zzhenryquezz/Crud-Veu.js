/**
 *  Module of Students
 *  Here Are the global variables and Function related to Students
 */

 export default {
    namespaced: true,
    state:{
        // global var with all students
        all: [
            {
                id: 0,
                name: 'Estudante 1',
                bestAverage: 150.00,
                lowerAverage: 60.00
            },
            {
                id: 1,
                name: 'Estudante 2', 
                bestAverage: 150.00,
                lowerAverage: 60.00
            }
        ],
        lastId: 2 // last student id used by the system
    },
    mutations:{        
        // add new student function
        addNew(state: any, studentData: any): void{
                    
            let id = state.lastId;
            studentData['id'] = id;
            
            // add empty default values to the student
            studentData['bestAverage'] = '-';
            studentData['lowerAverage'] = '-';

            // add new item in global array of students
            state.all.push(studentData);

            // update the last id of itens
            state.lastId++;
        },
        // edit existent student function
        edit(state: any , args: any): void{
            state.all = state.all.map( (student: any) => {
                
                // search for the student with same id in the args
                if(student['id'] == args['id']){
                    student.name = args.name;
                }
                
                return student;
            });
        },
        // delete student using id
        delete(state: any, id: number): void {
            // remove the student object of global var using filter() function
            state.all = state.all.filter( (student: any) => {
                if(student.id !== id){
                    return student;
                }
            })
        }
    },
    getters:{
        // get student by id
        getById:(state: object) => (id: number) => {
            let student = null;
            
            // search item that have the same id
            state.all.map((item: any) => {
                if(item.id == id){
                    // store the item in a variable 
                    student = item;
                }
            });
            
            return student;
            
        }
    }

 }