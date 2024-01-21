import bodyParser from "body-parser";

export const configBodyParse = (app) => {
    //config app
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}