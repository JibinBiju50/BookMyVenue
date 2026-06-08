export const protect = async (req, res, next) => {
    //TODO: verify jwt token and add user to req.user
    console.log("Auth middleware not yet implemented");
    next();
}