import { $fetch } from '../utils';


const UserServicesBlock = (() => {
  class UserServices {

    constructor() {
      this.user = {
        loading: false,
        load: false,
        data: [],
      };
      this.subscribers = [];
    }

    inValid() {
      this.publish('inValid');
    }

    valid() {
      this.publish('valid');
    }

    subscribe(onPublish) {
      this.subscribers.push(onPublish);
    }

    publish(method, data) {
      this.subscribers.forEach((subscriber) => {
        if (subscriber[method]) {
          subscriber[method](data);
        }
      });
    }

    saveUserData(fields, done, fail) {
      $fetch('save', fields).then((res) => {
        if (res.res) {
          this.user = {
            loading: false,
            load: true,
            data: res.data,
          };
          this.publish('update');
          done();
        } else {
          fail();
        }
      })
        .catch((err) => {
          throw new Error(err.message);
        });
    }

    fetchData(page, done, fail) {
      this.user = {
        loading: true,
        load: false,
        data: [],
      };
      this.publish('load');

      $fetch(page)
        .then((res) => {
          if (res.res) {
            this.publish('render', res.data);
            this.user = {
              loading: false,
              load: true,
              data: res.data,
            };
            this.publish('load');
            if (page === 'balance') {
              this.initSocket(done, fail);
            }
          } else {
            this.user = {
              loading: false,
              load: false,
              data: [],
            };
            this.publish('load');
          }
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    }

    initSocket(done, fail) {
      //const  socket = io.connect('http://localhost:4000')
      let balance = 1000
      //socket.on('updateBalance', function(data){
      //data = balance
      const $this = this
      setTimeout(function tick() {
        const random = Math.random()
        if (Math.random() < 0.5) {
          balance++;
          $this.user.data.balance = balance
          $this.publish('update')
          done();
        } else {
          fail();
        }

        setTimeout(tick, 5000);
      }, 5000);
      //})
    }

  }
  return UserServices;
})();
export default UserServicesBlock;
