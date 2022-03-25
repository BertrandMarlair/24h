const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NEW_RUN': {
            const currentUserIndex = state.users.findIndex(user => user.name === state.lastRun[action.payload.velo].name);

            return {
                ...state,
                users: [
                    ...state.users.slice(0, currentUserIndex),
                    {
                        ...state.users[currentUserIndex],
                        velo: action.payload.velo,
                        run: [
                            ...state.users[currentUserIndex].run,
                            {startAt: state.lastRun[action.payload.velo].endAt, endAt: new Date().getTime(), count: 1},
                        ]
                    },
                    ...state.users.slice(currentUserIndex + 1),
                ],
                lastRun: {
                    ...state.lastRun,
                    [action.payload.velo]: {
                        endAt: new Date().getTime(),
                        name: action.payload.name,
                    },
                }
            };
        }
        case 'ADD_NEW_TOUR': {
            const currentUserIndex = state.users.findIndex(user => user.name === state.lastRun[action.payload.velo].name);

            const lastRunForCurrentUser = state.users[currentUserIndex].run.slice(-1)[0];

            return {
                ...state,
                users: [
                    ...state.users.slice(0, currentUserIndex),
                    {
                        ...state.users[currentUserIndex],
                        run: [
                            ...state.users[currentUserIndex].run.slice(0, -1),
                            lastRunForCurrentUser ? 
                            {
                                startAt: state.lastRun[action.payload.velo].endAt,
                                endAt: new Date().getTime(),
                                count: lastRunForCurrentUser.count + 1
                            } : {
                                startAt: state.lastRun[action.payload.velo].endAt,
                                endAt: new Date().getTime(),
                                count: 1,
                            },
                        ]
                    },
                    ...state.users.slice(currentUserIndex + 1),
                ],
            };
        }
        case 'SET_FIRST_USER': {
            return {
                ...state,
                lastRun: {
                    ...state.lastRun,
                    [action.payload.velo]: {
                        endAt: null,
                        name: action.payload.name,
                    }
                }
            };
        }
        case 'START_RUN': {
            return {
                ...state,
                lastRun: {
                    ...state.lastRun,
                    [action.payload.velo]: {
                        ...state.lastRun[action.payload.velo],
                        endAt: new Date().getTime(),
                    }
                }
            };
        }
        case 'ADD_NEW_USER': {
            return {
                ...state,
                users: [
                    ...state.users,
                    {name: action.payload.name, run: []},
                ],
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export default reducer;