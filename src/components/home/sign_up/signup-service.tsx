import axios from "axios";
import { AUTHAPI_URL } from '../../../helpers/constants';

export class SignupService {

  static signupRequest(fullName: string, email: string, password: string) {
    return axios.post(AUTHAPI_URL + "Signup", {
      fullName: fullName,
      email: email,
      password: btoa(password), // The password is encrypted in base 64
    });
  }
}

export default SignupService;
