// {
//     id: new Date().getTime(),
//     title: "Cumpleaños de Elver",
//     start: moment().toDate(),
//     end: moment().add(2, "hours").toDate(),
//     bgcolor: "#fafafa",
//     notes: "Comprar el pastel",
//     user: {
//       _id: "123",
//       name: "Andrea",
//     },
//   },


export const types = {
    
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    eventSetActive: '[event] Set active',
    eventLogout: '[event] Logout event',

    eventStartAddNew: '[event] Start add new', 
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Events loaded',

    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',
    
}