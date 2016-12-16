export const RoutesPathConstant = {
    ROOT: {
        PATH:'',
    },
    HOME: {
        PATH: 'home'
    },
    TICKETS: {
        PATH: 'tickets',
        AVAILABLE: {
            PATH: 'available'
        },
        MY: {
            PATH: 'my'
        },
        DETAIL_ID: {
            PATH: 'detail/:id',
        }
    },
    AUTH: {
        PATH:'auth',
        LOGIN: {
            PATH: 'login'
        },
        SIGNUP: {
            PATH: 'signup'
        }
    },
    PROFILE: {
        PATH: 'profile',
        AVATAR: {
            PATH: 'avatar'
        }
    },
    PAGE_NOT_FOUND: {
        PATH: '**'
    }
};