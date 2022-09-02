const fs= require('fs');
const path = require('path');


const express = require('express');
var cors = require('cors')


const sequelize = require('./util/database');
const User = require('./models/users');
const Expense = require('./models/expenses');
const Order = require('./models/orders');
const Forgotpassword = require('./models/forgotpassword');
const helmet= require('helmet');
const compression= require('compression');
const morgan= require('morgan');

const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const resetPasswordRoutes = require('./routes/resetpassword')

const accessLogStream= fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
//const privateKey= fs.readFileSync('server.key');
//const certificate= fs.readFileSync('server.cert');

const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();


app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons


app.use('/user', userRoutes)


app.use('/purchase', purchaseRoutes)

app.use('/password', resetPasswordRoutes);

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream: accessLogStream}));




User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

/*sequelize.sync()
    .then(() => {
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })*/

sequelize
// .sync({ force: true })
.sync()
    .then(() => {
        // https.createServer({key: privateKey, cert: certificate}, app)        
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => {
        console.log(err);
    })
