import { find } from 'lodash/collection';

import { users } from '../mock-data/users-mock';

export function authUserAPI(email, password) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      let user = find(users, { email, password });

      if (user) {
        resolve({user})
      } else {
        reject(new Error("Wrong Email and/or Password!"));
      }

    }, 1000);
  });
}