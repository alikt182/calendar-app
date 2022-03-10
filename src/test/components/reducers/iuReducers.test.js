import { uiCloseModal, uiOpenModal } from "../../../components/actions/ui";
import { uiReducer } from "../../../components/reducers/uiReducers"

const initState = {
    modalOpen: false
}

describe ('Pruebas en uiReducers', () => {

    test('Debe retornar el estado por defecto', () => { 

        const state = uiReducer( initState, {} );
        expect( state ).toEqual( initState );

     });

     test('Debe abrir y cerrar el modal', () => { 

        const modalOpen = uiOpenModal();
        const state = uiReducer( initState, modalOpen );

        expect( state ).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( state, modalClose );

        expect( stateClose ).toEqual({ modalOpen: false });




      })

})