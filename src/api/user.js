const _users = [
    {"id": 1, "name": "yijing", "age": 18},
    {"id": 2, "name": "yijing2", "age": 19},
    {"id": 3, "name": "yijing3", "age": 20},
  ]


export default {
    getUsers (cb) {
      setTimeout(() => cb(_users), 100)
    },
  
    searchUsers (users, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        Math.random() > 0.5
          ? cb()
          : errorCb()
      }, 100)
    }
  }