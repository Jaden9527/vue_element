<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h3>{{this.$store.state.count}}</h3>
    <el-button type="primary" size="small" @click="addFn">add</el-button>
    <el-button type="danger" size="small" @click="reductFn">delete</el-button>
    <el-button type="primary" size="small" @click="uploadFn">上传</el-button>
    <mapModel @lnglatchange="lnglatchange"></mapModel>
    <p v-if="longitude && latitude">{{'经度：' + longitude + '纬度：' + latitude}}</p>
    <uploadFile
      :uploadFileSetting="uploadFileSetting"
      @on-close="uploadClose()"
      @uploadChange="uploadChange"
    ></uploadFile>
  </div>
</template>

<script>
import uploadFile from '../../components/uploadFile.vue'
import mapModel from '../../components/map/index.vue'
export default {
  name: 'Dashboard',
  components: {
    uploadFile,
    mapModel
  },
  data() {
    return {
      msg: 'Welcome to Home Page',
      longitude: null,
      latitude: null,
      uploadFileSetting: {
        uploadShow: false,
        multiple: 'multiple'
      }
    }
  },
  methods: {
    addFn: function() {
      this.$store.dispatch('add', 2)
    },
    reductFn: function() {
      this.$store.dispatch('reduct', 4)
    },
    uploadFn: function() {
      this.uploadFileSetting.uploadShow = true
    },
    uploadClose: function() {
      this.uploadFileSetting.uploadShow = false
    },
    uploadChange: function(list) {
      console.log('上传返回路径', list)
    },
    lnglatchange: function(e) {
      this.longitude = e.longitude
      this.latitude = e.latitude
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>