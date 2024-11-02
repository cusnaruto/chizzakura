const express =  require("express");
const app = express();
const db = require("./models");

const { Table } = require("./models");
app.get("/select", (req, res) => {
    Table.findAll().then((tables) => {
        res.send(tables);
    }).catch((err) => {
        console.log(err);
    });
});

app.post('/insert', (req, res) => {
    res.send("insert");
    Table.create({
        qr_code: "123",
        is_available: true,
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/delete", (req, res) => {
    Table.destroy({
        where: {
            id: 5,
        },
    }).then(() => {
        res.send("deleted");
    }).catch((err) => {
        console.log(err);
    });
});

db.sequelize.sync({ alter: true }).then((req) => {
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
    });
});

