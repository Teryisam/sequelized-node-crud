const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    login,
    update,
    delete: _delete
};

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const user = new db.User(params);
    
    // hash password
    user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await user.save();

    const usercrtd = await db.User.findOne({ options: ['scopes'], where: { email: params.email } });

    return usercrtd;
}

async function login(params) {
    // validate
    const user = await db.User.findOne({ options: ['scopes'], where: { email: params.email } });
    // console.log(user)
    // console.log(params.password)
    // console.log(user.dataValues.passwordHash)
    if(user){
        const password_valid = await bcrypt.compare(params.password, user.dataValues.passwordHash);
        if(password_valid){
            // return await getUser(user.dataValues.id);
            // console.log(user);
            return user;
        } else {
            // res.status(400).json({ error : "Password Incorrect" });
            throw "Password Incorrect";
        }
    } else {
        // res.status(404).json({ error : "User does not exist" });
        throw "User does not exist";
    }
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    const usercrtd = await db.User.findOne({ options: ['scopes'], where: { email: params.email } });

    return usercrtd;
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    console.log(user)
    if (!user) throw 'User not found';
    return user;
}
