const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_FACTOR = 10;
const ObjectId = Schema.ObjectId;

var authSchema = new Schema({
    
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },

}, {collection: 'auth'});


authSchema.pre('save', function(next) {
    var account = this;

    if (!account.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(account.password, salt, function(err, hash) {
            if (err) return next(err);

            account.password = hash;
            next();
        });
    });
});

authSchema.methods.checkPass = function(dataPass, cb) {
    bcrypt.compare(dataPass, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Auth', authSchema);
