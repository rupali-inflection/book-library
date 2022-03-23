import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    IsUUID,
    PrimaryKey,
    IsInt,
    ForeignKey,
    Length
} from 'sequelize-typescript';

import { v4 } from 'uuid';

import Role from './role.model';
import User from './user.model';

///////////////////////////////////////////////////////////////////////

@Table({
    timestamps      : true,
    modelName       : 'UserRole',
    tableName       : 'user_roles',
    paranoid        : true,
    freezeTableName : true
})
export default class UserRole extends Model {

    @IsUUID(4)
    @PrimaryKey
    @Column({
        type         : DataType.UUID,
        defaultValue : () => { return v4(); },
        allowNull    : false
    })
        id: string;

    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type      : DataType.UUID,
        allowNull : false,
    })
        UserId: string;

    @IsInt
    @ForeignKey(() => Role)
    @Column({
        type      : DataType.STRING,
        allowNull : false,
    })
        RoleId: string;

    @Length({ min: 1, max: 32 })
    @Column({
        type      : DataType.STRING(32),
        allowNull : true
    })
        RoleName: string;

    @Column
    @CreatedAt
        CreatedAt: Date;

    @UpdatedAt
        UpdatedAt: Date;

    @DeletedAt
        DeletedAt: Date;
}
