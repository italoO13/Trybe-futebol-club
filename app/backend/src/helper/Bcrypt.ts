import * as bcrypt from 'bcryptjs';

export const verifyPassword =  (passwordEncode:string, password:string):boolean => {
  return bcrypt.compareSync(password, passwordEncode);
}