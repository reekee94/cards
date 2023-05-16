import { DefaultFields } from 'src/common/utils/default.fields';
import { Column } from 'typeorm';

export class Code extends DefaultFields {
  @Column()
  code: string;
}
