const HOST = 'https://js-mp-2016.herokuapp.com';

export const EndpointsConstant = {
    AUTH: {
        LOGIN: `${HOST}/api/auth/login`,
        SIGNUP: `${HOST}/api/auth/signup`,
        CHECK: `${HOST}/api/auth/check`
    },
    TICKETS: {
        AVAILABLE: `${HOST}/api/tickets/available`,
        MY: `${HOST}/api/tickets/my`
    }
};