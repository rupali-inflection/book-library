/* eslint-disable indent */
import { Helper } from '../../../../common/helper';
import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';
import User from './user.model';

@Table({
    timestamps: true,
    modelName: 'UserMembership',
    tableName: 'user_membership',
    paranoid: true,
    freezeTableName: true,
})
export default class UserMembership extends Model {
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

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    UserId: string;

    @Column({
        type      : DataType.DATE,
        allowNull : false,
    })
    ValidFrom: Date;

    @Column({
        type      : DataType.DATE,
        allowNull : false,
    })
    ValidTill: Date;

    @Column
    @CreatedAt
    CreatedAt: Date;

    @UpdatedAt
    UpdatedAt: Date;

    @DeletedAt
    DeletedAt: Date;
}
