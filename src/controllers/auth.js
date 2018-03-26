/* default */
const express = require('express');
const router = express.Router();

/* felicia.js */
const Auth = require('../models/auth');
const config = require('../config/config.js');

router.get('/auth', (req, res) => {

    var dataResult = {
        "Success": null,
        "ErrorReport": null,
        "AuthDate": new Date(),
        "AuthResult": null
    };

    res.status = 200; 
    res.json(dataResult);

});

router.get('/:id', (req, res) => {
    var authData = req.params.id;

    var dataResult = {
        "Success": null,
        "ErrorReport": null,
        "AuthDate": new Date(),
        "AuthResult": null
    };

    Auth.findById(authData, (err, data) => {
        if (err) throw err;
        
        if(data == null) {
            dataResult.ErrorReport = {
                "Error": true,
                "ErrorDescription": "Error in search Authentication.",                
            };
            dataResult.Success = false;
            res.status(404);
            res.json(dataResult)
        };

        dataResult.Success = true
        dataResult.AuthResult = data;
        res.status(200);
        res.json(dataResult);
        
    });
});

router.post('/username', (req, res) => {
    var authData = req.body;
    var username = { 'username': authData.username };

    var dataResult = {
        "Success": null,
        "ErrorReport": null,
        "AuthDate": new Date(),
        "AuthResult": null
    };

    Auth.findOne(username, (err, data) => {
        if (err) throw err;

        if(data != null) {
            data.checkPass(authData.password, (err, isMatch) => {
                if (err) throw err;
                
                if(!isMatch) {
                dataResult.ErrorReport = {
                        "Error": true,
                        "ErrorDescription": "Error in Authentication, Password incorret.",        
                    };
                    dataResult.Success = false;
                    res.status(401);
                    res.json(dataResult)
                };

                dataResult.Success = true
                dataResult.AuthResult = data;
                res.status(200);
                res.json(dataResult);
            });   
        } else {
            dataResult.ErrorReport = {
                "Error": true,
                "ErrorDescription": "Error in to find username.",
            };
            dataResult.Success = false;
            res.status(404);
            res.json(dataResult);
        }
    });
});

router.post('/authentication', (req, res) => {
    var authData = new Auth(req.body);

    var dataResult = {
        "Success": null,
        "ErrorReport": null,
        "AuthDate": new Date(),
        "AuthResult": null
    };

    Auth.create(authData, (err, data) => {
       if (err) throw err;
       
       if(data == null) {
            dataResult.ErrorReport = {
                "Error": true,
                "ErrorDescription": "Error in create Authentication.",                
            };
            dataResult.Success = false;
            res.json(dataResult)
        };

        dataResult.Success = true;
        dataResult.AuthResult = data;

        res.status(201);
        res.json(dataResult);
    });
});



module.exports = router;