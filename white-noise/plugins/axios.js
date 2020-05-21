export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  // $axios.onRsponse((config) => {
  //   console.log('making response :', config)
  // })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    const message = error.response.data.message
    console.log('onError code:', code, message)
    if (code !== 200) {
      redirect('/')
    }
  })
}
