import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class addresses1670002349534 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'addresses',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'street',
          type: 'varchar',
        },
        {
          name: 'number',
          type: 'varchar',
        },
        {
          name: 'complement',
          type: 'varchar',
        },
        {
          name: 'neighborhood',
          type: 'varchar',
        },
        {
          name: 'city',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'varchar',
          length: '2',
        },
      ],

      foreignKeys: [
        {
          name: 'UserAddress',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }
      ],

    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses');
  }

}
