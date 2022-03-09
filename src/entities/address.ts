import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { Number } from "./numbers";
@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id!: number


    @ManyToOne(type => Number, phone => phone.addreses)
    phone?: Number


    @Column({ default : "adres_adı"})
    addressName?: string


    @Column({default: "adres"})
    address?: string
}