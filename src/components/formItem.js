import  _ from 'lodash';
import Field from './field';


const FormItemBlock = (() => {
  const fields = [
    {
      lastName: 'Фамилия',
    },
    {
      firstName: 'Имя',
    },
    {
      middleName: 'Отчество',
    },
    {
      age: 'Возраст',
    },
    {
      balance: 'Баланс',
    },
  ]

  class FormItem {
    constructor(container, userServices) {
      this.container = container
      this.fields = []
      this.userServices = userServices;
    }
    render(data, options) {
      this.arr = []
      _.forIn(data, (value, key) => {
        fields.forEach(item => {
          _.forIn(item, (v, k) => {
            if (k === key) {
              this.arr.push({
                value: value,
                name: key,
                isStatic: options.isStatic,
                field: v,
              });
            }
          });
        });
      })
      this.arr.forEach((field) => {
        const item = new Field(this.container, this.userServices)
        item.render(field)
        this.fields.push({
          [field.name]: item,
        });
      });
    }

    update(user) {
      this.fields.map((item) => {
        _.forIn(item, (field, k) => {
          if (user.name === k) {
            field.update({
              value: user.data,
              name: user.name,
              isStatic: user.isStatic,
              field: user.field,
            });
          }
        });
      });
    }
  }

  return FormItem;
})()

export default FormItemBlock;
