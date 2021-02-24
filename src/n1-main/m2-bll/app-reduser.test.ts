import {appReducer, AppInitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reduser";
import {setIsLoggedIn, setUserData} from "../../n2-features/f1-auth/a1-login/login-reducer";

let startState:AppInitialStateType
beforeEach(() => {
    startState = {
        status: 'succeeded',
        error:null,
        UserData: null,
        isLoggedIn: false
            }

});

test('correct status should be added', () => {
    const action = setAppStatusAC('idle');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'idle',
        error: null,
        UserData: null,
        isLoggedIn: false
    });
})
test('correct error should be added', () => {
    const action = setAppErrorAC('errors');

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: "errors",
        UserData: null,
        isLoggedIn: false
    });
})
test('correct User Data should be added', () => {

    const UserData= {
        _id: "4111111111",
            email:"potapov@yandex.ru",
            name: "Jeka",
            avatar:  null,
            publicCardPacksCount: 777,
            created: null as Date | null,
            updated: null as Date | null,
            isAdmin: false,
            verified: false, // подтвердил ли почту
            rememberMe: false,
    }
    const action =setUserData(UserData )

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: null,
        UserData: {
            _id: "4111111111",
            email:"potapov@yandex.ru",
            name: "Jeka",
            avatar:  null,
            publicCardPacksCount: 777,
            created: null as Date | null,
            updated: null as Date | null,
            isAdmin: false,
            verified: false, // подтвердил ли почту
            rememberMe: false,
        },
        isLoggedIn: false
    });
})
test('correct isLoggedIn should be added', () => {
    const action = setIsLoggedIn(true);

    const endState = appReducer(startState, action)

    expect(endState).toEqual({
        status: 'succeeded',
        error: null,
        UserData: null,
        isLoggedIn: true
    });
})