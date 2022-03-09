import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { Address } from "./address"

@Entity()
export class Number {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    phone?: string

    @OneToMany(type => Address, address => address.phone,  { cascade: true })
    addreses ?: Address[]
}