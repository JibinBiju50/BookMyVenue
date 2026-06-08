export const registerUser = async (req, res) => {
    try {
        res.status(501).json({
            success: false,
            message: "Register API not implemented yet"
        })
    } catch (error) {
        console.log("Register not working", error);
    }
}

export const loginUser = async (req, res) => {
    try {
        res.status(501).json({
            success: false,
            message: "Login API not implemented yet"
        })
    } catch (error) {
        console.log("Login not working", error);
    }
}