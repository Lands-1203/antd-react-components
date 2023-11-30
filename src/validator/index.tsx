/* eslint-disable no-useless-escape */
// 自定义验证器
type Validator = (
  rule: any,
  value: any,
  callback: any,
  source?: any,
  options?: any,
) => Promise<void>;
// 生成一个校验器
export function craeteValidator(regex: RegExp, message: string): Validator {
  return async (rule, value) => {
    if ((!value && rule.required !== true) || regex.test(value)) {
      return;
    }
    throw new Error(message);
  };
}
const validator: Record<string, any> = {};

export const VPhone = craeteValidator(/^1[3-9]\d{9}$/, '手机号格式不正确');
validator.VPhone = VPhone;

export const VEmail = craeteValidator(
  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  '邮箱格式不正确',
);
validator.VEmail = VEmail;

export const VPwd = craeteValidator(
  /(?=^.{6,16}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})(?=(?:.*?[`·~!@#$%^&*()_+}{|:;'",<.>/?\=\[\]\-\\]){1})(?!.*\s)[0-9a-zA-Z`·~!@#$%^&*()_+}{|:;'",<.>/?\=\[\]\-\\]*$/,
  '密码长度 6-16 位，包含至少一个特殊字符，一个数字，一个大写字母和一个小写字母',
);
validator.VPwd = VPwd;

export const VWord = craeteValidator(
  /^[a-zA-Z0-9]+$/,
  '格式不正确：请输入a-z、A-Z、0-9任意值组合',
);
validator.VWord = VWord;

export const VIdCard = craeteValidator(
  /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  '请输入正确的身份证号格式',
);
validator.VIdCard = VIdCard;

export const VUserName = craeteValidator(
  /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/,
  '请输入正确姓名',
);
validator.VUserName = VUserName;

export default validator;
