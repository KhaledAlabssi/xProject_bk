const getProfile = async (req, res) => {
    res.send("get profile route")
}

const updateProfile = async (req, res) => {
    res.send("update user")
}

const updatePassword = async (req, res) => {
    res.send("update password")
}

export {getProfile, updateProfile, updatePassword}