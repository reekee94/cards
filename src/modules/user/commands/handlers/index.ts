import { LoginUserCommandHandler } from './login.handlers';
import { LogoutUserCommandHandler } from './logout.handlers';
import { RefreshUserCommandHandler } from './refresh-tokken.handlers';
import { RegisterUserCommandHandler } from './register-admin.handlers';
import { AddUserCommandHandler } from './add-user.handler';

export const UserCommandHandlers = [
  AddUserCommandHandler,
  LoginUserCommandHandler,
  LogoutUserCommandHandler,
  RefreshUserCommandHandler,
  RegisterUserCommandHandler,
];
