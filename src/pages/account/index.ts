import { defineComponent, ref } from 'vue'
import { Input, Button, Checkbox, Tooltip, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import axios from '@/plugins/axios'

export default defineComponent({
  name: 'AccountIndex',
  components: {
    UserOutlined,
    LockOutlined,
    [Tooltip.name]: Tooltip,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Input.name]: Input
  },
  setup () {
    const checked = ref(true)
    const user = ref('18888888888')
    const pwd = ref('123456')
    const doLogin = async () => {
      // 如果帐号或密码为空，则提醒错误
      if (!user.value || !pwd.value) {
        message.error('帐号或密码不能为空')
      } else {
        const data = await axios.post('/')
        console.log(data)
      }
    }
    return {
      user,
      pwd,
      checked,
      doLogin
    }
  }
})
