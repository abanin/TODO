const mongoose = require("../libs/mongoose");
const getPublicValueFromPublicFields = require("../helpers/getPublicValueFromPublicFields");

const { Types, Schema, model } = mongoose;

const publicFields = [
  "owner",
  "title",
  "description",
  "tag",
  "dateBegin",
  "dateCompletion",
  "isDone",
  "dueDate",
  "isArchived"
];

const todoSchema = new Schema(
  {
    owner: {
      required: "Не указан владелец задачи",
      type: Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: "Укажите заголовок задачи"
    },
    description: {
      type: String
    },
    tag: {
      type: String
    },
    dateBegin: {
      type: Date
    },
    dateCompletion: {
      type: Date
    },
    isDone: {
      type: Boolean,
      default: false
    },
    dueDate: {
      type: Date
    },
    isArchived: {
      type: Boolean,
      default: false
    }
    // filesForTodo: [
    //   {
    //     type: Blob
    //   }
    // ],
    // subTasks: []
  },
  {
    timestamps,
    toObject: {
      transform(doc, ret, options) {
        return getPublicValueFromPublicFields(ret, publicFields);
      }
    }
  }
);

todoSchema.statics.publicFields = publicFields;

module.exports = model("Todo", todoSchema);
