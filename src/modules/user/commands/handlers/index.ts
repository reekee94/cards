import { LoginUserCommandHandler } from './login.handlers';
import { LogoutUserCommandHandler } from './logout.handlers';
import { RefreshUserCommandHandler } from './refresh-tokken.handlers';
import { RegisterUserCommandHandler } from './register.handlers';
import { UpdateUserNameCommandHandler } from './update-user-name.handler';

export const UserCommandHandlers = [
  UpdateUserNameCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshUserCommandHandler,
  RegisterUserCommandHandler,
];
