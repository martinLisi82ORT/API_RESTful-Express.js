import dotenv from 'dotenv'
// const PORT = 8080
// const MODO_PERSISTENCIA = 'MEM'  // 'MEM', 'FILE', 'MONGODB'
// const STRCNX = 'mongodb://127.0.0.1'
// const BASE = 'mibase'

dotenv.config()

const PORT = process.env.PORT || 8080
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'FILE'  // 'MEM', 'FILE', 'MONGODB'
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'

export default {
    PORT,
    MODO_PERSISTENCIA,
    STRCNX,
    BASE
}