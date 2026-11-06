const commonData = {
    adminURL: 'https://e-commerce-dev.hoctest.com/wp-admin/'
}

export const authenticateData = {
    AUTH_001: {
        registerLink: 'https://e-commerce-dev.hoctest.com/wp-login.php?action=register',
        lostPasswordLink: 'https://e-commerce-dev.hoctest.com/wp-login.php?action=lostpassword',
        goToEcommerceDevLink: 'https://e-commerce-dev.hoctest.com/'
    },
    AUTH_002: {
        ...commonData
    },
    AUTH_003: {
        ...commonData,
        nonExistentUser: {
            username: 'nonExistentUsername',
            password: 'landrover90'
        },
        lostPasswordLink: 'https://e-commerce-dev.hoctest.com/wp-login.php?action=lostpassword'
    }
}