const express = require('express')

const cors = require('cors')

const mockList = require('./mockList')

const app = express()

const router = express.Router()

app.use(cors())

router.get('/api/recommend', (req,res) => {
  console.log(req.query);
  const { startNum = 0, pageSize = 10 } = req.query;
  const resList = mockList.slice(Number(startNum), Number(startNum) + Number(pageSize))
  res.json({data: resList})
})

app.use(router)

app.listen(3010, () => {
  console.log('server in port 3010');
})