const { Cate } = require('../../model/cate')

module.exports = async (req, res, next) => {
  await Cate.create(req.body)
  const cates = await Cate.find({})
  res.
    send({
      meta: { status: 200 },
      data: { cates, message: '添加成功' }
    })
}