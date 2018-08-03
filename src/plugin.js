/**
 * Created by zhangsong on 2018/8/3.
 */
const fieldEncryption = (schema, options) => {
    if (!options || !options.secret) {
        throw new Error('missing required secret');
    }
    const fieldsToEncrypt = options.fields || [];
    const secret = options.secret;
    // add marker fields to schema
    fieldsToEncrypt.forEach((field) => {
        const encryptedFieldName = encryptedFieldNamePrefix + field;
        const encryptedFieldData = encryptedFieldName + encryptedFieldDataSuffix;
        const schemaField = {};
        schemaField[encryptedFieldName] = { type: Boolean };
        schemaField[encryptedFieldData] = { type: String };
        schema.add(schemaField);
    });
    function encryptFields(obj, fields, secret) {
        for (let field of fields) {
            const encryptedFieldName = encryptedFieldNamePrefix + field;
            const encryptedFieldData = encryptedFieldName + encryptedFieldDataSuffix;
            const fieldValue = obj[field];
            if (!obj[encryptedFieldName] && fieldValue) {
                if (typeof fieldValue === 'string') { // handle strings separately to maintain searchability
                    const value = encrypt(fieldValue, secret);
                    obj[field] = value;
                }
                else {
                    const value = encrypt(JSON.stringify(fieldValue), secret);
                    obj[field] = undefined;
                    obj[encryptedFieldData] = value;
                }
                obj[encryptedFieldName] = true;
            }
        }
    }
    ;
    function decryptFields(obj, fields, secret) {
        for (let field of fields) {
            const encryptedFieldName = encryptedFieldNamePrefix + field;
            const encryptedFieldData = encryptedFieldName + encryptedFieldDataSuffix;
            if (obj[encryptedFieldData]) {
                const encryptedValue = obj[encryptedFieldData];
                obj[field] = JSON.parse(decrypt(encryptedValue, secret));
                obj[encryptedFieldName] = false;
                obj[encryptedFieldData] = '';
            }
            else if (obj[encryptedFieldName]) { // handle strings separately to maintain searchability
                const encryptedValue = obj[field];
                obj[field] = decrypt(encryptedValue, secret);
                obj[encryptedFieldName] = false;
            }
        }
    }
    ;
    schema.pre('init', function (next, data) {
        try {
            decryptFields(data, fieldsToEncrypt, secret);
            next();
        }
        catch (err) {
            next(err);
        }
    });
    schema.pre('save', function (next) {
        try {
            encryptFields(this, fieldsToEncrypt, secret);
            next();
        }
        catch (err) {
            next(err);
        }
    });
    schema.pre('update', function (next) {
        for (let field of fieldsToEncrypt) {
            let encryptedFieldName = encryptedFieldNamePrefix + field;
            let encryptedFieldValue = this._update.$set[encryptedFieldName];
            let plainTextValue = this._update.$set[field];
            if (encryptedFieldValue === false && plainTextValue) {
                if (typeof plainTextValue === 'string' || plainTextValue instanceof String) {
                    let updateObj = { $set: {} };
                    updateObj.$set[field] = encrypt(plainTextValue, secret);
                    updateObj.$set[encryptedFieldName] = true;
                    this.update({}, updateObj);
                }
                else {
                    return next(new Error('Cannot apply mongoose-field-encryption plugin on update to encrypt non string fields'));
                }
            }
        }
        next();
    });
    schema.methods.stripEncryptionFieldMarkers = function () {
        for (let field of fieldsToEncrypt) {
            let encryptedFieldName = encryptedFieldNamePrefix + field;
            let encryptedFieldData = encryptedFieldName + encryptedFieldDataSuffix;
            this.set(encryptedFieldName, undefined);
            this.set(encryptedFieldData, undefined);
        }
    };
    schema.methods.decryptFieldsSync = function () {
        decryptFields(this, fieldsToEncrypt, secret);
    };
    schema.methods.encryptFieldsSync = function () {
        encryptFields(this, fieldsToEncrypt, secret);
    };
};
//# sourceMappingURL=plugin.js.map