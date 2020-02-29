import { ADD_TODO, TOGGLE_TODO, SET_TODO, SET_FILTER } from "../actions/actionTypes"

const todos=(state=[],action)=>{
    switch(action){
        case ADD_TODO:
            return {
                ...state,
                todos:[
                    ...state.todos,
                    {
                        id:action.id,
                        text:action.text,
                        completed:false
                    }
                ]
            }
        case TOGGLE_TODO:
            return {
                ...state,
                todos:state.todos.map(
                    todo=>{
                        todo.id===action.id?{
                            ...todo,completed:!todo.completed
                        }:todo
                    }
                )
            }
        default:
            return state
    }
        
}