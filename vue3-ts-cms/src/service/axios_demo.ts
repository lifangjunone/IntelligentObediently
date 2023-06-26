import axios from 'axios'

axios.get('http://192.168.137.228:8000/api/backend_manage/test').then((res) => {
  console.log(res.data)
})
