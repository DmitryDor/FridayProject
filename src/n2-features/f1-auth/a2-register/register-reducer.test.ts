import {registerReducer, setIsRegister} from "./register-reducer";

type InitialStateType = { isRegister: boolean }
let startState: InitialStateType
beforeEach(() => {
    startState = {
        isRegister: false

    }

});

test('correct status should be added', () => {
    const action = setIsRegister(true);

    const endState = registerReducer(startState, action)

    expect(endState).toEqual({
        isRegister: true
    });
})