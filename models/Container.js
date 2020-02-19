const mongoose = require("../libs/mongoose");

const {model, Types, Schema} = mongoose;


const publicFields = ["title", "owners"]

const containerSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Необходимо дать название рабочему блоку"
  },
  owners: [{type: Types.ObjectId, ref: "User"}]
}, {
  timestamps: true,
  toObject: {
    transform(doc, ret, options) {
      return publicFields.reduce((result, key) => {
        if(key in ret) {
          result[key] = ret[key]
        }
        return result
      }, {})
    }
  }
})


containerSchema.statics.publicFields = publicFields;


module.exports = model("Container", containerSchema);