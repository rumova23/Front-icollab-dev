export interface Invoice {
    number?,
    serie?,
    idPlantBranchOffice?;
    idSys?,
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
