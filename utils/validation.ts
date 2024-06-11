export const ValidationSchema = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~£¥€])[A-Za-z\d !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~£¥€]{8,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  otp: /^\d{6}$/,
  phoneNumber: /^[0-9\-+]{8,12}$/,
  checkWhitespace: /\s/,
};

export const ValidationError = {
  phoneNumberOrEmail: 'Số điện thoại không được để trống',
  email: 'Email không đúng định dạng',
  password: {
    empty: 'Mật khẩu không được để trống!',
    min: 'Mật khẩu phải có ít nhất 8 ký tự!',
    max: 'Mật khẩu có độ dài tối đá 255 ký tự!',
    pattern: 'Mật khẩu chứa chữ hoa, chữ thường, số và ký tự đặc biệt!',
    match: 'Mật khẩu không giống nhau',
  },
  otp: 'Mã xác nhận phải bao gồm 6 chữ số',
  maxLength: (length: number) => `Độ dài ${length} ký tự`,
  fullName: 'Họ và tên có độ dài tối đa 255 ký tự!',
  phoneNumber: 'SĐT chưa chính xác',
};
