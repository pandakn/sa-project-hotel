import { RoomsInterface } from "../models/IRoom"

export interface BookingInterface{
    ID?: number,
    Room?: number,
    RoomID?: RoomsInterface,
    UserID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number
}