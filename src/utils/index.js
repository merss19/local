import { ClsName, IdName } from './const';
export { ClsName, IdName };

const profile =
  {
    lastName: 'lastName2',
    firstName: 'firstName2',
    middleName: 'middleName2',
    age: 21,
  }

const balance =
  {
    lastName: 'lastName2',
    firstName: 'firstName2',
    middleName: 'middleName2',
    balance: 1000,
  }

const $on = (target, event, handler) => {
  return target.addEventListener(event, handler);
};

const $toggle = (remove, add) => {
  remove.classList.remove('hide')
  add.classList.add('hide');
}

const $fetch = (url, data) => {
  const api = ''
  const payload = data ? data : {}

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  }
  // return fetch(api + url, options)
  let result
  switch (url) {
    case 'profile':
      result = profile
      break
    case 'balance':
      result = balance
      break
    case 'save':
      result = data
      break
    default:
      result = profile;

  }

  const promise = new Promise((resolve) => {
    let res = true
    const random = Math.random()
    if (random > 0.5) {
      res = false;
    }
    const responsive = {
      data: result,
      res: res,
    }
    setTimeout(() => resolve(responsive), 1000);
  })
  return promise;
}


export { $on, $toggle, $fetch };
