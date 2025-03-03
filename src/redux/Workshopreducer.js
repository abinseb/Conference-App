const initialState={
    workshopName:'',
};

const WorkshopReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET_WORKSHOP_STRING':
            return{
                ...state,
                workshopName:action.payload,
            };
            default:
                return state;
    }
};

export default WorkshopReducer;