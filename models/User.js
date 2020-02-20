const mongoose = require("../libs/mongoose");
const crypto = require('crypto')
const config = require("config");
const getPublicValueFromPublicFields = require('../helpers/getPublicValueFromPublicFields');
const publicFields = [
  "id",
  "email",
  "name",
  "surname",
  "avatarImage",
  "gender",
  "birthday",
  "lastLoginDate",
  "availableContainers"
];

const { Schema, Types, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    surname: {
      type: String,
      required: true,
      trim: true
    },
    gender: {
      type: String,
      enum: ["female", "male"]
    },
    birthday: {
      type: Date
    },
    email: {
      type: String,
      required: "Необходим email",
      trim: true,
      lowercase: true,
      unique: "Такой email уже существует"
      // TODO Разобраться с валидацией.
      // validate: [
      //   {
      //     validator: function(value) {
      //       return /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i.test(value);
      //     },
      //     msg: "Некорректный email"
      //   }
      // ]
    },
    password: {
      type: String
      // validate: [
      //   {
      //     validator: function (value) {
      //       return !!value.length >= config.get("User").minLenPassword;
      //     },
      //     msg: "Пароль должен быть больше 4 символов"
      //   }
      // ]
    },
    passwordHash: {
      type: String,
    },
    salt: {
      type: String,
    },
    // avatarImage: {
    //   file: { type: Buffer, required: true },
    //   filename: { type: String, required: true },
    //   mimetype: { type: String, required: true },
    //   required: false
    // },
    lastLoginDate: {
      type: Date
    },
    availableContainers: [
      {
        type: Types.ObjectId,
        ref: "Container"
      }
    ]
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        return getPublicValueFromPublicFields(ret, publicFields);
      }
    }
  }
);

function generatePasswordHash(password, salt) {
  const iterations = config.get('crypto.hash.iterations');
  const keyLen = config.get('crypto.hash.length');
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLen, 'sha512', (err, key) => {
      if(err) return reject(err);
      resolve(key.toString('hex'));
    })
  }) 
} 

userSchema.statics.publicFields = publicFields;

userSchema.methods.setPassword = async function setPassword (password) {
  if(password !== undefined) {
    if(password.length < 4) {
      throw new Error('Минимальная длина пароля 4 символа');
    }
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.passwordHash = await generatePasswordHash(password, this.salt);
}

userSchema.methods.checkPassword = async function checkPassword(password) {
  if(!password) return false;

  const hash = await generatePasswordHash(password, this.salt);
  return hash === this.passwordHash;
}

module.exports = model("User", userSchema);

// DEMO DATA
// {
//   "name": "Conor",
//   "surname": "McGregor",
//   "gender": "female",
//   "birthday": "Sat Feb 15 2020 00:35:34 GMT+0300",
//   "email": "a@a.ru",
//   "password": "123456245",
//   "lastLoginDate": "Sat Feb 15 2020 00:35:34 GMT+0300"
// }