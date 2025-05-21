const register = (req, res) => {
    res.json({
        status: true,
        message: 'Register API'
    });
}

const login = (req, res) => {
    res.json({
        status: true,
        message: 'Login API'
    });
}

const profile = (req, res) => {
    res.json({
        status: true,
        message: 'Profile API'
    });
}

const logout = (req, res) => {
    res.json({
        status: true,
        message: 'Logout API'
    });
}

module.exports = {
    register,
    login,
    profile,
    logout
}
