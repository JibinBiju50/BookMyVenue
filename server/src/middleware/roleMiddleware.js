export const role = (...roles) => {
    return (req, res, next) => {
        
        console.log("Role middleware placeholder:", roles);
        next();
    }
}