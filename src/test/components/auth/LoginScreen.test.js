import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Swal from 'sweetalert2';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../components/actions/auth';

jest.mock('../../../components/actions/auth', () => ({ 
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({ 
    fire: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState ); 
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <LoginScreen/>
    </Provider>
)

describe('Pruebas en <LoginScreen/>', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    
    test('Debe mostrarse correctamente', () => { 

        expect( wrapper ).toMatchSnapshot();

     });

     test('Debe llamar el startLogin', () => { 

        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'juan@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        //buscamos el 1er form que encuentre primeros 
        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith( 'juan@gmail.com' , '123456' );

     });

     test(' No hay registro si las constraseñas son diferentes', () => {

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).not.toHaveBeenCalled();
        expect( Swal.fire ).toHaveBeenCalledWith('Error','Las contraseñas no coinciden', 'error');

      });


      test('Debe disparar el registro con contraseñas iguales', () => { 

            wrapper.find('input[name="rPassword1"]').simulate('change', {
                target: {
                    name: 'rPassword1',
                    value: '123456'
                }
            });

            wrapper.find('input[name="rPassword2"]').simulate('change', {
                target: {
                    name: 'rPassword2',
                    value: '123456'
                }
            });

            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });

            expect( Swal.fire ).not.toHaveBeenCalled();
            expect( startRegister ).toHaveBeenCalledWith('nando@gmail.com', '123456', 'Nano');
        });

})