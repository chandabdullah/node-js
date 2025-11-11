
const register = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        // const result = await AuthService.login(req.body);
        // res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
};

export default { register, login };
