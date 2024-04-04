const register = async (req, res) => {
    res.status(201).json({msg: "register user"})
}

const login = async (req, res) => {
    res.status(200).json({ msg: "login user" })
}

const logout = async (req, res) => {
    res.status(200).json({ msg: "logout user" })
}

export {register, login, logout}