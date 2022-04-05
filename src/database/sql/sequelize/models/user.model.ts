/* eslint-disable indent */
import { Helper } from '../../../../common/helper';
import {
    BeforeCreate,
    BeforeUpdate,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    HasMany,
    IsEmail,
    IsUUID,
    Length,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import Role from './role.model';
import BookBorrowLog from './book.borrow.log.model';

@Table({
    timestamps: true,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    freezeTableName: true,
})
export default class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: () => {
            return v4();
        },
        allowNull: false,
        unique: true,
    })
    id: string;

    @Length({ max: 16 })
    @Column({
        type: DataType.STRING(16),
        allowNull: true,
    })
    Prefix: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    FirstName: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: true,
    })
    MiddleName: string;

    @Length({ max: 70 })
    @Column({
        type: DataType.STRING(70),
        allowNull: true,
    })
    LastName: string;

    @Length({ max: 128 })
    @IsEmail
    @Column({
        type: DataType.STRING(128),
        allowNull: false,
        unique: true,
    })
    Email: string;

    @Length({ min: 6, max: 256 })
    @Column({
        type: DataType.STRING(256),
        allowNull: false,
    })
    Password: string;

    @BeforeCreate
    @BeforeUpdate
    static encryptPassword(client) {
        if (client.Password != null || client.Password  != ''){
                client.Password = Helper.hash(client.Password);
       }
   }

    //@IsUUID(4)
    @ForeignKey(() => Role)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    RoleId: string;

    @BelongsTo(() => Role)
    Role: Role;

    @HasMany(() => BookBorrowLog)
    BooksBorrowed: BookBorrowLog[];

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}
