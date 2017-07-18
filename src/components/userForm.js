import FormItem from './formItem';
import { $on, $toggle, ClsName } from '../utils';
import  _ from 'lodash';

const UserFormBlock = (() => {
  class UserForm {
    constructor(container, form, service, app) {
      this.container = container;
      this.form = form;

      this.notice = this.form.querySelector(ClsName.userFormNotice);
      this.formContent = this.form.querySelector(ClsName.userFormContent);
      this.btn = this.form.querySelector(ClsName.btn);

      this.userServices = service;
      this.app = app;

      if (this.btn) {
        const handler = this.clickBtn(this.btn);
        $on(this.btn, 'click', handler.bind(this));
      }
    }

    clickBtn(btn) {
      const data = btn.getAttribute('data-btn');
      if (data === 'edit') {
        this.btnEdit = btn;
        return this.formEdit;
      } else if (data === 'save') {
        this.btnSave = btn;
        return this.formSave;
      } else {
        throw new Error('Unknown button');
      }
    }

    formEdit() {
      this.app.initForm(this.app.formEdit, 'formEditObj');
      $toggle(this.app.formEdit, this.btnEdit);
    }

    formSave() {
      const fields = this.form.querySelectorAll(ClsName.formItemInput);
      const user = {};
      fields.forEach((field) => {
        user[field.name] = field.value.trim();
      });
      this.app.formStaticObj.notice.classList.remove('hide');
      this.app.formStaticObj.notice.innerHTML = 'Сохранение';
      this.userServices.saveUserData(user,
        this.saveUserDone.bind(this),
        this.saveUserFail.bind(this),
      );
    }

    saveUserDone() {
      $toggle(this.app.formStaticObj.btnEdit, this.app.formStaticObj.notice);
      console.log(this.app.remove);
      console.log(this.app);
      console.log('ssssssss')
      this.app.remove(this.app.formEditObj.rootItems);
      this.app.formEdit.classList.add('hide');
    }

    saveUserFail() {
      this.app.formStaticObj.notice.innerHTML = 'Ошибка: данные не сохранены';
    }

    render(data) {
      const user = this.userServices.user.load ? this.userServices.user.data : data;

      this.rootItems = this.form.querySelector(ClsName.userFormItems);
      if (!this.rootItems) {
        throw new Error(`class ${ClsName.userFormItems} not found`);
      }
      this.formItem = new FormItem(this.rootItems, this.userServices);
      const isStatic = this.form.classList.contains('user-form_static');
      const options = {
        isStatic: isStatic,
      };
      this.formItem.render(user, options);
    }

    update() {
      _.forIn(this.userServices.user.data, (v, k) => {
        this.formItem.arr.forEach((item) => {
          if (k === item.name) {
            if (this.userServices.user.data[k] !== item.value) {
              const user = {
                name: item.name,
                field: item.field,
                isStatic: item.isStatic,
                data: this.userServices.user.data[k],
              };
              this.app.formStaticObj.formItem.update(user);
            }
          }
        });
      });
    }
  }
  return UserForm;
})();

export default UserFormBlock;
