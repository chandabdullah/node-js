# Project Structure

```
nls-node-boilerplate/
├── src
│   ├── app.js
│   ├── config
│   │   ├── database.js
│   │   ├── health.js
│   │   ├── index.js
│   │   ├── logger.js
│   │   └── whitelist.js
│   ├── constants
│   │   └── constant.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── index.js
│   ├── middlewares
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   ├── models
│   │   ├── otp.model.js
│   │   ├── role.model.js
│   │   ├── session.model.js
│   │   └── user.model.js
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── index.js
│   │   └── user.route.js
│   ├── seed
│   │   ├── exports
│   │   │   ├── roles.json
│   │   │   └── users.json
│   │   └── seed.js
│   ├── services
│   │   ├── auth.service.js
│   │   ├── cache.service.js
│   │   ├── email.service.js
│   │   ├── notification.service.js
│   │   ├── otp.service.js
│   │   ├── pagination.service.js
│   │   ├── query.service.js
│   │   ├── search.service.js
│   │   ├── upload.service.js
│   │   └── webhook.service.js
│   ├── startup
│   │   ├── init.js
│   │   ├── models.js
│   │   └── socket.js
│   ├── templates
│   │   ├── health.html
│   │   └── welcome.html
│   └── utils
│       ├── asyncHandler.util.js
│       ├── date.util.js
│       ├── file.util.js
│       ├── jwt.util.js
│       ├── password.util.js
│       ├── random.util.js
│       ├── response.util.js
│       └── string.util.js
└── tests
│   ├── integration
│   │   ├── auth.test.js
│   │   └── user.test.js
│   ├── setup.js
│   └── unit
│       └──userService.test.js
├── eslint.config.js
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── README.md
```

---
