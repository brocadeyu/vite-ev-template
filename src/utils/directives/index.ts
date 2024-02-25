// 拖拽的指令
import dialogDrag from './dialogDrag'
const directives = {
  install: function (app: any) {
    app.directive('dialogDrag', dialogDrag)
  }
}
export default directives
