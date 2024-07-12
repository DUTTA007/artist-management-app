import bcrypt from "bcryptjs";

class PasswordHashingService {
  static async hashPassword(password: string) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}

export { PasswordHashingService };
