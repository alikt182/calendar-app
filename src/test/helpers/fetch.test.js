import { fetchConToken, fetchSinToken } from '../../helpers/fetch'


describe('Pruebas en el helper fetch', ()=> {

    let token = '';

    test('Fetch sin token debe funcionar ', async () => { 

        const resp = await fetchSinToken('auth',{ email: 'ali.monserrate.icg@gmail.com' , password: '123456' }, 'POST');

        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;

     })

     test('Fetch con token debe funcionar ', async () => { 

        localStorage.setItem( 'token', token );

        const resp = await fetchConToken( 'events/a621cf4473f2ef7032e9072c1', {}, 'DELETE' );
        const body = await resp.json();

        expect( body.msg ).toBe( 'Error al eliminar evento' );

     })


})