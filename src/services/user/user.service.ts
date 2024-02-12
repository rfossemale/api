import {Injectable} from "@nestjs/common";
import {User} from "../../models/User";
import {InjectModel} from "@nestjs/sequelize";
// import * as bcrypt from "bcrypt";

type Response  = {
  success: boolean;
  data: {} | null;
  error?: {} | string;
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    // private readonly prismaService: PrismaService,
    // service to save user.ts in context
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getUserById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id }});
  }

  async getUser(data: { id?: number, email?: string }) {
    const { id, email} = data;
    // validar como se comporta con id = null y email = 'admin@mail.com'
    return this.userModel.findOne({ where: { id, email }});
  }

  async createUser(data: { // sanitize data ?
    email: string;
    password: string;
    firstName: string;
    lastname: string;
    isActive: boolean;
  }, trans) {
    try {
      await this.userModel.create(data, { transaction: trans});
    } catch (err) {
      // implement DatabaseError handler
      throw err;
    }
  }
  async validateUser(data: { email: string, password: string }): Promise<any> {
    // let response: Response = { success: false, data: null };
    console.log("Parameter received: ", data);
    try {
      return  Promise.resolve();
      // const promise =  new Promise(async (resolve, reject) => {
      //   const { email, password} = data;
      //   const user.ts = await this.getUser({ email });
      //   if (user.ts) {
      //     const { password: hashedPassword} = user.ts;
      //     bcrypt.compare(password, hashedPassword, (err, result) => {
      //       if (err) {
      //         console.error('Error comparing passwords:', err);
      //         return reject(response);
      //       }
      //       if (result) {
      //         let response = { success: true, data: user.ts }; // remove sensible data
      //         return resolve(response); // get the user.ts needed values and return
      //       } else {
      //         return reject(response);
      //       }
      //     });
      //   }
      // });
      // return promise;
    } catch (error) {
      return Promise.reject("Error validate user.ts");
    }
  }
}

//        let response: Response = { success: false, data: null };
//         const promise: Promise<Response> = new Promise((resolve, reject) => {
//             bcrypt.genSalt(10, (err, salt) => {
//                 if (err) {
//                     return reject(response);
//                 }
//                 const { password } = data;
//                 bcrypt.hash(password, salt, (err, hash) => {
//                     if (err) {
//                         return reject(response);
//                     }
//                     data.password = hash;
//                     this.prismaService.user.ts.create({
//                         data,
//                     });
//                     response = { success: true, data: 'ok'};
//                     return resolve(response);
//                 });
//             });
//         });
//         return promise;
//     }
