const { connection } = require('./connector')
const { data } = require('./data')
require('dotenv').config();

const refreshAll = async () => {
    await connection.deleteMany({})
    // console.log(connection)
    await connection.insertMany(data)
}
refreshAll()