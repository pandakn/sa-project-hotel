import { RoomsInterface } from "../models/IRoom"

export interface BookingInterface{
    ID?: number,
    Room?: RoomsInterface,
    RoomID?: number,
    UserID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number
}