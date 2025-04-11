import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../domain/usecases/auth/register-user.usecase';
import { LoginUserUseCase } from '../../domain/usecases/auth/login-user.usecase';
import { UserLoginDto, UserRegisterDto } from '../../domain/models/user.model';

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: UserRegisterDto = req.body;
      const user = await this.registerUserUseCase.execute(userData);
      
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during registration';
      res.status(400).json({
        success: false,
        message
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const credentials: UserLoginDto = req.body;
      const response = await this.loginUserUseCase.execute(credentials);
      
      res.status(200).json({
        success: true,
        data: response
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid credentials';
      res.status(401).json({
        success: false,
        message
      });
    }
  }
} 