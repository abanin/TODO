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
    container: {
      required: "Не указана рабоачая область",
      type: Types.ObjectId,
      ref: "Container"
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
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        return getPublicValueFromPublicFields(ret, publicFields);
      }
    }
  }
);

todoSchema.statics.publicFields = publicFields;

todoSchema.index({container: 1});

module.exports = model("Todo", todoSchema);



// {
//   "owner": "UID",
//   "container": "CID",
//   "title": "Задача 1",
//   "description": "Пример некоторой задачи",
//   "tag": "Важно",
//   "dateBegin": "Sat Feb 15 2020 00:35:34 GMT+0300",
//   "dateCompletion": "Sat Feb 15 2020 00:35:34 GMT+0300",
//   "isDone": false
// }
