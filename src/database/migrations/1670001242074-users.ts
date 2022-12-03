import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class users1670001242074 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isUnique: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'full_name',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '150',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
