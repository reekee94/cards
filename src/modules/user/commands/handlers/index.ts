import { LoginUserCommandHandler } from './login.handlers';
import { LogoutUserCommandHandler } from './logout.handlers';
import { RefreshUserCommandHandler } from './refresh-tokken.handlers';
import { RegisterUserCommandHandler } from './register.handlers';

export const UserCommandHandlers = [
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshUserCommandHandler,
  RegisterUserCommandHandler,
];
