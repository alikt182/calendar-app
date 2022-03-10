import { authReducer } from "../../../components/reducers/authReducer";
import { types } from "../../../components/types/types";

const initState = {
    checking: true,
    //uid: null,
    //name: null
}

describe('Pruebas en authReucer', () => {

    test('Debe retornar el estado por defecto', () => { 

        const action  = {};
        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );

     });

     test('Debe autenticar el usuario', () => { 

        const action = {
            type: types.authLogin,
            payload: {
                uid: '12345',
                name: 'Monserrate'
            }
        };

        const state = authReducer( initState, action );

        //console.log( state );

        expect( state ).toEqual({ checking: false, uid: '12345', name: 'Monserrate' })


      })

})