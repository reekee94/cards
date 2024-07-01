import { DeleteUserHandler } from './delete-user.handlers';
import { LoginUserCommandHandler } from './login.handlers';
import { LogoutUserCommandHandler } from './logout.handlers';
import { RefreshUserCommandHandler } from './refresh-tokken.handlers';
import { RegisterUserCommandHandler } from './register.handlers';
import { UpdatePasswordCommandHandler } from './update-user-password.handlers';

export const UserCommandHandlers = [
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshUserCommandHandler,
  RegisterUserCommandHandler,
  DeleteUserHandler,
  UpdatePasswordCommandHandler
];
