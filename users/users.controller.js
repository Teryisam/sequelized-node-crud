﻿const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.post('/login', login);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
// router.post('/email', login);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        // .then(() => res.json({ message: 'User created' }))
        .then((user) => res.json(user))
        .catch(next);
}

function login(req, res, next) {
    userService.login(req.body)
        .then((user) => res.json(user))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        // .then(() => res.json({ message: 'User updated' }))
        .then((user) => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        // title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        bvn: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        acctType: Joi.string().required(),
        // role: Joi.string().valid(Role.Admin, Role.User).required(),
        role: Joi.string().valid(Role.Admin, Role.User),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        bvn: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        acctType: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
