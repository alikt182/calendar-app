import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDeleted } from '../../../components/actions/events';

// import { LoginScreen } from '../../../components/auth/LoginScreen';
 //import { startLogin } from '../../../../components/actions/auth';

jest.mock('../../../components/actions/events', () => ({ 
     eventStartDeleted: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState ); 
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab/>
    </Provider>
)

describe('Pruebas en < DeleteEventFab />', () =>{

    test('Debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('Debe llamar el evento eventStartDelte al hacer click', () => {

        wrapper.find('button').prop('onClick')();

        expect( eventStartDeleted ).toHaveBeenCalled();

     })

})