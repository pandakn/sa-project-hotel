import { RoomsInterface } from "../models/IRoom"
import { PaymentsInterface } from "./IPayment"

export interface BookingInterface{
    ID?: number,
    Room?: RoomsInterface,
    RoomID?: number,
    RegisterID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number
    Payment?: PaymentsInterface
}