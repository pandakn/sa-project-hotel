import { AdminInterface } from "../models/IAdmins";
import { PaymentsInterface } from "../modelsBooking/IPayment"
import { VerifyInterface } from "./IVerify";

export interface ConfirmationInterface {
    ID?: number,
    VerifyID?: number,
    Verify?: VerifyInterface,
    AdminID?: number,
    Admin?: AdminInterface,
    PaymentID?: number,
    Payment?: PaymentsInterface,
    DateTimeConfirmation?: Date,
}