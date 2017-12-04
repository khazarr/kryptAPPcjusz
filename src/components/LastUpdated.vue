<template>
<div>
Last updated  {{ timeString }}
</div>
</template>

<script>
export default {
  data () {
    return {
      timeString: ''
    }
  },
  props: [
    'last_updated'
  ],
  mounted () {
    const a = new Date(this.last_updated * 1000)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours() <= 9 ? '0' + a.getHours() : a.getHours()
    const min = a.getMinutes() <= 9 ? '0' + a.getMinutes() : a.getMinutes()
    const sec = a.getSeconds() <= 9 ? '0' + a.getSeconds() : a.getSeconds()
    this.timeString = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  }
}
</script>

<style scoped>

</style>
