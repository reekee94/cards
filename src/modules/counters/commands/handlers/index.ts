import { CreateCounterCommandHandler } from "./create-counter.handler";
import { DeleteCounterCommandHandler } from "./delete-counter.handler";
import { UpdateCounterCommandHandler } from "./update-counter.handler";


export const CounterCommandHandlers = [
  CreateCounterCommandHandler,
  DeleteCounterCommandHandler,
  UpdateCounterCommandHandler,
];
