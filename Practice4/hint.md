При работе с epam-js-server у меня возникли следующие проблемы и их решения.

В файле app.js
1. Нужно добавить в после 20 строки. Иначе ругается среда исполнения

    mongoose.Promise = global.Promise;

2. Добавить поддержку методов DELETE и PUT. Иначе полный CRUD не реализовать 

    app.use(function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        return next();
    });

3. В файле routes/function.js нужно заменить все req.query на req.body
4. и тогда 144 строка будет
    res.json({ status: 'ok', record_id: req.body.function_id });