import { RoomsInterface } from "../models/IRoom"
import { PaymentsInterface } from "./IPayment"
import { RegisterInterface } from "../modelsRegister/IRegister"

export interface BookingInterface{
    ID?: number,
    Room?: RoomsInterface,
    RoomID?: number,
    Register?: RegisterInterface
    RegisterID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number
    Payment?: PaymentsInterface
}