module.exports =
{
    address: 'mongodb://127.0.0.1:27017/csspatternapp',
    auth:
    {
        "auth": {
          "authSource": "admin"
        },
        "user": "superuser",
        "pass": "totylkotest",
        
        "useNewUrlParser": "true",
        "useUnifiedTopology": "true"
    },
    emailHost: '',
    emailUser: '',
    emailPassword: '',
    session:
    {
        name: 'session',
        keys: ['key1', 'key2'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }

}