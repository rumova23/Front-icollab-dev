export interface Client {
    id?,
    save?,
    typeClient?;
    idTypeClient?,
    number?,
    classification?,
    businessGroup?,
    commercialBusiness?,
    tradename?,
    supplierNumber?,
    paymentCondition?;
    idPaymentCondition?,
    requireAddenda?,

    startTimeInvoiceReview?,
    endTimeInvoiceReview?,
    phone?,
    addendaNumber?,
    paymentWay?;
    idPaymentWay?,
    emailInvoice?,
    locked?,
    active?,
    observations?,

    fiscalData?
    clientAccounts?;
    clientContacts?;
    clientProducts?;
}
