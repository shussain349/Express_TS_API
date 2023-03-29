import express  from "express";

let appLogger = (request:express.Request, response:express.Response, next:express.NextFunction) => {
    // url, method, time, date
    let url = request.url;
    let method = request.method;
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let result:string = `[${url}] [${method}] - [${date}] - [${time}]`;
    console.log(result);
    next();  //next function is  mandatory and in last line

};

export default appLogger;