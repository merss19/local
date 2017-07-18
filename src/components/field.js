import Handlebars from 'handlebars';
import { $on, ClsName } from '../utils';

const FieldBlock = (() => {
  class Field {
    constructor(container, userServices) {
      this.container = container
      this.userServices = userServices
    }

    render(data) {
      const input = data.isStatic
        ?
        `<p class="form-item__text form-control-static">{{value}}</p>`
        :
        `<input 
                type="text" 
                value={{value}} 
                class="form-item__input  form-control" 
                name={{name}}   
                placeholder="Password">
                <p class="form-item__error hide"></p>
            `
      const item = `
                <label class="col-sm-3 control-label col-form-label">{{field}}</label>
                <div class="col-sm-9">
                    ${input}
                </div>
          `
      this.createElement(
        item,
        'div',
        `user-form__item form-item form-item_${data.name} form-group has-error row`,
         data,
        this.container,
      )

      this.el = this.container.querySelector(`.form-item_${data.name}`)
      this.input = this.el.querySelector(ClsName.formItemInput)
      if (!this.input && !data.isStatic) {
        throw new Error(`Class ${ClsName.formItemInput} not found`);
      }

      this.error = this.el.querySelector(ClsName.formItemError)
      if (!this.error && !data.isStatic) {
        throw new Error(`Class ${ClsName.formItemError} not found`);
      }
      if (this.input) {
        $on(this.input, 'input', this.changeInput.bind(this, data.name));
      }
    }

    createElement(tpl, tag, cls, data, container) {
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      div.className = cls;
      const template = Handlebars.compile(tpl);
      const result = template(data);
      div.innerHTML = result
      fragment.appendChild(div);
      container.appendChild(fragment);
    }

    changeInput(name) {
      if (name === 'lastName' || name === 'firstName' || name === 'middleName') {
        if (this.input.value.trim().length > 15) {
          this.error.classList.remove('hide')
          this.error.innerHTML = 'Длина сообщения должна быть меньше 15 символов'
          this.userServices.inValid();
        } else if (this.input.value.trim().length === 0) {
          this.error.classList.remove('hide')
          this.error.innerHTML = 'Длина сообщения должна быть больше 0'
          this.userServices.inValid();
        } else {
          this.error.classList.add('hide')
          this.error.innerHTML = ''
          this.userServices.valid();
        }
      }
      if (name === 'age') {
        const value = this.input.value.trim()
        const notNumber = /[^0-9]/g.test(value)

        if (notNumber) {
          this.error.classList.remove('hide')
          this.error.innerHTML = 'Только цифры'
          this.userServices.inValid();
        } else if (value > 50) {
          this.error.classList.remove('hide')
          this.error.innerHTML = 'Возраст должен быть меньше 50'
          this.userServices.inValid();
        } else if (value < 18) {
          this.error.classList.remove('hide')
          this.error.innerHTML = 'Возраст должен быть больше 18'
          this.userServices.inValid();
        } else {
          this.error.classList.add('hide')
          this.error.innerHTML = ''
          this.userServices.valid();
        }
      }
    }

    update(data) {
      this.el.querySelector(ClsName.formItemText).innerHTML = data.value;
    }
  }

  return Field;
})()
export default FieldBlock;
