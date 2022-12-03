import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class favoriteThemes1670029818939 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'favorite_themes',
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
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'theme',
          type: 'varchar',
        },
      ],

      foreignKeys: [
        {
          name: 'FavoriteThemesUser',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        }
      ],

    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorite_themes', true);
  }

}
