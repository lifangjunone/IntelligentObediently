export const formatDate = (time) => {
  if (time !== null && time !== '' && time > 0) {
    const date = new Date(time)
    const Y = `${date.getFullYear()}-`
    let M = date.getMonth() + 1
    M = M < 10 ? `0${M}-` : `${M}-`
    let D = date.getDate()
    D = D < 10 ? `0${D} ` : `${D} `
    let h = date.getHours()
    h = h < 10 ? `0${h}:` : `${h}:`
    let m = date.getMinutes()
    m = m < 10 ? `0${m}:` : `${m}:`
    let s = date.getMinutes()
    s = s < 10 ? `0${s}` : s
    return Y + M + D + h + m + s
  }
  return ''
}
export const formatDateT = (time) => {
  if (time) {
    const newTime = time.substring(0, 19).replace('T', ' ')
    return newTime
  }
  return ''
}
export const downloadImage = (imgsrc, name) => { // 下载图片地址和图片名
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据

    const a = document.createElement('a') // 生成一个a元素
    const event = new MouseEvent('click') // 创建一个单击事件
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
}
