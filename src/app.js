import Navigo from 'Navigo';
import UserForm from './components/userForm';
import UserServices from './services/userServices';
import profile from './template/profile';
import balance from './template/balance';
import { $on, $toggle, ClsName, IdName } from './utils';


class App {
  constructor() {
    this.app = document.getElementById(IdName.app);
    this.root = '';
    this.formStatic = '';
    this.formEdit = '';
    this.formStaticObj = '';
    this.formEditObj = '';
    this.userServices = new UserServices();

    $on(window, 'load', this.init());
    this.userServices.subscribe(this);

    this.notice = this.root.querySelector(ClsName.profileNotice);
    this.content = this.root.querySelector(ClsName.profileContent);
  }

  init() {
    this.initRouter();
    if (window.location.pathname === '/') {
      this.router.navigate('/profile');
    }
    this.root = document.querySelector(ClsName.profile);
    if (this.root) {
      this.formStatic = this.root.querySelector(ClsName.userFormStatic);
      if (!this.formStatic) {
        throw new Error('Form not found');
      }

      this.formEdit = this.root.querySelector(ClsName.userFormEdit);
      this.initForm(this.formStatic, 'formStaticObj');
    } else {
      throw new Error('Page not found');
    }
  }


  updateBalanceDone() {
    $toggle(this.content, this.notice);
    this.notice.innerHTML = '';
  }

  updateBalanceError() {
    this.notice.classList.remove('hide');
    this.notice.innerHTML = 'Ошибка: обновление баланса';
  }

  remove(elem) {
    elem.innerHTML = '';
  }

  load() {
    if (this.userServices.user.loading) {
      $toggle(this.notice, this.content);
    }
    if (!this.userServices.user.loading && this.userServices.user.load) {
      $toggle(this.content, this.notice);
    }
    if (!this.userServices.user.loading && !this.userServices.user.load) {
      $toggle(this.notice, this.content);
      this.notice.innerHTML = 'Ошибка:Данные не загружены';
    }
  }

  initForm(form, name) {
    this[name] = new UserForm(this.root, form, this.userServices, this);
    this[name].render();
    this.userServices.subscribe(this[name]);
  }

  setContent(tpl) {
    this.app.innerHTML = tpl;
  }

  inValid() {
    this.formEditObj.btnSave.classList.add('hide');
  }

  valid() {
    this.formEditObj.btnSave.classList.remove('hide');
  }

  initRouter() {
    this.router = new Navigo(null);
    this.router.on({
      'profile': () => {
        this.setContent(profile);
        this.userServices.fetchData('profile');
      },
      'balance': () => {
        this.setContent(balance);
        this.userServices.fetchData('balance',
          this.updateBalanceDone.bind(this),
          this.updateBalanceError.bind(this),
        );
      },
    });
    this.router.resolve();
  }
}
const app = new App();
